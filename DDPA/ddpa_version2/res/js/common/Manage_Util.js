/*货币格式化
参数说明：第一个参数为格式化货币类型(如$,￥),第二个为需要格式化的数据
*/
function tradeRMBFormat(prefix,strs){
	var rmbstr=strs,rmbres="",rmbqian="";
	var rmbpart1="",rmbpart2="";
	var rmbpf=prefix;
	if(rmbpf=="undefined"){
		rmbpf="";
	}
	if(rmbstr=="null"||rmbstr==null||rmbstr=="undefined"||rmbstr==""){
		return rmbres=rmbpf+"0.00";
	}else{
		rmbstr=rmbstr.toString();
		if(rmbstr.indexOf("-")!=-1){
			rmbqian="-";
			rmbstr=rmbstr.slice(1);
		}else{
			rmbqian="";
		}
		if(rmbstr.indexOf(".")!=-1){
			var temparr=rmbstr.split(".");
			rmbpart1=temparr[0].split("");
			rmbpart1=rmbpart1.reverse();
			rmbpart2=temparr[1];
			if(rmbpart2.length==0){
				rmbpart2="00";
			}else if(rmbpart2.length==1){
				rmbpart2=rmbpart2+"0";
			}else if(rmbpart2.length>=1){
				rmbpart2=rmbpart2.slice(0,2);
			}
			var templen=rmbpart1.length;
			for(var i=0;i<templen;i++){
				var tempsp1=parseInt(i+1);
				if(tempsp1%3==0&&tempsp1!=templen){
					var tempstr1=","+rmbpart1[i];
					rmbpart1.splice(i,1,tempstr1);
				}
			}
			rmbpart1=rmbpart1.reverse();
			return rmbres=rmbpf+rmbqian+rmbpart1.join("")+"."+rmbpart2;
		}else{
			rmbpart1=rmbstr.split("");
			rmbpart1=rmbpart1.reverse();
			var templen1=rmbpart1.length;
			for(var j=0;j<templen1;j++){
				var tempsp2=parseInt(j+1);
				if(tempsp2%3==0&&tempsp2!=templen1){
					var tempstr2=","+rmbpart1[j];
					rmbpart1.splice(j,1,tempstr2);
				}
			}
			rmbpart1=rmbpart1.reverse();
			return rmbres=rmbpf+rmbqian+rmbpart1.join("")+".00";
		}
	}
}
/*认证检测*/
/*../../jiedai/checkedDetail*/
function verif_Infos(){
	var verif_obj={},asurl="",tips="";
	$.ajax({
		url:"../../jiedai/checkedDetail",
		type:"post",
		data:{},
		async:false,
		success: function(data){
			if(data){
				if(data.login=="N"){
					location.href = "../../account/user/login";
				}
				if(data.cardChecked==0){
					asurl += '<a href="../../fund/security/securityInit#real" onclick="$.unblockUI();">实名认证</a>';
					verif_obj.issureId=false;
					tips+="实名认证";
				}else{
					verif_obj.issureId=true;
					asurl+="";
					tips+="";
				}
				if(data.emailChecked==0){
					asurl += '&nbsp;<a href="../../fund/security/securityInit#email" onclick="$.unblockUI();">邮箱认证</a>';
					verif_obj.issureName=false;
					tips+="&nbsp;邮箱认证";
				}else{
					verif_obj.issureName=true;
					asurl+="";
					tips+="";
				}
				if(data.phoneChecked==0){
					asurl += '&nbsp;<a href="../../fund/security/securityInit#phone" onclick="$.unblockUI();">手机认证</a>';
					verif_obj.issurePhone=false;
					tips+="&nbsp;手机认证";
				}else{
					verif_obj.issurePhone=true;
					asurl+="";
					tips+="";
				}
				if(data.tradePasswordChecked==0){
					asurl += '&nbsp;<a href="../../fund/security/securityInit#trade" onclick="$.unblockUI();">交易密码验证</a>';
					verif_obj.issurePwd=false;
					tips+="&nbsp;交易密码验证";
				}else{
					verif_obj.issurePwd=true;
					asurl+="";
					tips+="";
				}
				verif_obj.asurl=asurl;
				verif_obj.tips=tips;
			}else{
				verif_obj.asurl="";
				verif_obj.tips="";
			}
		}
	});
	return verif_obj;
}

