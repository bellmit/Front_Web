/**
* 我的账户-银行卡信息
* author : liyuzhong
***/
$(document).ready(function(e) {
	
	/**/
	init();
	
	/*页面初始化*/
	function init(){
		
		hasCard();
		checkCardAmount();
		//银行卡号输入框交互
		$("input#cardnum").blur(function(){ 
			var l = $(this).val().length;
			if(15 < l){
				hasAdded($(this).val());
				}
			})
		
		//城市选择器
		$(".place_pro").chooseCity();
		$(".place_pro2").chooseCity();
		
		//设置默认体现卡的样式
		$("input[name='defaultCard']").parent(".card").addClass("defaultCard");
		if($("#defaultCard").size()!=0){
			$("#addform .defcard").removeAttr("checked");
		}
		//是否已经绑定默认提现银行卡
		$(".defcard").click(function(e){
			if($("#defaultCard").size()!=0){
				if(confirm("当前已存在默认体现卡，是否确认更换默认体现卡？")){
					$(this).attr("checked","checked");
				}else{
					$(this).removeAttr("checked");
				};
			}
		})
	}
	
    /*利用body来拦截点击事件*/
	$("body").click(function(e){
		
		var $target = $(e.target);
		actiontype = $target.attr("actiontype");
		if(!actiontype){return;}
			
		switch(actiontype){
			case "addcard":
				addcard({});
				break;
			case "editcard":
				editcard($target);
				break;
			case "delcard":
				delcard($target);
				break;
			case "confirmdel":
				deleteCard($target);
				break;
			case "closetip":
				closetip($target);
				break;
			default:
			}
	});
	
	//关闭提示框
	function closetip(obj){
		var $tipbox = obj.parents(".tipbox").slideUp();
	}
	
	function checkCardAmount(){
		
		if($(".card").length > 6){
			$(".notaddtip").slideDown();
			$("#new").fadeOut();
			return false;
		}else{
			$(".notaddtip").hide();
			$("#new").fadeIn();
			return true;
		}
		
	}
	
	/*添加银行卡*/
	function addcard(card){
		
		var left = getLeft("#addform");
		
		if(!checkCardAmount()){
			return false;
			}
		var isR = isRealPer();   //检测是否已经完成实名认证
		//var isR = false;
		if(isR){  //未完成实名认证
			$.blockUI({  
				title:'未实名认证', 
				message:'您还未实名认证，为了您的账户及资金安全，请先完成<a href="../security/security.html" target="_blank" onclick="$.unblockUI();">实名认证</a>',
				css:{
					width:'auto',
					cursor:'auto'
					},
				overlayCSS: {
					cursor:'auto'
					},
				onOverlayClick: $.unblockUI
			});
			return false;
			}
		
		$("#editform h3").text("添加银行卡");
			
		$.blockUI({ 
				message:  $("#addform"),
				css:{
					top:"20%",
					left:left,
					width:"600px",
					cursor:'auto'
					},
				overlayCSS: {
					cursor:'auto'
					},
				onOverlayClick: $.unblockUI 
			});
	}
	
	/*编辑银行卡*/
	function editcard(obj){
		var id = obj.attr("bankCardIds");
		getCardInfo(id);
	}
	
	//拉取银行卡信息
	function getCardInfo(id){
		var card; 
		$.ajax({
			url:"queryBankCardBybankCardId",
			type:"post",
			data:{"bankCardId":id},
			success: function(data){
				if(data.status=="y"){
					card = data.bankCard;
					var cardform = $("#cardform","#editform");
					//填充银行卡信息
					cardform.find("#pl_bankCardId").val(data.bankCard.bankCardId);
					cardform.find("#e_bank").val(data.bankCard.cardType);
					cardform.find("#place_pro").val(data.bankCard.province);
					cardform.find("#place_city").val(data.bankCard.city);
					cardform.find("#e_subbank").val(data.bankCard.detailAddress);
					cardform.find("#e_cardnum").val(data.bankCard.cardNo);
				    if(data.bankCard.isDefault==1){
				    	cardform.find("#defcard").attr("checked","true");
				    }
					
					var left = getLeft("#editform");
		
						$.blockUI({
							message:$("#editform"),
							css:{
								top:"20%",
								left:left,
								width:"600px",
								cursor:'auto'
								},
							overlayCSS: {
								cursor:'auto'
								},
							onOverlayClick: $.unblockUI 
						});
					}else{
					alert("拉取银行卡信息失败！")
					}
				}
			})
	}
	
	/*删除银行卡*/
	function delcard(obj){
		var id = obj.attr("bankcardid");
		$("#confirmDel").find(".confirmdel").attr("bankCardId",id);
		$.blockUI({
			message:$("#confirmDel"),
				css:{
				top:"20%",
				left:"35%",
				cursor:'auto'
				},
			overlayCSS: {
			cursor:'auto'
			},
			onOverlayClick: $.unblockUI 
		});
	}
	
	//确定删除银行卡
	function deleteCard(obj){
		var id = obj.attr("bankCardId");
		$.ajax({
			url:"deleteBankCard",
			type:'POST',
			data:{"bankCardId":id},
			success: function(data){
				if(data.status =="y"){
					$.unblockUI();
					$.blockUI({message:"<div class='result ok'><span class='ok'></span><span class='txt'>" + data.info + "</span></div>"});
					setTimeout(function(){ $.unblockUI(); window.location.reload();},3000);
				}else{
					$.unblockUI();
					$.blockUI({message:"<div class='result error'><span class='error'></span><span class='txt'>" + data.info + "</span></div>"});
					setTimeout(function(){ $.unblockUI(); window.location.reload();},3000);
				}
				}
			})
		}
	
	//是否已经绑定过一个以上的银行卡
	function hasCard(){
		var l = $(".cards .card:not(#new)").length;
		if(l==0){
			var left = getLeft("#nocardtip");
			var nocardtip = $("#nocardtip");
			$.blockUI({
				message:nocardtip,
				css:{
					top:"20%",
					left:left,
					width:"393px",
					cursor:'auto',
					backgroundColor:'transparent',
					border:'none',
					boxShadow:'none',
					cursor:'pointer'
					},
				overlayCSS: {
					cursor:'auto'
					},
				onOverlayClick: $.unblockUI 
			});
			
			nocardtip.click(function(){
				$.unblockUI();
				});
		}
	}
	
	/*检测是否已经完成实名认证*/
	function isRealPer(){
	  $.post("examineIdNumber","",function(data){
		 return data.result;
	  });
		   
	}
	
	//检测是否已经绑定某一张卡为默认提现卡
	function hasDefCard(){
		
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
	
	/*绑定表单验证*/
	$(".cardform").Validform({
		ajaxPost:true,
		beforeSubmit:function(curform){
			submitForm(curform);
			return false;
		},
		tiptype:function(msg,o,cssctl){
			if(!o.obj.is("form")){
				var objtip=o.obj.siblings(".Validform_checktip");
				cssctl(objtip,o.type);
				objtip.text(msg);
			}
		},
	});
	
	//提交表单
	function submitForm(f){
		var action = f.attr("action"), name = f.attr("name");
		var data = {};
		data.cardType = f.find("select[name='cardType']").val();
		data.province = f.find("input[name='province']").val();
		data.city = f.find("input[name='city']").val();
		data.detailAddress = f.find("input[name='detailAddress']").val();
		data.cardNo = f.find("input[name='cardNo']").val();
		data.isDefault = f.find("input[name='isDefault']").attr("checked") == "checked"? 1 : 0;
		data.bankCardId = f.find("input[name='bankCardId']").val();
		$.ajax({
			url:action,
			data:data,
			type:'post',
			success:function(data){
				$.unblockUI();
				if(data.status=="y"){
					$.blockUI({message:"<div class='result ok'><span class='ok'></span><span class='txt'>" + data.info + "</span></div>"});
				}else{
					$.blockUI({message:"<div class='result error'><span class='error'></span><span class='txt'>" + data.info + "</span></div>"});
				}
				setTimeout(function(){ $.unblockUI(); window.location.reload();},3000);
			}
		})
	}
	
	
	/*yipin parts*/
	/*页面元素引用*/
	var mc_chsou=$("#mc_cashhave"),mc_chtar=$("#tradeAmount"),mc_chtips=$("#mc_cashalltips"),mc_cserver=$("#mc_cashserver"),mc_cramount=$("#mc_crealamount"),mc_cashtime=$("#mc_cashtime");
	var mc_cashvip=$("#mc_cashvip"),mc_cashcardnum=$("#mc_cashcardnum");/*隐藏域信息：vip、卡号id*/
	var mc_ccardnum=0;
	/*初始化*/
	/*全部提现init*/
	if(parseInt(mc_chsou.text().slice(1,-3).replace(/\,+/g,""))>=100){
		$("#mc_cashall").removeClass("mc_uncashall").removeAttr("disabled","disabled");
	}else if(parseInt(mc_chsou.text().slice(1,-3).replace(/\,+/g,""))<100){
		$("#mc_cashall").addClass("mc_uncashall").attr("disabled","disabled");
	}
	/*获取银行卡init*/
	$.ajax({
		url:"查询银行卡号地址",
		data:"cardNo="+mc_cashcardnum.val(),
		type:"post",
		dataType:"json",
		success:function(res){
			/*
			var tempres=eval('('+res+')');
			if(tempres.length>0){
				mc_ccardnum=tempres["cardNo"]
			}else{
				mc_ccardnum=0
			}*/
		},
		error:function(){
			mc_ccardnum=0
		}
	});
	/*绑定提现金额填写表单验证*/
	var mc_cashobj=$(".mc_cashaction").Validform({
		ajaxPost:true,
		/*参数说明：
		  msg：提示信息;
			o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
	   cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）; */
		tiptype:function(msg,o){
			var curid=o.obj[0].id+"_tips",curtype=o.type;
			var exccid=null;
			if(curtype==1||curtype==3){
				$("#"+curid).html(msg).addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");
			}else if(curtype==2){
				if($("#"+curid).text()!=""){
					$("#"+curid).html(msg).addClass("mc_cashtipsucc").removeClass("mc_cashtiperror");
					clearTimeout(exccid);
					exccid=null;
					exccid=setTimeout(function(){
						$("#"+curid).html("").removeClass("mc_cashtipsucc mc_cashtiperror");
					},2000);
				}
			}
		},
		beforeSubmit:function(curform){
			/*
			to do
			ajax execute
			*/
			$.blockUI({css:{"left":"34%"},message:$("#popup_reloadbox")});
			if(mc_ccardnum!=0||mc_ccardnum!=""){
				$.ajax({
					url:"提交请求地址",
					type:"post",
					data:"银行卡号="+mc_ccardnum+"&提现金额="+$("#tradeAmount").val(),
					dataType:"json",
					success:function(){
						
					},
					error:function(){
						
					}	
				});
			}
			return false;	
		}
	});
	mc_cashobj.addRule([
	{
        ele:"#tradeAmount",
        datatype:/^(([1-9]\d{3,5})(\.\d{2}))$|(0\.0?([1-9]\d?))$/,
        nullmsg:"提现金额不能为空",
        errormsg:"提现金额额度有无或格式错误",
		sucmsg:"ok"
    },
    {
        ele:"#cashpwd",
        datatype:"*6-12",
        nullmsg:"请输入交易密码！",
        errormsg:"交易密码范围在6~12位之间！",
		sucmsg:"ok"
    },
    {
        ele:"#cashvalidcode",
        datatype:"n6-6",
        nullmsg:"请输入验证码",
        errormsg:"验证码错误",
		sucmsg:"ok"
    }
	]);
	/*计时器*/
	var codecounts=(function(){var cc=0;return function(){return ++cc;}}());
	var ccount_id=null;
	/*绑定提现金额获取验证码*/
	/*获取验证码*/
	$("#mc_getvcode").removeClass("mc_unvcodes").removeAttr("disabled");
	$("#mc_getvcode").click(function(){
			clearInterval(ccount_id);
			ccount_id=null;
			var curobj=$(this);
			var c_count=1;
			curobj.addClass("mc_unvcodes").attr({"disabled":"disabled"});
			curobj.val("60秒后重新获取");
			/*计时*/
			ccount_id=setInterval(function(){
				c_count=codecounts();
				c_count<=60?c_count=c_count:c_count=c_count%60;
				curobj.val(parseInt(60-c_count)+"秒后重新获取");
				if(c_count==60||c_count==0){
					clearInterval(ccount_id);
					ccount_id=null;
					curobj.val("获取验证码");
					curobj.removeClass("mc_unvcodes").removeAttr("disabled");
				};
			},1000);
	});
	/*提示信息展示*/
	$("#mc_cashcost").hover(function(){
		$(this).next().show();
	},
	function(e){}).next().hover(function(){},function(){
		$(this).hide();
	});
	/*全部提现*/
	$("#mc_cashall").live("click",function(){
		if(mc_ccardnum==0||mc_ccardnum==""){
			mc_chtips.text("您还没有选择银行卡,无法提现");
			setTimeout(function(){
				mc_chtips.html("");
			},2000);
			return false;
		}
		var curobj=$(this);
		var chsou_val=parseInt(mc_chsou.text().slice(1,-3).replace(/\,+/g,""));
		handleAmountInfo(chsou_val);
		curobj.addClass("mc_uncashall").attr({"disabled":"disabled"});
		mc_cashtime.html(handleToAccountTime());
	});
	/*绑定提现输入事件*/
	$("#tradeAmount").live("focusout",function(){
		if(mc_ccardnum==0||mc_ccardnum==""){
			mc_chtips.text("您还没有选择银行卡,无法提现");
			setTimeout(function(){
				mc_chtips.html("");
			},2000);
			return false;
		}
		var curobj=$(this),curtext=curobj.val();
		var currule=/^(([1-9]\d{3,5})(\.\d{2}))$|(0\.0?([1-9]\d?))$/;
		if(!currule.test(curtext)){
			return false;
		}else{
			var temptext=curtext.slice(0,-3);
			handleAmountInfo(temptext);
			mc_cashtime.html(handleToAccountTime());
		}
	});
	/*弹出层事件绑定*/
	$("#popup_reloadclose,#popup_sure").click(function(e){
		var curid=e.target.id;
		$.unblockUI();
		if(curid=="popup_sure"){
			/*
			to do
			可能要做回调处理
			*/
		}
	});
	/*处理手续费和实际金额*/
	function handleAmountInfo(soustr){
		if(soustr<100){
			mc_chtips.text("账户余额不足100元,无法提现");
			setTimeout(function(){
				mc_chtips.html("");
			},2000);
			return false;
		}else if(soustr>=1000000){
			mc_chtar.val("999999.00");
			var tempaa=parseInt(999999/50000)*3;
			if(mc_cashvip.val()==-1||mc_cashvip.val()>3){
				mc_cserver.html("￥"+tempaa+".00");
				mc_cramount.html("￥"+Number(999999-tempaa)+".00");
			}else{
				mc_cserver.html("￥0.00");
				mc_cramount.html("￥999999.00");
			}
		}else{
			mc_chtar.val(soustr+".00");
			var tempbb=0;
			if(soustr<20000&&soustr>=100){
				tempbb=2;
			}else if(soustr>=20000&&soustr<100000){
				tempbb=4;
			}else if(soustr>=100000&&soustr<1000000){
				tempbb=parseInt(soustr/50000)*3;
			}
			if(mc_cashvip.val()==-1||mc_cashvip.val()>3){
				mc_cserver.html("￥"+tempbb+".00");
				mc_cramount.html("￥"+Number(soustr-tempbb)+".00");
			}else{
				mc_cserver.html("￥0.00");
				mc_cramount.html("￥"+soustr+".00");
			}
		}
	}



});



function handleToAccountTime(){
	var curdateobj=new Date();
	var curxq=curdateobj.getDay(),curday=curdateobj.getDate(),curmonth=curdateobj.getMonth()+1,curyear=curdateobj.getFullYear();
	var maxdays=is_LeapYear(curyear,curmonth);
	var tempdays=0;
	if(curdateobj.getDay(curday)==5){
		 tempdays=parseInt(curday+3);
	}else if(curdateobj.getDay(curday)==6){
		 tempdays=parseInt(curday+2);
	}else{
		 tempdays=parseInt(curday+1);
	}
	if(tempdays>maxdays){
		curday=tempdays-maxdays;
		curmonth=parseInt(curmonth+1);
		if(curmonth>12){
			curmonth=1;
			curyear=parseInt(curyear+1);
		}
	}else{
		curday=tempdays;
	}
	curmonth=curmonth<10?"0"+curmonth:curmonth;
	curday=curday<10?"0"+curday:curday;
	return curyear+"-"+curmonth+"-"+curday
}
/*判断闰年并获取月份值*/
function is_LeapYear(ys,ms){
	var mcds=[31,28,31,30,31,30,31,31,30,31,30,31];
	var isly=ys%4==0&&ys%100!=0?true:ys%400==0?true:false;
	ms==2&&isly?mcds.splice(1,1,29):mcds.splice(1,1,28);
	return mcds[ms-1];
}








