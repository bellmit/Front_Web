// JavaScript Document
$(function(){
	$("#css3test1").validate({
		rules:{
			'UserName':{
			required:true	
			},
			'PassWord':{
			required:true
			},
			'RePassWord':{
			required:true,
			equalTo:"#password"
			},
			'Email':{
			required:true,
			emali:true
			}
		},
		messages:{
			'UserName':{
			required:"用户名不能为空"
			},
			'PassWord':{
			required:"密码不能为空"
			},
			'RePassWord':{
			required:"确认密码不能为空",
			equalTo:"确认密码与密码不一致"
			},
			'Email':{
			required:"邮箱不能为空",
			email:"邮箱格式错误"
			}			
		},
		errorPlacement:function(error,element){
			var valid=element.attr("id")+"_val";
			$("#"+valid).html(error.text());
		},
		success:function(){}
		});
		//other codes
	
	
	
	
	
	
	
	
	});