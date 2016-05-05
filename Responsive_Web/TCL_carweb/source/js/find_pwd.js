$(function() {
	$("#findpwd_chelian").validate({
		rules : {
			'nickname' : {
				required : true,
				rangelength : [ 2, 50 ]
			},
			'email' : {
				required : true,
				email : true
			}
		},
		messages : {
			'nickname' : {
				required : "用户名不能为空",
				rangelength : "用户名长度为2-50个字符"
			},
			'email' : {
				required : "邮箱不能为空",
				email : "邮箱格式不正确"
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
						popup_alert(object.msg,"undefined","yes","have");
					} else {
						/*
						popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						popup_alert(object.msg,"undefined","no","none");
					}
				}
			});
			return false;
		}
	});
});