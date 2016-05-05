// JavaScript Document
$(document).ready(function(e) {
    
	init();
	var h = $(window).height();
	var top = h-40;
	top = top /2;
	
	//初始化
	function init(){
		
		//绑定拦截器
		$("body").click(router);
		$(".filter").click(filter);
		$(".orderby span").click(orderBy);
		$(".schbox").schArc();
		getIsLogin();
		getDatas(location.href);
		
		$("#login.modalbox .closebtn").click(closeLogin);
	}
	
	//更新分页
	function setPage(pageCount,currPage){
		$("#page").myPagination({
			cssStyle:'jogger',
			pageCount:pageCount,
			currPage:currPage,
			ajax:{
				on:false,
				onClick:function(page){
					getDatas(location.href,{currentPage:page});
				}
			}
		});
	}
	
	
	function getIsLogin(){
		$.ajax({
			url:"../user/loginChecked",
			type:"post",
			data:{},
			success:function(data){
				if(data){
					if(data.login=="Y"){
						$("#isLogin").val("1");
						var availableAmount = parseFloat(data.availableAmount).toFixed(2);
						
						$("#usable").attr("data-v",availableAmount);
						$("#usable").find(".int").text(getInt(availableAmount));
						$("#usable").find(".sub").text(getSub(availableAmount));
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
			
	//页面拦截器
	function router(e){
		var $target = $(e.target), actiontype = $target.attr("actiontype");
		switch(actiontype){
			case "bid":
				break;
		}	
	}
	
	//数据过滤器
	function filter(e){
		if(e.target.tagName!="A"){return false;}
		var $target = $(e.target), isRecharge = $target.hasClass("recharge");
		if(isRecharge){ return true;}
		
		var input = $target.parents(".line").find("input"),
		li = $target.parent("li"),
		v = $target.attr("data-v"), 
		url = $target.attr("href");
		
		input.val(v);
		li.addClass("cur").siblings(".cur").removeClass("cur");
		
		getDatas(location.href,{currentPage:1});
	}
	
	//数据排序
	function orderBy(e){
		var $target = $(e.target), p = $target.parent(), tr = $target.parents(".tr"); input = $target.siblings("input"), v = input.val();
		v = v==1? 0: 1;
		input.val(v)
		tr.find(".cur").removeClass("cur");
		p.addClass("cur");
		if(v==1){
			p.removeClass("down").addClass("up");
		}else{
			p.removeClass("up").addClass("down");
		}
		
		getDatas(location.href);
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
		
		var left = getLeft("#login");
		$("#login").css("left",left);
		$("#login").show();
		$("#login").animate({top:"0px"});
	}
	
	function submitBid(e){
		var isLogin = $("#isLogin").val();
		if(isLogin==0){
			bid();
		}else{
			var f = $(e.target).parents("form");
			var money = f.find(".money"), v = money.val();
			checkMoney(f,v);
		}
	}
	
	
	function checkMoney(f,gets){
		var reg = /^[1-9]\d*\.?\d{0,2}$/;
		if(gets==""){
			$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>投标金额需不能为空</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
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
				message:'<div class="warn"><p>投标金额需大于等于1,且最多保留两位小数</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
		}else if(gets < 1){
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
		}else{
			var usable = $("#usable").attr("data-v");
			usable = parseFloat(usable);
			if(gets>usable){
				$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>账户余额不足，立即去<a href="../../res/fund/trade/rechargeInit" target="_blank">充值</a></p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
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
					}else if(data.success==false){
						showTip("投标失败",data.errorMessage,"warn");
					}else if(data.success==true){
						
						var curTr = $(".curBid").parents(".tr");
						var curSch = curTr.find(".schbox");
						data.progress = parseFloat(data.progress)*100;
						curSch.attr("data-v",data.progress);
						var amount = curSch.find(".amount"), na = amount.attr("data-a");
						na = parseInt(na)+1;
						amount.attr("data-a",na);
						amount.text(na+"笔投资");
						curSch.find(".per").text(data.progress+"%");
						curSch.schArc();
						getIsLogin();
						f.get(0).reset();
						showTip("投标成功","恭喜您，投标成功！投标金额："+data.investAmount+";投标收益："+data.incomeAmount,"ok");
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
	
	//异步获取数据
	function getDatas(url){
		var tdata = arguments[1]? arguments[1]:{};
		var data = getReqData();
		data = $.extend({},data,tdata);
		$.ajax({
			url:url,
			type:"post",
			data:data,
			success: function(data){
				if(data){
					handleData(data);
					$(".schbox").schArc();
					$(".bidform .finSubmit").click(submitBid);
				}
			},
			error:function(){
				alert("数据请求失败！")
			}
		})	
	}
	
	//数据处理器
	function handleData(data){
		var amount = parseFloat(data.availableAmount);
		$("#usable").attr("data-v",amount);
		
		$("#usable .int").text(getInt(amount));
		$("#usable .sub").text(getSub(amount));
		
		//如果没有数据
		if(data.totalCount==0){
			$(".tbody").html('<div class="tr nodata"><p>没有可投资的项目</p></tr>');
			$(".tfoot").hide();
			return false;
		}
		setPage(data.totalPage,data.currentPage);
		var rows = data.models, l = rows.length, i, str = "";
		
		for(i=0; i<l;i++){
			
			rows[i].progress = rows[i].progress = null ? 0:rows[i].progress;
			rows[i].progress = parseFloat(rows[i].progress*100).toFixed(2);
			rows[i].hearImg = rows[i].hearImg==""? "../../res/image/finan/photo.png":"http://192.168.2.239/"+rows[i].hearImg;
			
			rows[i].binLevel = rows[i].binLevel==null ? "F3":rows[i].binLevel;
			rows[i].totalCount = rows[i].totalCount == null ? 0:rows[i].totalCount;
			
			str += '<div class="tr">'
				+ '<div class="th th1">'
				+ '<div class="photo"><img src="' +rows[i].hearImg+'" width="75" height="75" alt="头像" /></div>' //照片
				+ '<div class="left">'
				+ '<p class="tit"><a href="../../res/js/finan/detail?productId=' + rows[i].productId +'#'+rows[i].status+'">'+ rows[i].loanTitle +'</a></p>'   //标题
				+ '<p class="name"><a href="../../res/js/user/detail?productId='+ rows[i].productId +'">'+ rows[i].userName +'</a></p>'    //用户名
				+ '<p class="type"><a href="javascript:;">'+ loanType[rows[i].loanType] +'</a></p>'   //标的类型
				+ '</div>'
				+ '</div>'
				+ '<div class="td td2">'
				+ '<span class="level '+rows[i].binLevel+'">'+ rows[i].binLevel +'</span>'  //信用等级
				+ '</div>'
				+ '<div class="td td3">'
				+ '<span>'+ rows[i].annualRate +'%</span>'   //年利率
				+ '</div>'
				+ '<div class="td td4">'
				+ '<span>'+ rows[i].loanAmount +'</span>'  //借款金额
				+ '</div>'
				+ '<div class="td td5">'
				+ '<span>'+ rows[i].loanPeriod +'个月</span>'   //期限
				+ '</div>'
				+ '<div class="td td6">'
				+ '<span data-v="'+ rows[i].progress +'" class="schbox">'  //筹标进度
				+ '<span class="amount" data-a="'+rows[i].totalCount+'">'+ rows[i].totalCount+'笔投资</span>'
				+ '<span class="per">'+ rows[i].progress +'%</span>'  //筹标进度
				+ '<canvas width="60" height="60"></canvas>'
				+ '</span>'  
				+ '</div>';
			
			str += addTd7(rows[i])
			
			str += '</div>';
		}
		
		$(".tbody").html(str);
		$(".tfoot").show();
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
	
	function addTd7(row){
		var str = "";
		row.progress = row.progress/100;
		var last = parseFloat(row.loanAmount)*(1-parseFloat(row.progress));
		last = last.toFixed(2);
		if(row.status == 0){
			str += '<div class="td td7">' 
				+ '<form name="fin" data-pid="'+row.productId+'" action="../../res/fund/trade/addInvestment" class="bidform" method="post">'
				+ '<input type="text" name="money" class="money" datatype="money" errormsg="投标金额需大于等于1" nullmsg="请输入投标金额" placeholder="投标金额" maxlength="8">'
				+ '<button type="button" class="finSubmit" actiontype="bid">马上投标</button>'
				+ '</form>'
				+ '</div>'
		}else if(row.status == 1){
			str +='<div class="td td7">'
				+ '<span class="status check">满标复核中</span>'
				+ '</div>';
		}else if(row.status == 2){
			str +='<div class="td td7">'
				+ '<span class="status flow">已流标</span>'
				+ '</div>';
		}else if(row.status == 3){
			str +='<div class="td td7">'
				+ '<span class="status repaying">还款中</span>'
				+ '</div>';
		}else if(row.status == 4){
			str +='<div class="td td7">'
				+ '<span class="status repaied">已还完</span>'
				+ '</div>';
		}
		return str;
	}
	
	//获取求情数据
	function getReqData(){
	 	var data = {};
		data.rnd = Math.random();
		if($("#bidtype").val()!="all"){
			data.loanType = $("#bidtype").val();
		}
		
		if($("#rate").val()!="all"){
			var rate = $("#rate").val();
			rate = rate.split("-");
			if(rate.length>1){
				data.beginAnnualRate = rate[0];
				data.endAnnualRate = rate[1];
			}else if(rate.length<2){
				data.beginAnnualRate =  rate[0];
				data.endAnnualRate = '100';
			}
		}
		
		if($("#deadline").val()!="all"){
			var deadline = $("#deadline").val();
			deadline = deadline.split("-")
			if(deadline.length>1){
				data.beginLoanPeriod = deadline[0];
				data.endLoanPeriod = deadline[1];
			}else if(deadline.length<2){
				data.beginLoanPeriod =  deadline[0];
				data.endLoanPeriod = 48;
			}
		}
		
		if($("#level").val() !="all"){
			data.binLevel = $("#level").val();
		}
		
		if($(".thead .cur").size() != 0){
			data.orderItem = $(".thead .cur input").attr("name");
			data.orderRule = $(".thead .cur input").val();
			data.orderRule = data.orderRule == 0? 'DESC':'ASC';
		}
		data.currentPage = $("#page .current").attr("title");
		data.pageSize = 15;
		return data;
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

	var loanType = {CREDIT:"信用标", GUARANTEE:"担保标", MORTGAGE:"抵押标"};
});