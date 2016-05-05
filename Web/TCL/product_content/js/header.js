$(function() {
	var url = $("#deskpath").val() + "/friend/getFriendInfo";//请求地址
	var destpath = $("#deskpath").val();
	$.ajax({ 
        type: "POST", 
        url: url, 
        data: "{}", 
        dataType: "jsonp", 
        jsonp:"jsonpcallback",
        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) { 
        	if(data.success){
        		$(".sign-in").html('<div class="sign_userwrap"><div class="sign_username" id="sign_username"><div>您好,<font>'+data.nickname+'</font>!</div><a href="'+destpath+'/friend/logout" class="sign_out">[退出]</a></div></div><script>$(function(){var sign_username=$("#sign_username"),sign_wrapobj=sign_username.find("div"),sign_content=sign_wrapobj.text().length;sign_wrapobj.width()>=145?sign_wrapobj.css({"width":"145px","white-space":"nowrap","overflow":"hidden","text-overflow":"ellipsis"}):sign_wrapobj.css({"width":"auto"});sign_content>=5?sign_username.addClass("sign_username_sel"):sign_username.removeClass("sign_username_sel");});</script>');
        	}else{
        	  $(".sign-in")
        	  .html('<div class="atag"><a href='+destpath+'/friend/register>注册</a></div><div class="area">/</div><div class="atag"><a href='+destpath+'/friend/login>登录</a></div>');
        	}
        }
    }); 


});