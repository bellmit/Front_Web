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
				enabled_power=public_tool.getKeyPower('user-enabled',powermap),
				edit_power=public_tool.getKeyPower('user-update',powermap);



			/*dom引用和相关变量定义*/
			var $admin_list_wrap=$('#admin_list_wrap')/*表格*/,
				module_id='mall-user-list'/*模块id，主要用于本地存储传值*/,
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
				$admin_goodsOrderId=$('#admin_goodsOrderId'),
				$show_send_wrap=$('#show_send_wrap'),
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj();


			/*查询对象*/
			var $search_Name=$('#search_Name'),
				$search_telePhone=$('#search_telePhone'),
				$search_userType=$('#search_userType'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');




			/*列表请求配置*/
			var user_page={
					page:1,
					pageSize:10,
					total:0
				},
				user_config={
					$admin_list_wrap:$admin_list_wrap,
					$admin_page_wrap:$admin_page_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:"../../json/user/mall_user_list.json",
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
								user_page.page=result.page;
								user_page.pageSize=result.pageSize;
								user_page.total=result.count;
								/*分页调用*/
								$admin_page_wrap.pagination({
									pageSize:user_page.pageSize,
									total:user_page.total,
									pageNumber:user_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=user_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										user_config.config.ajax.data=param;
										getColumnData(user_page,user_config);
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
						order:[[3, "desc" ],[4, "desc" ]],
						columns: [
							{
								"data":"nickName"
							},
							{
								"data":"Name"
							},
							{
								"data":"telePhone",
								"render":function(data, type, full, meta ){
									return public_tool.phoneFormat(data);
								}
							},
							{
								"data":"createTime"
							},
							{
								"data":"lastLoginTime"
							},
							{
								"data":"loginCount"
							},
							{
								"data":"userType",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"普通用户",
											1:"供应商",
											2:"其他"
										},
										str='';

									if(stauts===0){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}else{
										str='<div class="g-c-gray9">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"isAdmin",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"不是",
											1:"是"
										},
										str='';

									if(stauts===0){
										str='<div class="g-c-gray9">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"isEnabled",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"禁用",
											1:"启用"
										},
										str='';

									if(stauts===0){
										str='<div class="g-c-gray9">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='',
										state=parseInt(full.isEnabled,10);

									if(edit_power&&state===1){
										btns+='<span data-action="edit" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
										<i class="fa-pencil"></i>\
										<span>编辑</span>\
										</span>';
									}
									if(enabled_power){
										if(state===0){
											/*禁用状态则启用*/
											btns+='<span data-action="up" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
												<i class="fa-arrow-up"></i>\
												<span>启用</span>\
											</span>';
										}else if(state===1){
											/*启用状态则禁用*/
											btns+='<span data-action="down" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
												<i class="fa-arrow-down"></i>\
												<span>禁用</span>\
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
			getColumnData(user_page,user_config);


			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_Name,$search_telePhone,$search_userType],function(){
					var selector=this.selector;
					if(selector.indexOf('userType')!==-1){
						this.find(':selected').prop({
							'selected':false
						});
					}else{
						this.val('');
					}
				});
			});
			$admin_search_clear.trigger('click');


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},user_config.config.ajax.data);

				$.each([$search_Name,$search_telePhone,$search_userType],function(){
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
				user_config.config.ajax.data= $.extend(true,{},data);
				getColumnData(user_page,user_config);
			});


			/*格式化手机号码*/
			$.each([$search_telePhone],function(){
				this.on('keyup',function(){
					var phoneno=this.value.replace(/\D*/g,'');
					if(phoneno===''){
						this.value='';
						return false;
					}
					this.value=public_tool.phoneFormat(this.value);
				});
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
				if(action==='edit'){
					public_tool.setParams('mall-user-add',id);
					window.location.href='mall-user-add.html';
				}else if(action==='up'||action==='down'){
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');

					var actionkey='';
					if(action==='up'){
						/*启用*/
						actionkey='启用';
					}else if(action==='down'){
						/*禁用*/
						actionkey='禁用';
					}


					/*确认是否启用或禁用*/
					setSure.sure(actionkey,function(cf){
						/*to do*/
						var tip=cf.dia||dia;
						setEnabled(id,action,tip);
					});
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


		/*启用禁用*/
		function setEnabled(id,type,tips){
			if(typeof id==='undefined'){
				return false;
			}
			tips.content('<span class="g-c-bs-success g-btips-succ">'+actionkey+'成功</span>').show();
			setTimeout(function () {
				tips.close();
			},2000);
			$.ajax({
					url:"../../json/user/mall_user_list.json",
					dataType:'JSON',
					method:'post',
					data:{
						inboundId:id,
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						tips.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							tips.close();
						},2000);
						return false;
					}
					/*是否是正确的返回数据*/
					var result=resp.result;
					if(!result){
						return false;
					}

					/*判断是否是审核状态*/
					var state=parseInt(result["auditState"],10),
						statemap={
							0:'待审核',
							1:'审核通过',
							2:'审核未通过'
						};
					if(state===0||state===2){
						$show_detail_action.removeClass('g-d-hidei');
					}else{
						$show_detail_action.addClass('g-d-hidei');
					}

					/*设置值*/
					$admin_id.val(id);
					$('<tr>\
						<td>'+(result["inboundNumber"]||'')+'</td>\
						<td>'+(result["inboundTime"]||'')+'</td>\
						<td>'+(result["warehouseName"]||'')+'</td>\
						<td>'+(result["providerName"]||'')+'</td>\
						<td>'+(result["remark"]||'')+'</td>\
						'+(function () {
							if(state===0){
								return '<td data-id="'+state+'" class="g-c-bs-info">'+statemap[state]+'</td>';
							}else if(state===1){
								return '<td data-id="'+state+'" class="g-c-bs-success">'+statemap[state]+'</td>';
							}else if(state===2){
								return '<td data-id="'+state+'" class="g-c-gray10">'+statemap[state]+'</td>';
							}else{
								return '<td data-id="-1" class="g-c-red2">异常</td>';
							}
						}())+'</tr>').appendTo($show_detail_content.html(''));



					var list=result['detailsList'],
						str='',
						i=0;

					if(list){
						var len=list.length;
						if(len!==0){
							for(i;i<len;i++){
								var tempstorage=list[i];
								str+='<tr>\
								<td>'+parseInt(i+1,10)+'</td>\
								<td>'+tempstorage["goodsId"]+'</td>\
								<td>'+tempstorage["goodsName"]+'</td>\
								<td>'+tempstorage["attributeName"]+'</td>\
								<td>'+tempstorage["quantity"]+'</td>\
								</tr>';
							}
							$(str).appendTo($show_detail_list.html(''));
						}
					}else{
						$show_detail_content.html('');
						$show_detail_list.html('');
					}
					/*添加高亮状态*/
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					$show_detail_wrap.modal('show',{backdrop:'static'});
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