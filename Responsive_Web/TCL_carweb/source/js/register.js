$(function() {
	/*declare*/
	var register_chelian=$("#register_chelian"),register_tips=$("#register_tips");
	/*valid info*/
	
	jQuery.validator.addMethod("checkformat",function(value,element){
		  var phonecode=/^[\u4e00-\u9fa5a-zA-Z0-9_]{2,}$/;
		  var num=/^[0-9]{2,16}$/;
		  return this.optional(element)||(phonecode.test(value) && !num.test(value));
},"只能由中文/数字/字母/下划线组成,不能为纯数字");
jQuery.validator.addMethod("checkChina",function(value,element){
			var passwordcopy=/^[^[\u4e00-\u9fa5]*]*$/;
		  //console.log(passwordcopy.test(value));
		  return this.optional(element)||(passwordcopy.test(value));
},"不能带有中文");
	register_chelian.validate({
		rules : {
			'nickname' : {
				required : true,
				rangelength : [ 2, 16 ],
				checkformat:true,//合法用户名的验证
				remote:{
					url: $('#contextPath').val() + "/friend/doCheckNickName",
					type: "post",
					data:{
						nickname : function(){
							return $("#nickname").val();
						}
					}
				}
			},
			'password' : {
				required : true,
				rangelength : [ 5, 16 ],
				checkChina:true
			},
			'repassword' : {
				required : true,
				equalTo : "#password"
			},
			'email' : {
				required : true,
				email : true,
				checkChina:true,
				remote:{
					url: $('#contextPath').val() + "/friend/doCheckEmail",
					type: "post",
					data:{
						email : function(){
							return $("#email").val();
						}
					}
				}
			},
			'validcode' : {
				required : true,
				rangelength : [ 4, 4 ]
			}
		},
		messages : {
			'nickname' : {
				required : "用户名不能为空",
				rangelength : "用户名长度为2-16个字符",
				remote:"用户名已经被注册,请重新输入"
			},
			'password' : {
				required : "设置密码不能为空",
				rangelength : "设置密码长度为5-16个字符",
				checkChina:"密码里不能含有中文"
			},
			'repassword' : {
				required : "确认密码不能为空",
				equalTo : "确认密码与设置密码不一致"
			},
			'email' : {
				required : "邮箱不能为空",
				email : "邮箱格式不正确",
				remote:"此邮箱已经被注册,请重新输入",
				checkChina:"邮箱地址里不能含有中文"
			},
			'validcode' : {
				required : "验证码不能为空",
				rangelength :"验证码长度只能为4位"
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
						var success_str=$("#contextPath").val() + "/friend/login";
						popup_alert(object.msg,success_str,"yes","have");				
					}else{
						/*
						popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						popup_alert(object.msg,"undefined","no","none");				
						$("#validateImg").click();/*重新刷新验证码*/
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
});