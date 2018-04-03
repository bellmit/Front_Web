$(function(){
	$("#register_chelian").validate({
		   rules:{
				'username':{ 
	                required:true,
					rangelength: [6,16]
                },
            	'password': {   
                	required: true,
					rangelength: [6,16]
            	},
            	'repassword': {   
                	required: true,
					equalTo:"#password"
            	},
            	'email': {   
	                required: true,
	                email: true
                },
                'validcode': {   
	                required: true
                }
		   },
		   messages:{
			   'username':{   
	                required:"用户名不能为空",
					rangelength:"用户名长度为6-16个字符"
                },
            	'password': {   
                	required:"设置密码不能为空",
					rangelength:"设置密码长度为6-16个字符"
            	},
            	'repassword': {   
                	required:"确认密码不能为空",
					equalTo:"确认密码与设置密码不一致"
            	},
            	'email': {   
	                required:"邮箱不能为空",
	                email:"邮箱格式不正确"
                },
                'validcode': {   
	                required:"验证码不能为空"
                }
		   },
		   errorPlacement:function(error,element){
				validid=element.attr("id");
				$("#"+validid+"_tips").html(error.text());
		   },
		   success:function(){}
	});
});