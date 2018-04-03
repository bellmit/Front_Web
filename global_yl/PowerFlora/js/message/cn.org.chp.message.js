// JavaScript Document
$(function(){
		//受理通知单、命名通知件、补充资料通知单
		$("#acceptcause").css({height:document.getElementById('acceptcause').scrollHeight}).focus();
		$("#audit_conclusion").css({height:document.getElementById('audit_conclusion').scrollHeight}).focus();
		$("#info_remark").css({height:document.getElementById('info_remark').scrollHeight}).focus();
		$("#acceptcause,#audit_conclusion,#info_remark").focusout(function(){
				$(this).css({height:this.scrollHeight});
		});
		$("#acceptcause,#audit_conclusion,#info_remark").keyup(function(){
				$(this).css({height:this.scrollHeight});
		});
		
	//other codes
	});
	
