/*admin_profit:分润管理*/
(function($){
	'use strict';
	$(function(){

		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.76.237.100:8081/mall-agentbms-api/module/menu',
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
				profit_power=public_tool.getKeyPower('mall-other-set',powermap);

			/*dom引用和相关变量定义*/
			var module_id='admin_profit'/*模块id，主要用于本地存储传值*/,
				dia=dialog({
					title:'温馨提示',
					okValue:'确定',
					width:300,
					ok:function(){
						this.close();
						return false;
					},
					cancel:false
				}),
				dialogObj=public_tool.dialog()/*回调提示对象*/;

			/*表单对象*/
			var $profit_edit_form0=$('#profit_edit_form0')/*编辑表单*/,
				$profit_edit_form1=$('#profit_edit_form1')/*编辑表单*/,
				$profit_setting_wrap0=$('#profit_setting_wrap0')/*分润设置容器*/,
				$profit_setting_wrap1=$('#profit_setting_wrap1')/*分润设置容器*/,
				$profit_a0=$('#profit_a0')/*A级*/,
				$profit_aa0=$('#profit_aa0')/*AA级*/,
				$profit_aaa0=$('#profit_aaa0')/*AAA级*/,
				$profit_a1=$('#profit_a1')/*A级*/,
				$profit_aa1=$('#profit_aa1')/*AA级*/,
				$profit_aaa1=$('#profit_aaa1')/*AAA级*/;


			/*设置分润权限*/
			if(profit_power){
				$profit_setting_wrap0.removeClass('g-d-hidei');
				$profit_setting_wrap1.removeClass('g-d-hidei');
			}



			/*查询分润设置情况*/
			$.ajax({
				url:'http://120.76.237.100:8081/mall-agentbms-api/profits',
				type:'post',
				data:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			}).done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.loginTips(function () {
							public_tool.clear();
							public_tool.clearCacheData();
						});
						return false;
					}
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					return false;
				}
				var result=resp.result;

				if(!$.isEmptyObject(result)){
					var platform=result.platformProfitCfg,
						agent=result.agentProfitCfg;

					if(platform){
						
						var i=0;
						for(var k in platform){
							switch(k){
								case 'platformProfit':
									var platformProfit=platform.platformProfit;
									if(platformProfit===''||parseInt(platformProfit * 1000,10)===0){
										i=1;
									}
									$profit_a1.attr({
										'data-value':platformProfit
									}).val(platformProfit);
									break;
								case 'agentProfit':
									var agentProfit=platform.agentProfit;
									if(agentProfit===''||parseInt(agentProfit * 1000,10)===0){
										i=2;
									}
									$profit_aa1.attr({
										'data-value':agentProfit
									}).val(agentProfit);
									break;
								case 'storageProfit':
									var storageProfit=platform.storageProfit;
									if(storageProfit===''||parseInt(storageProfit * 1000,10)===0){
										i=3;
									}
									$profit_aaa1.attr({
										'data-value':storageProfit
									}).val(storageProfit);
									break;
							}
						}

						/*判断设置值是否符合实际*/
						if(i===3){
							$profit_edit_form1.attr({
								'data-setting':''
							});
						}else{
							$profit_edit_form1.attr({
								'data-setting':'true'
							});
						}

					}
					if(agent){
						var j=0;
						for(var m in agent){
							switch(m){
								case 'agentProfit1':
									var agentProfit1=agent.agentProfit1;
									if(agentProfit1===''||parseInt(agentProfit1 * 1000,10)===0){
										j=1;
									}
									$profit_a0.attr({
										'data-value':agentProfit1
									}).val(agentProfit1);
									break;
								case 'agentProfit2':
									var agentProfit2=agent.agentProfit2;
									if(agentProfit2===''||parseInt(agentProfit2 * 1000,10)===0){
										j=2;
									}
									$profit_aa0.attr({
										'data-value':agentProfit2
									}).val(agentProfit2);
									break;
								case 'agentProfit3':
									var agentProfit3=agent.agentProfit3;
									if(agentProfit3===''||parseInt(agentProfit3 * 1000,10)===0){
										j=3;
									}
									$profit_aaa0.attr({
										'data-value':agentProfit3
									}).val(agentProfit3);
									break;
							}
						}

						/*判断设置值是否符合实际*/
						if(j===3){
							$profit_edit_form0.attr({
								'data-setting':''
							});
						}else{
							$profit_edit_form0.attr({
								'data-setting':'true'
							});
						}
					}

				}else {
					$profit_edit_form0.attr({
						'data-setting':''
					});
					$profit_edit_form1.attr({
						'data-setting':''
					});
				}

			}).fail(function(resp){
				$profit_edit_form0.attr({
					'data-setting':''
				});
				$profit_edit_form1.attr({
					'data-setting':''
				});
				dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
				setTimeout(function () {
					dia.close();
				},2000);
			});



			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt0={},
					form_opt1={},
					formcache=public_tool.cache,
					defconfig={
						method: 'POST',
						dataType: 'json',
						data:{
							Id:decodeURIComponent(logininfo.param.roleId),
							adminId:decodeURIComponent(logininfo.param.adminId),
							grade:decodeURIComponent(logininfo.param.grade),
							token:decodeURIComponent(logininfo.param.token)
						}
					};

				if(formcache.form_opt_0 && formcache.form_opt_1){
					$.each([formcache.form_opt_0,formcache.form_opt_1],function(index){
						$.extend(true,(function(index){
							var opt;
							if(index===0){
								opt=form_opt0;
							}else if(index===1){
								opt=form_opt1;
							}
							return opt;
						})(index),(function(index){
							var opt;
							if(index===0){
								opt=formcache.form_opt_0;
							}else if(index===1){
								opt=formcache.form_opt_1;
							}
							return opt;
						})(index),{
							submitHandler: function(form){
								var config1,
									config2,
									ele_a,
									ele_aa,
									ele_aaa;
								if(index===0){
									config1= $.extend(true,{},defconfig);
									ele_a=$profit_a0.val();
									ele_aa=$profit_aa0.val();
									ele_aaa=$profit_aaa0.val();

									/*规则通过后校验*/
									config1['url']="http://120.76.237.100:8081/mall-agentbms-api/profit/agent/addupdate";
									config1['data']= {
										agentProfit1: ele_a,
										agentProfit2: ele_aa,
										agentProfit3: ele_aaa
									};
								}else if(index===1){
									config2= $.extend(true,{},defconfig);
									ele_a=$profit_a1.val();
									ele_aa=$profit_aa1.val();
									ele_aaa=$profit_aaa1.val();

									config2['url']="http://120.76.237.100:8081/mall-agentbms-api/profit/platform/addupdate";
									config2['data']= {
										platformProfit: ele_a,
										agentProfit: ele_aa,
										storageProfit: ele_aaa
									};
								}
								var temp_a=parseInt(ele_a * 1000,10),
									temp_aa=parseInt(ele_aa * 1000,10),
									temp_aaa=parseInt(ele_aaa * 1000,10);

								/*设置分润规则*/
								console.log(ele_a);
								console.log(ele_aa);
								console.log(ele_aaa);
								console.log(isNaN(temp_a));
								console.log(isNaN(temp_aa));
								console.log(isNaN(temp_aaa));
								if(isNaN(temp_a)||isNaN(temp_aa)||isNaN(temp_aaa)){
									dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置数据非法值</span>').show();
									return false;
								}


								if((index===0&&$profit_edit_form0.attr('data-setting')==='true')){
									dialogObj.setFn(function(){
										var self=this;
										$.ajax(config1)
											.done(function(resp){
												var code=parseInt(resp.code,10);
												if(code!==0){
													console.log(resp.message);
													self.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"设置失败")+'</span>').show();
													setTimeout(function () {
														self.close();
													},2000);
													return false;
												}
												self.content('<span class="g-c-bs-success g-btips-succ">设置成功</span>').show();
												setTimeout(function () {
													self.close();
												},2000);
											})
											.fail(function(resp){
												self.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
												setTimeout(function () {
													self.close();
												},2000);

											});
									},'admin_profitagent');
									//确认修改
									dialogObj.dialog.content('<span class="g-c-bs-warning g-btips-warn">您已经设置了此数据，是否真要重新设置？</span>').showModal();
								}else{
									$.ajax(config1)
										.done(function(resp){
											var code=parseInt(resp.code,10);
											if(code!==0){
												console.log(resp.message);
												dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"设置失败")+'</span>').show();
												setTimeout(function () {
													dia.close();
												},2000);
												return false;
											}
											dia.content('<span class="g-c-bs-success g-btips-succ">设置成功</span>').show();
											setTimeout(function () {
												dia.close();
											},2000);
										})
										.fail(function(resp){
											dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
											setTimeout(function () {
												dia.close();
											},2000);

										});
								}

								if((index===1&&$profit_edit_form2.attr('data-setting')==='true')){
									dialogObj.setFn(function(){
										var self=this;
										$.ajax(config2)
											.done(function(resp){
												var code=parseInt(resp.code,10);
												if(code!==0){
													console.log(resp.message);
													self.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"设置失败")+'</span>').show();
													setTimeout(function () {
														self.close();
													},2000);
													return false;
												}
												self.content('<span class="g-c-bs-success g-btips-succ">设置成功</span>').show();
												setTimeout(function () {
													self.close();
												},2000);
											})
											.fail(function(resp){
												self.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
												setTimeout(function () {
													self.close();
												},2000);

											});
									},'admin_profitplatform');
									//确认删除
									dialogObj.dialog.content('<span class="g-c-bs-warning g-btips-warn">您已经设置了此数据，是否真要重新设置？</span>').showModal();
								}else{
									$.ajax(config2)
										.done(function(resp){
											var code=parseInt(resp.code,10);
											if(code!==0){
												console.log(resp.message);
												dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"设置失败")+'</span>').show();
												setTimeout(function () {
													dia.close();
												},2000);
												return false;
											}
											dia.content('<span class="g-c-bs-success g-btips-succ">设置成功</span>').show();
											setTimeout(function () {
												dia.close();
											},2000);
										})
										.fail(function(resp){
											dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
											setTimeout(function () {
												dia.close();
											},2000);
										});
								}
								return false;
							}
						});
					});
				}

				/*提交验证*/
				$profit_edit_form0.validate(form_opt0);
				$profit_edit_form1.validate(form_opt1);
			}


			/*绑定限制*/
			$.each([$profit_a0,$profit_aa0,$profit_aaa0,$profit_a1,$profit_aa1,$profit_aaa1],function(){
				this.on('keyup',function(){
					var val=this.value.replace(/[^0-9*\-*^\.]/g,'');
					if(val.indexOf('.')!==-1){
						val=val.split('.');
						if(val.length>=3){
							val.length=2;
							val=val[0]+'.'+val[1];
						}else{
							val=val.join('.');
						}
					}
					this.value=val;
				});
			});



		}
		
		


	});


})(jQuery);