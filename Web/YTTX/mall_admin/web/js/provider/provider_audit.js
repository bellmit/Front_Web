(function($){
	'use strict';
	$(function(){

		var table=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'../../json/menu.json',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});

			/*权限调用*/
			var powermap=public_tool.getPower(),
				audit_power=public_tool.getKeyPower('provider-audit',powermap);



			/*dom引用和相关变量定义*/
			var $admin_list_wrap=$('#admin_list_wrap')/*表格*/,
				module_id='mall-provider-audit'/*模块id，主要用于本地存储传值*/,
				dia=dialog({
					zIndex:2000,
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
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj();


			/*查询对象*/
			var $search_name=$('#search_name'),
				$search_store=$('#search_store'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');




			/*列表请求配置*/
			var provider_page={
					page:1,
					pageSize:10,
					total:0
				},
				provider_config={
					$admin_list_wrap:$admin_list_wrap,
					$admin_page_wrap:$admin_page_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:"../../json/provider/mall_provider_list.json",
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
								if(typeof result==='undefined'){
									return [];
								}
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
								return result?result.list||[]:[];
							},
							data:{
								userId:decodeURIComponent(logininfo.param.roleId),
								adminId:decodeURIComponent(logininfo.param.adminId),
								token:decodeURIComponent(logininfo.param.token),
								page:1,
								pageSize:10
							}
						},
						info:false,
						searching:true,
						order:[[0, "desc" ],[1, "desc" ]],
						columns: [
							{
								"data":"provider"
							},
							{
								"data":"store"
							},
							{
								"data":"address"
							},
							{
								"data":"createTime"
							},
							{
								"data":"state",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"待审核",
											1:"审核未通过",
											2:"审核通过"
										},
										str='';

									if(stauts===0){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-red1">'+statusmap[stauts]+'</div>';
									}else if(stauts===2){
										str='<div class="g-c-succ">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='',
										state=parseInt(full.state,10);

									if(audit_power&&(state===0||state===1)){
										btns+='<span data-action="audit" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
													<i class="fa-hand-o-up"></i>\
													<span>审核</span>\
												</span>';
									}
									return btns;
								}
							}
						]
					}
				};
			

			/*初始化请求*/
			getColumnData(provider_page,provider_config);


			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_name,$search_store],function(){
					this.val('');
				});
			});
			$admin_search_clear.trigger('click');


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},provider_config.config.ajax.data);

				$.each([$search_name,$search_store],function(){
					var text=this.val(),
						selector=this.selector.slice(1),
						key=selector.split('_');

					if(text===""){
						if(typeof data[key[1]]!=='undefined'){
							delete data[key[1]];
						}
					}else{
						data[key[1]]=text;
					}

				});
				provider_config.config.ajax.data= $.extend(true,{},data);
				getColumnData(provider_page,provider_config);
			});



			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$admin_list_wrap.delegate('span','click',function(e){
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
				if(action==='audit'){
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					/*确认是否启用或禁用*/
					setSure.sure('',function(cf){
						/*to do*/
						setAudit({
							id:id,
							tip:cf.dia||dia
						});
					},"是否审核此供应商?&nbsp;&nbsp;'审核通过后该用户可在平台建立店铺'",true);
				}
			});

		}


		/*获取数据*/
		function getColumnData(page,opt){
			if(table===null){
				table=opt.$admin_list_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}


		/*审核*/
		function setAudit(obj){
			var id=obj.id;

			if(typeof id==='undefined'){
				return false;
			}
			var tip=obj.tip,
				action=obj.action;

			$.ajax({
					url:"../../json/provider/mall_provider_list.json",
					dataType:'JSON',
					method:'post',
					data:{
						id:id,
						type:action,
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							tip.close();
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
						},2000);
						return false;
					}
					/*是否是正确的返回数据*/
					/*添加高亮状态*/
					tip.content('<span class="g-c-bs-success g-btips-succ">'+(action==="up"?'启用':'禁用')+'成功</span>').show();
					setTimeout(function () {
						tip.close();
						setTimeout(function () {
							operate_item=null;
							/*请求数据*/
							getColumnData(provider_page,provider_config);
						},1000);
					},1000);
				})
				.fail(function(resp){
					console.log(resp.message);
					tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						tip.close();
						if(operate_item){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						}
					},2000);
				});
		}






	});


})(jQuery);