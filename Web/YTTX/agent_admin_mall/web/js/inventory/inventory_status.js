/*admin_member:成员设置*/
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
				inventoryshow_power=public_tool.getKeyPower('mall-inventory-status',powermap);



			
			/*dom引用和相关变量定义*/
			var $inventory_status_wrap=$('#inventory_status_wrap')/*表格*/,
				module_id='mall-announcement-list'/*模块id，主要用于本地存储传值*/,
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
				$admin_page_wrap=$('#admin_page_wrap'),
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_content=$('#show_detail_content'),/*详情内容*/
				$show_detail_title=$('#show_detail_title'),
				detail_map={
					"goodsName":"商品名称",
					"unit":"单位",
					"type":"分类",
					"orderTime":"订单时间",
					"store":"仓库",
					"orderState":"订单状态",
					"physicalInventory":"实际库存",
					"availableInventory":"可售库存"
				};




			/*列表请求配置*/
			var inventory_page={
					page:1,
					pageSize:10,
					total:0
				},
				inventory_config={
					$inventory_status_wrap:$inventory_status_wrap,
					$admin_page_wrap:$admin_page_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:/*"http://120.76.237.100:8082/mall-agentbms-api/announcements/related"*/"../../json/inventory/mall_inventory_status_list.json",
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
								inventory_page.page=result.page;
								inventory_page.pageSize=result.pageSize;
								inventory_page.total=result.count;
								/*分页调用*/
								$admin_page_wrap.pagination({
									pageSize:inventory_page.pageSize,
									total:inventory_page.total,
									pageNumber:inventory_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=inventory_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										inventory_config.config.ajax.data=param;
										getColumnData(inventory_page,inventory_config);
									}
								});
								return result?result.list||[]:[];
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
								"data":"goodsName"
							},
							{
								"data":"unit"
							},
							{
								"data":"type",
								"render":function(data, type, full, meta ){
									var types=parseInt(data,10),
										typesmap={
											1:"北京",
											2:"上海",
											3:"广州",
											4:"深圳",
											5:"长沙",
											6:"成都",
											7:"重庆",
											8:"武汉"
										};

									return '<div class="g-c-bs-info">'+typesmap[types]+'</div>';
								}
							},
							{
								"data":"store"
							},
							{
								"data":"physicalInventory"
							},
							{
								"data":"availableInventory"
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='';


									if(inventoryshow_power){
										btns+='<span data-action="select" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-file-text-o"></i>\
											<span>查看</span>\
											</span>';
									}

									return btns;
								}
							}
						]
					}
				};
			

			/*初始化请求*/
			getColumnData(inventory_page,inventory_config);
			


			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$inventory_status_wrap.delegate('span','click',function(e){
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
				if(action==='select'){
					showDetail(id,$tr);
				}
			});


			/*绑定关闭详情*/
			$show_detail_wrap.on('hide.bs.modal',function(){
				if(operate_item){
					setTimeout(function(){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					},1000);
				}
			});


		}


		/*获取数据*/
		function getColumnData(page,opt){
			if(table===null){
				table=opt.$inventory_status_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}


		/*查看详情*/
		function showDetail(id,$tr) {
			if(!id){
				return false;
			}

			var detailconfig={
				url:/*"http://120.76.237.100:8082/mall-agentbms-api/salesman/detail"*/"../../json/inventory/mall_inventory_status_list.json",
				dataType:'JSON',
				method:'post',
				data:{
					"id":id,
					"adminId":decodeURIComponent(logininfo.param.adminId),
					"token":decodeURIComponent(logininfo.param.token),
					"grade":decodeURIComponent(logininfo.param.grade)
				}
			};
			$.ajax(detailconfig)
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
						return false;
					}
					/*是否是正确的返回数据*/
					var list=resp.result,
						str='',
						istitle=false;

					if(!$.isEmptyObject(list)){
						list=list["list"][id - 1];
						for(var j in list){
							if(typeof detail_map[j]!=='undefined'){
								if(j==='name'||j==='Name'){
									istitle=true;
									$show_detail_title.html('"<span class="g-c-info">"'+list[j]+'" 库存状况</span>"详情信息');
								}else if(j==='type'){
									var typemap={
										1:"北京",
										2:"上海",
										3:"广州",
										4:"深圳",
										5:"长沙",
										6:"成都",
										7:"重庆",
										8:"武汉"
									}
									str+='<tr><th>'+detail_map[j]+':</th><td>'+typemap[list[j]]+'</td></tr>';
								}else if(j==='orderState'){
									var statusmap={
										0:"待付款",
										1:"取消订单",
										6:"待发货",
										9:"待收货",
										20:"待评价",
										21:"已评价"
									};
									str+='<tr><th>'+detail_map[j]+':</th><td>'+statusmap[list[j]]+'</td></tr>';
								}else{
									str+='<tr><th>'+detail_map[j]+':</th><td>'+list[j]+'</td></tr>';
								}
							}

						}
						if(!istitle){
							$show_detail_title.html('库存状况详情信息');
						}
						/*添加高亮状态*/
						if(operate_item){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						}
						operate_item=$tr.addClass('item-lighten');
						$show_detail_content.html(str);
						$show_detail_wrap.modal('show',{backdrop:'static'});
					}else{
						$show_detail_content.html('');
						$show_detail_title.html('');
					}
				})
				.fail(function(resp){
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
				});

		}



	});


})(jQuery);