// JavaScript Document
$(document).ready(function(e) {
    
	init();
	var h = $(window).height();
	var top = h-40;
	top = top /2;
	
	//初始化
	function init(){
		
		getIsLogin();
		$(".schbox").schArc();
	    $(".filter").click(function(e){
	    if(e.target.tagName!="A"){return false;}
	        var $target = $(e.target), isRecharge = $target.hasClass("recharge");
	        if(isRecharge){ return true;}
	        
	        var li = $target.parent("li"),
	        v = $target.attr("data-v"), 
	        url = $target.attr("href");
	        
	        li.addClass("cur").siblings(".cur").removeClass("cur");
	    });
		$(".bidform .finSubmit").click(submitBid);
		
		$("#login.modalbox .closebtn").click(closeLogin);
		/*$(".money").live("blur",function(e){
			var $target = $(e.target), v = $target.val();
			var reg = /^[1-9]\d*\.?\d{0,2}$/, b_than1 = (parseFloat(v)>=1);
			if(v == "" || !b_than1){
				$.blockUI({  
					title:'提示', 
					message:'<div class="warn"><p>投标金额需大于等于1</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
					css:{
						width:'30%',
						cursor:'auto',
						top:top
						},
					overlayCSS: {
						cursor:'auto'
						}
					});
			}else if(!reg.test(v)){
				$.blockUI({  
					title:'提示', 
					message:'<div class="warn"><p>投标金额最多保留两位小数</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
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
		});*/
		
	}
		
	function getIsLogin(){
		var rnd = Math.random();
		$.ajax({
			url:"../licai/loginChecked/",
			type:"post",
			data:{rnd:rnd},
			success:function(data){
				if(data){
					if(data.login=="Y"){
						$("#isLogin").val("1");
						//var availableAmount = parseFloat(data.availableAmount).toFixed(2);
						
						//$("#usable").attr("data-v",availableAmount);
						//$("#usable").find(".int").text(getInt(availableAmount));
						//$("#usable").find(".sub").text(getSub(availableAmount));
					}else{
						$("#isLogin").val("0");
					}
				}else{
					$("#isLogin").val("0");
				}
				setLogin();
			}
		})
	}
	
	//登录状态显示与隐藏
	function setLogin(){
		
		var isLogin = $("#isLogin").val();
		if(isLogin==0){
			$(".filter .info").hide();
		}else{
			$(".filter .info").show();
		}
	}
			
	//关闭登录弹窗
	function closeLogin(){
		$("#login").animate({top:"-400px"});
		$(".modalBg").fadeOut(1000,function(){
			$(this).replaceWith("");
		});
	}
	
	//弹出举报表单
	function bid(){
		$("body").append('<div class="modalBg"></div>');
		$(".modalBg").fadeIn(1000);
		$("#iframelogin .i").html("");
		
		var url = document.domain.indexOf(".com")>=0 ? "https://" : "http://";
		url += document.domain;
		
		var loginurl = url + "/account/user/indexlogin?src=/licai/";
		
		createIframe("#iframelogin","listlogin",loginurl,352,260);
		$("#indexlogin .login_register").hide();
		var left = getLeft("#login");
		$("#login").css("left",left);
		$("#login").show();
		$("#login").animate({top:"0px"});
	}
	
	//投标相关
	function submitBid(e){
		var isLogin = $("#isLogin").val();
		if(isLogin==0){
			bid();
		}else{
			var isAuthed = checkeAuth();
			if(!isAuthed){return false;}
			if($(e.target).hasClass("disabled")){
				
				return false;
			}
			var f = $(e.target).parents("form");
			f.addClass("cur");
			var money = f.find(".money"), v = money.val();
			checkMoney(f,v);
		}
	}
	
	function checkMoney(f,gets){
		var reg = /^[1-9]\d*\.?\d{0,2}$/, b_than1 = (parseFloat(gets)>=1), validBid = f.find("input[name='validBid']").val();
		var usable = $("#usable").attr("data-v");
		usable = parseFloat(usable);
		
		if(gets==""){
			$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>投标金额需不能为空</p><a href="javascript:;" onclick="closeWarn()" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
		}else if(!b_than1){
			$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>投标金额需大于等于1</p><a href="javascript:;" onclick="closeWarn()" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
		}else if(!reg.test(gets)){
			$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>投标金额最多保留两位小数</p><a href="javascript:;" onclick="closeWarn()" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
		}else if(gets > usable){
			//if(){
				$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>账户余额不足，立即去<a href="../../fund/trade/rechargeInit" target="_blank">充值</a></p><a href="javascript:;" onclick="closeWarn();" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
		}else if(parseFloat(gets) > parseFloat(validBid)){
			$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>本标最多可投入￥'+validBid+'&nbsp;&nbsp;<a href="javascript:;" onclick="setValue();">点击投此金额</a></p><a href="javascript:;" onclick="closeWarn()" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
		}else{
			f.addClass("curBid");
			doSubmit(f,gets)
		}
		
	}
	
	//设置投标金额
	function setValue(input,v){
		input.val(v);
	}
	
	function doSubmit(f,v){
		var data = {};
		data.productId = f.attr("data-pid");
		var url = f.attr("action");
		data.tradeAmount = v;
		$.ajax({
			url:url,
			type:"post",
			data:data,
			success:function(data){
				if(data){
					if(data=="noLogin"){
						showTip("登录提示","您还未登录，请先登录后重试。","warn");
						return false;
					}else if(data.success==false){
						showTip("投标失败",data.errorMessage,"warn");
					}else if(data.success==true){
						
						var curTr = $(".curBid").parent(".td").siblings(".td6");
						var curSch = curTr.find(".schbox");
						data.progress = parseFloat(data.progress)*100;
						data.progress = data.progress.toFixed(2);
						
						if(data.progress >=100){
							curTr.find(".finSubmit").addClass("disabled");
						}
						curSch.attr("data-v",data.progress);
						var amount = curSch.find(".amount"), na = amount.attr("data-a");
						na = parseInt(na)+1;
						amount.attr("data-a",na);
						amount.text(na+"笔投资");
						
						var t = data.progress+"%";
						var per = amount.siblings("span");
						per.text(t);
						curSch.schArc();
						getIsLogin();
						f.get(0).reset();
						//showTip("投标成功","恭喜您，投标成功！投标金额："+data.investAmount+";投标收益："+data.incomeAmount,"ok");
						
						var total_l = $("body").width() ,l = (total_l - 502)*0.5;
						var left = Math.round((l/total_l)*100);
						left += "%";
						
						$.blockUI({
							title:"",
							message:"<div class='modaltip ok'><div><div class='smile'><p class='txt' style='font-weight:bold;margin-bottom: 10px;'>恭喜您，投标成功！</p><p class='txt'>投标金额：￥"+formatCurrency(data.investAmount)+"</p><p class='txt'>投标收益：￥"+formatCurrency(data.incomeAmount)+"</p><br/></div><p class='btn_p tl_center'><button class='okBtn' onclick='$.unblockUI();location.reload();'>知道了</button></p></div><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>",
							css:{
								width:'502px',
								left:left,
								cursor:'auto',
								top:"200px"
								},
							overlayCSS: {
								cursor:'auto'
								}
						});
						
					}else{
						showTip("投标失败","投标失败！","error");
					}
				}else{
					showTip("投标失败","投标失败！","error");
				}
				$(".curBid").removeClass("curBid");
			}
			
		});
	}
	
	function getInt(a){
		return parseFloat(a).toFixed(0);
	}
	
	function getSub(a){
		a = a*100;
		a = parseFloat(a).toFixed(0);
		var sub = a % 100;
		if(sub==0){
			return "00";
		}else{
			return sub;
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
	
	
});

//关闭弹出窗
function closeWarn(){
	$.unblockUI();
	$(".tbody form").removeClass("cur");
}

//设置投标金额
function setValue(){
	$.unblockUI();
	var f = $(".tbody form.cur");
	f.find(".money").val(f.find("input[name='validBid']").val());
	f.removeClass("cur");
}