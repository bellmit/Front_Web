$(function(){
		var user_mobilebtn=$("#user_mobilebtn"),bindingmobile=$("#bindingmobile"),bindingmobile_tips=$("#bindingmobile_tips"),code=$("#code"),getCode=$("#getCode"),countdown=60;
		/*phone*/
		jQuery.validator.addMethod("ischi_phone",function(value,element){
				  var phonecode=/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
				  return this.optional(element)||(phonecode.test(value));
		},"手机号码不正确");
		/*获取验证码*/
		getCode.click(function(){
			settime($(this));
		})
		/*倒计时*/
		function settime(val){
			var t=setTimeout(function(){settime(val)},1000);
			if(countdown == 0){
				val.removeAttr("disabled");
				val.val("免费获取验证码");
				countdown = 60;
				clearTimeout(t);
			}else{
				val.attr("disabled","disabled");
				val.val("重新发送(" + countdown + ")");
				countdown--;
			}
		}
		/*校验核心方法*/
		var userMoblie = {
			run:function(){
				this._init_();
				this._bind_event_();
				this._start_();
			},
			
			_init_:function(){
				this.contextPath = $("#contextPath").val();	
				this._validate();
			},
			
			_bind_event_:function(){
				var me = this;
				$("#getCode").click(function(){
					 me._getSmsCode();
				});
				
			},
			_start_:function(){
				
			},
			_getSmsCode:function(){ 
				var me = this;
				var data = {bindingmobile:$("#bindingmobile").val(),friendid:$("#friendid").val()};
				var url = me.contextPath +"/carfri/getSmscode";
				$.post(url,data);
			},
			_validate:function(){
				var me = this,getCode=$("#getCode"),moileForm = $("#mobileForm");
				moileForm.validate({
					rules : {
						'bindingmobile' : {
							required:true,
							ischi_phone:true,
							remote:{
								url:me.contextPath+"/carfri/doCheckMobileByCar",
								type:"post",
								data:{
									bindingmobile : function(){
										return $("#bindingmobile").val();
									},friendid:function(){
										return $("#friendid").val();
									}
								}
							}
						},
						'code': {
							required : true,
							rangelength : [ 4,4 ],
							remote:{
								url: me.contextPath + "/carfri/doCheckSmsCode",
								type: "post",
								data:{
									bindingmobile : function(){
										return $("#bindingmobile").val();
									},
									friendid:function(){
										return $("#friendid").val();
									},
									code:function(){
										return $("#code").val();
									}
								}
							}
						}
					},
					messages : {
						'bindingmobile' : {
							required:"手机号不能为空",
							ischi_phone:"手机号不正确",
							remote:"该号码已被使用,请更换"
						},
						'code': {
							required :"验证码不能为空",
							rangelength:"请输入正确的验证码",
							remote:"验证码不正确,请重新输入"
						}
					},
					errorPlacement : function(error, element) {
						$("#" + element.attr("name") + "_tips").html(error.text());
						/*手机号码不符合数据规范的情况*/
						if(element.attr("name")=="bindingmobile"||element.attr("name")=="code"){
							getCode.attr({"disabled":"disabled"});
						}
					},
					success : function()
					{   
						if(bindingmobile_tips.text()!=""||getCode.attr("disabled")==""){
							getCode.attr({"disabled":"disabled"});
						}else if(getCode.val()!="免费获取验证码"&&getCode.attr("disabled")=="disabled"){
							getCode.attr({"disabled":"disabled"});
						}else{
							getCode.removeAttr("disabled");
						}
					},
					invalidHandler : function() {
						return false;
					},
					submitHandler:function(){
						var url = me.contextPath+"/carfri/doUpdateMobile";
						$.post(url,moileForm.serialize(),function(response){
							var object = eval("(" + response.rs + ")");
							if (object.success) {
								/*
								popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
								argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
								*/
								var success_str=me.contextPath+"/carfri/user_mobile";
								popup_alert(object.msg,success_str,"yes","have");
							}else{
								/*
								popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
								argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
								*/
								popup_alert("验证码无效,请重新获取!","undefined","no","none");
							}
						},'json');
					}
				});
			}
		};
		/*初始化*/
		userMoblie.run();
});