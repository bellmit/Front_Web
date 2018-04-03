(function($){
	$(function(){
		/*获取页面元素*/
		var login_action=$("#login_action"),login_username=$("#login_username"),login_password=$("#login_password"),login_othermode=$("#login_othermode"),remember=$("#remember");	
		
		/*文本框初始化*/
		login_username.val()!=""?login_username.addClass("login_inputsel"):login_username.removeClass("login_inputsel");
		login_password.val()!=""?login_password.addClass("login_inputsel"):login_password.removeClass("login_inputsel");
		/*登录方式切换*/
		$("#login_way1,#login_way2").click(function(){
			var curobj=$(this),curid=curobj.attr("id");
			if(curid=="login_way1"){
				curobj.addClass("login_way1sel").siblings().removeClass("login_way2sel");
				$("#indexlogin").show();
				login_othermode.hide();
			}else if(curid=="login_way2"){
				curobj.addClass("login_way2sel").siblings().removeClass("login_way1sel");
				login_othermode.show();
				$("#indexlogin").hide();
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
	});
})(jQuery);