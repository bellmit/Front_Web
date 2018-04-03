function getIsLogin(){
		$.ajax({
			url:"../licai/loginChecked/",
			type:"post",
			data:{},
			success:function(data){
				if(data){
					if(data.login=="Y"){
						$("#isLogin").val("1");
					}else{
						$("#isLogin").val("0");
					}
				}else{
					$("#isLogin").val("0");
				}
			}
		})
	}



	function checkAuth(target){
		var rnd = Math.random();
		$.ajax({
			url:"../jiedai/checkedDetail/",
			type:"get",
			data:{rnd:rnd},
			success: function(data){
				if(data){
					var as = "";
					var message = '<div class="warn"><p>您还未完成';
					if(data.login=="N"){
						//location.href = "../../account/user/login?src=vip";
						showLogin();
						return false;
					}
					if(data.cardChecked==0){
						message += '&nbsp;<a href="../../fund/security/securityInit#real" onclick="$.unblockUI();">实名认证</a>';
					}
					if(data.emailChecked==0){
						message += '&nbsp;<a href="../../fund/security/securityInit#email" onclick="$.unblockUI();">邮箱认证</a>';
					}
					if(data.phoneChecked==0){
						message += '&nbsp;<a href="../../fund/security/securityInit#phone" onclick="$.unblockUI();">手机认证</a>';
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
					}
					
					var url = $(target).attr("data-url");
					toVip(url);
				}else{
					alert("服务器错误！");	
				}
			}
		})
	}
	
	function buyOrBid(tit,msg,type){
	
		var h = $(window).height(), w = $(window).width();
		var top = h-40, margin = w-553;
		top = top /2, left = margin /2;
		
		$.ajax({
			url:"/fund/account/availableBalance",
			data:{},
			type:'get',
			success:function(data){
				if(data.success == true){
					if(data.msg < 198){
						$.blockUI({  
							title:tit, 
							message:'<div class="warn"><p>'+msg+'</p><p class="btnbox"><a href="/licai/" target="_blank" title="立即去投资" class=" btn btn-sm btn-red">立即去投资</a><a href="/fund/trade/rechargeInit#vip" target="_blank" class=" btn btn-sm btn-red">我想直接购买</a></p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
							css:{
								width:'553px',
								cursor:'auto',
								top:top,
								left:left
								},
							overlayCSS: {
								cursor:'auto'
								}
						});
					}else{
						
						$.blockUI({  
							title:tit, 
							message:'<div class="warn"><p>'+msg+'</p><p class="btnbox"><a href="/licai/" target="_blank" title="立即去投资" class=" btn btn-sm btn-red">立即去投资</a><a href="javascript:;" onclick="$.unblockUI();buyVip()" class=" btn btn-sm btn-red">我想直接购买</a></p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
							css:{
								width:'553px',
								cursor:'auto',
								top:top,
								left:left
								},
							overlayCSS: {
								cursor:'auto'
								}
						});
					}
				}			
			}
		})
	}
	
	function showOk(tit,msg,type){
		
		var h = $(window).height(), w = $(window).width();
		var top = h-40, margin = w-553;
		top = top /2, left = margin /2;
		
		$.blockUI({  
				title:tit, 
				message:'<div class="warn"><p>'+msg+'</p><p class="btnbox"><button onclick="$.unblockUI()" class=" btn btn-sm btn-red">好的</button></p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
				css:{
					width:'553px',
					cursor:'auto',
					top:top,
					left:left
					},
				overlayCSS: {
					cursor:'auto'
					}
			});
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
		$("#iframelogin .i").html("");
		
		var url = document.domain.indexOf(".com")>=0 ? "https://" : "http://";
		url += document.domain;
		
		var loginurl = url + "/account/user/indexlogin?src=/vip/";
		
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
	
	function toVip(url){
		
		$.ajax({
			url:url,
			data:{},
			type:"post",
			success:function(data){
				if(data){
				 	if(data.success==true){
				 		showOk("升级Vip成功","恭喜您！升级VIP成功","ok");
				 		
				 	}else if(data.error.indexOf("元")>=0){
				 		//不满足免费升级vip
				 		getAvailableBalance();
				 		buyOrBid("升级Vip失败",data.error,"warn");
				 	}else if(data.error.indexOf("是VIP")>=0){
				 		//已经购买了vip
				 		showOk("升级Vip失败",data.error,"warn");
				 	}else{
				 		showOk("升级Vip失败",data.error,"warn");
				 	}
				}else{
					showOk("升级Vip失败","升级Vip失败，请检测认证资料后再升级！","warn");
				}
			}
		});
	}
	
	function getAvailableBalance(){
		$.ajax({
			url:"/fund/account/availableBalance",
			data:{},
			type:'get',
			success:function(data){
				if(data.success == true){
					$("#availMoney").val(data.msg);
				}			
			}
		})
	}
	
	function buyVip(url){
		
		if(window.confirm("升级VIP将从您的账户余额中扣除198元，是否确认升级VIP享受特权？")){
			$.ajax({
				url:"/vip/buy",
				data:{},
				type:"post",
				success:function(data){
					if(data){
					 	if(data.success==true){
					 		showOk("升级Vip成功","恭喜您！升级VIP成功","ok");
					 		
					 	}else if(data.error.indexOf("金额不足")>=0){
					 		//余额不足
					 		//showOk("购买Vip失败",data.error,"warn");
					 		var f = $("<form action='/fund/trade/rechargeInit' target='_blank'></form>");
					 		f.submit();
					 		//window.open("/fund/trade/rechargeInit");
					 	}else{
					 		//已经购买了vip
					 		showOk("购买Vip失败",data.error,"warn");
					 	}
					}else{
						showTip("升级Vip失败","升级Vip失败，请检测认证资料后再升级！","warn");
					}
				}
			});
		}else{
			$.unblockUI();
		}
	}
		