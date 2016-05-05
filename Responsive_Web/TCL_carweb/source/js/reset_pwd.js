$(function() {
	$("#resetpwd_chelian").validate({
		rules : {
			'password' : {
				required : true,
				rangelength : [ 6, 16 ]
			},
			'renew_pwd' : {
				required : true,
				equalTo : "#password"
			}
		},
		messages : {
			'password' : {
				required : "新密码不能为空",
				rangelength : "新密码长度为6-16个字符"
			},
			'renew_pwd' : {
				required : "确认密码不能为空",
				equalTo : "确认密码与新密码不一致"
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
						/*
						popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						var success_str=$("#contextPath").val() + "/friend/login?pk=" + new Date().getTime();
						popup_alert(object.msg,success_str,"yes","have");
					} else {
						/*
						popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						var fail_str=$("#contextPath").val() + "/friend/login?pk=" + new Date().getTime();
						popup_alert(object.msg,fail_str,"no","have");
					}
				}
			});
			return false;
		}
	});
});