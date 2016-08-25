/*admin_profit:分润管理*/
(function($){
	'use strict';
	$(function(){

		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://10.0.5.222:8080/yttx-agentbms-api/module/menu',
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
				});

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
				$profit_aaa3=$('#profit_aaa3')/*AAA级*/;


			/*设置分润权限*/
			if(profit_power){
				$profit_setting_wrap0.removeClass('g-d-hidei');
				$profit_setting_wrap1.removeClass('g-d-hidei');
				$profit_setting_wrap2.removeClass('g-d-hidei');
				$profit_setting_wrap3.removeClass('g-d-hidei');
			}




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
								var config= $.extend(true,{},defconfig);
								if(index===0){
									var ele_a=$profit_a0.val(),
										ele_aa=$profit_aa0.val(),
										ele_aaa=$profit_aaa0.val();
									/*规则通过后校验*/
									config['url']="http://10.0.5.222:8080/yttx-agentbms-api/agent/profit/default";
									config['data']= {
										type:1,
										distributorProfit1: ele_a,
										distributorProfit2: ele_aa,
										distributorProfit3: ele_aaa
									};
								}else if(index===1){
									var ele_a=$profit_a1.val(),
										ele_aa=$profit_aa1.val(),
										ele_aaa=$profit_aaa1.val();
									config['url']="http://10.0.5.222:8080/yttx-agentbms-api/agent/profit/default";
									config['data']= {
										type:2,
										distributorProfit1: ele_a,
										distributorProfit2: ele_aa,
										distributorProfit3: ele_aaa
									};
								}else if(index===2){
									var ele_a=$profit_a2.val(),
										ele_aa=$profit_aa2.val(),
										ele_aaa=$profit_aaa2.val();
									config['url']="http://10.0.5.222:8080/yttx-agentbms-api/servicestation/profit/default";
									config['data']= {
										type:1,
										distributorProfit1: ele_a,
										distributorProfit2: ele_aa,
										distributorProfit3: ele_aaa
									};
								}else if(index===3){
									var ele_a=$profit_a3.val(),
										ele_aa=$profit_aa3.val(),
										ele_aaa=$profit_aaa3.val();
									config['url']="http://10.0.5.222:8080/yttx-agentbms-api/servicestation/profit/default";
									config['data']= {
										type:2,
										distributorProfit1: ele_a,
										distributorProfit2: ele_aa,
										distributorProfit3: ele_aaa
									};
								}
								var temp_a=parseInt(ele_a * 10000,10) / 10000,
									temp_aa=parseInt(ele_aa * 10000,10) / 10000,
									temp_aaa=parseInt(ele_aaa * 10000,10) / 10000;

								/*设置分润规则*/
								if(isNaN(temp_a)||isNaN(temp_aa)||isNaN(temp_aaa)){
									dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置数据非法值</span>').show();
									return false;
								}
								if((temp_a===0||temp_a>=100)||(temp_aa===0||temp_aa>=100)||(temp_aaa===0||temp_aaa>=100)){
									dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置数据不能大于100或为0</span>').show();
									return false;
								}else if((temp_a+temp_aa+temp_aaa)>100){
									dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置总和不能大于100</span>').show();
									return false;
								}else if((temp_a+temp_aa+temp_aaa)<100){
									dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置总和应为100</span>').show();
									return false;
								}



								$.ajax(config)
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