(function($){
	$(function(){
		/*银行图标信息对象*/
		var bankiconobj={2:{value:"2",pclass:"bio_gs"},3:{value:"3",pclass:"bio_js"},4:{value:"4",pclass:"bio_ny"},1:{value:"1",pclass:"bio_zg"},0:{value:"0",pclass:"bio_zgrm"},5:{value:"5",pclass:"bio_zs"},6:{value:"6",pclass:"bio_jt"},7:{value:"7",pclass:"bio_yzcx"},8:{value:"8",pclass:"bio_pf"},9:{value:"9",pclass:"bio_pa"},10:{value:"10",pclass:"bio_xy"},11:{value:"11",pclass:"bio_zx"},12:{value:"12",pclass:"bio_gd"},13:{value:"13",pclass:"bio_hx"},14:{value:"14",pclass:"bio_ms"},15:{value:"15",pclass:"bio_szfz"},16:{value:"16",pclass:"bio_gf"},17:{value:"17",pclass:"bio_hftx"},18:{value:"18",pclass:"bio_zfb"}};
		/*临时变量*/
		var bankres=[],bankflag=false,bankselid=null;
		/*页面元素获取*/
		var mr_morebtn=$("#mr_morebtn"),mr_more=$("#mr_more"),mr_bankwrap=$("#mr_bankwrap");
		var beforebank=document.getElementById("beforebank"),thirdPayType=document.getElementById("thirdPayType"),mr_bankseltips=document.getElementById("mr_bankseltips");
		/*自定义校验方法*/
		jQuery.validator.addMethod("isMoneyNumber",function(value,element){
			  var temptext=parseInt(value);
			  if(temptext<1){
				  return false;
			  }
			  var mtext=/^(([1-9]{1}\d{0,})|([0]{1,}[1-9]{1}\d{0,}))((\.{0}(\d){0})|(\.{1}(\d){2}))$/;
			  return this.optional(element)||(mtext.test(value));
		},"充值金额格式不对");
		/*初始化*/
		(function(){
			var mainbox=$("#mainbox").length!=0?$("#mainbox"):$(".mainbox");
			mainbox.height("auto");
			/*初始化默认选择银行*/
			if(beforebank.value==""||beforebank.value=="-1"||typeof beforebank.value=="undefined"||typeof beforebank.value===undefined){
			   /*第一次充值*/
			   mr_morebtn.hide();
			   mr_more.show();
			}else if(beforebank.value!=""||typeof beforebank.value!="undefined"){
					/*之前有充值记录存在的情况*/
					mr_morebtn.show();
					var tempvalue=beforebank.value;
					thirdPayType.value=bankiconobj[tempvalue].value;
					var tempstr="<li class=\"mr_banksel\">"+bankiconobj[tempvalue].value+"<p></p><div class=\""+bankiconobj[tempvalue].pclass+"\"></div></li>";
					var ishaveli=mr_bankwrap.find("li").size();
					if(ishaveli==0){
						$(tempstr).appendTo(mr_bankwrap);
					}else{
						mr_bankwrap.find("li").each(function(index, element) {
                            var curobj=$(element),curtext=curobj.text();
							if(curtext==tempvalue){
								curobj.html("").remove();
							}
                        });
						if(mr_bankwrap.find("li").size()==0){
							$(tempstr).appendTo(mr_bankwrap);
						}else{
							$(tempstr).insertBefore(mr_bankwrap.find("li").each(function(index, element){
								var curobj=$(element),curtext=curobj.text();
								var tempobj=bankiconobj[curtext];
								bankres.push(curtext);
								curobj.find("div").addClass(bankiconobj[tempvalue].pclass);
							}).end().find("li:first"));
						}
					}
					bankres.unshift(tempvalue);
			}
			/*大写初始化*/
			UCFormat(document.getElementById("tradeAmount").value,"mr_uppercase");
		}());
		
		/*更多银行切换效果*/
		mr_morebtn.click(function(){
			$(this).toggleClass("mr_morebtnsel");
			mr_more.toggle();
		});
		/*绑定更多银行选择区域鼠标事件*/
		mr_more.hover(function(){},function(e){
			if(e.target.nodeName=="UL"){
				var mr_isshow=$("#mr_morebtn").css("display");
				if(mr_isshow!="none"||mr_isshow=="block"){
					e.target.style.display="none";
				}
		}});
		/*绑定更多银行选择事件*/
		mr_more.live("click",function(e){
			var tempnode=e.target.nodeName.toLowerCase();
			var curobj=$(e.target),curtext,selstr="",banklen=bankres.length;
			switch(tempnode){
				case "div"||"p":
					var parobj=curobj.parent()
					curtext=parobj.attr("data-bank");
					parobj.addClass("mr_moresel").siblings().removeClass("mr_moresel");
					break;
				case "li":
					curtext=curobj.attr("data-bank");
					curobj.addClass("mr_moresel").siblings().removeClass("mr_moresel");
					break;
			}
			for(var i=0;i<banklen;i++){
				if(curtext==bankres[i]){
					bankflag=true;
					mr_bankseltips.innerHTML="默认列表中已经选择了<span>"+curtext+"</span>,请重新选择银行信息";
					clearTimeout(bankselid);
					bankselid=null;
					bankselid=setTimeout(function(){
						mr_bankseltips.innerHTML="";
					},5000);
					break;
				}else{
					bankflag=false;
				}
			}
			if(!bankflag){
				/*默认列表中不存在新选择的银行*/
				bankres.unshift(curtext);/*队头填数据*/
				bankres.length=banklen;/*队尾删数据*/
				clearTimeout(bankselid);
				bankselid=null;
				mr_bankseltips.innerHTML="";
			}else{
				/*默认列表中已经存在新选择的银行*/
				return false;
			}
			/*兼容ie6，ie7*/
			mr_morebtn.show();
			var selobj=bankiconobj[curtext];
			beforebank.value=curtext;
			thirdPayType.value=selobj.value;
			selstr="<li class=\"mr_banksel\">"+selobj.value+"<p></p><div class=\""+selobj.pclass+"\"></div></li>";
			var tempmr_len=mr_bankwrap.find("li").length;
			if(tempmr_len>=3){
				$(selstr).insertBefore(mr_bankwrap.find("li:last").remove().end().find("li").removeClass("mr_banksel").end().find("li:first"));	
			}else if(tempmr_len<3&&0<tempmr_len){
				$(selstr).insertBefore(mr_bankwrap.find("li").removeClass("mr_banksel").end().find("li:first"));	
			}else{
				$(selstr).appendTo(mr_bankwrap);
			}
		});
		/*绑定切换不同银行卡选择项*/
		mr_bankwrap.click(function(e){
			var tempnode=e.target.nodeName.toLowerCase();
			var curobj=$(e.target);
			if(tempnode=="p"||tempnode=="div"){
				var parobj=curobj.parent(),curtext=parobj.text();
				parobj.addClass("mr_banksel").siblings().removeClass("mr_banksel");
			}else if(tempnode=="li"){
				var curtext=curobj.text();
				curobj.addClass("mr_banksel").siblings().removeClass("mr_banksel");
			}
			beforebank.value=curtext;
			thirdPayType.value=bankiconobj[curtext].value;
		});
		/*充值表单校验*/
		$("#mr_reload").validate({
				rules : {
					'TradeAmount' : {
						required:true,
						minlength:1,
						isMoneyNumber:true
					}
				},
				messages : {
					'TradeAmount' : {
						required : "充值金额不能为空",
						minlength:"充值金额不能为空"
					}
				},
				errorPlacement : function(error,element){
					$("#mr_errorinfo").html(error.text());
				},
				success:function(){
					$("#mr_errorinfo").html("");
				},
				invalidHandler : function() {
					return false;
				},
				submitHandler:function(){
					var url =$('form[id=mr_reload]').attr('action');
					var params =$('form[id=mr_reload]').serialize();
					$.ajax({
						type:'post',
						url:url,
						data : params,
						dataType : 'json',
						success : function(data){
							if (data.success) {
								alert(data.msg);
							}else{
								alert(data.msg);
							}
						}
					});
					/*表单提交操作
					
					to do
					
					*/
					/*弹出层事件绑定*/
					$.blockUI({css:{"left":"34%"},message:$("#popup_reloadbox")});
					return false;
				}
		});		
		/*大小写转换*/
		$("#tradeAmount").keyup(function(){
			var curobj=$(this);
			var testreg=/[^\d\.]/;
			if(testreg.test(curobj.val())){
				curobj.val("")
				return false;
			}
			UCFormat(this.value,"mr_uppercase");
		}).focusout(function(e){
			var curobj=this,curval=curobj.value;
			if(curval.indexOf(".")==-1&&curval!=""){
				curval=curval.toString()+".00";
				curobj.value=curval;
			}
        });
		/*弹出层事件绑定*/
		$("#popup_reloadclose,#popup_sure,#popup_reloadway").click(function(e){
			var curid=e.target.id;
			$.unblockUI();
			if(curid=="popup_sure"){
				window.open("http://192.168.6.96/ddpaweb/index","我的账户");
			}else if(curid=="popup_reloadway"){
				document.getElementById("rereloadamount").value=beforebank.value+","+thirdPayType.value;
			}
		});
		
		
		
		
		
		
		
		
	});
})(jQuery);


