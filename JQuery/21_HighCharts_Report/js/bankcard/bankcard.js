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
			$(this).addClass("checked");
		})
		
		//$(".bankname").change(getSubBanks);
		//$(".province").change(getSubBanks);
		//$(".city").change(getSubBanks);
		
		/*$("#newdetailAddress").AutoComplete({
	        'data': "querySubbranchBankList",
	        'ajaxDataType': 'json',
	        'onerror': function(msg){alert(msg);}
	    });*/
		$("input[name='detailAddress']").AutoComplete({
	        'data': "querySubbranchBankList",
	        'ajaxDataType': 'json',
	        'onerror': function(msg){alert(msg);}
	    });	
		
		
		//修改银行卡号
		$("#e_cardnum").change(isExistBankCard);
	}
	
	
	//银行卡号输入处理
	$("input.cardNo").keypress(turnCardNo);
	$("input.cardNo").blur(function(e){
		var $this = $(event.target), no = $this.val();
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
		no = no.replace(/(\s*)/g,"");
		//console.log(no.match(/^\d{16,19}$/));
		if(!no.match(/^\d{16,19}$/)){
			$target.siblings(".Validform_checktip").addClass("Validform_error").removeClass("Validform_right").text("请输入16-19位的银行卡号");
			return false;
		}
		$.ajax({
			url:"isExistBankCard",
			type:"post",
			data:{param:no,name:"cardNo"},
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
			url:"queryBankCardBybankCardId",
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
			url:"deleteBankCard",
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
					top:"210px",
					left:left,
					width:"1000px",
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
			"addr":function(gets,obj,curform,regxp){
				gets = gets.replace(/(\s*)/g,"");
				if(gets=="" || !gets.match(/^[\u4E00-\u9FA5A-Za-z0-9]*$/)){
					return false;
				}
			},
			"cardNo":function(gets,obj,curform,regxp){
				gets = gets.replace(/(\s*)/g,"");
				//console.log(gets)
				if(!gets.match(/^\d{16,19}$/)){
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
				var last4No = defCard.find("#last4No").val(), bankN =curform.find("input[name='bankname']").val();
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
	
});