$(function(){
	$("#findpwd_chelian").validate({
		   rules:{
				'username':{ 
	                required:true,
					rangelength: [6,16]
                },
            	'email': {   
	                required: true,
	                email: true
                }
		   },
		   messages:{
			   'username':{   
	                required:"用户名不能为空",
					rangelength:"用户名长度为6-16个字符"
                },
            	'email': {   
	                required:"邮箱不能为空",
	                email:"邮箱格式不正确"
                }
		   },
		   errorPlacement:function(error,element){
				validid=element.attr("id");
				$("#"+validid+"_tips").html(error.text());
		   },
		   success:function(){}
	});
});