/*超过长度将截取字符串*/
function lenSubStr(slen,ss){
	if(ss==""){
		ss=0;
	}else if(ss!=""&&!/\d/.test(ss)){
		ss=0+ss;
	}
	var oldstr=ss.toString();
	oldstr=oldstr.replace(/(\,*)/g,"");
	oldstr=oldstr.replace(/(\s*)/g,"");
	var oldarr=oldstr.split(""),oldlen=oldarr.length;
	var strlen=slen;
	var part1="",part2="",newstr="";
	if(oldlen>=strlen){
		if(oldstr.indexOf(".")==-1){
			newstr=oldstr.slice(0,strlen-2)+".00";
		}else if(oldstr.indexOf(".")!=-1){
			var tempparts=oldstr.split(".");
			part1=tempparts[0].slice(0,strlen-2);
			if(tempparts[1]==""){
				part2=".00";
			}else{
				var tps22=tempparts[1].split("");
				if(tps22.length==1){
					part2="."+tps22[0]+"0";
				}else{
					part2="."+tps22[0]+tps22[1];
				}
			}
			newstr=part1+part2;
		}
	}else{
		if(oldstr.indexOf(".")==-1&&oldstr!=""){
			newstr=oldstr+".00";
		}else if(oldstr.indexOf(".")!=-1){
			var caa=oldstr.split(".");
			if(caa[1]==""){
				newstr=caa[0]+".00";
			}else{
				var caa22=caa[1].split("");
				if(caa22.length==1){
					newstr=caa[0]+"."+caa22[0]+"0";
				}else{
					newstr=caa[0]+"."+caa22[0]+caa22[1];
				}
			}
		}
	}
	return newstr;
}
/*判断闰年并获取月份值*/
function is_LeapYear(ys,ms){
	var ms=parseInt(ms,10);
	var mcds=[31,28,31,30,31,30,31,31,30,31,30,31];
	var isly=ys%4==0&&ys%100!=0?true:ys%400==0?true:false;
	ms==2&&isly?mcds.splice(1,1,29):mcds.splice(1,1,28);
	return mcds[ms-1];
}
/*检测提现金额*/
function testTradeAmount(strs,vs){
	  var mtext1=/^(([1-9]{1}\d{0,5})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/;
	  var mtext2=/^(([1-9]{1}\d{0,4})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/;
	  var values=strs.replace(/(\s*)/g,"");
	  var vips=vs==-1?false:true;
	  if(vips){
		  var tempvalue1=parseInt(values);
		  if(tempvalue1<100){
			  return "单次提现金额不能低于100元";
		  }else if(tempvalue1>500000){
			  return "单次提现金额不能大于50万元";
		  }else if(!mtext1.test(values)){
			  return false;
		  }else{
			  return true;
		  }
	  }else{
		  var tempvalue2 = parseInt(values);
		  if(tempvalue2<100){
			  return "单次提现金额不能低于100元";
		  }else if(tempvalue2>50000){
			  return "单次提现金额不能大于5万元,<a class='tips_links' id='tips_links' target='_blank' href='../../vip/'>升级VIP</a>可提升至50万";
		  }else if(!mtext2.test(values)){
			  return false;
		  }else{
			  return true;
		  }
	  }
}
/*处理到账时间问题*/
function handleToAccountTime(){
	var curdateobj=new Date();
	var curxq=curdateobj.getDay(),curday=curdateobj.getDate(),curmonth=curdateobj.getMonth()+1,curyear=curdateobj.getFullYear();
	var maxdays=is_LeapYear(curyear,curmonth);
	var tempdays=0;
	if(curdateobj.getDay(curday)==5){
		 tempdays=parseInt(curday+3);
	}else if(curdateobj.getDay(curday)==6){
		 tempdays=parseInt(curday+2);
	}else{
		 tempdays=parseInt(curday+1);
	}
	if(tempdays>maxdays){
		curday=tempdays-maxdays;
		curmonth=parseInt(curmonth+1);
		if(curmonth>12){
			curmonth=1;
			curyear=parseInt(curyear+1);
		}
	}else{
		curday=tempdays;
	}
	curmonth=curmonth<10?"0"+curmonth:curmonth;
	curday=curday<10?"0"+curday:curday;
	return curyear+"-"+curmonth+"-"+curday
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
	var tvs=values.toString();
	var formatstr = tvs.replace(/^0+/,"");
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
/*求和*/
function RMBSum(arrs,size){
	var s_arr=arrs,s_len=s_arr.length;
	var s_size=size;
	if(s_size==""||s_size==undefined||s_size==null){
		s_size=2;
	}
	if(s_len==0){
		return "";
	}
	var r_pint=0,r_pfloat=0,res=0,i=0,j=0;
	for(i;i<s_len;i++){
		var temp_s=s_arr[i].toString().replace(/(\,*\s*)/g,"");
		if(temp_s.indexOf(".")!=-1){
			temp_s=temp_s.split(".");
			r_pint=r_pint+parseInt(temp_s[0]);
			r_pfloat=r_pfloat+parseInt(temp_s[1]);
		}else{
			r_pint=r_pint+parseInt(temp_s);
		}
	}
	r_pfloat=r_pfloat.toString().split("");
	var r_pflen=r_pfloat.length,r_pf1=0,r_pf2=0;
	if(r_pflen>s_size){
		r_pf1=r_pfloat.slice(0,r_pflen-s_size).join("");
		r_pf2=r_pfloat.slice(r_pflen-s_size).join("");
	}else{
		r_pf1=0;
		r_pf2=r_pfloat.join("");
	}
	if(r_pf2==""){
		res=r_pint+parseInt(r_pf1);
	}else{
		res=r_pint+parseInt(r_pf1)+"."+r_pf2;
	}
	return res;
}




