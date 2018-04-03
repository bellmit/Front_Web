(function($){
	$(function(){
		/*银行图标信息对象*/
		var bankiconobj={1025:{type:"jjk",value:"1025",pclass:"bio_gs"},105:{type:"jjk",value:"105",pclass:"bio_js"},103:{type:"jjk",value:"103",pclass:"bio_ny"},104:{type:"jjk",value:"104",pclass:"bio_zg"},3080:{type:"jjk",value:"3080",pclass:"bio_zs"},301:{type:"jjk",value:"301",pclass:"bio_jt"},3230:{type:"jjk",value:"3230",pclass:"bio_yzcx"},314:{type:"jjk",value:"314",pclass:"bio_pf"},307:{type:"jjk",value:"307",pclass:"bio_pa"},309:{type:"jjk",value:"309",pclass:"bio_xy"},313:{type:"jjk",value:"313",pclass:"bio_zx"},312:{type:"jjk",value:"312",pclass:"bio_gd"},311:{type:"jjk",value:"311",pclass:"bio_hx"},305:{type:"jjk",value:"305",pclass:"bio_ms"},306:{type:"jjk",value:"306",pclass:"bio_gf"},316:{type:"jjk",value:"316",pclass:"bio_nj"},324:{type:"jjk",value:"324",pclass:"bio_hz"},302:{type:"jjk",value:"302",pclass:"bio_nb"},310:{type:"jjk",value:"310",pclass:"bio_bj"},326:{type:"jjk",value:"326",pclass:"bio_sh"},342:{type:"jjk",value:"342",pclass:"bio_cqns"},335:{type:"jjk",value:"335",pclass:"bio_bjns"},336:{type:"jjk",value:"336",pclass:"bio_cd"},1027:{type:"xyk",value:"1027",pclass:"bio_gs"},308:{type:"xyk",value:"308",pclass:"bio_zs"},1054:{type:"xyk",value:"1054",pclass:"bio_js"},106:{type:"xyk",value:"106",pclass:"bio_zg"},3112:{type:"xyk",value:"3112",pclass:"bio_hx"},3051:{type:"xyk",value:"3051",pclass:"bio_ms"},3121:{type:"xyk",value:"3121",pclass:"bio_gd"},3231:{type:"xyk",value:"3231",pclass:"bio_yzcx"},3241:{type:"xyk",value:"3241",pclass:"bio_hz"},303:{type:"xyk",value:"303",pclass:"bio_nb"},3261:{type:"xyk",value:"3261",pclass:"bio_sh"},1:{type:"dsf",value:"1",pclass:"bio_gfb"}};
		/*临时变量*/
		var bankres=[],bankflag=false,bankselid=null;
		/*页面元素获取*/
		var mr_morebtn=$("#mr_morebtn"),mr_more=$("#mr_more"),mr_bankwrap=$("#mr_bankwrap");
		var beforebank=document.getElementById("beforebank"),thirdPayType=document.getElementById("thirdPayType"),mr_bankseltips=document.getElementById("mr_bankseltips");
		/*初始化*/
		(function(){
			var mainbox=$("#mainbox").length!=0?$("#mainbox"):$(".mainbox");
			mainbox.height("auto");
			/*初始化默认选择银行*/
			if(beforebank.value==""||beforebank.value=="-1"){
			   /*第一次充值*/
			   mr_morebtn.hide();
			   mr_more.show();
			}else if((beforebank.value!=""&&beforebank.value!="-1")||typeof beforebank.value!="undefined"){
					/*之前有充值记录存在的情况*/
					mr_morebtn.show();
					var tempvalue=beforebank.value;
					if(typeof bankiconobj[tempvalue]=="undefined"){
						beforebank.value=1025;
						tempvalue=1025;
					}
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
			if($("#tradeAmount").length!=0){
				UCFormat(document.getElementById("tradeAmount").value,"mr_uppercase");
			}
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
			if(tempnode=="ul"){
				return false;
			}
			var curobj=$(e.target),curtext,selstr="",banklen=bankres.length;
			switch(tempnode){
				case "div":
					var parobj=curobj.parent();
					curtext=parobj.text();
					parobj.addClass("mr_moresel").siblings().removeClass("mr_moresel");
					break;
				case "p":
					var parobj=curobj.parent();
					curtext=parobj.text();
					parobj.addClass("mr_moresel").siblings().removeClass("mr_moresel");
					break;
				case "li":
					curtext=curobj.text();
					curobj.addClass("mr_moresel").siblings().removeClass("mr_moresel");
					break;
			}
			for(var i=0;i<banklen;i++){
				if(curtext==bankres[i]){
					bankflag=true;
					mr_bankseltips.innerHTML="默认列表中已经选择了<span>相关银行</span>,请重新选择银行信息";
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
				/*队头填数据*/
				bankres.unshift(curtext);
				if(bankres.length>=3){
					/*队尾删数据*/
					bankres.length=3;
				}
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
				onkeyup:false,
				rules : {
					'TradeAmount' : {
						required:true,
						minlength:1,
						isMoneyNumber:true,
						isMinNumber:true
					}
				},
				messages : {
					'TradeAmount' : {
						required : "充值金额不能为空",
						minlength:"充值金额不能为空",
						isMoneyNumber:"充值金额：非0开头且最多保留两位小数",
						isMinNumber:"充值金额不能小于1元"
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
								$("#v_amount").val($("#tradeAmount").val());
								$("#remark1").val(data.msg);
								$("#pmode_id").val($("#thirdPayType").val());
								$("#v_oid").val(data.v_oid);
								document.E_FORM.submit();
								alert(data.msg);
							}else{
								//alert(data.msg);
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
				curobj.val("");
				return false;
			}
			UCFormat(this.value,"mr_uppercase");
		}).focusout(function(e){
			console.log("aaaa");
			var curobj=this,curval=curobj.value;
			curobj.value=lenSubStr(11,curval);
			UCFormat(this.value,"mr_uppercase");
        });
		

		/*弹出层事件绑定*/
		$("#popup_reloadclose,#popup_sure,#popup_reloadway").click(function(e){
			var curid=e.target.id;
			$.unblockUI();
			if(curid=="popup_sure"){
				var tempurl=window.location.href;
				var tlpos=tempurl.lastIndexOf("/");
				tempurl=tempurl.slice(0,tlpos);
				tlpos=tempurl.lastIndexOf("/");
				window.open(tempurl.slice(0,tlpos)+"/account/");
				setTimeout(function(){
					window.close();
				},300);
				//window.location.href=tempurl.slice(0,tlpos)+"/account/";
			}else if(curid=="popup_reloadway"){
				document.getElementById("rereloadamount").value=beforebank.value+","+thirdPayType.value;
			}
		});
		
		
		
		
		
		
		
		
	});
})(jQuery);

/*超过长度将截取字符串*/
function lenSubStr(slen,ss){
	var oldstr=ss.toString(),oldarr=oldstr.split(""),oldlen=oldarr.length;
	var strlen=slen;
	var part1="",part2="",newstr="";
	if(oldlen>=strlen){
		console.log("bbbb");
		if(oldstr.indexOf(".")==-1){
			newstr=oldstr.slice(0,strlen-2)+".00";
		}else if(oldstr.indexOf(".")!=-1){
			var tempparts=oldstr.split(".");
			part1=tempparts[0].slice(0,strlen-2);
			part2="."+tempparts[1].slice(0,2);
			newstr=part1+part2;
		}
	}else{
		console.log("bbbbb");
		if(oldstr.indexOf(".")==-1&&oldstr!=""){
			newstr=oldstr+".00";
		}else if(oldstr.indexOf(".")!=-1){
			var caa=oldstr.split(".");
			if(caa[1].length>=2){
				newstr=caa[0]+"."+caa[1].slice(0,2);
			}else if(caa[1].length==0){
				newstr=caa[0]+".00";
			}else if(caa[1].length==1){
				newstr=caa[0]+"."+caa[1].slice(0,1)+"0";
			}
		}
	}
	return newstr;
}

/*转换成大写*/
function UCFormat(values,wraps){
	var temptext=values,temptextf=parseInt(values),ucwraps=document.getElementById(wraps),mtext=/^(([1-9]{1}\d{0,})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/;
	/*/^(([1-9]{1}\d{2,5})|([0]{1,}[1-9]{1}\d{2,5}))((\.{0}(\d){0})|(\.{1}(\d){2}))$/*/
	if(temptextf==0){
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