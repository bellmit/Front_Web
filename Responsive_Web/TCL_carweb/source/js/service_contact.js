$(function(){
	var service_contact_btn=$("#service_contact_btn"),common_count=(function(){var cc=0;return function(){return ++cc;};}()),other_count=(function(){var oc=0;return function(){return ++oc;};}());
	/*初始化防止表单重复提交*/
	if(window.localStorage){
		/*支持本地存储*/
		(function init_sc_common(){
			if(typeof window.localStorage.getItem("is_sc_common")!=null){
				var already_common=window.localStorage.getItem("is_sc_common");
				if(already_common%120!=0){
					service_contact_btn.attr("disabled","disabled").addClass("sc_disabled");
					var sc_init_common_id=setTimeout(function(){
						window.localStorage.setItem("is_sc_common",++already_common);
						init_sc_common();
					},1000);
				}else{
					service_contact_btn.removeAttr("disabled").removeClass("sc_disabled");
					window.localStorage.clear();
					clearTimeout(sc_init_common_id);
				}
			}else{
				return;	
			}
		 })();
	  }
	
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
		   success:function(){
		   },
		   invalidHandler : function() {
				return false;
		   },
			submitHandler : function(){
				/*防止表单重复提交*/
				if(window.localStorage){
					/*现代浏览器*/
					service_contact_btn.attr("disabled","disabled").addClass("sc_disabled");
					var sc_common_id=setInterval(function(){
						var cc_counts=common_count();
						window.localStorage.setItem("is_sc_common",cc_counts);
						if(cc_counts%120==0){
							service_contact_btn.removeAttr("disabled").removeClass("sc_disabled");
							window.localStorage.clear();
							clearInterval(sc_common_id);
						}
					},1000);
				}else{
					/*老版浏览器*/
					service_contact_btn.attr("disabled","disabled").addClass("sc_disabled");
					var sc_other_id=setInterval(function(){
						var oc_counts=other_count();
						document.cookie="is_sc_other="+oc_counts;
						if(oc_counts%120==0){
							service_contact_btn.removeAttr("disabled").removeClass("sc_disabled");
							document.cookie="is_sc_other=-"+1;
							clearInterval(sc_other_id);
						}
					},1000);
				}
			}
	}); 
});