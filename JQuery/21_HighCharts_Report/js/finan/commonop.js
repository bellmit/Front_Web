$(document).ready(function(){
	var username= document.all? document.cookie.split(";")[1].split("=")[1] : document.cookie.split(";")[0].split("=")[1];
	
	if(username!=""){
		$("#login_username").val(username);
		$("#login_usernameicon").text("");
	}else{
		$("#login_usernameicon").text("请输入手机号/用户名/邮箱");
	}
	
});

	var userID = $("#userId").val(),
	proId = $("#proId").val(),
	isLogin = $("#isLogin").val();

	//弹出举报表单
	function showReport(){
		var isLogin = $("#isLogin").val();
			if(isLogin==0){
				showLogin();
				return false;
			}
		var left = getLeft("#reportbox");
		$.blockUI({ 
			message:  $("#reportbox"),
			css:{
				top:"20%",
				left:left,
				width:"600px",
				cursor:'auto'
				},
			overlayCSS: {
				cursor:'auto'
				}
		});
	}
	
	//计算水平居中的左边距
	function getLeft(id){
		var l = $(id).width();
		var total_l = $("body").width();
		
		l = (total_l - l)*0.5;
		left = Math.round((l/total_l)*100);
		left += "%";
		return left;
	}
	
	//举报
	function doReport(obj){
		var f = obj.parents("form");
		
		var reasons = f.find(".radio.checked"), s = reasons.size(), des =f.find("#reportdes").val();
		if(reasons==0){
			alert("请选择举报原因");
			return false;
		}else if(des==""){
			alert("请输入举报证据");
			return false;
		}else{
			var data = {};
			data.toUserId = $("#userId").val();
			data.reason = $(reasons.get(0)).find("input").val();
			data.remark = f.find("textarea[name='remark']").val();
			
			var url = f.attr("action");
			$.ajax({
				url:url,
				data:data,
				type:"post",
				success:function(data){
					if(data){
						if(data.success==true){
							showTip("举报成功","您的举报已经提交成功，我们会尽快核实处理。","ok");
							f.get(0).reset();
						}else{
							showTip("举报失败","举报失败，请重新提交您的举报内容","warn");
						}
					}else{
						showTip("举报失败","举报失败，请重新提交您的举报内容","warn");
					}
				}
			});
		}	
	}

	//关闭登录弹窗
	function closeLogin(){
		$("#login").animate({top:"-400px"});
		$(".modalBg").fadeOut(1000,function(){
			$(this).replaceWith("");
		});
	}
	
	
	//弹出登录表单
	function showLogin(){
		$("body").append('<div class="modalBg"></div>');
		$(".modalBg").fadeIn(1000);
		
		var left = getLeft("#login");
		$("#login").css("left",left);
		$("#login").show();
		$("#login").animate({top:"0px"});
	}