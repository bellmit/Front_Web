/**
* 我的账户-银行卡信息(提现)
* author : liyuzhong(提现)
***/
$(document).ready(function(e) {

	/*yipin parts*/
	var isvalidcode="",init_mcshsou=0;
	/*页面元素引用*/
	var mc_chsou=$("#mc_cashhave"),mc_chtar=$("#tradeAmount"),mc_chtips=$("#mc_cashalltips"),mc_cserver=$("#mc_cashserver"),mc_cramount=$("#mc_crealamount"),mc_cashtime=$("#mc_cashtime"),mc_tatip=$("#tradeAmount_tips");
	/*隐藏域信息：vip、卡号id、提现费用*/
	var mc_cashvip=$("#mc_cashvip"),mc_ccardnum=$("#toAccount"),mc_cashtb=$("#tradeBalance");
	/**/
	init();
	/*yipin parts*/
	/*初始化*/
	init2();
	/*全部提现按钮初始化*/
	function init2(){
		/**/
		/*if($("span.cno").length!=0){
			var tempchknum=$("span.cno").next("input").val();
			tempchknum=tempchknum.replace(/(\s*)/g,"");
			mc_ccardnum.val(tempchknum);
			$("div.card:first").addClass("checked");
		}else{
			mc_ccardnum.val("");
		}*/
		initCNCook();
		/**/
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
				if(cook_arr[0]=="hoavno_ie"&&cook_arr[1]!="NaN"){
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
							cookie_obj="hoavno_ie="+tempchknum;
						}
					});
				}else if(cook_arr[1]=="NaN"){
					var tempchknum=csm.find("span.cno:first").next("input").val();
					tempchknum=tempchknum.replace(/(\s*)/g,"");
					mc_ccardnum.val(tempchknum);
					csm.find("div.card:first").addClass("checked");
					cookie_obj="hoavno_ie="+tempchknum;
				}else{
					var tempchknum=csm.find("span.cno:first").next("input").val();
					tempchknum=tempchknum.replace(/(\s*)/g,"");
					mc_ccardnum.val(tempchknum);
					csm.find("div.card:first").addClass("checked");
					cookie_obj="hoavno_ie="+tempchknum;
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
					document.cookie="hoavno_ie="+ctxt;
				}
				return false;
			}
		});
	}	
	
	

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
	
	/*/勾选默认卡检测
	function hasDefCard(){
		var $defCard = 	$(".defcard");
		if($("#defaultCard").size()!=0 && $defCard.attr("status")=="checked"){
			if(confirm("当前已存在默认提现银行卡，是否确认更换默认提现银行卡？")){
				$defCard.find("input").attr("checked","checked");
				$defCard.checkbox({})
			}else{
				$defCard.find("input").removeAttr("checked");
				$defCard.checkbox({})
			};
			return false;
		}
		return true;
	}*/
	
	
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
		//console.log(no.match(/^\d{16,19}$/));
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
				message:'<div class="warn"><p>您还未实名认证，为了您的账户及资金安全，请先完成 <a href="../../res/js/security/securityInit#real" onclick="$.unblockUI();">实名认证</a></p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
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
		//console.log("id:"+id);
		var card; 
		$.ajax({
			url:"../bank/queryBankCardBybankCardId",
			type:"post",
			data:{"bankCardId":id},
			success: function(data){
				if(data.status=="y"){
					card = data.bankCard;
					var cardform = $("#cardform","#editform");
					//console.log(data.bankCard)
					//填充银行卡信息
					cardform.find("input[name='def']").val(data.bankCard.isDefault);
					cardform.find("#pl_bankCardId").val(data.bankCard.bankCardId);
					cardform.find(".e_bank").SelectBox(data.bankCard.cardType);
					//val(data.bankCard.cardType);
					cardform.find("#place_pro").val(data.bankCard.province);
					cardform.find("#place_city").val(data.bankCard.city);
					cardform.find("#e_subbank").val(data.bankCard.detailAddress);
					cardform.find("#e_cardnum").val(formatBCNo(data.bankCard.cardNo));
					//console.log(cardform.find(".defcard input").attr("checked")+":"+data.bankCard.isDefault)
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
		//console.log(id);
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
			//console.log(left)
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
				//console.log(gets)
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
			//console.log(has)
			if($("#defaultCard").size()!=0 && ($defcard.attr("status")=="checked" && has=="0")){
				var defCard = $("#defaultCard").parents(".card")
				var last4No = defCard.find("#last4No").val(), bankN = defCard.find(".banklogo img").attr("alt");
				if(confirm("当前默认提现银行卡为"+bankN+"尾号"+last4No+"的卡号，是否确认更换？")){
					//console.log("ok")
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
	
	
	
	/*yipin parts*/
	/*绑定提现金额填写表单验证*/
	var mc_cashobj=$(".mc_cashaction").Validform({
		ajaxPost:true,
		datatype:{
			"valid_tamount":function(gets,obj,curform,regxp){
				return testTradeAmount(gets);
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
			if(mc_ccardnum.val()==""||mc_ccardnum.val()==-1||mc_ccardnum.val()=="undefined"||typeof mc_ccardnum.val()=="undefined"){
				infoTipAuto("您还没有选择(添加)银行卡","explain","",5);
				//infoTips("您还没有选择(添加)银行卡","explain");
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
						url:url+"?validcode="+$("#validcode").val(),
						data : params,
						dataType : 'json',
						success : function(data){
							if (data.success) {
								$.blockUI({css:{"left":"34%"},message:$("#popup_reloadbox")});
							}else{
								infoTips("失败:"+data.msg,"explain");
								setTimeout(function(){window.location.reload()},5000);
							}
						},
						error:function(data){
							infoTips("出错:"+data.msg,"err");
							setTimeout(function(){window.location.reload()},5000);
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
        datatype:"*6-12",
        nullmsg:"请输入交易密码！",
        errormsg:"交易密码范围在6~12位之间！",
		sucmsg:"ok"
    },
    {
        ele:"#validcode",
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
	$("#mc_getvcode").live("click",function(){
			var ta_valid=document.getElementById("tradeAmount");
			var tp_valid=document.getElementById("tradePassword");
			var to_valid=document.getElementById("toAccount");
			if(ta_valid.value==""){
				var aa=document.getElementById("tradeAmount_tips");
				aa.innerHTML="提现金额不能为空";
				setTimeout(function(){
					aa.innerHTML="";
				},2000);
				return false;
			}else if(!testTradeAmount(ta_valid.value)||testTradeAmount(ta_valid.value)=="提现金额必须大于等于100"||testTradeAmount(ta_valid.value)=="提现金额不超过50万元"){
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
			}else if(!/(.){6,12}/.test(tp_valid.value)){
				var dd=document.getElementById("tradePassword_tips");
				dd.innerHTML="交易密码范围在6~12位之间";
				setTimeout(function(){
					dd.innerHTML="";
				},2000);
				return false;
			}else if(to_valid.value==""){
				infoTipAuto("您还没有选择(添加)银行卡","explain","",3);
				/*mc_tatip.html("您还没有选择(添加)银行卡").addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");
				setTimeout(function(){
					mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
				},2000);*/
				return false;
			}
			var url ='../../sys/sms/sendValidCode';
			$.ajax({
				type:'post',
				url:url,
				async:false,
				dataType : 'json',
				success : function(data){
					var ee="";
					if (data.success) {
						var succ_vctips=$("#vctips");
						succ_vctips.text("验证码已发送至手机,请注意查收");
						setTimeout(function(){
							succ_vctips.text("");
						},3000);
						/*
						infoTipAuto("验证码已发送至手机,请注意查收","succ","",3);
						alert("成功："+data.msg);
						ee=data.msg;
						ee=ee.split(":");
						ee=ee[1].split("&");
						isvalidcode=ee[0];*/
					}else{
						//isvalidcode="";
						clearInterval(ccount_id);
						ccount_id=null;
						curobj.val("获取验证码");
						curobj.removeClass("mc_unvcodes").removeAttr("disabled");
						infoTipAuto("验证码发送失败,请重新发送","explain","",3);
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
	/*if(mc_chtar.val()!=""||mc_chtar.val()!="null"||mc_chtar.val()!="undefined"||typeof mc_chtar.val()!="undefined"){
		var cashreg=/[^\d\.]/
		if(cashreg.test(mc_chtar.val())){
			mc_chtar.val("");
		}else{
			if(Number(init_mcshsou-mc_chtar.val())<0){
				var tempvals=mc_chsou.text().slice(1).replace(/(\,*)/g,"");
				var aa=testTradeAmount(mc_chtar.val());
				if(aa){
					mc_chtar.val("499999.00");
				}else{
					mc_chtar.val(tempvals);
				}
				handleCashInfo(mc_chtar,tempvals);
			}else{
				handleCashInfo(mc_chtar,mc_chtar.val());
			}
		}
	}*/
	mc_chtar.live("focusout keydown keyup",function(e){
		var curobj=$(e.target),curtext=curobj.val().replace(/(\,*)/g,"");
		if(e.type=="focusout"){
			var aa=testTradeAmount(curtext);
			var tempvals=mc_chsou.text().slice(1).replace(/(\,*)/g,"");
			if(Number(init_mcshsou-curtext)<0){
				if(!aa||aa=="提现金额必须大于等于100"||aa=="提现金额不超过50万元"){
					if(curtext==""){
						return
					}
					var tempbb=lenSubStr(8,tempvals);
					if(tempbb>500000){
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
					}
					return;
				}else{
					mc_tatip.html("可用金额不足,请充值或重新填写提现金额").addClass("mc_cashtiperror").removeClass("mc_cashtipsucc");
					setTimeout(function(){
						handleCashInfo(curobj,tempvals);
						mc_tatip.html("").removeClass("mc_cashtipsucc mc_cashtiperror");
					},1000);
				}
			}else if(!aa||aa=="提现金额必须大于等于100"||aa=="提现金额不超过50万元"){
				if(curtext==""){
					return
				}
				var tempcc=lenSubStr(8,curtext);
				if(tempcc>500000){
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
		if(e.type=="keydown"){
			/*var position = getCursortPosition(this);
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
			}*/
		}
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
		if(curid=="popup_sure"){
			
			/*
			to do
			可能要做回调处理
			*/
		}
		var tempurl=window.location.href;
		var tlpos=tempurl.lastIndexOf("/");
		tempurl=tempurl.slice(0,tlpos);
		tlpos=tempurl.lastIndexOf("/");
		window.open(tempurl.slice(0,tlpos)+"/account/");
		setTimeout(function(){
			window.close();
		},300);
	});
	
	/*输入提现时：处理手续费和实际金额*/
	function handleCashInfo(objs,values){
		var curobj=objs,curtext=values.replace(/(\,*)/g,"");
		var testres=testTradeAmount(curtext);
		if(!testres||testres=="提现金额必须大于等于100"||testres=="提现金额不超过50万元"){
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
		}else if(soustr1>500000){
			var tempaa="";
			if(parseInt(soustr2==0)){
				mc_chtar.val("500000.00");
				tempaa=parseInt(500000/50000)*3;
				if(mc_cashvip.val()==-1||mc_cashvip.val()>2){
					mc_cserver.html("￥"+tempaa+".00");
					mc_cashtb.val(tempaa.toString()+".00");
					mc_cramount.html("￥"+Number(500000-tempaa)+".00");
				}else{
					mc_cserver.html("￥0.00");
					mc_cashtb.val("0.00");
					mc_cramount.html("￥500000.00");
				}
			}else{
				mc_chtar.val("499999."+soustr2);
				tempaa=parseInt(499999/50000)*3;
				if(mc_cashvip.val()==-1||mc_cashvip.val()>2){
					mc_cserver.html("￥"+tempaa+".00");
					mc_cashtb.val(tempaa.toString()+".00");
					mc_cramount.html("￥"+Number(499999-tempaa)+"."+soustr2);
				}else{
					mc_cserver.html("￥0.00");
					mc_cashtb.val("0.00");
					mc_cramount.html("￥499999."+soustr2);
				}
			}
		}else{
			mc_chtar.val(soustr1+"."+soustr2);
			var tempbb=0;
			if(soustr1<20000&&soustr1>=100){
				tempbb=2;
			}else if(soustr1>=20000&&soustr1<100000){
				tempbb=4;
			}else if(soustr1>=100000&&soustr1<1000000){
				tempbb=parseInt(soustr1/50000)*3;
			}
			if(mc_cashvip.val()==-1||mc_cashvip.val()>2){
				mc_cserver.html("￥"+tempbb+".00");
				mc_cashtb.val(tempbb.toString()+".00");
				mc_cramount.html("￥"+Number(soustr1-tempbb)+"."+soustr2);
			}else{
				mc_cserver.html("￥0.00");
				mc_cashtb.val("0.00");
				mc_cramount.html("￥"+soustr1+"."+soustr2);
			}
		}
	}
});


	
	
	
	
	