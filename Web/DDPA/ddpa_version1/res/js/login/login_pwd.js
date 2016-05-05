(function($){
	$(function(){
		/*获取页面元素*/
		var login_forgetpwd=$("#login_forgetpwd"),toemail=$("#toemail"),tophone=$("#tophone"),getcode=$("#getcode"),pwdinfo_close=$("#pwdinfo_close");
		var phonepwd_action=$("#phonepwd_action"),emailpwd_action=$("#emailpwd_action"),resetpwd_action=$("#resetpwd_action");
		/*自定义验证规则*/
		jQuery.validator.addMethod("ischi_phone",function(value,element){
			  var phonecode=/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
			  return this.optional(element)||(phonecode.test(value));
		},"手机号码不正确");
		/*计时器*/
		var codecounts=(function(){var cc=0;return function(){return ++cc;}}());
		var ccount_id=null;
		/*弹出层关闭*/
		pwdinfo_close.live("click",function(){
			$.unblockUI();
			clearInterval(ccount_id);
			ccount_id=null;
		});
		/*通过手机找回密码(默认),手机和邮箱之间的切换*/
		login_forgetpwd.live("click",function(){getPhoneLayer();});
		toemail.live("click",function(){
			clearInterval(ccount_id);
			ccount_id=null;
			$.unblockUI();
			getEmailLayer();
		});
		tophone.live("click",function(){
			clearInterval(ccount_id);
			ccount_id=null;
			$.unblockUI();
			getPhoneLayer();
		});
		/*获取验证码*/
		getcode.removeClass("getcodesel").removeAttr("disabled");
		getcode.live("click",function(){
			var curobj=$(this),regetcode=$("#regetcode");
			var c_count=1;
			curobj.addClass("getcodesel").attr({"disabled":"disabled"});
			ccount_id=setInterval(function(){
				c_count=codecounts();
				c_count<=60?c_count=c_count:c_count=c_count%60;
				regetcode.find("span").text(60-c_count);
				if(c_count==60||c_count==0){
					clearInterval(ccount_id);
					ccount_id=null;
					curobj.removeClass("getcodesel").removeAttr("disabled");
				};
			},1000);
		});

		/*手机表单校验*/
		phonepwd_action.live("click",function(){
			$(this).validate({
				rules : {
					'PhoneNo' : {
						required : true,
						ischi_phone :true
					},
					'ValidCode' : {
						required : true
					}
				},
				messages : {
					'PhoneNo' : {
						required : "手机不能为空",
						ischi_phone :"手机格式不正确"
					},
					'ValidCode' : {
						required : "验证码不能为空"
					}
				},
				errorPlacement : function(error, element) {
					$("#" + element.attr("id") + "_tips").html(error.text());
				},
				success : function(){},
				submitHandler:function(){
					$.unblockUI();
					getResetLayer();
				}
			});
		})
		/*邮箱表单校验*/
		emailpwd_action.live("click",function(){
			$(this).validate({
				rules : {
					'Email' : {
						required : true,
						email :true
					}
				},
				messages : {
					'Email' : {
						required : "邮箱不能为空",
						email :"邮箱格式不正确"
					}
				},
				errorPlacement : function(error, element) {
					$("#" + element.attr("id") + "_tips").html(error.text());
				},
				success : function(){},
				submitHandler:function(){
					window.location.href="http://www.baidu.com";
				}
			});
		})
		/*重置密码表单校验*/
		resetpwd_action.live("click",function(){
			$(this).validate({
				rules : {
					'NewPWD' : {
						required : true,
						rangelength : [4,16]
					},
					'ReNewPWD' : {
						required : true,
						rangelength : [4,16],
						equalTo : "#renewpwd"
					}
				},
				messages : {
					'NewPWD' : {
						required :"新密码不能为空",
						rangelength :"新密码长度必须为4-16之间"
					},
					'ReNewPWD' : {
						required :"新密码确认不能为空",
						rangelength :"新密码确认长度必须为4-16之间",
						equalTo : "新密码与新密码确认必须一致"
					}
				},
				errorPlacement : function(error, element) {
					$("#" + element.attr("id") + "_tips").html(error.text());
				},
				success : function(){},
				submitHandler:function(){
					window.location.href="http://www.sina.com";
				}
			});
		})
	});
})(jQuery);

