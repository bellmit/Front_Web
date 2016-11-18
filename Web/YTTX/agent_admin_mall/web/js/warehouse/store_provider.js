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
			var powermap=public_tool.getPower();


			/*dom引用和相关变量定义*/
			var $store_provider_wrap=$('#store_provider_wrap')/*表格*/,
				module_id='mall-store-provider'/*模块id，主要用于本地存储传值*/,
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
			var provider_page={
					page:1,
					pageSize:10,
					total:0
				},
				provider_config={
					$store_provider_wrap:$store_provider_wrap,
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
								provider_page.page=result.page;
								provider_page.pageSize=result.pageSize;
								provider_page.total=result.count;
								/*分页调用*/
								$admin_page_wrap.pagination({
									pageSize:provider_page.pageSize,
									total:provider_page.total,
									pageNumber:provider_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=provider_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										provider_config.config.ajax.data=param;
										getColumnData(provider_page,provider_config);
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
								"data":"sort",
								"render":function(data, type, full, meta ){
									return public_tool.phoneFormat(data);
								}
							},
							{
								"data":"status",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"默认",
											1:"上架",
											2:"下架"
										},
										str='';

									if(stauts===0){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}else if(stauts===2){
										str='<div class="g-c-gray12">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"content",
								"render":function(data, type, full, meta ){
									return data.toString().slice(0,20)+'......';
								}
							}
						]
					}
				};
			

			/*初始化请求*/
			getColumnData(provider_page,provider_config);
			
			
		}


		/*获取数据*/
		function getColumnData(page,opt){
			if(table===null){
				table=opt.$store_provider_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}





	});


})(jQuery);