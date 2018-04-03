(function($){
	$(function(){
		/*获取页面元素*/
		var resetpwd_action=$("#resetpwd_action");
		/*验证表单*/
		resetpwd_action.validate({
			rules : {
				'PassWord' : {
					required : true,
					rangelength : [6,12]
				},
				'ValidPassWord' : {
					required : true,
					rangelength : [6,12],
					equalTo : "#resetpwd_pwd"
				}
			},
			messages : {
				'PassWord' : {
					required :"新密码不能为空",
					rangelength :"新密码长度为6-12个字符"
				},
				'ValidPassWord' : {
					required :"确认密码不能为空",
					rangelength :"确认密码长度为6-12个字符",
					equalTo :"确认密码与新密码不一致"
				}
			},
			errorElement:"p",
			errorClass:"tipserror",
			success : function(p){
				p.addClass("tipssucc");
				setTimeout(function(){p.removeClass("tipssucc");},2000);
			},
		});
	});
})(jQuery);