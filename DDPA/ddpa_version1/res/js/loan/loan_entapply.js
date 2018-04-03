(function($){
	$(function(){
		/*获取页面元素*/
		var loan_applyaction=$("#loan_applyaction"),ratebtn=$("#ratebtn"),ratetips=$("#ratetips"),loanamount=$("#loanamount"),annualrate=$("#annualrate"),loandeadline=$("#loandeadline"),monthstripping=$("#monthstripping"),mediacyfee=$("#mediacyfee"),la_submit=$("#la_submit"),la_agreexy=$("#la_agreexy"),dealline_value=$("#dealline_value");
		/*初始化*/
		la_submit.attr({"disabled":"disabled"}).removeClass("la_submitsel");
		dealline_value.text(loandeadline.val());
		/*同意协定*/
		la_agreexy.click(function(){
			var curobj=$(this),curclass=curobj.attr("class");
			if(curclass==""){
				curobj.addClass("la_agreexysel");
				la_submit.removeAttr("disabled").addClass("la_submitsel");
			}else{
				curobj.removeClass("la_agreexysel");
				la_submit.attr({"disabled":"disabled"}).removeClass("la_submitsel");
			}
		});
		/*每月还本息,居间服务费*/
		$("#loanamount,#annualrate").focusout(function(){
			setMonthStripping([loanamount,annualrate,loandeadline,monthstripping,mediacyfee]);
		});
		/*滚动条效果及相关计算值事件*/
		$( "#dealline_op").slider({
			range: "min",
			value:loandeadline.val(),
			min:1,
			max:36,
			slide:function( event,ui) {
				loandeadline.val(ui.value);
				dealline_value.text(ui.value);
				setMonthStripping([loanamount,annualrate,loandeadline,monthstripping,mediacyfee]);
			}
		});
		/*疑问信息提示*/
		ratebtn.click(function(){ratetips.slideToggle(300);});
		/*绑定文本框获取焦点事件*/
		$("#loantitle,#loanamount,#annualrate").live("focusin",function(){
			var curobj=$(this),curvalue=curobj.val(),curid=curobj.attr("id");
			var tipsvalue=$("p[for="+curid+"],p[for="+curid+"]").text();
			if(curvalue==""&&tipsvalue==""){
				$("#"+curid+"_remark").css({"display":"block"});
			}
		});
		$("#loantitle,#loanamount,#annualrate").live("focusout",function(){
			var curobj=$(this),curvalue=curobj.val(),curid=curobj.attr("id");
			var tipsvalue=$("p[for="+curid+"],p[for="+curid+"]").text();
			if(curvalue==""&&tipsvalue!=""){
				$("#"+curid+"_remark").css({"display":"none"});
			}else{
				$("#"+curid+"_remark").css({"display":"none"});
			}
		});
		/*验证表单*/
		loan_applyaction.validate({
			rules : {
				'LoanTitle' : {
					required : true
				},
				'LoanAmount' : {
					required : true,
					number:true,
					max:500000,
					min:3000
				},
				'AnnualRate':{
					required : true,
					number:true,
					max:24.00,
					min:9.00
				}
			},
			messages : {
				'LoanTitle' : {
					required : "借款标题不能为空"
				},
				'LoanAmount' : {
					required : "借款金额不能为空",
					number:"借款金额格式错误",
					max:"借款金额不能超过50万元",
					min:"借款金额不能小于3000"
				},
				'AnnualRate':{
					required :"年利率不能为空",
					number:"年利率格式错误",
					max:"年利率不能超过24%",
					min:"年利率不能小于9%"
				}
			},
			errorElement:"p",
			errorClass:"tipserror",
			success : function(p){
				p.addClass("tipssucc").text("success");
				setTimeout(function(){p.removeClass("tipssucc").text("");},2000);
			}
		});
	});
})(jQuery);


/*相关本息事件*/
function setMonthStripping(jq_arr){
	var temp_mount=jq_arr[0].val(),temp_yr=jq_arr[1].val(),temp_dl=jq_arr[2].val();
	var temp_result=getMonthStripping(temp_mount,temp_yr,temp_dl);
	switch(temp_result){
		case "mount":
			jq_arr[3].val("");
			jq_arr[4].val("");
			break;
		case "rate"||"deadline":
			jq_arr[3].val("");
			break;
		case "mediacyfee":
			jq_arr[3].val("");
			jq_arr[4].val(Number(temp_mount*0.003).toFixed(2));	
			break;
		default:
			jq_arr[3].val(temp_result);
			jq_arr[4].val(Number(temp_mount*0.003).toFixed(2));	
	}
}
/*等额本息相关算法*/
function getMonthStripping(mount,yearrate,deadline){
	/*
	〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕
	*/
	var t_mount=mount,t_yearrate=yearrate,t_deadline=deadline;
	if(t_mount==""||t_mount<3000||t_mount>500000){
		return "mount";
	}else if(t_mount!=""&&t_mount>3000&&t_mount<500000&&t_yearrate==""){
		return "mediacyfee";
	}else if(t_yearrate==""||t_yearrate>24||t_yearrate<9){
		return "rate";
	}else if(t_deadline==""){
		return "deadline";
	}
	var la_mount=t_mount/t_deadline;
	var a=Number(t_yearrate/100).toFixed(4)
	var la_mrate=Number(a/12).toFixed(4);
	var temp_a=Math.pow((1+la_mrate),t_deadline);
	var temp_part1=t_mount*la_mrate*temp_a;
	var temp_part2=Math.pow((1+la_mrate),t_deadline)-1;
	var temp_all=Number((temp_part1/temp_part2)+la_mount);
	return temp_all.toFixed(2);
}