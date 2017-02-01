(function($){
	'use strict';
	$(function(){

		var table=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.76.237.100:8082/mall-buzhubms-api/module/menu',
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
				provideraudit_power=public_tool.getKeyPower('bzw-provider-audit',powermap),
				providersearch_power=public_tool.getKeyPower('bzw-provider-query',powermap);



			/*dom引用和相关变量定义*/
			var $admin_list_wrap=$('#admin_list_wrap')/*表格*/,
				module_id='bzw-provider-audit'/*模块id，主要用于本地存储传值*/,
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
				$show_audit_wrap=$('#show_audit_wrap'),
				$show_audit_header=$('#show_audit_header'),
				admin_audit_form=document.getElementById('admin_audit_form'),
				$audit_radio_tip=$('#audit_radio_tip'),
				$audit_radio_wrap=$('#audit_radio_wrap'),
				$admin_id=$('#admin_id'),
				$audit_action=$('#audit_action'),
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj();


			/*查询对象*/
			var $search_legalName=$('#search_legalName'),
				$search_storeName=$('#search_storeName'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear'),
				$admin_searchwrap=$('#admin_searchwrap');


			/*初始化查询*/
			if(providersearch_power){
				$admin_searchwrap.removeClass('g-d-hidei');
			}




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
							url:"http://120.76.237.100:8082/mall-buzhubms-api/provider/list",
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
								roleId:decodeURIComponent(logininfo.param.roleId),
								adminId:decodeURIComponent(logininfo.param.adminId),
								grade:decodeURIComponent(logininfo.param.grade),
								token:decodeURIComponent(logininfo.param.token),
								auditStatus:0,
								page:1,
								pageSize:10
							}
						},
						info:false,
						searching:true,
						order:[[6, "desc" ],[0, "desc" ]],
						columns: [
							{
								"data":"legalName"
							},
							{
								"data":"storeName"
							},
							{
								"data":"companyName"
							},
							{
								"data":"telephone",
								"render":function(data, type, full, meta ){
									return public_tool.phoneFormat(data);
								}
							},
							{
								"data":"address"
							},
							{
								"data":"isEnabled",
								"render":function(data, type, full, meta ){
									var str='';

									if(!data){
										str='<div class="g-c-gray9">禁用</div>';
									}else if(data){
										str='<div class="g-c-info">启用</div>';
									}
									return str;
								}
							},
							{
								"data":"createTime"
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='';

									if(provideraudit_power){
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
				$.each([$search_legalName,$search_storeName],function(){
					this.val('');
				});
			});
			$admin_search_clear.trigger('click');


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},provider_config.config.ajax.data);

				$.each([$search_legalName,$search_storeName],function(){
					var text=this.val()||this.find(':selected').val(),
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
					showAudit(table.row($tr).data());
				}
			});



			/*绑定关闭详情*/
			$.each([$show_audit_wrap],function () {
				this.on('hide.bs.modal',function(){
					if(operate_item){
						setTimeout(function(){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						},1000);
					}
				});
			});


			/*绑定确定收货单审核*/
			$audit_action.on('click',function () {
				executeAudit();
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


		/*获取审核数据*/
		function showAudit(data) {
			if(typeof data==='undefined'){
				return false;
			}
			admin_audit_form.reset();
			if(!$.isEmptyObject(data)){
				$admin_id.val(data["id"]);


				var str='<tr><td>'+data["legalName"]+'</td><td>'+data["storeName"]+'</td><td>'+data["address"]+'</td><td>'+public_tool.phoneFormat(data["telephone"])+'</td><td><div class="g-c-info">待审核</div></td></tr>';
				$(str).appendTo($show_audit_header.html(''));
				$show_audit_wrap.modal('show',{backdrop:'static'});
			}
		}


		/*审核*/
		function executeAudit() {
			setSure.sure('',function(cf){
				/*是否选择了状态*/
				var applystate=parseInt($audit_radio_wrap.find(':checked').val(),10);
				if(isNaN(applystate)){
					$audit_radio_tip.html('您没有选择审核状态');
					setTimeout(function () {
						$audit_radio_tip.html('');
						$audit_radio_wrap.find('input').eq(0).prop({
							'checked':true
						});
					},2000);
					return false;
				}
				/*是否有id*/
				var id=$admin_id.val();
				if(id===''){
					dia.content('<span class="g-c-bs-warning g-btips-warn">您没有选择需要操作的数据</span>').showModal();
					return false;
				}

				var tip=cf.dia;

				$.ajax({
						url:"http://120.76.237.100:8082/mall-buzhubms-api/provider/operate",
						dataType:'JSON',
						method:'post',
						data:{
							ids:id,
							roleId:decodeURIComponent(logininfo.param.roleId),
							adminId:decodeURIComponent(logininfo.param.adminId),
							grade:decodeURIComponent(logininfo.param.grade),
							token:decodeURIComponent(logininfo.param.token),
							operate:applystate
						}
					})
					.done(function(resp){
						var code=parseInt(resp.code,10);
						if(code!==0){
							console.log(resp.message);
							tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"审核失败")+'</span>').show();
							admin_audit_form.reset();
							setTimeout(function () {
								tip.close();
								if(operate_item){
									operate_item.removeClass('item-lighten');
									operate_item=null;
								}
							},2000);
							return false;
						}
						tip.content('<span class="g-c-bs-success g-btips-succ">审核成功</span>').show();
						operate_item=null;
						getColumnData(provider_page,provider_config);
						setTimeout(function () {
							$show_audit_wrap.modal('hide');
							tip.close();
							admin_audit_form.reset();
						},2000);
					})
					.fail(function(resp){
						console.log(resp.message);
						admin_audit_form.reset();
						tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"审核失败")+'</span>').show();
						setTimeout(function () {
							tip.close();
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
						},2000);
					});
			},"是否审核此供应商?&nbsp;&nbsp;'审核通过后该用户可在平台建立店铺'",true);
		}






	});


})(jQuery);