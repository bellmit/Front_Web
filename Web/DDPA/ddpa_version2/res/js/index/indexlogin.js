$(document).ready(function(e) {
		
		if(!isPlaceholderSupport()){
			$.Placeholder.init();
		}
		
		if($.cookie("COOKIES_LOGIN_USERNAMESSIONID")){
			$("input[name='userName']").val($.cookie("COOKIES_LOGIN_USERNAMESSIONID"));
			$("#login_agreecb").click();
		};
		
		$(".login_register").click(function(e){
			e.preventDefault();
			var nexturl = "";
			if(document.domain.indexOf(".com") >= 0 ){
				nexturl = "https://"+document.domain + "/account/user/registerInit";
			}else{
				nexturl = document.domain.indexOf("localhost")>=0? "http://"+document.domain + "/account/user/registerInit":"http://"+document.domain + "/account/user/registerInit";
			}
			window.top.location.href = nexturl;
		})
				
		//登录表单
		$(".index_un").blur(function(e){
			var $target = $(e.target), v = $target.val();
			var rulep=/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/;
			var rulee=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/g;
			
			if(v!=""){
				if(!rulep.test(v) && !rulee.test(v)){
					$("#login_passwordtip").addClass("Validform_wrong").text("请输入正确的手机号码或邮箱地址");
				}else{
					$("#login_passwordtip").removeClass("Validform_wrong").text("");
				}
			}
		});
		
		$("form[name='loginform']").Validform({
			ajaxPost:true,
			datatype:{
				"username":function(gets,obj,curform,regxp){
					
					if(gets==""){ return false;}
					
					var rulep=/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/;
					var rulee=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/g;
					
					if(!rulep.test(gets) && !rulee.test(gets)){return false;}
				}
			},
			beforeSubmit:function(curform){
				submitlogin(curform);
				return false;
			},
			tiptype:function(msg,o,cssctl){
				if(!o.obj.is("form")){
					var objtip=o.curform.find(".login_tips");
					cssctl(objtip,o.type);
					objtip.text(msg);
				}
			}
		});
		
		//提交登录
		function submitlogin(f){
			var username = f.find("input[name='UserName']").val(),
				remember = f.find("input[name='Remember']").val(),
			  	paw = f.find("input[name='PassWord']").val();
			var data = {userName:username, password:paw, Remember:remember};
			data = f.serialize();
			
			url = "../../account/user/login";
			
			$.ajax({
				url:url,
				data:data,
				type:"post",
				success:function(data){
					if(data){
						
						if(data.success == false){
							f.find(".login_tips").text(data.msg);
						}else{
							
							var i = location.href.indexOf("src="), nexturl="";
							if(i >= 0){
								
								//登录成功需要跳回上一个页面
								i += 4;
								nexturl = location.href.substring(i);
								
							}else{
								nexturl += "/fund/account/";
							}
							window.top.location.href = nexturl;
							
						}
					}
				}
			});
		}	
});