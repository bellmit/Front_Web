$(function() {
	/* declare */
	var saveForm = $("#saveForm"),contextPath = $("#contextPath").val();
	/**nickname**/
	jQuery.validator.addMethod("is_nickname",function(value,element){
		  var nickname=/^[\u4e00-\u9fa5a-zA-Z0-9_]{2,}$/;
		  var num=/^[0-9]{2,16}$/;
		  return this.optional(element)||(nickname.test(value)&&!num.test(value));
},"昵称格式不正确");
	jQuery.validator.addMethod("checkChina",function(value,element){
		var passwordcopy=/^[^[\u4e00-\u9fa5]*]*$/;
	  return this.optional(element)||(passwordcopy.test(value));
},"不能带有中文");
	/* valid user_info info */
	saveForm.validate({
		rules : {
			'nickname' : {
				required : true,
				is_nickname:true,
				rangelength : [ 2, 16 ],
				remote : {
					url : contextPath + "/friend/doCheckNickName",
					type : "post",
					data : {
						nickname : function() {
							return $("#nickname").val();
						},
						friendid : function() {
							return $("#friendid").val();
						}

					}
				}
			},
			'email' : {
				required : true,
				email : true,
				checkChina : true,
				remote : {
					url : contextPath + "/friend/doCheckEmail",
					type : "post",
					data : {
						email : function() {
							return $("#email").val();
						},
						friendid : function() {
							return $("#friendid").val();
						}
					}
				}
			},
			'sex' : {
				required : true
			}
		},
		messages : {
			'nickname' : {
				required : "昵称不能为空",
				is_nickname:"昵称格式不正确",
				rangelength : "昵称长度为2-16个字符",
				remote : "此昵称已存在请变更"
			},
			'email' : {
				required : "邮箱不能为空",
				email : "邮箱为非法格式",
				remote : "此邮箱已存在请变更",
				checkChina:"邮箱地址里不能带有中文"
			},
			'sex' : {
				required : "性别不能为空"
			}
		},
		errorPlacement : function(error, element) {
			if(element.attr("name")=="sex"){
				$("#sex_tips").html(error.text());
			}else{
				$("#" + element.attr("id") + "_tips").html(error.text());
			}
		},
		success : function() {
		},
		invalidHandler : function() {
			return false;
		},
		submitHandler : function() {
				var data = saveForm.serialize();
				var url = contextPath + "/carfri/updateUserInfo";
				$.post(url, data, function(response) {
					var object = eval("(" + response.rs + ")");
					if (object.success){
						/*
						popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						var success_str=contextPath + "/carfri/user_info";
						popup_alert(object.msg,success_str,"yes","have");
					} else {
						/*
						popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						popup_alert(object.msg,"undefined","no","none");
					}
				}, 'json');
			
		}
	});
	//取消操作
	$("#resetBtn").click(function(){
		 window.location.reload();
	});

});