function UCFormat(values,wraps){
	var temptext=parseInt(values),ucwraps=document.getElementById(wraps),mtext=/^(([1-9]{1}\d{0,})|([0]{1,}[1-9]{1}\d{0,}))((\.{0}(\d){0})|(\.{1}(\d){2}))$/;
	/*/^(([1-9]{1}\d{2,5})|([0]{1,}[1-9]{1}\d{2,5}))((\.{0}(\d){0})|(\.{1}(\d){2}))$/*/
	if(temptext<1){
		ucwraps.innerHTML="";
		return false;
	}
	if(!mtext.test(values)){
		ucwraps.innerHTML="";
		return false;
	}
	var cn_zero = "零",cn_one = "壹",cn_two = "贰",cn_three = "叁",cn_four = "肆",cn_five = "伍",cn_six = "陆",cn_seven = "柒",cn_height = "捌",cn_nine = "玖",cn_ten = "拾",cn_hundred = "佰",cn_thousand = "仟",cn_ten_thousand = "万",cn_hundred_million = "亿",cn_symbol="",cn_dollar = "元",cn_ten_cent = "角",cn_cent = "分",cn_integer = "整";
	var integral;
	var decimal;
	var outputCharacters;
	var parts;
	var digits, radices, bigRadices, decimals;
	var zeroCount;
	var i, p, d;
	var quotient, modulus;
	var formatstr = values.replace(/^0+/, "");
	parts =formatstr.split(".");
	if (parts.length > 1) {
		integral = parts[0];
		decimal = parts[1];
		decimal = decimal.substr(0, 2);
	}
	else {
		integral = parts[0];
		decimal = "";
	}
	digits =[cn_zero, cn_one, cn_two, cn_three, cn_four, cn_five, cn_six, cn_seven, cn_height, cn_nine];
	radices =["", cn_ten, cn_hundred, cn_thousand];
	bigRadices =["", cn_ten_thousand, cn_hundred_million];
	decimals =[cn_ten_cent,cn_cent];
	outputCharacters = "";
	if (Number(integral) > 0) {
		zeroCount = 0;
		for (i = 0; i < integral.length; i++) {
			p = integral.length - i - 1;
			d = integral.substr(i, 1);
			quotient = p / 4;
			modulus = p % 4;
	if (d == "0") {
		zeroCount++;
	}
	else {
		if (zeroCount > 0){
			outputCharacters += digits[0];
		}
		zeroCount = 0;
		outputCharacters += digits[Number(d)] + radices[modulus];
	}
		if (modulus == 0 && zeroCount < 4){
			outputCharacters += bigRadices[quotient];
		}
	}
		outputCharacters += cn_dollar;
	}
	if (decimal != "") {
		for (i = 0; i < decimal.length; i++) {
			d = decimal.substr(i, 1);
			if (d != "0") {
				outputCharacters += digits[Number(d)] + decimals[i];
			}
		}
	}
	if (outputCharacters == "") {
		outputCharacters = cn_zero + cn_dollar;
	}
	if (decimal == "") {
		outputCharacters += cn_integer;
	}
	outputCharacters = cn_symbol + outputCharacters;
	return ucwraps.innerHTML=outputCharacters;
}