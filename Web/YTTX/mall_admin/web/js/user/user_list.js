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
				var isphone=public_tool.isMobilePhone,
					phoneformat=public_tool.phoneFormat;
				this.on('keyup focusout',function(e){
					var etype=e.type;
					if(etype==='keyup'){

					}else if(etype==='keyup'){

					}
					var phoneno=this.value.replace(/\D*/g,'');
					if(phoneno==''){
						this.value='';
						return false;
					}
					if(isphone(phoneno)){

					}
					this.value=public_tool.phoneFormat(this.value);
				});
				this.on()
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
				if(action==='send'&&id!==''){
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					$admin_goodsOrderId.val(id);
					$show_send_wrap.modal('show',{
						backdrop:'static'
					});
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
								$.ajax({
										url:"http://120.76.237.100:8082/mall-agentbms-api/goodsorder/details",
										dataType:'JSON',
										method:'post',
										data:{
											id:id,
											adminId:decodeURIComponent(logininfo.param.adminId),
											token:decodeURIComponent(logininfo.param.token),
											grade:decodeURIComponent(logininfo.param.grade)
										}
									})
									.done(function(resp){
										var code=parseInt(resp.code,10),
											isok=false;
										if(code!==0){
											console.log(resp.message);
											isok=false;
										}
										/*是否是正确的返回数据*/
										var result=resp.result;
										if(!result){
											isok=false;
										}else{
											var list=result.list;
											if(!list){
												isok=false;
											}else{
												isok=true;
											}
										}

										if(!isok){
											tabletr.child($('<tr><td colspan="6"><table class="table table-bordered table-striped table-hover admin-table" ><tbody class="middle-align"><tr><td class="g-t-c" colspan="5">("暂无数据")</td></tr></tbody></table></td></tr>')).show();
											$this.attr({
												'data-subitem':'true'
											}).children('i').addClass('fa-angle-down');
											return false;
										}

										var i= 0,
											newstr='<colgroup>\
												<col class="g-w-percent5">\
												<col class="g-w-percent5">\
												<col class="g-w-percent5">\
												<col class="g-w-percent5">\
												<col class="g-w-percent5">\
												<col class="g-w-percent5">\
												<col class="g-w-percent5">\
												<col class="g-w-percent15">\
											</colgroup>\
											<thead>\
												<tr>\
													<th>买家名称</th>\
													<th>联系电话</th>\
													<th>所在地址</th>\
													<th>收货人姓名</th>\
													<th>收货人电话</th>\
													<th>物流费用</th>\
													<th>总计(包含运费)</th>\
													<th>买家留言</th>\
												</tr>\
												<tr>'+(function () {
													var panelstr='<td>'+(result["customerName"]||"")+'</td>\
														<td>'+(public_tool.phoneFormat(result["customerPhone"])||"")+'</td>\
														<td>'+(result["customerAddress"]||"")+'</td>\
														<td>'+(result["consigneeName"]||"")+'</td>\
														<td>'+(result["consigneePhone"]||"")+'</td>\
														<td>￥'+(public_tool.moneyCorrect(result["freight"],12,true)[0]||"0.00")+'</td>\
														<td>￥'+(public_tool.moneyCorrect(result["totalMoney"],12,true)[0]||"0.00")+'</td>\
														<td>'+(result["remark"]||"")+'</td>';
													return panelstr;
												}())+'</tr>\
												<tr>\
													<th colspan="4">商品名称</th>\
													<th>批发价</th>\
													<th>购买数量</th>\
													<th colspan="2">商品属性</th>\
												</tr>\
											</thead>',
											res='',
											len=list.length;

										if(len!==0){
											for(i;i<len;i++){
												res+='<tr><td colspan="4">'+(list[i]["goodsName"]||"")+'</td><td>￥'+(public_tool.moneyCorrect(list[i]["wholesalePrice"],12,true)[0]||"0.00")+'</td><td>'+(list[i]["quantlity"]||"0")+'</td><td colspan="2">'+(list[i]["attributeName"]||"")+'</td></tr>';

											}
										}
										res='<tbody class="middle-align">'+res+'</tbody>';
										newstr='<tr><td colspan="6"><table class="table table-bordered table-striped table-hover admin-table" >'+newstr+res+'</table></td></tr>';

										var $newtr=$(newstr);
										tabletr.child($newtr).show();
										$this.attr({
											'data-subitem':'true'
										}).children('i').addClass('fa-angle-down');

									})
									.fail(function(resp){
										console.log(resp.message);
									});
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
				table=opt.$admin_list_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}






	});


})(jQuery);