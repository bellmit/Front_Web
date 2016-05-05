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
		login_username.val()!=""?login_unicon.hide():login_unicon.show();
		login_password.val()!=""?login_pwicon.hide():login_pwicon.show();
		/*切换登录方式*/
		$("#login_way1,#login_way2").click(function(){
			var curobj=$(this),curclass=curobj.attr("class");
			curclass==""?curobj.addClass("login_agreecbsel"):curobj.removeClass("login_agreecbsel");
		});	
		$("#login_username,#login_password").live("focusin focusout",function(e){
            var curobj=$(e.target),curvalue=curobj.val(),curid=e.target.id;
			if(e.type=="focusin"){
				if(curvalue==""){
					$("#"+curid+"icon").parent().hide();
				}
			}else if(e.type=="focusout"){
				if(curvalue!=""){
					$("#"+curid+"icon").parent().hide();
				}else if(curvalue==""){
					$("#"+curid+"icon").parent().show();
				}
			}
        });
		$("#login_usernameicon,#login_passwordicon").live("click",function(e){
			var curobj=$(e.target),curid=e.target.id,curtextid=curid.slice(0,-4);
			var textobj=document.getElementById(curtextid);
			if(textobj.value==""){
				curobj.parent().hide();
				textobj.focus();
			}
		});
		/*验证表单*/
		login_action.validate({
			rules : {
				'UserName' : {
					required : true,
					rangelength : [4,16],
					remote:{
						url:"提交访问地址",
						type: "post",
						data:{
							UserName:function(){return document.getElementById("login_username").value;}
						}
					}
				},
				'PassWord' : {
					required : true,
					rangelength : [6,12]
				}
			},
			messages : {
				'UserName' : {
					required : "用户名不能为空",
					rangelength : "用户名长度为4-16个字符",
					remote:"用户名不存在,请重新输入"
				},
				'PassWord' : {
					required : "密码不能为空",
					rangelength:"密码长度在为6-12个字符"
				}
			},
			errorElement:"p",
			errorClass:"tipserror",
			success : function(p){
				p.addClass("tipssucc");
				setTimeout(function(){p.removeClass("tipssucc");},2000);
			},
			invalidHandler : function() {
				return false;
			},
			submitHandler : function() {
				var url =$('form').attr('action');
				var params =$('form').serialize();
				$.ajax({
					type:'post',
					url:url,
					data : params,
					dataType : 'json',
					success : function(data) {
						var object = eval("(" + data.rs + ")");
						if (object.success) {
							var success_str="成功后的跳转地址";
							popup_alert(object.msg,success_str,"yes","have");				
						}else{
							popup_alert(object.msg,"undefined","no","none");
						}
					}
				});
				return false;
			}
		});
	});
})(jQuery);