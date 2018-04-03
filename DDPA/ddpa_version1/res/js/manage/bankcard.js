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
		
		//银行卡号输入框交互
		$("input#cardnum").blur(function(){
			var l = $(this).val().length;
			if(15 < l){
				console.log("l:"+l+";"+$(this).val())
				hasAdded($(this).val());
				}
			})
		
		//勾选默认银行卡
		var $defcard = $("input#defcard");
		if($defcard.attr("defcard")) $defcard.removeAttr("checked");
		
		//是否已经绑定默认提现银行卡
		$defcard.click(function(){
			var $this = $(this);
			console.log($this.attr("checked")+";"+$this.attr("defcard"))
			console.log($this.attr("checked") && $this.attr("defcard"))
			console.log($this.attr("checked"))
			if($this.attr("checked") && $this.attr("defcard")){
				if(confirm("当前默认提现银行卡为中国农业银行尾号2345的卡号，是否确认更换？")){
					
				};
			}
		})
	}
	
    /*利用body来拦截点击事件*/
	$("body").click(function(e){
		
		var $target = $(e.target);
		actiontype = $target.data("actiontype");
		console.log(actiontype);
		if(!actiontype){return;}
			
		switch(actiontype){
			case "addcard":
				addcard({});
				break;
			case "editcard":
				editcard({},cardnum);
				break;
			case "delcard":
				delcard(cardnum);
				break;
			case "submitcard":
				submitEdit();
				break;
			default:
			}
	});
	
	/*提交表单*/
	function submitEdit(card){
		console.log("submit card!");
	}
	
	/*添加银行卡*/
	function addcard(card){
		
		var left = getLeft("#editform");
		
		if($(".card").length > 6){
			alert("不能继续添加新的银行卡！");
			return false;
			}
		//var isR = isRealPer();   //检测是否已经完成实名认证
		var isR = false;
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
				message:  $("#editform"),
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
			
		console.log("add card");
	}
	
	/*编辑银行卡*/
	function editcard(info,cardnum){
		var left = getLeft("#editform");
		
		$("#editform h3").text("编辑银行卡");
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
	}
	
	/*删除银行卡*/
	function delcard(cardnum){
		if(window.confirm("是否确认删除中国工商银行")){
			alert("确定删除银行卡");
		}
		/*
		$.blockUI({
			message:'<p>是否确认删除中国工商银行尾号' + cardnum + '银行卡？</p>',
			css:{
					top:"20%",
					width:"auto",
					cursor:'auto'
					},
				overlayCSS: {
					cursor:'auto'
					},
				onOverlayClick: $.unblockUI 
			});
		*/
		console.log("delete card")
		}
	
	/*验证卡号是否已经添加*/
	function hasAdded(cardno){
		console.log(cardno);
	}
	
	//是否已经绑定过一个以上的银行卡
	function hasCard(){
		var l = $(".cards .card:not(#new)").length;
		if(l==0){
			var left = getLeft("#nocardtip");
			console.log(left)
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
	
	/*是否已经有默认提现银行卡*/
	function hasDefCard(username){
		
	}
	
	/*检测是否已经完成实名认证*/
	function isRealPer(){
		var r = Math.round(Math.random()*100);
		r = r%2
		return r;
		}
	
	//计算水平居中的左边距
	function getLeft(id){
		var l = $(id).width();
		console.log(l);
		var total_l = $("body").width();
		
		l = (total_l - l)*0.5;
		left = Math.round((l/total_l)*100);
		left += "%";
		return left;
		}
	
	/*绑定表单验证*/
	$("#cardform").Validform({
		btnSubmit:"#submitcard", 
		tiptype:3,
		showAllError:true,
		});
});