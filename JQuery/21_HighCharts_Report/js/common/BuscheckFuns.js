// JavaScript Document
function checkAuth(target){
	
	$.ajax({
		url:"../user/checkedDetail",
		type:"post",
		data:{},
		success: function(data){
			if(data){
				var as = "";
				var message = '<div class="warn"><p>您还未完成';
				if(data.login=="N"){
					location.href = "../../account/user/login?src=borrow/info/index";
				}else{
					if(data.cardChecked==0){
						message += ' <a href="../../res/fund/security/securityInit#real" onclick="$.unblockUI();">实名认证</a>';
					}
					if(data.emailChecked==0){
						message += ' <a href="../../res/fund/security/securityInit#email" onclick="$.unblockUI();">邮箱认证</a>';
					}
					if(data.phoneChecked==0){
						message += ' <a href="../../res/fund/security/securityInit#phone" onclick="$.unblockUI();">手机认证</a>';
					}
					
					message +="为了您的账户及资金安全，请先完成认证。";
					if(data.cardChecked==0 || data.emailChecked==0 || data.phoneChecked==0){
						var h = $(window).height();
						var top = h-40;
						top = top /2;
						$.blockUI({  
							title:'认证不全', 
							message:message +'</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
							css:{
								width:'auto',
								cursor:'auto',
								top:top
								},
							overlayCSS: {
								cursor:'auto'
								}
						});
						return false;
					}else{
						var url = $(target).attr("data-url");
						location.href = url;
					}
				}
				
			}else{
				alert("服务器错误！");	
			}
		}
	})
}

function checkRate(a){
	var reg = /^\d{1,2}(.\d{1,2})?$/;
	if(reg.test(a)){
		if(a<9 || a>24){
			return false;
		}
	}else{
		return false;
	}
	return true;
}

function checkDeadLine(a){
	var reg = /^\d{1,2}$/;
	if(reg.test(a)){
		if(a<1 || a>36){
			return false;
		}
	}else{
		return false;
	}
	return true;
}

//弹出提示信息
function showTip(tit,msg,type){
	var h = $(window).height();
	var top = h-40;
	top = top /2;
	
	if(type=="warn"){
		
		$.blockUI({  
			title:tit, 
			message:'<div class="warn"><p>'+msg+'</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
			css:{
				width:'30%',
				cursor:'auto',
				top:top
				},
			overlayCSS: {
				cursor:'auto'
				}
		});
	}else if(type=="error"){
		
		$.blockUI({  
			title:tit, 
			message:"<div class='modaltip error'><span class='error'></span><span class='txt'>"+msg+"</span><a class='closeResult' onclick='$.unblockUI();' href='javascript:;'>关闭</a></div>",
			css:{
				width:'30%',
				cursor:'auto',
				top:top
				},
			overlayCSS: {
				cursor:'auto'
				}
		});
	}else if(type=="ok"){
		$.blockUI({
			title:tit, 
			message:"<div class='modaltip ok'><span class='ok'></span><span class='txt'>"+msg+"</span><a class='closeResult' onclick='$.unblockUI();' href='javascript:;'>关闭</a></div>",
			css:{
				width:'30%',
				cursor:'auto',
				top:top
				},
			overlayCSS: {
				cursor:'auto'
				}
		});
	}
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
