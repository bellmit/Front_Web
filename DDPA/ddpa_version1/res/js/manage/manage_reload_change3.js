(function($){
	$(function(){
		/*银行图标信息对象*/
		var jjk_biobj={1025:{type:"jjk",value:"1025",pclass:"bio_gs"},105:{type:"jjk",value:"105",pclass:"bio_js"},103:{type:"jjk",value:"103",pclass:"bio_ny"},104:{type:"jjk",value:"104",pclass:"bio_zg"},3080:{type:"jjk",value:"3080",pclass:"bio_zs"},301:{type:"jjk",value:"301",pclass:"bio_jt"},3230:{type:"jjk",value:"3230",pclass:"bio_yzcx"},314:{type:"jjk",value:"314",pclass:"bio_pf"},307:{type:"jjk",value:"307",pclass:"bio_pa"},309:{type:"jjk",value:"309",pclass:"bio_xy"},313:{type:"jjk",value:"313",pclass:"bio_zx"},312:{type:"jjk",value:"312",pclass:"bio_gd"},311:{type:"jjk",value:"311",pclass:"bio_hx"},305:{type:"jjk",value:"305",pclass:"bio_ms"},306:{type:"jjk",value:"306",pclass:"bio_gf"},316:{type:"jjk",value:"316",pclass:"bio_nj"},324:{type:"jjk",value:"324",pclass:"bio_hz"},302:{type:"jjk",value:"302",pclass:"bio_nb"},310:{type:"jjk",value:"310",pclass:"bio_bj"},326:{type:"jjk",value:"326",pclass:"bio_sh"},342:{type:"jjk",value:"342",pclass:"bio_cqns"},335:{type:"jjk",value:"335",pclass:"bio_bjns"},336:{type:"jjk",value:"336",pclass:"bio_cd"}};
		var xyk_biobj={1027:{type:"xyk",value:"1027",pclass:"bio_gs"},308:{type:"xyk",value:"308",pclass:"bio_zs"},1054:{type:"xyk",value:"1054",pclass:"bio_js"},106:{type:"xyk",value:"106",pclass:"bio_zg"},3112:{type:"xyk",value:"3112",pclass:"bio_hx"},3051:{type:"xyk",value:"3051",pclass:"bio_ms"},3121:{type:"xyk",value:"3121",pclass:"bio_gd"},3231:{type:"xyk",value:"3231",pclass:"bio_yzcx"},3241:{type:"xyk",value:"3241",pclass:"bio_hz"},303:{type:"xyk",value:"303",pclass:"bio_nb"},3261:{type:"xyk",value:"3261",pclass:"bio_sh"},301:{type:"xyk",value:"301",pclass:"bio_jt"},309:{type:"xyk",value:"309",pclass:"bio_xy"},307:{type:"xyk",value:"307",pclass:"bio_pa"}};
		var dsf_biobj={1:{type:"dsf",value:"1",pclass:"bio_gfb"},2:{type:"dsf",value:"2",pclass:"bio_ttf"}};
		/*页面元素获取(更多银行按钮，已选择银行卡，已选择银行卡操作区，更多银行卡操作区)*/
		var mr_morebtn=$("#mr_morebtn"),mr_bankwrap=$("#mr_bankwrap"),mr_alreadywrap=$("#mr_alreadywrap"),mr_selectwrap=$("#mr_selectwrap");
		var mr_selectjjk=$("#mr_selectjjk"),mr_selectxyk=$("#mr_selectxyk"),mr_selectdsf=$("#mr_selectdsf");
		/*隐藏域:已选，最新选择、选择重复提示区*/
		var beforebank=$("#beforebank"),thirdPayType=$("#thirdPayType"),mr_bankseltips=$("#mr_bankseltips");
		/*初始化*/
		(function(){
			/*初始化默认选择银行*/
			if(beforebank.val()==""||beforebank.val()=="-1"||typeof beforebank.val()=="undefined"||beforebank.val()=="null"){
			   /*第一次充值*/
			   mr_alreadywrap.hide();
			   mr_selectjjk.find("li:first").addClass("mr_selectsel").siblings().removeClass("mr_selectsel");
			   beforebank.val("1025");
			   thirdPayType.val("1025");
			}else if((beforebank.val()!=""&&beforebank.val()!="-1")||typeof beforebank.val()!="undefined"){
					/*之前有充值记录存在的情况*/
					mr_alreadywrap.show();
					mr_selectwrap.hide();
					var tempvalue=beforebank.val();
					var tempstr="",temptype="",avalue="",aobj="";
					if(!jjk_biobj.hasOwnProperty(tempvalue)&&!xyk_biobj.hasOwnProperty(tempvalue)&&!dsf_biobj.hasOwnProperty(tempvalue)){
						tempvalue=1025;
						beforebank.val("1025");
						tempstr="<li class=\"mr_banksel\">"+jjk_biobj[tempvalue].value+"<p></p><div class=\""+jjk_biobj[tempvalue].pclass+"\"></div><span class=\"mr_jjkflag\">借记</span></li>";
						thirdPayType.val("1025");
						mr_selectjjk.find("li:first").addClass("mr_selectsel").siblings().removeClass("mr_selectsel");
					}else{
						var temptext="";
						if(jjk_biobj.hasOwnProperty(tempvalue)){
							temptype="jjk";
							aobj=jjk_biobj;
							avalue="借记";
							cardNoAdapt(mr_selectjjk,tempvalue);
							if(xyk_biobj.hasOwnProperty(tempvalue)){
								cardNoAdapt(mr_selectxyk,tempvalue);
							}
						}else if(xyk_biobj.hasOwnProperty(tempvalue)){
							temptype="xyk";
							aobj=xyk_biobj;
							avalue="信用";
							cardNoAdapt(mr_selectxyk,tempvalue);
							if(jjk_biobj.hasOwnProperty(tempvalue)){
								cardNoAdapt(mr_selectjjk,tempvalue);
							}
						}else if(dsf_biobj.hasOwnProperty(tempvalue)){
							temptype="dsf";
							aobj=dsf_biobj;
							avalue="";
							mr_selectdsf.find("li").each(function(index, element) {
								var curobj=$(element);
                                temptext=curobj.text();
								if(temptext==tempvalue){
									curobj.addClass("mr_selectsel");
								}else{
									curobj.removeClass("mr_selectsel");
								}
                            });
						}
						thirdPayType.val(aobj[tempvalue].value);
						if(tempvalue=="301"||tempvalue=="309"||tempvalue=="307"){
							tempstr="<li class=\"mr_banksel\">"+aobj[tempvalue].value+"<p></p><div class=\""+aobj[tempvalue].pclass+"\"></div></li>";
						}else{
							tempstr="<li class=\"mr_banksel\">"+aobj[tempvalue].value+"<p></p><div class=\""+aobj[tempvalue].pclass+"\"></div><span class=\"mr_"+temptype+"flag\">"+avalue+"</span></li>";	
						}
						
					}
					mr_bankwrap.html("");
					$(tempstr).appendTo(mr_bankwrap);
			}
			/*大写初始化*/
			if($("#tradeAmount").length!=0){
				UCFormat(document.getElementById("tradeAmount").value,"mr_uppercase");
			}
			aobj=null;
		}());
		
		/*卡号和选择区卡号对应适配*/
		function cardNoAdapt(objs,txt){
			objs.find("li").each(function(index, element) {
				var curobj=$(element);
				temptext=curobj.text();
				if(temptext==txt){
					curobj.addClass("mr_selectsel");
				}else{
					curobj.removeClass("mr_selectsel");
				}
			});
		}		
		/*更多银行切换效果*/
		mr_morebtn.click(function(){
			$(this).toggleClass("mr_morebtnsel");
			if(beforebank.val()!=""||beforebank.val()!="-1"||typeof beforebank.val()!="undefined"||beforebank.val()!="null"){
				mr_alreadywrap.hide();
			}
			mr_selectwrap.show();
		});
		/*绑定选择不同类型*/
		$("#mr_tag li").click(function(e){
			var curobj=$(e.target),curid=e.target.id,curindex=curobj.index();
			curobj.addClass("mr_tagsel").siblings().removeClass("mr_tagsel");
			if(curindex==0){
				mr_selectjjk.show();
				mr_selectxyk.hide();
			}else if(curindex==1){
				mr_selectjjk.hide();
				mr_selectxyk.show();		
			}
		});
		/*绑定更多银行选择事件*/
		$("#mr_selectjjk,#mr_selectxyk,#mr_selectdsf").live("click",function(e){
			var tempnode=e.target.nodeName.toLowerCase();
			if(tempnode=="ul"){
				return false;
			}
			var curobj=$(e.target),curtext,selstr="",parobj="",wrapid="";
			if(tempnode=="div"||tempnode=="p"){
				parobj=curobj.parent();
				curtext=parobj.text();
				parobj.addClass("mr_selectsel").siblings().removeClass("mr_selectsel");
				wrapid=parobj.parent().attr("id").slice(-3);
			}else if(tempnode=="li"){
				curtext=curobj.text();
				curobj.addClass("mr_selectsel").siblings().removeClass("mr_selectsel");
				wrapid=curobj.parent().attr("id").slice(-3);
			}
			var bvalue="",bobj="";
			if(wrapid=="jjk"){
				bobj=jjk_biobj;
				bvalue="借记";
				mr_selectxyk.find("li").each(function(index, element) {
					element.className="";
                });
				mr_selectdsf.find("li").each(function(index, element) {
                    element.className="";
                });
			}else if(wrapid=="xyk"){
				bobj=xyk_biobj;
				bvalue="信用";
				mr_selectjjk.find("li").each(function(index, element) {
                    element.className="";
                });
				mr_selectdsf.find("li").each(function(index, element) {
                    element.className="";
                });
			}else if(wrapid=="dsf"){
				bobj=dsf_biobj;
				bvalue="";
				mr_selectxyk.find("li").each(function(index, element) {
                    element.className="";
                });
				mr_selectjjk.find("li").each(function(index, element) {
                    element.className="";
                });
			}
			var selobj=bobj[curtext];
			beforebank.val(selobj.value);
			thirdPayType.val(selobj.value);
			selstr="<li class=\"mr_banksel\">"+selobj.value+"<p></p><div class=\""+selobj.pclass+"\"></div><span class=\"mr_"+wrapid+"flag\">"+bvalue+"</span></li>";
			mr_bankwrap.html("");
			$(selstr).appendTo(mr_bankwrap);
			bobj=null;
		});
		/*充值表单校验*/
		$("#mr_reload").validate({
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
		if(oldstr.indexOf(".")==-1){
			newstr=oldstr.slice(0,strlen-2)+".00";
		}else if(oldstr.indexOf(".")!=-1){
			var tempparts=oldstr.split(".");
			part1=tempparts[0].slice(0,strlen-2);
			part2="."+tempparts[1].slice(0,2);
			newstr=part1+part2;
		}
	}else{
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

/*银行卡与相关对象适配*/
function bkobj_Adapt(str,objarr){
	if(str=="jjk"){
		return [objarr[0],"借记"];
	}else if(str=="xyk"){
		return [objarr[1],"信用"];
	}else if(str=="dsf"){
		return [objarr[2],""];
	}
}