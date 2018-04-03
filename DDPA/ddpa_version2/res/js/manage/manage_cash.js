/**
* 我的账户-银行卡信息(提现)
* author : liyuzhong(提现)
***/
$(document).ready(function(e) {

	/*yipin parts*/
	var isvalidcode="",init_mcshsou=0,treload="";
	/*页面元素引用*/
	var mc_chsou=$("#mc_cashhave"),mc_chtar=$("#tradeAmount"),mc_chtips=$("#mc_cashalltips"),mc_cserver=$("#mc_cashserver"),mc_cramount=$("#mc_crealamount"),mc_cashtime=$("#mc_cashtime"),mc_tatip=$("#tradeAmount_tips"),mc_cashlimit=$("#mc_cashlimit");
	/*隐藏域信息：vip、卡号id、提现费用*/
	var mc_cashvip=$("#mc_cashvip"),mc_ccardnum=$("#toAccount"),mc_cashtb=$("#tradeBalance");
	/*表单初始化值*/
	var mc_cvip=mc_cashvip.val();
	/**/
	init();
	/*yipin parts*/
	/*初始化*/
	init2();
	/*全部提现按钮初始化*/
	function init2(){
		/*加location hash */
		var trurl=window.location.href;
		var isreload=trurl.indexOf("#reload");
		if(isreload!=-1){
			treload=trurl.slice(0,isreload);
		}else{
			treload=trurl;
		}
		/*初始化默认选择银行*/
		if($("span.cno").length!=0){
			var tempchknum=$("span.cno").next("input").val();
			tempchknum=tempchknum.replace(/(\s*)/g,"");
			mc_ccardnum.val(tempchknum);
			$("div.card:first").addClass("checked");
		}else{
			mc_ccardnum.val("");
		}
		/*如果是第二次充值或者失败后重新加载页面*/
		if(window.location.hash=="#reload"){
			initCNCook();
		}
		/*判断数据合法性*/
		if(mc_chsou.text().indexOf(".")!=-1){
			var tempmcch1=mc_chsou.text().replace(/(\,*)/g,"");
			tempmcch1=tempmcch1.replace(/(\s*)/g,"");
			tempmcch1=tempmcch1.split(".");
			var tmcchpart1=tempmcch1[0],tmcchpart2=tempmcch1[1];
			tmcchpart1=tmcchpart1.replace(/(\D*)/g,"");
			tmcchpart2=tmcchpart2.replace(/(\D*)/g,"");
			init_mcshsou=tmcchpart1+"."+tmcchpart2;
			if(init_mcshsou>=100&&mc_ccardnum.val()!=""){
				$("#mc_cashall").removeClass("mc_uncashall").removeAttr("disabled","disabled");
			}else if(init_mcshsou<100||mc_ccardnum.val()==""){
				$("#mc_cashall").addClass("mc_uncashall").attr("disabled","disabled");
			}
		}else if(mc_chsou.text().indexOf(".")==-1){
			var tempmcch2=mc_chsou.text().replace(/(\,*)/g,"");
			tempmcch2=tempmcch2.replace(/(\s*)/g,"");
			tempmcch2=tempmcch2.replace(/(\D*)/g,"");
			init_mcshsou=tempmcch2+".00";
			if(init_mcshsou>=100&&mc_ccardnum.val()!=""){
				$("#mc_cashall").removeClass("mc_uncashall").removeAttr("disabled","disabled");
			}else if(init_mcshsou<100||mc_ccardnum.val()==""){
				$("#mc_cashall").addClass("mc_uncashall").attr("disabled","disabled");
			}
		}
	}
	/*判断是否符合可以显示全部提现的条件*/
	function isAllValid(){
		if(mc_chsou.text().indexOf(".")!=-1){
			var tempmcch1=mc_chsou.text().replace(/(\,*)/g,"");
			tempmcch1=tempmcch1.replace(/(\s*)/g,"");
			tempmcch1=tempmcch1.split(".");
			var tmcchpart1=tempmcch1[0],tmcchpart2=tempmcch1[1];
			tmcchpart1=tmcchpart1.replace(/(\D*)/g,"");
			tmcchpart2=tmcchpart2.replace(/(\D*)/g,"");
			init_mcshsou=tmcchpart1+"."+tmcchpart2;
			if(init_mcshsou>=100&&mc_ccardnum.val()!=""){
				$("#mc_cashall").removeClass("mc_uncashall").removeAttr("disabled","disabled");
			}else if(init_mcshsou<100||mc_ccardnum.val()==""){
				$("#mc_cashall").addClass("mc_uncashall").attr("disabled","disabled");
			}
		}else if(mc_chsou.text().indexOf(".")==-1){
			var tempmcch2=mc_chsou.text().replace(/(\,*)/g,"");
			tempmcch2=tempmcch2.replace(/(\s*)/g,"");
			tempmcch2=tempmcch2.replace(/(\D*)/g,"");
			init_mcshsou=tempmcch2+".00";
			if(init_mcshsou>=100&&mc_ccardnum.val()!=""){
				$("#mc_cashall").removeClass("mc_uncashall").removeAttr("disabled","disabled");
			}else if(init_mcshsou<100||mc_ccardnum.val()==""){
				$("#mc_cashall").addClass("mc_uncashall").attr("disabled","disabled");
			}
		}
	}
	
	/*初始化之前选择的卡号*/
	function initCNCook(){
		var clen=$("span.cno").length;
		if(clen!=0){
			var cardobj=$("span.cno"),csm=$("#csmanage");
			if(window.localStorage){
				var wlsobj=window.localStorage;
				if(typeof wlsobj.getItem("haveno_com")!=null&&wlsobj.getItem("haveno_com")!=null){
					var adatas=wlsobj.getItem("haveno_com");
					csm.find("span.cno").each(function(index, element){
						var cobj=$(element),ctxt=cobj.next("input").val();
						if(ctxt==adatas){
							cobj.parent().parent().addClass("checked").siblings().removeClass("checked");
							mc_ccardnum.val(adatas);
							return false;
						}else if(ctxt!=adatas&&index==clen-1){
							var tempchknum=csm.find("span.cno:first").next("input").val();
							tempchknum=tempchknum.replace(/(\s*)/g,"");
							mc_ccardnum.val(tempchknum);
							csm.find("div.card:first").addClass("checked");
							wlsobj.setItem("haveno_com",tempchknum);
						}
					});
				}else{
					var tempchknum=csm.find("span.cno:first").next("input").val();
					tempchknum=tempchknum.replace(/(\s*)/g,"");
					mc_ccardnum.val(tempchknum);
					csm.find("div.card:first").addClass("checked");
					wlsobj.setItem("haveno_com",tempchknum);
				}
			}else if(!window.localStorage){
				/*不支持本地存储,但支持cookie*/
				var cook_arr="",cookie_obj=document.cookie;
				if(cookie_obj.length>=60){
					/*处理失效情况*/
					var temp_cookarr=cookie_obj.split(";")[0];
					cook_arr=temp_cookarr.split("=");
				}else{
					cook_arr=cookie_obj.split("=");
				}
				if(cook_arr[0]=="haveno_ie"&&cook_arr[1]!="NaN"){
					csm.find("span.cno").each(function(index, element){
						var cobj=$(element),ctxt=cobj.next("input").val();
						if(ctxt==cook_arr[1]){
							cobj.parent().parent().addClass("checked").siblings().removeClass("checked");
							mc_ccardnum.val(cook_arr[1]);
							return false;
						}else if(ctxt!=cook_arr[1]&&index==clen-1){
							var tempchknum=csm.find("span.cno:first").next("input").val();
							tempchknum=tempchknum.replace(/(\s*)/g,"");
							mc_ccardnum.val(tempchknum);
							csm.find("div.card:first").addClass("checked");
							cookie_obj="haveno_ie="+tempchknum;
						}
					});
				}else if(cook_arr[1]=="NaN"){
					var tempchknum=csm.find("span.cno:first").next("input").val();
					tempchknum=tempchknum.replace(/(\s*)/g,"");
					mc_ccardnum.val(tempchknum);
					csm.find("div.card:first").addClass("checked");
					cookie_obj="haveno_ie="+tempchknum;
				}else{
					var tempchknum=csm.find("span.cno:first").next("input").val();
					tempchknum=tempchknum.replace(/(\s*)/g,"");
					mc_ccardnum.val(tempchknum);
					csm.find("div.card:first").addClass("checked");
					cookie_obj="haveno_ie="+tempchknum;
				}
			}
		}
	}
	
	/*卡号操作时保存操作项*/
	function selectCNCook(curtext){
		if(curtext==""||curtext==null||typeof curtext=="undefined"){
			return;
		}
		$("#csmanage").find("span.cno").each(function(index, element){
			var cobj=$(element),ctxt=cobj.next("input").val();
			if(ctxt==curtext){
				if(window.localStorage){
					window.localStorage.setItem("haveno_com",ctxt);
				}else if(!window.localStorage){
					/*不支持本地存储,但支持cookie*/
					document.cookie="haveno_ie="+ctxt;
				}
				return false;
			}
		});
	}
	/*根据是否是VIP用户来设置不同*/
	function vipInfos(){
		if(mc_cvip==-1){
			mc_cashlimit.html("100元&nbsp;&le;&nbsp;提现金额&nbsp;&le;&nbsp;5万元");
		}else{
			mc_cashlimit.html("100元&nbsp;&le;&nbsp;提现金额&nbsp;&le;&nbsp;50万元");
		}
	}
	/*页面初始化*/
	function init(){
		vipInfos();
		hasCard();
		checkCardAmount();
		//银行卡号输入框交互
		$("input#cardnum").blur(function(){ 
			var l = $(this).val().length;
			if(15 < l){
				hasAdded($(this).val());
				}
			})
		//
		$('#newdetailAddress').AutoComplete({
            'data': ['中高', '中国国', '中个人', '惹中的', '奋斗', '的发达', '价格高', '是D', '奥迪', '发达啊', '奋斗到底', '才'],
            'itemHeight': 20,
            'width': 'auto'
        }).AutoComplete('show');
		//$("#newdetailAddress").autocomplete("querySubbranchBankList");
		//提示仅支持借记卡
		$("#cardNo").focus(function(){
			$(this).siblings(".Validform_checktip").addClass("float").text("仅支持借记卡");
		});
		$("#cardNo").blur(function(){
			$(this).siblings(".Validform_checktip").removeClass("float")
		})
		//城市选择器
		$(".place_pro").chooseCity();
		$(".place_pro2").chooseCity();
		
		$(".defcard").checkbox({});
		$(".selectBox").SelectBox();
		$(".card:not(#new)").live("click",function(){
			$(".card.checked").removeClass("checked");
			var checknum=$(this).addClass("checked").find("span.cno").next("input").val();
			checknum=checknum.replace(/(\s*)/g,"");
			mc_ccardnum.val(checknum);
			isAllValid();
			selectCNCook(checknum);
		})
		
		/*/是否已经绑定默认提现银行卡
		$(".defcard").click(function(e){
			var $target = $(e.target);
			if($("#defaultCard").size()!=0 && $target.attr("status")=="checked"){
				if(confirm("当前已存在默认提现银行卡，是否确认更换默认提现银行卡？")){
					$(this).find("input").attr("checked","checked");
					$(this).checkbox({})
				}else{
					$(this).find("input").removeAttr("checked");
					$(this).checkbox({})
				};
			}else{
				$(this).find("input").attr("checked","checked");
				$(this).checkbox({})
			}
		});*/
		
		//修改银行卡号
		$("#e_cardnum").change(isExistBankCard);
	}
	//银行卡号输入处理
	$("input.cardNo").keypress(turnCardNo);
	$("input.cardNo").blur(function(e){
		var $this = $(e.target), no = $this.val();
		$this.val(trimCNOR(no));
	})
	//银行卡号输入检测
	function turnCardNo(event){
		if(event.keyCode==8 || event.keyCode==37 || event.keyCode==39){
			return;
		}
		var $this = $(event.target), no = $this.val();
		if(no.length >= 23){
			return false;
		}
		tno = no.replace(/(\s*)/g,"");
		var l = tno.length
		if(l==4 || l==8 || l==12 || l==16){
			no = no + " ";
			$this.val(no)
		}
		
	}
	
	//检测16位卡号
	function trimCNOR(s){
		var whitespace = new String(" \t\n\r"); 
		var str = new String(s);  
		if (whitespace.indexOf(str.charAt(str.length-1)) != -1){  
			var i = str.length - 1;  
			while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){  
				i--;  
			}  
			str = str.substring(0, i+1);  
		} 
		return str;  
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
	
	function isExistBankCard(e){
		
		var $target = $(e.target);
		var no = $(e.target).val();
		if(!no.match(/^\d{16,19}$/)){
			$target.siblings(".Validform_checktip").addClass("Validform_error").removeClass("Validform_right").text("请输入16-19位的银行卡号");
			return false;
		}
		$.ajax({
			url:"../bank/isExistBankCard",
			type:"post",
			data:{cardNo:no},
			success:function(data){
				if(data.status == "y"){
					$target.siblings(".Validform_checktip").removeClass("Validform_error").addClass("Validform_right").text(data.info);
				}else{
					$target.siblings(".Validform_checktip").addClass("Validform_error").removeClass("Validform_right").text(data.info);
				}
			}
		})
	}
	
	//关闭提示框
	function closetip(obj){
		obj.parents(".tipbox").slideUp();
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
		resetFrom("addcard");
		var left = getLeft("#addform");
		
		if(!checkCardAmount()){
			return false;
			}
		var isR = isRealPer();   //检测是否已经完成实名认证
		//var isR = false;
		if(isR==0){  //未完成实名认证
			$.blockUI({  
				title:'未实名认证', 
				message:'<div class="warn"><p>您还未实名认证，为了您的账户及资金安全，请先完成&nbsp;<a href="../security/securityInit#real" onclick="$.unblockUI();">实名认证</a></p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
				css:{
					width:'auto',
					cursor:'auto'
					},
				overlayCSS: {
					cursor:'auto'
					}
			});
			return false;
			}
		
		
		$.blockUI({ 
				message:  $("#addform"),
				css:{
					top:"20%",
					left:left,
					width:"700px",
					cursor:'auto'
					},
				overlayCSS: {
					cursor:'auto'
					}
			});
	}
	
	/*编辑银行卡*/
	function editcard(obj){
		resetFrom("editcard")
		var id = obj.attr("bankCardIds");
		getCardInfo(id);
	}
	
	//拉取银行卡信息
	function getCardInfo(id){
		var card; 
		$.ajax({
			url:"../bank/queryBankCardBybankCardId",
			type:"post",
			data:{"bankCardId":id},
			success: function(data){
				if(data.status=="y"){
					card = data.bankCard;
					var cardform = $("#cardform","#editform");
					//填充银行卡信息
					cardform.find("input[name='def']").val(data.bankCard.isDefault);
					cardform.find("#pl_bankCardId").val(data.bankCard.bankCardId);
					cardform.find(".e_bank").SelectBox(data.bankCard.cardType);
					cardform.find("#place_pro").val(data.bankCard.province);
					cardform.find("#place_city").val(data.bankCard.city);
					cardform.find("#e_subbank").val(data.bankCard.detailAddress);
					cardform.find("#e_cardnum").val(formatBCNo(data.bankCard.cardNo));
				    if(data.bankCard.isDefault==1 && !cardform.find(".defcard input").attr("checked")){
				    	cardform.find(".defcard").click();
				    }else if(data.bankCard.isDefault==0 && cardform.find(".defcard input").attr("checked")){
				    	cardform.find(".defcard").click();
				    }
					
					var left = getLeft("#editform");
		
						$.blockUI({
							message:$("#editform"),
							css:{
								top:"20%",
								left:left,
								width:"700px",
								cursor:'auto'
								},
							overlayCSS: {
								cursor:'auto'
								}
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
		var card = obj.parents(".card");
		var last4No = card.find("#last4No").val(), bankname = card.find(".banklogo img").attr("alt");
		$("#confirmDel p").text("是否确认删除"+ bankname+"尾号 "+last4No+" 银行卡？");
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
			}
		});
	}
	
	
	//确定删除银行卡
	function deleteCard(obj){
		var id = obj.attr("bankCardId");
		$.ajax({
			url:"../bank/deleteBankCard",
			type:'POST',
			data:{"bankCardId":id},
			success: function(data){
				if(data.status =="y"){
					$.unblockUI();
					$.blockUI({message:"<div class='result ok'><span class='ok'></span><span class='txt'>" + data.info + "</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
				}else{
					$.unblockUI();
					$.blockUI({message:"<div class='result error'><span class='error'></span><span class='txt'>" + data.info + "</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
				}
				setTimeout(function(){ $.unblockUI(); window.location.reload();},4000);
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
					} 
			});
			
			nocardtip.click(function(){
				$.unblockUI();
				});
		}
	}
	
	/*检测是否已经完成实名认证*/
	function isRealPer(){
	  return $("#addform #cardChecked").val();
		   
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
	cardforms = $(".cardform").Validform({
		ajaxPost:true,
		datatype:{
			"addr":/^[\u4E00-\u9FA5A-Za-z0-9]*$/,
			"cardNo":function(gets,obj,curform,regxp){
				gets = gets.replace(/(\s*)/g,"");
				if(gets.match(/^\d{16,19}$/)){
					return true;
				}else{
					return false;
				}
			}
		},
		beforeSubmit:function(curform){
			var $defcard = curform.find(".defcard");
			var has = curform.find("input[name='def']").val();
			if($("#defaultCard").size()!=0 && ($defcard.attr("status")=="checked" && has=="0")){
				var defCard = $("#defaultCard").parents(".card")
				var last4No = defCard.find("#last4No").val(), bankN = defCard.find(".banklogo img").attr("alt");
				if(confirm("当前默认提现银行卡为"+bankN+"尾号"+last4No+"的卡号，是否确认更换？")){
					
				}else{
					$defcard.click();
					return false;
				};
			}
			submitForm(curform);
			return false;
		},
		tiptype:function(msg,o,cssctl){
			if(!o.obj.is("form")){
				var objtip=o.obj.siblings(".Validform_checktip");
				cssctl(objtip,o.type);
				objtip.text(msg);
			}
		}
	});
	
	//提交表单
	function submitForm(f){
		
		var action = f.attr("action"), name = f.attr("name");
		var data = {};
		data.cardType = f.find("input[name='cardType']").val();
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
					$.blockUI({message:"<div class='result ok'><span class='ok'></span><span class='txt'>" + data.info + "</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
				}else{
					$.blockUI({message:"<div class='result error'><span class='error'></span><span class='txt'>" + data.info + "</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
				}
				setTimeout(function(){ $.unblockUI(); window.location.reload();},4000);
			}
		})
	}
	
	//弹出框信息提醒
	function shouWarn(tit, msg, ensure, cancle){
		
		$("#warn h3").text(tit);
		$("#warn p").text(msg);
		$("#warn a.confirmdel").click(ensure);
		$("#warn a.cancle").click(cancle);
		
		var left = getLeft("#warn");
		$.blockUI({
			message:$("#warn"),
				css:{
				top:"20%",
				left:"35%",
				padding:'0px',
				border:'1px solid rgb(67, 67, 67)',
				boxShadow:"0px 0px 3px #434343",
				borderRadius:'8px',
				cursor:'auto'
				},
			overlayCSS: {
			cursor:'auto'
			},
			onOverlayClick: $.unblockUI 
		});
	}
	
	//reset form 
	function resetFrom(formname){
		var f = $("form[name='"+formname+"']");
		f[0].reset();
		f.find(".Validform_error").removeClass("Validform_error");
		f.find(".Validform_wrong").text("");
		f.find(".Validform_checktip").removeClass("Validform_right Validform_wrong");
		f.find("input[name='detailAddress']").siblings(".Validform_checktip").text("若无法确定，请咨询开户银行");
	}
	
	$("#validcode").keyup(checkeVC);
	function checkeVC(e){
		var $target = $(e.target), v = $target.val();
		v = v.replace(/(\s*)/g,"");
		if(v.length < 6){
			return false;
		}
		$.ajax({
			url:"../trade/checkWithdrawCode",
			data:{validcode:v,rnd:Math.random()},
			type:"post",
			success:function(data){
				if(data=="noLogin"){
					
				}else if(data.status=="y"){
					$(".mc_cashsubmit").removeAttr("disabled");
				}else{
					var vctips=$("#validcode_tips");
					vctips.text(data.info);
				}
			}
		});
		
	}
	
	/*yipin parts*/
	/*绑定提现金额填写表单验证*/
	var mc_cashobj=$(".mc_cashaction").Validform({
		ajaxPost:true,
		datatype:{
			"valid_tamount":function(gets,obj,curform,regxp){
				return testTradeAmount(gets,mc_cvip);
			}
		},
		/*参数说明：
		  msg：提示信息;
			o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
	   cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）; */
		tiptype:function(msg,o){
			var objid=o.obj[0].id,curid=objid+"_tips",curtype=o.type;
			var exccid=null;
			if(curtype==1||curtype==3){
				$("#"+curid).html(msg).addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");
			}else if(curtype==2){
				var ii=document.getElementById("validcode");
				if($("#"+curid).text()!=""){					
					$("#"+curid).html(msg).addClass("mc_cashtipsucc").removeClass("mc_cashtiperror");
					clearTimeout(exccid);
					exccid=null;
					if(objid=="validcode"){
						exccid=setTimeout(function(){
							$("#"+curid).html("").removeClass("mc_cashtipsucc mc_cashtiperror");
						},500);
					}else{
						exccid=setTimeout(function(){
							$("#"+curid).html("").removeClass("mc_cashtipsucc mc_cashtiperror");
						},2000);
					}
				}
			}
		},
		beforeSubmit:function(curform){
			curform.find(".mc_cashsubmit").attr("disabled",true);
			if(mc_ccardnum.val()==""||mc_ccardnum.val()==-1||mc_ccardnum.val()=="undefined"||typeof mc_ccardnum.val()=="undefined"){
				infoTipAuto("您还没有选择(添加)银行卡","explain",{"left":"30%","top":"20%","width":"554"},5);
				mc_ccardnum.val("");
			}else{
				/*var ii=$("#validcode");
				if(ii.val()!=isvalidcode&&ii.val()!=""){
					var jj=$("#validcode_tips");
					jj.html("验证码错误").addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");
					setTimeout(function(){
						jj.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
					},2000);
				}else{*/
					var url =$('form[id=mc_cashaction]').attr('action');
					var params =$('form[id=mc_cashaction]').serialize();
					$.ajax({
						type:'post',
						url:url,
						data : params,
						dataType : 'json',
						success : function(data){
							if(data){
								if (data.success) {
									$.blockUI({css:{"left":"34%","width":"600px","border":"0px","boxShadow":"none"},message:$("#popup_reloadbox")});
								}else{
									infoTipAuto("失败:"+data.msg,"explain",{"left":"25%","top":"20%","width":"754"},3);
									$(".mc_cashsubmit").removeAttr("disabled");
									$("#validcode").val("");
									/*$("#itips_close").live("click",function(){
										location.hash = "reload";
										location.reload();
									});
									setTimeout(function(){
										location.hash = "reload";
										location.reload();
									},3000);*/
								}
							}else{
								infoTipAuto("失败:交易验证码错误！","explain",{"left":"25%","top":"20%","width":"754"},3);
								$(".mc_cashsubmit").removeAttr("disabled");
								$("#validcode").val("");
							}
						},
						error:function(data){
							infoTipAuto("失败:"+data.msg,"err",{"left":"25%","top":"20%","width":"754"},3);
							$("#itips_close").live("click",function(){
								location.hash = "reload";
								location.reload();
							});
							setTimeout(function(){
								location.hash = "reload";
								location.reload();
							},3000);
						}	
					});
			}
			return false;
		}
	});
	mc_cashobj.addRule([
	{
        ele:"#tradeAmount",
        datatype:"valid_tamount",
        nullmsg:"提现金额不能为空",
		errormsg:"提现金额输入错误，正确格式需为XX.XX",
		sucmsg:"ok"
    },
    {
        ele:"#tradePassword",
        datatype:"*6-20",
        nullmsg:"请输入交易密码！",
        errormsg:"交易密码范围在6~20位之间！",
		sucmsg:"ok"
    },
    {
        ele:"#validcode",
        datatype:"n6-6",
        ajaxurl:"../trade/checkWithdrawCode",
        nullmsg:"请输入验证码",
        errormsg:"交易验证码错误",
		sucmsg:"ok"
    }
	]);
	/*计时器*/
	var codecounts=(function(){var cc=0;return function(){return ++cc;}}());
	var ccount_id=null;
	/*绑定提现金额获取验证码*/
	/*获取验证码*/
	$("#mc_getvcode").removeClass("mc_unvcodes").removeAttr("disabled");
	$("#mc_getvcode").live("click",function(){

			var ta_valid=document.getElementById("tradeAmount");
			var tp_valid=document.getElementById("tradePassword");
			var to_valid=document.getElementById("toAccount");
			var vcode_cash=testTradeAmount(ta_valid.value,mc_cvip);
			if(typeof vcode_cash=="string"){
				vcode_cash=vcode_cash.replace(/(\s*\=*\'*\/*\<*\>*\,*\.*\_*)/g,"");
				vcode_cash=vcode_cash.replace(/[a-z*A-Z*]/g,"");
				vcode_cash=vcode_cash.replace("升级可提升至50万","");
			}
			if(init_mcshsou<100||init_mcshsou==""||init_mcshsou==0.00){
				infoTipAuto("可提现金额不足","explain","",3);
				return false;
			}else if(ta_valid.value==""){
				var aa=document.getElementById("tradeAmount_tips");
				aa.innerHTML="提现金额不能为空";
				setTimeout(function(){
					aa.innerHTML="";
				},2000);
				return false;
			}else if(!vcode_cash||vcode_cash=="单次提现金额不能低于100元"||vcode_cash=="单次提现金额不能大于50万元"||vcode_cash=="单次提现金额不能大于5万元"){
				var bb=document.getElementById("tradeAmount_tips");
				bb.innerHTML="提现金额不正确";
				setTimeout(function(){
					bb.innerHTML="";
				},2000);
				return false;
			}else if(tp_valid.value==""){
				var cc=document.getElementById("tradePassword_tips");
				cc.innerHTML="请输入交易密码";
				setTimeout(function(){
					cc.innerHTML="";
				},2000);
				return false;
			}else if(!/(.){6,20}/.test(tp_valid.value)){
				var dd=document.getElementById("tradePassword_tips");
				dd.innerHTML="交易密码范围在6~20位之间";
				setTimeout(function(){
					dd.innerHTML="";
				},2000);
				return false;
			}else if(to_valid.value==""){
				infoTipAuto("您还没有选择(添加)银行卡","explain","",3);
				return false;
			}
			/*判断基本信息是否正确*/
			var risres=isRealInfos();
			if(!risres[0]){
				infoTipAuto("温馨提示:"+risres[1],"explain",{"left":"25%","top":"20%","width":"754"},5);
				return false;
			}
			var url ='../../sys/sms/sendValidCode';

			var curobj=$(this);
			
			curobj.siblings(".codetip").replaceWith("");
			var c_count=1;
			$.ajax({
				type:'post',
				url:url,
				async:false,
				dataType : 'json',
				success : function(data){
					if (data.success) {
						var succ_vctips=$("#vctips");
						succ_vctips.text("验证码已发送至手机,请注意查收");
						setTimeout(function(){
							succ_vctips.text("");
						},3000);
						ccount_id=setInterval(function(){
							c_count=codecounts();
							c_count<=60?c_count=c_count:c_count=c_count%60;
							curobj.val(parseInt(60-c_count)+"秒后重新获取");
							curobj.addClass("mc_unvcodes");
							if(c_count==60||c_count==0){
								clearInterval(ccount_id);
								ccount_id=null;
								curobj.val("获取验证码");
								curobj.removeClass("mc_unvcodes").removeAttr("disabled");
							};
						},1000);
					}else{
						//isvalidcode="";
						clearInterval(ccount_id);
						ccount_id=null;
						curobj.after("<span class='codetip'>"+data.msg+"</span>");
						setTimeout(function(){
							curobj.siblings(".codetip").replaceWith("");
						},3000)
						curobj.removeClass("mc_unvcodes").removeAttr("disabled");
						//infoTipAuto("验证码发送失败,请重新发送","explain","",3);
					}
				}
			});
			/*var ff=$("#validcode");
			if(ff.val()!=isvalidcode&&ff.val()!=""){
				var gg=$("#validcode_tips");
				gg.html("验证码错误").addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");
				setTimeout(function(){
					gg.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
				},2000);
			}*/
			/*clearInterval(ccount_id);
			ccount_id=null;
			curobj.addClass("mc_unvcodes").attr({"disabled":"disabled"});
			curobj.after("<span class='codetip'>"+data.msg+"</span>");
			setTimeout(function(){
				curobj.siblings(".codetip").replaceWith("");
			},3000);*/
			/*计时*/
	});
	
	
	/*检测输入的提现信息是否真实有效*/
	function isRealInfos(){
		var risflag=false,rismsg="",urls="../trade/checkWithdraw";
		var params={
			CashVip:document.getElementById("mc_cashvip").value,
			ToAccount:document.getElementById("toAccount").value,
			tradeBalance:document.getElementById("tradeBalance").value,
			TradeAmount:document.getElementById("tradeAmount").value,
			TradePassword:document.getElementById("tradePassword").value
		};
		$.ajax({
			url:urls,
			async:false,
			dataType:"json",
			data:params,
			success: function(res){
				if(res.success==true){
					risflag=true;
					rismsg="";
				}else if(res.success==false){
					risflag=false;
					rismsg=res.msg;
				}
			},
			error:function(){
				risflag=false;
				rismsg=res.msg;
			}
		});
		return [risflag,rismsg];
	}
	/*提示信息展示*/
	$("#mc_cashcost,#mc_usecc").hover(function(){
		$(this).next().show();
	},function(){
		$(this).next().hide();
	});
	/*全部提现*/
	$("#mc_cashall").live("click",function(){
		if(mc_ccardnum.val()==-1||mc_ccardnum.val()==""||mc_ccardnum.val()=="undefined"||typeof mc_ccardnum.val()=="undefined"){
			infoTipAuto("您还没有选择(添加)银行卡","explain","",3);	
			/*mc_tatip.html("您还没有选择(添加)银行卡").addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");;
			setTimeout(function(){
				mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
			},2000);
			return false;*/
			return false;
		}
		var curobj=$(this);
		var chsou_val1="0",chsou_val2="00",chsou_val=[];
		if(mc_chsou.text().indexOf(".")!=-1){
			chsou_val=mc_chsou.text().slice(1).replace(/(\,*)/g,"").split(".");
			chsou_val1=chsou_val[0],chsou_val2=chsou_val[1];
		}else if(mc_chsou.text().indexOf(".")==-1){
			chsou_val1=parseInt(mc_chsou.text().slice(1).replace(/(\,*)/g,""));
			chsou_val2="00";
		}
		handleAmountInfo(chsou_val1,chsou_val2);
		curobj.addClass("mc_uncashall").attr({"disabled":"disabled"});
		mc_cashtime.html(handleToAccountTime());
	});
	/*绑定提现输入事件*/
	mc_chtar.live("focusout keyup",function(e){
		var curobj=$(e.target),curtext=curobj.val().replace(/(\,*)/g,"");
		if(e.type=="focusout"){
			var aa=testTradeAmount(curtext,mc_cvip);
			if(typeof aa=="string"){
				aa=aa.replace(/(\s*\=*\'*\/*\<*\>*\,*\.*\_*)/g,"");
				aa=aa.replace(/[a-z*A-Z*]/g,"");
				aa=aa.replace("升级可提升至50万","");
			}
			var tempvals=mc_chsou.text().slice(1).replace(/(\,*)/g,"");
			if(Number(init_mcshsou-curtext)<0){
				if(!aa||aa=="单次提现金额不能低于100元"||aa=="单次提现金额不能大于50万元"||aa=="单次提现金额不能大于5万元"){
					if(curtext==""){
						return
					}
					var tempbb=lenSubStr(8,tempvals);
					if(tempbb>500000&&mc_cvip!=-1){
						var temppoint=tempbb.split(".")[1];
						if(temppoint!="00"){
							tempbb="499999."+tempbb.split(".")[1];
						}else{
							tempbb=tempbb.slice(0,1)+"00000.00";
						}
						setTimeout(function(){
							mc_chtar.val(tempbb);
							curobj.removeClass("Validform_error");
							mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
						},1000);
					}else if(tempbb>50000&&mc_cvip==-1){
						var temppoint=tempbb.split(".")[1];
						if(temppoint!="00"){
							tempbb="49999."+tempbb.split(".")[1];
						}else{
							tempbb=tempbb.slice(0,1)+"0000.00";
						}
						setTimeout(function(){
							mc_chtar.val(tempbb);
							curobj.removeClass("Validform_error");
							mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
						},1000);
					}
					return;
				}else{
					mc_tatip.html("可用金额不足,请充值或重新填写提现金额").addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");
					if(init_mcshsou<100){
						return;
					}
					setTimeout(function(){
						handleCashInfo(curobj,tempvals);
						//mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
					},1000);
				}
			}else if(!aa||aa=="单次提现金额不能低于100元"||aa=="单次提现金额不能大于50万元"||aa=="单次提现金额不能大于5万元"){
				if(curtext==""){
					return
				}
				var tempcc=lenSubStr(8,curtext);
				if(tempcc>500000&&mc_cvip!=-1){
					var temppoint=tempcc.split(".")[1];
					if(temppoint!="00"){
						tempcc="499999."+tempcc.split(".")[1];
					}else{
						tempcc=tempcc.slice(0,1)+"00000.00";
					}
					setTimeout(function(){
						mc_chtar.val(tempcc);
						curobj.removeClass("Validform_error");
						mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
					},1000);
				}else if(tempcc>50000&&mc_cvip==-1){
					var temppoint=tempcc.split(".")[1];
					if(temppoint!="00"){
						tempcc="49999."+tempcc.split(".")[1];
					}else{
						tempcc=tempcc.slice(0,1)+"0000.00";
					}
					setTimeout(function(){
						mc_chtar.val(tempcc);
						curobj.removeClass("Validform_error");
						mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
					},1000);
				}else{
					setTimeout(function(){
						mc_chtar.val(tempcc);
					},1000);
				}
				return;
			}else{
				handleCashInfo(curobj,curtext);
			}
		}
		/*if(e.type=="keydown"){
			var position = getCursortPosition(this);
			var k = e.keyCode;
			var num = $(this).val();
			if(k==110 && num==""){
				$(this).val(0);
			}
			if(k==110 && num.indexOf(".") != -1){
				return false;
			}
			if(position >= (num.length-2) && k != 8 && !(k >= 37 && k <= 40) && num.indexOf(".") != -1 && num.substr(num.indexOf(".")+1).length >= 2){
				return false;
			}
			if(!isValidNum(k)){
				return false;
			}
		}*/
		if(e.type=="keyup"){
			var testreg=/[^\d\.]/;
			if(testreg.test(curtext)){
				var temptext=curtext.match(/[\d+\.]/g);
				if(temptext==null){
					curobj.val("");
				}else{
					temptext=temptext.join("");
					curobj.val(temptext);
				}
			}
		}
	});
	
	function isValidNum(k) {
        return ((k == 9) || (k == 13) || (k == 46) || (k == 8) || (k == 189) || (k == 109) || (k == 190) || (k == 110) || (k >= 48 && k <= 57) || (k >= 96 && k <= 105) || (k >= 37 && k <= 40));
    }
	
	function getCursortPosition(domObj) {
   	 var position = 0;
   	 if (document.selection) { //for IE
   	  domObj.focus();
   	  var sel = document.selection.createRange();
   	  sel.moveStart('character', -domObj.value.length);
   	  position = sel.text.length;
   	 } else if (domObj.selectionStart || domObj.selectionStart == '0') {
   	  position = domObj.selectionStart;
   	 }
   	 return position;
   }
	
	/*弹出层事件绑定*/
	$("#popup_reloadclose,#popup_sure").click(function(e){
		var curid=e.target.id;
		$.unblockUI();
		window.location.href = "/fund/account/";
		/*if(curid=="popup_sure"){
			
			//to do
			//可能要做回调处理
		
		}*/
		/*var tempurl=window.location.href;
		var tlpos=tempurl.lastIndexOf("/");
		tempurl=tempurl.slice(0,tlpos);
		tlpos=tempurl.lastIndexOf("/");
		window.open(tempurl.slice(0,tlpos)+"/account/");
		setTimeout(function(){
			window.close();
		},300);*/
	});
	
	/*输入提现时：处理手续费和实际金额*/
	function handleCashInfo(objs,values){
		var curobj=objs,curtext=values.replace(/(\,*)/g,"");
		var testres=testTradeAmount(curtext,mc_cvip);
		if(typeof testres=="string"){
			testres=testres.replace(/(\s*\=*\'*\/*\<*\>*\,*\.*\_*)/g,"");
			testres=testres.replace(/[a-z*A-Z*]/g,"");
			testres=testres.replace("升级可提升至50万","");
		}
		if(!testres||testres=="提现金额必须大于等于100"||testres=="提现金额不超过50万元"||testres=="单次提现金额不能大于5万元"){
			mc_cserver.html("￥0.00");
			mc_cashtb.val("0.00");
			mc_cramount.html("￥0.00");
			mc_cashtime.html("");
			return false;
		}else{
			var temptext=[],temptext1="0",temptext2="00";
			if(curtext.indexOf(".")!=-1){
				temptext=curtext.split(".");
				temptext1=temptext[0];
				temptext2=temptext[1];
			}else if(curtext.indexOf(".")==-1){
				temptext1=curtext;
				temptext2="00";
			}
			handleAmountInfo(temptext1,temptext2);
			mc_cashtime.html(handleToAccountTime());
			if(curtext.indexOf(".")==-1){
				curtext=curtext.toString()+".00";
				curobj.val(curtext);
			}else if(curtext.indexOf(".")!=-1){
				var caa=curtext.split(".");
				if(caa[1].length>2){
					curtext=caa[0]+"."+caa[1].slice(0,2);
					curobj.val(curtext);
				}else if(caa[1]==""){
					curtext=caa[0]+".00";
					curobj.val(curtext);
				}else if(caa[1].length==1){
					curtext=caa[0]+"."+caa[1].slice(0,1)+"0";
					curobj.val(curtext);
				}
			}
		}
		/*if(mc_ccardnum.val()==-1||mc_ccardnum.val()==""||mc_ccardnum.val()=="undefined"||typeof mc_ccardnum.val()=="undefined"){
			mc_tatip.html("您还没有选择银行卡,无法提现").addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");;
			setTimeout(function(){
				mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
			},2000);
			return false;
		}*/
	}
	
	/*全部提现时：处理手续费和实际金额*/
	function handleAmountInfo(soustr1,soustr2){
		if(soustr1<100){
			mc_tatip.html("可用金额不足100元,无法提现").addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");
			setTimeout(function(){
				mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
				mc_cserver.html("￥0.00");
				mc_cashtb.val("0.00");
				mc_cramount.html("￥0.00");
			},2000);
			return false;
		}else if(soustr1>500000&&mc_cvip!=-1){
			var tempaa=30;
			if(parseInt(soustr2)==0||soustr2==""){
				mc_chtar.val("500000.00");
				if(mc_cvip>2){
					mc_cramount.html("￥"+Number(500000-tempaa)+".00");
				}else{
					mc_cramount.html("￥500000.00");
				}
			}else{
				mc_chtar.val("499999."+soustr2);
				if(mc_cvip>2){
					mc_cramount.html("￥"+Number(499999-tempaa)+"."+soustr2);
				}else{
					mc_cramount.html("￥499999."+soustr2);
				}
			}
			if(mc_cvip>2){
				mc_cserver.html("￥"+tempaa+".00");
				mc_cashtb.val(tempaa.toString()+".00");
			}else{
				mc_cserver.html("￥0.00");
				mc_cashtb.val("0.00");
			}
		}else if(soustr1>50000&&mc_cvip==-1){
			mc_cserver.html("￥4.00");
			mc_cashtb.val("4.00");
			if(parseInt(soustr2)==0||soustr2==""){
				mc_chtar.val("50000.00");
				mc_cramount.html("￥49996.00");
			}else{
				mc_chtar.val("49999."+soustr2);
				mc_cramount.html("￥49995"+soustr2);
			}
		}else{
			//mc_chtar.val(soustr1+"."+soustr2);
			var tempbb=0;
			if(soustr1<20000&&soustr1>=100){
				tempbb=2;
			}else if(soustr1>=20000&&soustr1<100000){
				tempbb=4;
			}else if(soustr1>=100000&&soustr1<=500000){
				var ta=0,tb=0;
				ta=parseInt(soustr1/50000);
				tb=parseInt(soustr1%50000);
				if(tb==0){
					tempbb=ta*3;
				}else{
					tempbb=parseInt(ta+1)*3;
				}
			}
			if(mc_cvip==-1||mc_cvip>2){
				mc_cserver.html("￥"+tempbb+".00");
				mc_cashtb.val(tempbb.toString()+".00");
				mc_chtar.val(Number(soustr1)+"."+soustr2);
				mc_cramount.html("￥"+Number(soustr1-tempbb)+"."+soustr2);
			}else{
				mc_cserver.html("￥0.00");
				mc_cashtb.val("0.00");
				mc_chtar.val(soustr1+"."+soustr2);
				mc_cramount.html("￥"+soustr1+"."+soustr2);
			}
		}
	}
	
	/*提示信息中升级VIP链接*/
	$("#tips_links").live("click",function(){
		window.location.reload();
	});
	
	
	
});


	
	
	
	
	