$(function() {
	/*declare*/
	var login_chelian=$("#login_chelian"),login_tips=$("#login_tips"),nickname_defvalue=$("#nickname_defvalue"),nickname=$("#nickname");
	/*valid info*/
	login_chelian.validate({
		rules : {
			'nickname' : {
				required : true,
				rangelength : [ 2, 50 ]
			},
			'password' : {
				required : true,
				rangelength : [ 5, 16 ]
			},
			'validcode' : {
				required : true
			}
		},
		messages : {
			'nickname' : {
				required : "登录名不能为空",
				rangelength : "登录名长度为2-50个字符"
			},
			'password' : {
				required : "密码不能为空",
				rangelength : "密码长度为5-16个字符"
			},
			'validcode' : {
				required : "验证码不能为空"
			}
		},
		errorPlacement : function(error, element) {
			$("#" + element.attr("id") + "_tips").html(error.text());
		},
		success : function() {
		},
		invalidHandler : function() {
			return false;
		},
		submitHandler : function() {
			popup_alert(object.msg,"undefined","no","have");
			return false;
		}
	});
	/*默认值*/
	if(nickname.val()!="")nickname_defvalue.css({"display":"none"});
	nickname_defvalue.click(function(){
		$(this).css({"display":"none"});
		nickname.focus();	
	});
	nickname.focusin(function(){
		nickname_defvalue.css({"display":"none"});
	});
	nickname.focusout(function(){
		var curtext=$(this).val();
		if(curtext=="")nickname_defvalue.css({"display":"block"});
	});
});