/*找回密码弹出层封装*/
/*获取手机弹出层*/
function getPhoneLayer(){
	$.blockUI({message:"<div class=\"pwdinfo_wrap\" id=\"pwdinfo_wrap\"><div class=\"pwdinfo_title\"><p>找回密码</p><span id=\"pwdinfo_close\"></span></div><div class=\"pwdinfo_content\"><form method=\"post\" action=\"#\" id=\"phonepwd_action\"><table><colgroup><col class=\"pwd_cg1\"/><col class=\"pwd_cg2\"/></colgroup><tr><td><label for=\"phoneno\">手机号：</label></td><td><input type=\"text\" class=\"phoneno\" name=\"PhoneNo\" id=\"phoneno\" placeholder=\"请输入常用手机号\"/></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"phoneno_tips\"></p></td></tr><tr><td><label for=\"validcode\">验证码：</label></td><td><input type=\"text\" class=\"validcode\" name=\"ValidCode\" id=\"validcode\"/><button type=\"button\" class=\"getcode\" id=\"getcode\">获取验证码</button><p class=\"regetcode\" id=\"regetcode\"><span>60</span>秒后重新获取</p></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"validcode_tips\"></p></td></tr><tr><td></td><td><p class=\"changeway\" id=\"toemail\">使用邮箱找回密码</p></td></tr><tr><td></td><td><input type=\"submit\" id=\"phonefindpwd\" value=\"提&nbsp;&nbsp;交\" class=\"pwd_btn\"/></td></tr></table></form></div></div>"});	
}
/*获取邮箱弹出层*/
function getEmailLayer(){
	$.blockUI({message:"<div class=\"pwdinfo_wrap\" id=\"pwdinfo_wrap\"><div class=\"pwdinfo_title\"><p>找回密码</p><span id=\"pwdinfo_close\"></span></div><div class=\"pwdinfo_content\"><form method=\"post\" action=\"#\" id=\"emailpwd_action\"><table><colgroup><col class=\"pwd_cg1\"/><col class=\"pwd_cg2\"/></colgroup><tr><td><label for=\"email\">邮箱名：</label></td><td><input type=\"text\" class=\"email\" name=\"Email\" id=\"email\" placeholder=\"请输入常用邮箱名\"/></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"email_tips\"></p></td></tr><tr><td></td><td><p class=\"changeway\" id=\"tophone\">使用手机号找回密码</p></td></tr><tr><td></td><td><input type=\"submit\" id=\"emailfindpwd\" value=\"提&nbsp;&nbsp;交\" class=\"pwd_btn\"/></td></tr></table></form></div></div>"});	
}
/*获取重置密码弹出层*/
function getResetLayer(){
	$.blockUI({message:"<div class=\"pwdinfo_wrap\" id=\"pwdinfo_wrap\"><div class=\"pwdinfo_title\"><p>重置密码</p><span id=\"pwdinfo_close\"></span></div><div class=\"pwdinfo_content\"><form method=\"post\" action=\"#\" id=\"resetpwd_action\"><table><colgroup><col class=\"pwd_cg1\"/><col class=\"pwd_cg2\"/></colgroup><tr><td><label for=\"newpwd\">新密码：</label></td><td><input type=\"password\" class=\"newpwd\" name=\"NewPWD\" id=\"newpwd\" placeholder=\"请输入新密码\"/></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"newpwd_tips\"></p></td></tr><tr><td><label for=\"renewpwd\">密码确认：</label></td><td><input type=\"password\" class=\"newpwd\" name=\"ReNewPWD\" id=\"renewpwd\" placeholder=\"请输入新密码确认\"/></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"renewpwd_tips\"></p></td></tr><tr><td></td><td><input type=\"submit\" id=\"resetpwd\" value=\"确&nbsp;&nbsp;定\" class=\"pwd_btn\"/></td></tr></table></form></div></div>"});
}