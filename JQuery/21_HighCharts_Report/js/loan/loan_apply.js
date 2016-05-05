(function($){
	$(function(){
		
		/*获取页面元素*/
		var loan_applyaction=$("#loan_applyaction"),ratebtn=$("#ratebtn"),ratetips=$("#ratetips"),loanamount=$("#loanamount"),annualrate=$("#annualrate"),loandeadline=$("#loandeadline"),monthstripping=$("#monthstripping"),mediacyfee=$("#mediacyfee"),la_submit=$("#la_submit"),la_agreexy=$("#la_agreexy"),dealline_value=$("#dealline_value");
		/*初始化*/
		la_submit.attr({"disabled":"disabled"}).removeClass("la_submitsel");
		dealline_value.text(loandeadline.val());
		/*自定义验证规则*/
		jQuery.validator.addMethod("isloanUsage",function(element){
			  return element=="-1"?false:true;
		},"请选择借款用途");
		//初始化每月还的本息和居间服务费
		setMonthStripping([loanamount,annualrate,loandeadline,monthstripping,mediacyfee]);
		/*借款金额*/
		loanamount.blur(function(e){
			if($(this).val()==""){ return false;}
			var num = parseInt($(this).val());
		
			if(isNaN(num)){
				$(this).val("");
			}else{
				$(this).val(num);
			}
		})
		annualrate.blur(function(e){
			if($(this).val()==""){ return false;}
			var num = parseFloat($(this).val());
			if(isNaN(num)){
				$(this).val("");
			}else{
				$(this).val(num.toFixed(2));
			}
		})
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
		la_agreexy.click();
		var url = window.location.href;
		if(url.indexOf("borrowerType=")<0){
			////console.log("here");
			if(!la_agreexy.hasClass("la_agreexysel")){
				//console.log("here")
				la_agreexy.click();
				
			}
		}
		//下拉菜单
		$(".selectBox").SelectBox();
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
		ratebtn.hover(function(){
			$(".explainwrap").show();
		},function(){
			$(".explainwrap").hide();
		});
		//ratebtn.click(function(){$(".explainwrap").slideToggle(300);});
		/*疑问按钮与提示信息切换事件监听*/
		$("p[for='annualrate']").live('DOMNodeInserted',function(e){
			var tempstr=e.target.innerHTML;
			//tempstr!=""?ratebtn.hide():ratebtn.show();
		});
		/*绑定文本框获取焦点事件*/
		$("#loantitle,#loanamount,#annualrate").live("focusin focusout",function(e){
			var curobj=$(e.target),curvalue=curobj.val(),curid=curobj.attr("id");
			var tipsvalue=$("p[for="+curid+"]").text();
			if(e.type=="focusin"){
				if(curvalue==""&&tipsvalue==""){
					$("#"+curid+"_remark").css({"display":"block"});
				}
			}else if(e.type=="focusout"){
				if(curvalue==""&&tipsvalue!=""){
					$("#"+curid+"_remark").css({"display":"none"});
				}else{
					$("#"+curid+"_remark").css({"display":"none"});
				}
			}
			
		});
		//检测借款金额的方法
		jQuery.validator.addMethod("checkLoanAmount",function(value,element){
			var reg = /^\d{4,7}$/;
			//console.log(!reg.test(value) || (value>500000 || value < 3000))
			if(!reg.test(value) || (value>500000 || value < 3000)){
				$(element).siblings(".tipholder").css("color","red");
				return false;
			}
			$(element).siblings(".tipholder").css("color","#9f9f9f");
			return true;
		},"")
		//检测年利率的方法
		jQuery.validator.addMethod("checkRate",function(value,element){
			var reg = /^\d{0,2}.?\d{0,2}$/;
			//console.log(reg.test(value) && (value <= 24 && value >= 9))
			if(reg.test(value) && (value <= 24 && value >= 9)){
				$(element).siblings(".tipholder").css("color","#9f9f9f");
				return true;
			}else{
				$(element).siblings(".tipholder").css("color","red");
				return false;
			}
			$(element).siblings(".tipholder").css("color","#9f9f9f");
			return true;
		},"")
		/*验证表单*/
		loan_applyaction.validate({
			rules : {
				'loanTitle' : {
					required : true,
					minlength : 1,
					rangelength : [5,20]
				},
				'loanAmount' : {
					checkLoanAmount:true
				},
				'loanUsage': {
                    required: true,
					minlength : 1
                },
                'loanUsage_txt':{
                	required: true,
                	minlength : 1
                },
				'annualRate':{
					checkRate : true
				},
				'loanDesc' : {
					required : true,
					minlength: 1,
					rangelength:[20,500]
				}
			},
			messages : {
				'loanTitle' : {
					required : "借款标题不能为空",
					minlength : "借款标题不能为空", 
					rangelength : "借款标题长度必须为5到20个字符"
				},
				'loanAmount' : {
					checkLoanAmount:""
				},
				'loanUsage' : {
					required : "借款用途是必选项",
					minlength : "请选择借款用途"
				},
				'loanUsage_txt':{
					required : "借款用途是必选项",
					minlength : "请选择借款用途"
				},
				'annualRate':{
					checkRate : ""
				},
				'loanDesc' : {
					required : "借款描叙不能为空",
					minlength : "借款描叙不能为空",
					rangelength: "借款描叙长度必须为{0}到{1}个字符或汉字"
				}
			},
			errorElement:"p",
			errorClass:"tipserror",
			success : function(p){
				p.addClass("tipssucc").text("");
				p.removeClass("tipserror");
			}
		});
	});
})(jQuery);


