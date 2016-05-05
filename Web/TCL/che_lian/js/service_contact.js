$(function(){
	/*self valid function*/
	jQuery.validator.addMethod("ischi_phone",function(value,element){
			  var phonecode=/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
			  return this.optional(element)||(phonecode.test(value));
	},"手机号码不合法");

	/*jquery valid*/
	$("#service_online").validate({
		   rules:{
			    'theme':{ 
	                required:true
                },
				'username':{ 
	                required:true
                },
				'address': {   
	                required: true
                },
				'phone': {
					required:true,
					ischi_phone:true
                },
            	'email': {   
	                required: true,
	                email: true
                },
            	'contents': {   
	                required:true
                }
                
		   },
		   messages:{
			   'theme':{ 
	                required:"主题不能为空"
                },
				'username':{ 
	                required:"姓名不能为空"
                },
				'address': {   
	                required:"地址不能为空"
                },
				'phone': {
					required:"手机不能为空"
                },
            	'email': {   
	                required:"邮箱不能为空",
	                email:"邮箱格式错误"
                },
            	'contents': {   
	                required:"留言内容不能为空"
                }
		   },
		   errorPlacement:function(error,element){
				validid=element.attr("id");
				$("#"+validid+"_tips").html(error.text());
		   },
		   success:function(){}
	});
});