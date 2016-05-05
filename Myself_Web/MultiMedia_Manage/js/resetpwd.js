$(function(){
	var username=$("#username"),opwd=$("#opwd"),npwd=$("#npwd"),validpwd=$("#validpwd");
	$("#resetpwd").validate({
		rules:{
			"usernames":{
				required:true,
				remote:{
					url:"请输入请求地址",
					type:"post",
					data:{
						usernames:function(){return username.val();}
					}
				}
			},
			"opwds":{
				required:true,
				rangelength:[6,16],
				remote:{
					url:"请输入请求地址",
					type:"post",
					data:{
						usernames:function(){return username.val();},
						opwds:function(){return opwd.val();}
					}
				}
			},
			"npwds":{
				required:true,
				rangelength:[6,16]
			},
			"validpwds":{
				required:true,
				rangelength:[6,16],
				equalTo:"#npwd"
			}
		},
		messages:{
			"usernames":{
				required:"用户名不能为空",
				remote:"用户名不存在"
			},
			"opwds":{
				required:"原密码不能为空",
				rangelength:"原密码在6-12位间",
				remote:"原密码错误"
			},
			"npwds":{
				required:"新密码不能为空",
				rangelength:"新密码在6-12位间"
			},
			"validpwds":{
				required:"确认密码不能为空",
				rangelength:"确认密码在6-12位间",
				equalTo:"确认密码与新密码不一致"
			}
		},
		errorPlacement:function(error,element) {
			$("#"+ element.attr("id")+"_tips").html(error.text());
		},
		success:function(){
		},
		invalidHandler:function() {
			return false;
		},
		submitHandler : function() {
			var url = $('form:first').attr('action');
			var params = $('form:first').serialize();
			$.ajax({
				type :'post',
				url :url,
				data : params,
				dataType : 'json',
				success : function(result) {
					if (result.success) {
						/*
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						popup_alert(result.msg,"login.html","yes","have");				
					}else{
						popup_alert(result.msg,"undefined","no","none");
					}
				}
			});
			return false;
		}	
	});	
});