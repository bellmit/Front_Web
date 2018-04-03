(function($){
	$(function(){
		/*获取页面元素*/
		var login_action=$("#login_action"),login_username=$("#login_username"),login_password=$("#login_password"),login_othermode=$("#login_othermode");	
		/*文本框初始化*/
		login_username.val()!=""?login_username.addClass("login_inputsel"):login_username.removeClass("login_inputsel");
		login_password.val()!=""?login_password.addClass("login_inputsel"):login_password.removeClass("login_inputsel");
		/*登录方式切换*/
		$("#login_way1,#login_way2").click(function(){
			var curobj=$(this),curid=curobj.attr("id");
			if(curid=="login_way1"){
				curobj.addClass("login_way1sel").siblings().removeClass("login_way2sel");
				login_action.show();
				login_othermode.hide();
			}else if(curid=="login_way2"){
				curobj.addClass("login_way2sel").siblings().removeClass("login_way1sel");
				login_othermode.show();
				login_action.hide();
			}
		});
		/*绑定文本框获取焦点事件*/
		$("#login_username,#login_password").live("focusin",function(e){
            var curobj=$(this),curvalue=curobj.val();
			curvalue!=""?curobj.addClass("login_inputsel"):curobj.removeClass("login_inputsel");
        });
		$("#login_username,#login_password").live("focusout",function(e){
            var curobj=$(this),curvalue=curobj.val();
			curvalue!=""?curobj.addClass("login_inputsel"):curobj.removeClass("login_inputsel");
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
			errorPlacement : function(error, element) {
				$("#" + element.attr("id") + "tips").html(error.text());
			},
			success : function(){}
		});
	});
})(jQuery);