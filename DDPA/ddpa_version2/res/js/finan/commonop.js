$(document).ready(function(){
	var username="";
	/*if(document.all){
		username = document.cookie ? document.cookie.split(";")[1].split("=")[1] : "";
	}else{
		username = document.cookie.split(";")[0].split("=")[1];
	}*/
	
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
		if(s==0){
			alert("请选择举报原因");
			return false;
		}else if(des==""){
			alert("请输入举报证据");
			return false;
		}else{
			des = stripscript(des);
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
	
	/**
	 * 将数值四舍五入(保留2位小数)后格式化成金额形式
	 *
	 * @param num 数值(Number或者String)
	 * @return 金额格式的字符串,如'1,234,567.45'
	 * @type String
	 */
	function formatCurrency(num) {
	    num = num.toString().replace(/\$|\,/g,'');
	    if(isNaN(num))
	    num = "0";
	    sign = (num == (num = Math.abs(num)));
	    num = Math.floor(num*100+0.50000000001);
	    cents = num%100;
	    num = Math.floor(num/100).toString();
	    if(cents<10)
	    cents = "0" + cents;
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	    num = num.substring(0,num.length-(4*i+3))+','+
	    num.substring(num.length-(4*i+3));
	    return (((sign)?'':'-') + num + '.' + cents);
	}

	//关闭登录弹窗
	function closeLogin(){
		$("#login").animate({top:"-400px"});
		$(".modalBg").fadeOut(1000,function(){
			$(this).replaceWith("");
		});
	}
	
	//检测三大认证
	function checkeAuth(){
		var cardChecked = $("#cardChecked").val(), 
			emailChecked = $("#emailChecked").val(),
			phoneChecked = $("#phoneChecked").val();
			
		var as = "";
		var message = '<div class="warn"><p>您还未完成';
			if(cardChecked==0){
				message += '&nbsp;<a href="/fund/security/securityInit#real" onclick="$.unblockUI();">实名认证</a>';
			}
			if(emailChecked==0){
				message += '&nbsp;<a href="/fund/security/securityInit#email" onclick="$.unblockUI();">邮箱认证</a>';
			}
			if(phoneChecked==0){
				message += '&nbsp;<a href="/fund/security/securityInit#phone" onclick="$.unblockUI();">手机认证</a>';
			}
			
			message +="为了您的账户及资金安全，请先完成认证。";
			if(cardChecked==0 || emailChecked==0 || phoneChecked==0){
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
			}
			return true;
	}
	
	
	//弹出登录表单
	function showLogin(){
		$("body").append('<div class="modalBg"></div>');
		$(".modalBg").fadeIn(1000);
		$("#iframelogin .i").html("");
		
		var url = document.domain.indexOf(".com")>=0 ? "https://" : "http://";
		url += document.domain;
		
		var i = location.href.lastIndexOf("/"),
			proid = location.href.substring(i); 
		var loginurl = url + "/account/user/indexlogin?src=/licai"+proid;
		
		createIframe("#iframelogin","detaillogin",loginurl,352,260);
		$("#indexlogin .login_register").hide();
		var left = getLeft("#login");
		$("#login").css("left",left);
		$("#login").show();
		$("#login").animate({top:"0px"});
	}
	
	function createIframe(boxid,id,url,width,height) {
		var i = document.createElement("iframe");
		i.src =url;
		i.scrolling ="no";
		i.setAttribute('frameBorder', 0);
		i.style.cssText = 'border: 0 none;'; 
		i.width =width;
		i.height =height;
		i.marginheight=0;
		i.marginwidth=0;
		i.id = id;
		$(boxid).find(".i").append(i);
	};