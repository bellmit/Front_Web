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
			var url = $('form:first').attr('action');
			var params = $('form:first').serialize();
			$.ajax({
				type : 'post',
				url : url,
				data : params,
				dataType : 'json',
				success : function(data) {
					var object = eval("(" + data.rs + ")");
					if (object.success) {
						var success_str=$("#contextPath").val() + "/carfri/user_index?pk=" + new Date().getTime();
						setTimeout(function(){window.location.href=success_str},10);
					} else {
						/*
						popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						popup_alert(object.msg,"undefined","no","have");
						/*重新刷新验证码*/
						$("#validateImg").click();
					}
				}
			});
			return false;
		}
	});
	/**
	 * 处理随机验证码，点击时更换验证码操作
	 */
	$("#validateImg").click(function() {
		var path = $("#contextPath").val();
		var v = new Date().getTime();
		$(this).attr("src", path + "/code?v=" + v);
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