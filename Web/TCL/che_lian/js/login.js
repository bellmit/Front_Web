$(function(){
	$("#login_chelian").validate({
		   rules:{
				'username':{ 
	                required:true,
					rangelength: [6,16]
                },
            	'password': {   
                	required: true,
					rangelength: [6,16]
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
                	required:"密码不能为空",
					rangelength:"密码长度为6-16个字符"
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