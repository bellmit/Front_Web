// JavaScript Document
$(function(){
	//登录密码默认值显示隐藏
	var pdval=$("#password").val();
	if(pdval==""){
		$("#pwdefault").css("display","block");
	}else{
		$("#pwdefault").css("display","none");
		}
	//登录输入框获取获取焦点后默认值清空
	$("#username,#password").focusin(function(){
			var textid=$(this).attr("id");
			if(textid=="username"&&$(this).val()=="账户"){
				$(this).val("");
				}
			if(textid=="password"&&$(this).val()==""){
				$("#pwdefault").css("display","none");
				}
		});
	});