/*相关本息事件*/
function setMonthStripping(jq_arr){
	var temp_mount=jq_arr[0].val(),temp_yr=jq_arr[1].val(),temp_dl=jq_arr[2].val();
	var temp_result=getMonthStripping(temp_mount,temp_yr,temp_dl);
	////console.log(temp_result)
	switch(temp_result){
		case "mount":
			jq_arr[3].val("");
			jq_arr[3].siblings("span.v").text("0");
			jq_arr[4].val("");
			jq_arr[4].siblings("span.v").text("0");
			break;
		case "rate":
			jq_arr[3].val("");
			jq_arr[3].siblings("span.v").text("0");
			break;
		case "deadline":
			jq_arr[3].val("");
			jq_arr[3].siblings("span.v").text("0");
			break;
		case "mediacyfee":
			jq_arr[3].val("");
			jq_arr[3].siblings("span.v").text("0");
			var tv = Number(temp_mount*0.003).toFixed(2);
			jq_arr[4].val(tv);
			jq_arr[4].siblings(".loan_explain").find(".v").text(tv);
			break;
		default:
			jq_arr[3].val(temp_result);
			jq_arr[3].siblings("span.v").text(temp_result);
			var tv = Number(temp_mount*0.003).toFixed(2);
			jq_arr[4].val();
			jq_arr[4].siblings(".loan_explain").find(".v").text(tv);
	}
}
/*等额本息相关算法*/
function getMonthStripping(mount,yearrate,deadline){
	/*
	〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕
	*/
	var t_mount=parseInt(mount,10),t_yearrate=yearrate,t_deadline=parseInt(deadline,10);
	if(t_mount==""||t_mount<3000||t_mount>500000){
		return "mount";
	}else if(t_mount!=""&&t_mount>3000&&t_mount<500000&&t_yearrate==""){
		return "mediacyfee";
	}else if(t_yearrate==""||t_yearrate>24||t_yearrate<9){
		return "rate";
	}else if(t_deadline==""){
		return "deadline";
	}
//	var la_mount=t_mount/t_deadline;
//	var a=Number(t_yearrate/100).toFixed(4);
//	var la_mrate=Number(a/12).toFixed(4);
//	var temp_a=Math.pow((1+la_mrate),t_deadline);
//	var temp_part1=t_mount*la_mrate*temp_a;
//	var temp_part2=Math.pow((1+la_mrate),t_deadline)-1;
//	var temp_all=Number((temp_part1/temp_part2)+la_mount);
// 	return temp_all.toFixed(2);
	return estateBorrow(t_mount, yearrate, deadline)[0];
}

// 等额本息还款法
function estateBorrow(original,active,timeSpan){
	var monthBack=original*active*0.01/12*Math.pow((1+parseFloat(active*0.01/12)),parseFloat(timeSpan))/(Math.pow((1+parseFloat(active*0.01/12)),parseFloat(timeSpan))-1);
    var totalBack=monthBack*timeSpan;
    var totalInterest=totalBack-original;
    var monthInterest=totalInterest/timeSpan; 
	totalInterest=(Math.round(totalInterest*100))/100;//存款利息：取两位小数
	monthInterest=(Math.round(monthInterest*100))/100;//存款利息：取两位小数	
	monthBack=(Math.round(monthBack*100))/100;//存款利息：取两位小数
    totalBack=(Math.round(totalBack*100))/100;//本息合计：取两位小数
    var objArray=new Array();
    objArray[0]=monthBack;
    objArray[1]=totalBack;
    objArray[2]=monthInterest;
    objArray[3]=totalInterest;
    return objArray;
}

// 等额本金还款法
function estateBorrow1(original,active,timeSpan){
	var timeSpan1=parseInt(timeSpan);
	var interestTotal=0;	
	for(i=1;i<timeSpan1+1;i++){
		interestM=(original-original*(i-1)/timeSpan1)*active*0.01/12;
		interestTotal=parseFloat(interestTotal)+parseFloat(interestM);			
	}
	interestTotal=(Math.round(interestTotal*100))/100;//贷款利息：取两位小数
    var moneyTotal=parseFloat(original)+parseFloat(interestTotal);
    var objArray=new Array();
    objArray[0]=interestTotal;
    objArray[1]=moneyTotal;
    return objArray;
}

