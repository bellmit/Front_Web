/*admin_profit:分润管理*/
(function($){
	'use strict';
	$(function(){

		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.24.226.70:8081/yttx-agentbms-api/module/menu',
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
				profit_power=public_tool.getKeyPower('其它设置',powermap);

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
				$profit_edit_form2=$('#profit_edit_form2')/*编辑表单*/,
				$profit_edit_form3=$('#profit_edit_form3')/*编辑表单*/,
				$profit_setting_wrap0=$('#profit_setting_wrap0')/*分润设置容器*/,
				$profit_setting_wrap1=$('#profit_setting_wrap1')/*分润设置容器*/,
				$profit_setting_wrap2=$('#profit_setting_wrap2')/*分润设置容器*/,
				$profit_setting_wrap3=$('#profit_setting_wrap3')/*分润设置容器*/,
				$profit_a0=$('#profit_a0')/*A级*/,
				$profit_aa0=$('#profit_aa0')/*AA级*/,
				$profit_aaa0=$('#profit_aaa0')/*AAA级*/,
				$profit_a1=$('#profit_a1')/*A级*/,
				$profit_aa1=$('#profit_aa1')/*AA级*/,
				$profit_aaa1=$('#profit_aaa1')/*AAA级*/,
				$profit_a2=$('#profit_a2')/*A级*/,
				$profit_aa2=$('#profit_aa2')/*AA级*/,
				$profit_aaa2=$('#profit_aaa2')/*AAA级*/,
				$profit_a3=$('#profit_a3')/*A级*/,
				$profit_aa3=$('#profit_aa3')/*AA级*/,
				$profit_aaa3=$('#profit_aaa3')/*AAA级*/,
				$profit_maxsales=$('#profit_maxsales'),
				$profit_maxacq=$('#profit_maxacq'),
				profit_maxsales='',
				profit_maxacq='';


			/*设置分润权限*/
			if(profit_power){
				$profit_setting_wrap0.removeClass('g-d-hidei');
				$profit_setting_wrap1.removeClass('g-d-hidei');
				$profit_setting_wrap2.removeClass('g-d-hidei');
				$profit_setting_wrap3.removeClass('g-d-hidei');
			}



			/*查询分润设置情况*/
			$.ajax({
				url:'http://120.24.226.70:8081/yttx-agentbms-api/agent/default/profits',
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
						public_tool.clear();
						public_tool.loginTips();
					}
					console.log(resp.message);
					return false;
				}
				var result=resp.result;

				if(!$.isEmptyObject(result)){
					var sales=result.agentSalesProfit,
						acq=result.agentAcquiringProfit;

					if(sales){
						profit_maxsales=sales.topProfit;
						$profit_maxsales.html(profit_maxsales);

						$profit_edit_form0.attr({
							'data-setting':'true'
						});

						$profit_a0.attr({
							'data-value':sales.agentProfit1
						}).val(sales.agentProfit1);
						$profit_aa0.attr({
							'data-value':sales.agentProfit2
						}).val(sales.agentProfit2);
						$profit_aaa0.attr({
							'data-value':sales.agentProfit3
						}).val(sales.agentProfit3);



					}
					if(acq){
						profit_maxacq=acq.topProfit;
						$profit_maxacq.html(profit_maxacq);

						$profit_edit_form1.attr({
							'data-setting':'true'
						});

						$profit_a1.attr({
							'data-value':acq.agentProfit1
						}).val(acq.agentProfit1);
						$profit_aa1.attr({
							'data-value':acq.agentProfit2
						}).val(acq.agentProfit2);
						$profit_aaa1.attr({
							'data-value':acq.agentProfit3
						}).val(acq.agentProfit3);
					}

				}else {
					$profit_maxsales.html('');
					$profit_maxacq.html('');
					$profit_edit_form0.attr({
						'data-setting':'false'
					});
					$profit_edit_form1.attr({
						'data-setting':'false'
					});
				}

			}).fail(function(resp){
				$profit_maxsales.html('');
				$profit_maxacq.html('');
				$profit_edit_form0.attr({
					'data-setting':'false'
				});
				$profit_edit_form1.attr({
					'data-setting':'false'
				});
			});




			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt0={},
					form_opt1={},
					form_opt2={},
					form_opt3={},
					formcache=public_tool.cache,
					defconfig={
						method: 'POST',
						dataType: 'json',
						data:{
							adminId: decodeURIComponent(logininfo.param.adminId),
							token: decodeURIComponent(logininfo.param.token)
						}
					};

				if(formcache.form_opt_0 && formcache.form_opt_1 && formcache.form_opt_2 && formcache.form_opt_3){
					$.each([formcache.form_opt_0,formcache.form_opt_1,formcache.form_opt_2,formcache.form_opt_3],function(index){
						$.extend(true,(function(index){
							var opt;
							if(index===0){
								opt=form_opt0;
							}else if(index===1){
								opt=form_opt1;
							}else if(index===2){
								opt=form_opt2;
							}else if(index===3){
								opt=form_opt3;
							}
							return opt;
						})(index),(function(index){
							var opt;
							if(index===0){
								opt=formcache.form_opt_0;
							}else if(index===1){
								opt=formcache.form_opt_1;
							}else if(index===2){
								opt=formcache.form_opt_2;
							}else if(index===3){
								opt=formcache.form_opt_3;
							}
							return opt;
						})(index),{
							submitHandler: function(form){
								if(index===0){
									var config1= $.extend(true,{},defconfig);
									var ele_a=$profit_a0.val(),
										ele_aa=$profit_aa0.val(),
										ele_aaa=$profit_aaa0.val();
									/*规则通过后校验*/
									config1['url']="http://120.24.226.70:8081/yttx-agentbms-api/agent/profit/default";
									config1['data']= {
										type:1,
										agentProfit1: ele_a,
										agentProfit2: ele_aa,
										agentProfit3: ele_aaa,
										topProfit:profit_maxsales
									};
								}else if(index===1){
									var config1= $.extend(true,{},defconfig);
									var ele_a=$profit_a1.val(),
										ele_aa=$profit_aa1.val(),
										ele_aaa=$profit_aaa1.val();
									config1['url']="http://120.24.226.70:8081/yttx-agentbms-api/agent/profit/default";
									config1['data']= {
										type:2,
										agentProfit1: ele_a,
										agentProfit2: ele_aa,
										agentProfit3: ele_aaa,
										topProfit:profit_maxacq
									};
								}else if(index===2){
									var config2= $.extend(true,{},defconfig);
									var ele_a=$profit_a2.val(),
										ele_aa=$profit_aa2.val(),
										ele_aaa=$profit_aaa2.val();
									config2['url']="http://120.24.226.70:8081/yttx-agentbms-api/servicestation/profit/default";
									config2['data']= {
										type:1,
										distributorProfit1: ele_a,
										distributorProfit2: ele_aa,
										distributorProfit3: ele_aaa
									};
								}else if(index===3){
									var config2= $.extend(true,{},defconfig);
									var ele_a=$profit_a3.val(),
										ele_aa=$profit_aa3.val(),
										ele_aaa=$profit_aaa3.val();
									config2['url']="http://120.24.226.70:8081/yttx-agentbms-api/servicestation/profit/default";
									config2['data']= {
										type:2,
										distributorProfit1: ele_a,
										distributorProfit2: ele_aa,
										distributorProfit3: ele_aaa
									};
								}
								var temp_a=parseInt(ele_a * 1000,10),
									temp_aa=parseInt(ele_aa * 1000,10),
									temp_aaa=parseInt(ele_aaa * 1000,10);

								/*设置分润规则*/
								if(isNaN(temp_a)||isNaN(temp_aa)||isNaN(temp_aaa)){
									dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置数据非法值</span>').show();
									return false;
								}

								if(index===0&&profit_maxsales!==''){
									var tempmaxsales=profit_maxsales * 1000;
									if(temp_a>tempmaxsales||temp_aa>tempmaxsales||temp_aaa>tempmaxsales){
										dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置数据不能大于 "'+tempmaxsales/1000+' "</span>').show();
										return false;
									}
									/*if((temp_a+temp_aa+temp_aaa)!==profit_maxsales){
										dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置总和应和 "'+profit_maxsales+'" 相等</span>').show();
										return false;
									}*/
								}


								if(index===1&&profit_maxacq!==''){
									var tempmaxacq=profit_maxacq * 1000;
									if(temp_a>tempmaxacq||temp_aa>tempmaxacq||temp_aaa>tempmaxacq){
										dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置数据不能大于 "'+tempmaxacq/1000+'" </span>').show();
										return false;
									}
									/*if((temp_a+temp_aa+temp_aaa)!==profit_maxacq){
										dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置总和应和 "'+profit_maxacq+'" 相等</span>').show();
										return false;
									}*/
								}


								if((index===0&&$profit_edit_form0.attr('data-setting')==='true')||(index===1&&$profit_edit_form1.attr('data-setting')==='true')){
									dialogObj.setFn(function(){
										var self=this;
										$.ajax(config1)
											.done(function(resp){
												var code=parseInt(resp.code,10);
												if(code!==0){
													console.log(resp.message);
													self.content('<span class="g-c-bs-warning g-btips-warn">设置失败</span>').show();
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
											.fail(function(){
												self.content('<span class="g-c-bs-warning g-btips-warn">操作失败</span>').show();
												setTimeout(function () {
													self.close();
												},2000)

											});
									},'admin_delete');
									//确认删除
									dialogObj.dialog.content('<span class="g-c-bs-warning g-btips-warn">您已经设置了此数据，是否真要重新设置？</span>').showModal();


								}else{

									$.ajax(config2)
										.done(function(resp){
											var code=parseInt(resp.code,10);
											if(code!==0){
												console.log(resp.message);
												dia.content('<span class="g-c-bs-warning g-btips-warn">设置失败</span>').show();
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
										.fail(function(){
											dia.content('<span class="g-c-bs-warning g-btips-warn">操作失败</span>').show();
											setTimeout(function () {
												dia.close();
											},2000)

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
				$profit_edit_form2.validate(form_opt2);
				$profit_edit_form3.validate(form_opt3);
			}


			/*绑定限制*/
			$.each([$profit_a0,$profit_aa0,$profit_aaa0,$profit_a1,$profit_aa1,$profit_aaa1,$profit_a2,$profit_aa2,$profit_aaa2,$profit_a3,$profit_aa3,$profit_aaa3],function(){
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