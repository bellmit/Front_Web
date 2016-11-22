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
				logisticsedit_power=public_tool.getKeyPower('mall-store-logistics',powermap);

			/*清除编辑缓存*/
			public_tool.removeParams('mall-announcement-add');


			/*dom引用和相关变量定义*/
			var $store_logistics_wrap=$('#store_logistics_wrap')/*表格*/,
				module_id='mall-store-logistics'/*模块id，主要用于本地存储传值*/,
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
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj(),
				$admin_page_wrap=$('#admin_page_wrap'),
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_content=$('#show_detail_content')/*详情内容*/;




			/*列表请求配置*/
			var logistics_page={
					page:1,
					pageSize:10,
					total:0
				},
				logistics_config={
					$store_logistics_wrap:$store_logistics_wrap,
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
								logistics_page.page=result.page;
								logistics_page.pageSize=result.pageSize;
								logistics_page.total=result.count;
								/*分页调用*/
								$admin_page_wrap.pagination({
									pageSize:logistics_page.pageSize,
									total:logistics_page.total,
									pageNumber:logistics_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=logistics_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										logistics_config.config.ajax.data=param;
										getColumnData(logistics_page,logistics_config);
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
								"data":"title"
							},
							{
								"data":"type",
								"render":function(data, type, full, meta ){
									var types=parseInt(data,10),
										typesmap={
											1:"通知"
										},
										str='';

									if(types===1){
										str='<div class="g-c-bs-info">'+typesmap[types]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"sort"
							},
							{
								"data":"status",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"启用",
											1:"停用",
											2:"删除"
										},
										str='';

									if(stauts===0){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-gray12">'+statusmap[stauts]+'</div>';
									}else if(stauts===2){
										str='<div class="g-c-red1">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"content",
								"render":function(data, type, full, meta ){
									return data.toString().slice(0,20)+'......';
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='',
										status=parseInt(full.status,10);

									if(logisticsedit_power){
										/*启用*/
										if(status===0){
											btns+='<span data-action="off" data-id="'+id+'" data-status="1" data-currentstatus="0" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-arrow-up"></i>\
											<span>停用</span>\
											</span>\
											<span data-action="delete" data-id="'+id+'" data-status="2" data-currentstatus="0"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-trash"></i>\
											<span>删除</span>\
											</span>\
											<span data-action="update" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-pencil"></i>\
											<span>编辑</span>\
											</span>';
										}else if(status===1){
											/*停用*/
											btns+='<span data-action="off" data-id="'+id+'" data-status="0" data-currentstatus="1" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-arrow-up"></i>\
											<span>启用</span>\
											</span>';
										}else if(status===2){
											/*删除*/
											btns+='<span data-action="off" data-id="'+id+'" data-status="0" data-currentstatus="2" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-arrow-up"></i>\
											<span>启用</span>\
											</span>';
										}
									}
									return btns;
								}
							}
						]
					}
				};
			

			/*初始化请求*/
			getColumnData(logistics_page,logistics_config);
			


			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$store_logistics_wrap.delegate('span','click',function(e){
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
				if(action==='update'){
					public_tool.setParams('mall-announcement-add',table.row($tr).data());
					location.href='mall-announcement-add.html';
				}else if(action==='select'){
					/*添加高亮状态*/
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					var datas=table.row($tr).data();
					$show_detail_content.html('<tr><th style="vertical-align: middle">公告内容:</th><td style="vertical-align: middle">'+datas['content']+'</td></tr>');
					$show_detail_wrap.modal('show',{backdrop:'static'});
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
				table=opt.$store_logistics_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}





	});


})(jQuery);