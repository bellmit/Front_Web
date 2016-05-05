(function($){
	$(function(){
		/*获取页面元素*/
		var login_action=$("#login_action"),login_username=$("#login_username"),login_password=$("#login_password"),remember=$("#remember"),login_unicon=$("#login_usernameicon"),login_pwicon=$("#login_passwordicon");
		/*记住账号*/
		$("#login_agreecb").click(function(){
			var curobj=$(this),curclass=curobj.attr("class");
			if(curclass==""){
				curobj.addClass("login_agreecbsel");
				remember.val("1");
			}else{
				curobj.removeClass("login_agreecbsel");
				remember.val("");
			}
		});	
		/*文本框初始化*/
		login_username.val()!=""?login_unicon.html("").css({"width":"28px"}):login_unicon.html("请输入手机号/用户名/邮箱").css({"width":"220px"});
		login_password.val()!=""?login_pwicon.html("").css({"width":"28px"}):login_pwicon.html("请输入密码").css({"width":"220px"});
		/*绑定文本框获取焦点事件*/
		$("#login_username,#login_password").live("focusin focusout",function(e){
            var curobj=$(e.target),curvalue=curobj.val(),curid=e.target.id;
			if(e.type=="focusin"){
				$("#"+curid+"icon").html("").css({"width":"28px"});
			}else if(e.type=="focusout"){
				if(curvalue!=""){
					$("#"+curid+"icon").html("").css({"width":"28px"});
				}else if(curvalue==""){
					if(curid=="login_username"){
						$("#"+curid+"icon").html("请输入手机号/用户名/邮箱").css({"width":"220px"});
					}else if(curid=="login_password"){
						$("#"+curid+"icon").html("请输入密码").css({"width":"220px"});
					}
				}
			}
        });
		$("#login_usernameicon,#login_passwordicon").live("click",function(e){
			var curobj=$(e.target),curid=e.target.id,curtextid=curid.slice(0,-4);
			curobj.html("").css({"width":"28px"});
			$("#"+curtextid).focus();
		});
		/*验证表单*/
		var validtip_arr=[""];
		login_action.validate({
			rules : {
				'userName' : {
		
				},
				'password' : {
				}
			},
			messages : {
				'userName' : {
				},
				'password' : {
				}
			},
			errorPlacement : function(error, element){
				$("#login_passwordtip").html(error.text());
			},
			success : function(){},
			invalidHandler : function() {
				return false;
			},
			submitHandler : function() {
				var url =$('#login_action').attr('action');
				var params =$('#login_action').serialize();
				$.ajax({
					type:'post',
					url:url,
					data : params,
					dataType : 'json',
					success : function(data) {					
						if (data.success) {
							var source = $('#source').val();
							if(source){
								window.location.href="../../"+source;
							}else{
								window.location.href="manageInit"
							}
						}else{	
							$("#login_passwordtip").html("账号或密码错误");
							if($("#login_username").val()==""){
								$("#login_username").focus();
							}else if($("#login_passwordicon").val()==""){
								$("#login_passwordicon").focus();
							}else{
								$("#login_username").focus();
							}
						}
					}
				});
				return false;
			}
		});
	});
})(jQuery);