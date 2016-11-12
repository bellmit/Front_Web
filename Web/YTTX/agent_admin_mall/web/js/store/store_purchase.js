(function($){
	'use strict';
	$(function(){

		var table=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.76.237.100:8082/mall-agentbms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});
			/*权限调用*/
			var powermap=public_tool.getPower(),
				receive_power=public_tool.getKeyPower('mall-store-receive',powermap);

			/*清除收货缓存*/
			public_tool.removeParams('mall-store-receive');


			/*dom引用和相关变量定义*/
			var $store_purchase_wrap=$('#store_purchase_wrap')/*表格*/,
				module_id='mall-store-purchase'/*模块id，主要用于本地存储传值*/,
				dia=dialog({
					title:'温馨提示',
					okValue:'确定',
					width:300,
					ok:function(){
						this.close();
						return false;
					},
					cancel:false
				})/*一般提示对象*/,
				$admin_page_wrap=$('#admin_page_wrap');




			/*列表请求配置*/
			var purchase_page={
					page:1,
					pageSize:10,
					total:0
				},
				purchase_config={
					$store_purchase_wrap:$store_purchase_wrap,
					$admin_page_wrap:$admin_page_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:"http://120.76.237.100:8082/mall-agentbms-api/announcements/related",
							dataType:'JSON',
							method:'post',
							dataSrc:function ( json ) {
								var code=parseInt(json.code,10);
								if(code!==0){
									if(code===999){
										/*清空缓存*/
										public_tool.loginTips(function () {
											public_tool.clear();
											public_tool.clearCacheData();
										});
									}
									console.log(json.message);
									return [];
								}
								var result=json.result;
								/*设置分页*/
								purchase_page.page=result.page;
								purchase_page.pageSize=result.pageSize;
								purchase_page.total=result.count;
								/*分页调用*/
								$admin_page_wrap.pagination({
									pageSize:purchase_page.pageSize,
									total:purchase_page.total,
									pageNumber:purchase_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=purchase_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										purchase_config.config.ajax.data=param;
										getColumnData(purchase_page,purchase_config);
									}
								});
								return result.list;
							},
							data:{
								roleId:decodeURIComponent(logininfo.param.roleId),
								adminId:decodeURIComponent(logininfo.param.adminId),
								token:decodeURIComponent(logininfo.param.token),
								grade:decodeURIComponent(logininfo.param.grade),
								page:1,
								pageSize:10
							}
						},
						info:false,
						searching:true,
						ordering:true,
						columns: [
							{
								"data":"title"
							},
							{
								"defalutContent":""
							},
							{
								"defalutContent":""
							},
							{
								"data":"status",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"已收货",
											1:"部分收货",
											2:"未收货"
										},
										str='';

									if(stauts===0){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}else if(stauts===2){
										str='<div class="g-c-red1">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='';

									if(receive_power){
										btns+='<span data-action="receive" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-file-text-o"></i>\
											<span>收货</span>\
											</span>';
									}
									btns+='<span  data-subitem=""  data-action="select" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
										<i class="fa-angle-right"></i>\
										<span>查看</span>\
										</span>';


									return btns;
								}
							}
						]
					}
				};
			

			/*初始化请求*/
			getColumnData(purchase_page,purchase_config);
			


			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$store_purchase_wrap.delegate('span','click',function(e){
				e.stopPropagation();
				e.preventDefault();

				var target= e.target,
					$this,
					id,
					action,
					$tr;

				//适配对象
				if(target.className.indexOf('btn')!==-1){
					$this=$(target);
				}else{
					$this=$(target).parent();
				}
				$tr=$this.closest('tr');
				id=$this.attr('data-id');
				action=$this.attr('data-action');

				/*修改,编辑操作*/
				if(action==='receive'){
					public_tool.setParams('mall-store-receive',id);
					location.href='mall-store-receive.html';
				}else if(action==='select'){
					/*查看收货详情*/
					(function () {
						var subclass=$this.children('i').hasClass('fa-angle-down'),
							tabletr=table.row($tr),
							subitem=$this.attr('data-subitem');

						if(subclass){
							/*收缩*/
							$this.children('i').removeClass('fa-angle-down');
							tabletr.child().hide(200);
						}else{
							/*添加高亮状态*/
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
							operate_item=$tr.addClass('item-lighten');
							/*展开*/
							if(subitem===''){
								var itemdata=parseInt(Math.random()*10,10),
									code=itemdata%2;
								if(code!==0||itemdata===0){
									/*回滚状态*/
									tabletr.child($('<tr><td colspan="5"><table class="table table-bordered table-striped table-hover admin-table" ><tbody class="middle-align"><tr><td class="g-t-c" colspan="5">("暂无数据")</td></tr></tbody></table></td></tr>')).show();
									$this.attr({
										'data-subitem':'true'
									}).children('i').addClass('fa-angle-down');
									console.log('no data');
									return false;
								}

								var i= 0,
									newstr='<colgroup>\
									<col class="g-w-percent20">\
									<col class="g-w-percent10">\
									<col class="g-w-percent10">\
									<col class="g-w-percent10">\
									</colgroup>\
										<thead>\
										<tr>\
										<th>商品名称</th>\
										<th>采购数量</th>\
										<th>发货数量</th>\
										<th>待发数量</th>\
									</tr>\
									</thead>',
									res='';
								if(itemdata!==0){
									for(i;i<itemdata;i++){
										res+='<tr><td>测试商品名称'+i+'</td><td>'+i+'</td><td>'+i+'</td><td>'+i+'</td></tr>';

									}
								}
								res='<tbody class="middle-align">'+res+'</tbody>';
								newstr='<tr><td colspan="5"><table class="table table-bordered table-striped table-hover admin-table" >'+newstr+res+'</table></td></tr>';

								var $newtr=$(newstr);
								tabletr.child($newtr).show();
								$this.attr({
									'data-subitem':'true'
								}).children('i').addClass('fa-angle-down');
							}else{
								tabletr.child().show();
								$this.children('i').addClass('fa-angle-down');
							}
						}
					}());

				}
			});




		}


		/*获取数据*/
		function getColumnData(page,opt){
			if(table===null){
				table=opt.$store_purchase_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}





	});


})(jQuery);