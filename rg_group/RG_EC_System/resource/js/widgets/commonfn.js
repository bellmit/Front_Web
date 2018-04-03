/*
author:yipin,
name:commonfn 
定义相关校验方法,依赖部分于自定义规则
*/
define(function(require){
	var rules=require('rule');
	return {
			//密码强度(当前密码，提示信息，密码起始范围(数组))
			pwdStrong:function(str,tip,scope){
					var score=0,
					txt=this.trims(str),
					len=txt==''?0:txt.length,
					reg1=/[a-zA-Z]+/,
					reg2=/[0-9]+/,
					reg3=/\W+\D+/;
					if(len>=scope[0]&&len<=scope[1]){
						if(reg1.test(txt) && reg2.test(txt) && reg3.test(txt)) {
							score=90;
						}else if(reg1.test(txt) || reg2.test(txt) || reg3.test(txt)) {
							if(reg1.test(txt) && reg2.test(txt)){
								score=60;
							}else if(reg1.test(txt) && reg3.test(txt)) {
								score=60;
							}else if(reg2.test(txt) && reg3.test(txt)) {
								score=60;
							}else{
								score=30;
							}
						}
						if(score<=50){
							tip.removeClass().addClass('g-c-gray2').html('低级');
						}else if(score<=79&&50<score){
							tip.removeClass().addClass('g-c-orange').html('中级');
						}else if(score>=80){
							tip.removeClass().addClass('g-c-red2').html('高级');
						}
					}else if(txt==""||txt=="null"){
						tip.removeClass().addClass('g-c-gray2').html('');
					}else if(txt!=""&&len<scope[0]){
						tip.removeClass().addClass('g-c-red2').html('密码长度至少大于'+scope[0]+'位');
					}else{
						tip.removeClass().addClass('g-c-gray2').html('');
					}
			},
			//读秒（定时函数引用，秒数，读秒按钮）
			getCount:function(){
					var count=0,
					id=tid,
					t=times,
					n=nodes;
					n.html(times+'秒后重新获取').attr({"disabled":"disabled"}),
					timer=this.getTimer();
					id=setInterval(function(){
							count=timer();
							count=count<=t?count:count%t;
							n.html((t-count)+'秒后重新获取');
							if(count==t||count==0){
								clearInterval(id);
								tid=null;
								id=null;
								n.removeAttr("disabled").html('获取验证码');
							};
					},1000);
			},
			//去除所有空格（字符串,需去除字符)
			trimSep:function(str,sep){
				return str.replace(new RegExp('\\'+sep,'g'),'');
			},
			//去除所有空格（字符串）
			trims:function(str){
				return str.replace(/\s*/g,'');
			},
			//去除前后空格(字符串)
			trim:function(str){
				return str.replace(/^\s*\s*$/,'');
			},
			//判断邮箱(字符串)
			isEmail:function(str){
				return rules.email.test(this.trims(str))?true:false;
			},
			//判断手机（字符串）
			isMobilePhone:function(str){
				return rules.mobilephone.test(this.trims(str))?true:false;
			},
			//判断邮箱或者手机（字符串）
			isEMP:function(str){
				if(!this.isEmail(str)&&!this.isMobilePhone(str)){
						return false;
				}else{
						return true;
				}
			},
			//判空（字符串）
			isRequire:function(str){
					return this.trims(str)==''?true:false;
			},
			//判断是否相等（字符串1，字符串2）
			isEqual:function(str1,str2){
					return this.trims(str1)==this.trims(str2)?true:false;
			},
			//判断是否是数值(字符串)
			isNum:function(str){
					return rules.num.test(this.trims(str))?true:false;
			},
			//判断数据范围(数据，起始范围数组)
			isMinMax:function(str,arr){
					var len=str.length;
					return (len<arr[1]||len==arr[1])&&(len>arr[0]||len==arr[0])?true:false;
			},
			//计时器
			getTimer:function(){
					var i=0;
					return function(){
							return ++i;
					}; 
			},
			//最大为亿(字符串)
			isMoneyY:function(str){
					return rules.moneyy.test(this.trims(str))?true:false;
			},
			//最大为千万(字符串)
			isMoneyQW:function(str){
					return rules.moneyqw.test(this.trims(str))?true:false;
			},
			//最大为百万(字符串)
			isMoneyBW:function(str){
					return rules.moneybw.test(this.trims(str))?true:false; 
			},
			//最大为十万(字符串)
			isMoneySW:function(str){
					return rules.moneysw.test(this.trims(str))?true:false;
			},
			//最大为万(字符串)
			isMoneyW:function(str){
					return rules.moneyw.test(this.trims(str))?true:false;
			},
			//最大为千(字符串)
			isMoneyQ:function(str){
					return rules.moneyq.test(this.trims(str))?true:false; 
			},
			//最大为百(字符串)
			isMoneyB:function(str){
					return rules.moneyb.test(this.trims(str))?true:false; 
			},
			//是否为正确的人民币格式(字符串)
			isMoney:function(str){
					return rules.money.test(this.trims(str))?true:false; 
			},
			//将人民币转换成大写（字符串，显示容器）
			toUpMoney:function(str,wraps){
					var cn_zero = "零",
							cn_one = "壹",
							cn_two = "贰",
							cn_three = "叁",
							cn_four = "肆",
							cn_five = "伍",
							cn_six = "陆",
							cn_seven = "柒",
							cn_height = "捌",
							cn_nine = "玖",
							cn_ten = "拾",
							cn_hundred = "佰",
							cn_thousand = "仟",
							cn_ten_thousand = "万",
							cn_hundred_million = "亿",
							cn_symbol="",
							cn_dollar = "元",
							cn_ten_cent = "角",
							cn_cent = "分",
							cn_integer = "整",
							integral,
							decimal,
							outputCharacters,
							parts,
							digits,
							radices,
							bigRadices,
							decimals,
							zeroCount,
							i,
							p,
							d,
							quotient,
							modulus,
							tvs=str.toString(),
							formatstr = tvs.replace(/^0+/,""),
							parts =formatstr.split(".");
					
					if (parts.length > 1) {
							integral = parts[0];
							decimal = parts[1];
							decimal = decimal.slice(0, 2);
					}else {
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
									}else {
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
					
					if(wraps){
						return wraps.innerHTML=outputCharacters;
					}else{
						return outputCharacters;
					}
			},
			//自动补全纠错人民币(字符串)，返回一个数组['格式化后的数据',带小数点的未格式化数据]
			moneyCorrect:function(str){
					var money=this.trimSep(str.toString(),','),
							moneyarr,
							len=0,
							partz,
							partx,
							tempstr='';
					
					money=this.trims(money);
					if(money==''){
						return ['0.00','0.00'];
					}
					if(money.lastIndexOf('.')!=-1){
							moneyarr=money.split('.');
							len=moneyarr.length;
							if(len>2){
									partz=moneyarr[len-2];
									partx=moneyarr[len-1];
							}else{
									partz=moneyarr[0];
									partx=moneyarr[1];
							}
							if(!rules.num.test(partx)){
								partx=partx.replace(/\D*/g,'');
							}
							if(partx.length==0){
								partx='.00';
							}else if(partx.length==1){
								partx='.'+partx+'0';
							}else if(partx.length>=2){
								partx='.'+partx.slice(0,2);
							}
					}else{
							partz=money;
							partx='.00';
					}
					if(!rules.num.test(partz)){
							partz=partz.replace(/\D*/g,'');
					}
					tempstr=partz+partx;
					var templen=partz.length;
					if(templen>3){
							var i=0,j=1;
							partz=partz.split('').reverse();
							for(i;i<templen;i++){
									if(j%3==0&&j!=templen){
											partz.splice(i,1,','+partz[i].toString());
									}
									j++;
							}
							partz=partz.reverse().join('');
					}else if(templen==0){
						partz='0';
					}
					if(partz.length>=2){
						if(partz.charAt(0)=='0'||partz.charAt(0)==0){
							partz=partz.slice(1);
						}
					}
					return [partz+partx,tempstr];
			},
			//光标定位至具体位置(需定位元素,[元素中字符],定位位置，[是否在特定位置的前或者后])
			cursorPos:function(elem,str,index,flag){
					var vals='',
						len=0;
					if(!str){
						vals=elem.value||elem.innerHTML;
						len=vals.length;
					}else{
						len = str.lengt
					}
					pos=Number(index);
					
					if(isNaN(pos)){
						pos=str.indexOf(index);
					}

					//elem.focus();	
					setTimeout(function() {
						if (elem.setSelectionRange) {
							if(!flag){
								elem.setSelectionRange(pos,pos);
							}else{
								elem.setSelectionRange(pos+1,pos+1);
							}
						} else {
							var range = elem.createTextRange();
							range.moveStart("character", -len);
							range.moveEnd("character", -len);
							if(!flag){
								range.moveStart("character", pos);
							}else{
								range.moveStart("character", pos+1);
							}
							range.moveEnd("character", 0);
							range.select();
						}
					},0);
			},
			////银行卡格式化（字符串）
			cardFormat:function(str){
				var cardno=str.toString().replace(/\s*/g,'');
				if(cardno==''){
					return '';
				}
				cardno=cardno.split('');
				var len=cardno.length,
				i=0,
				j=1;
				for(i;i<len;i++){
					if(j%4==0&&j!=len){
						cardno.splice(i,1,cardno[i]+" ");
					}
					j++;
				}
				return cardno.join('');
			},
			////手机格式化
			phoneFormat:function(str){
				var phoneno=str.toString().replace(/\s*/g,'');
				if(phoneno==''){
					return '';
				}
				phoneno=phoneno.split('');
				
				var len=phoneno.length,
				i=0;
				for(i;i<len;i++){
					var j=i+2;
					if(i!=0){
						if(i==2){
							phoneno.splice(i,1,phoneno[i]+" ");
						}else if(j%4==0&&j!=len+1){
							phoneno.splice(i,1,phoneno[i]+" ");
						}
					}
				}
				return phoneno.join('');
			},
			///金额加法
			moneyAdd:function(str1,str2){
				var r1,
						r2,
						m,
						c,
						txt1=str1.toString(),
						txt2=str2.toString();
						try {
							r1 = txt1.split(".")[1].length;
						} catch (e) {
							r1 = 0;
						}  
						try {
							r2 = txt2.split(".")[1].length;
						} catch (e) {
							r2 = 0;
						}  
						c = Math.abs(r1 - r2);  
						m = Math.pow(10, Math.max(r1, r2))  
						if (c > 0) {  
								var cm = Math.pow(10, c);  
								if (r1 > r2) {  
										txt1 = Number(txt1.replace(/\.*/g,''));  
										txt2 = Number(txt2.replace(/\.*/g,'')) * cm;  
								}else{  
										txt1 = Number(txt1.replace(/\.*/g,'')) * cm;  
										txt2 = Number(txt2.replace(/\.*/g,''));  
								}  
						}else{  
								txt1 = Number(txt1.replace(/\.*/g,''));  
								txt2 = Number(txt2.toString().replace(/\.*/g,''));  
						}  
						return (txt1 + txt2) / m;
			},
			///金额减法
			moneySub:function(str1,str2){
				var r1,
						r2,
						m,
						n;
				try{
					r1=str1.toString().split(".")[1].length;
				}catch(e){
					r1=0;
				}
				try{
					r2=str2.toString().split(".")[1].length;
				}catch(e){
					r2=0;
				}
				m=Math.pow(10,Math.max(r1,r2));
				n=(r1>=r2)?r1:r2;
				return ((str1*m-str2*m)/m).toFixed(n);
			},
			///金额乘法
			moneyMul:function(str1,str2){
					var m = 0,
							s1 = str1.toString(),
							s2 = str2.toString();  
					try {
						m += s1.split(".")[1].length;
					} catch (e) {}  
					try {
						m += s2.split(".")[1].length;
					} catch (e) { }  
					return Number(s1.replace(/\.*/g,'')) * Number(s2.replace(/\.*/g,'')) / Math.pow(10, m);
			},
			///金额除法
			moneyDiv:function(str1,str2){
				var t1=0,
						t2=0,
						r1,
						r2,
						txt1=str1.toString(),
						txt2=str2.toString(); 
				try{
					t1=txt1.split(".")[1].length;
				}catch(e){} 
				try{
					t2=txt2.split(".")[1].length;
				}catch(e){}
				with(Math){ 
					r1=Number(txt1.replace(/\.*/g,'')) 
					r2=Number(txt1.replace(/\.*/g,'')) 
					return (r1/r2)*pow(10,t2-t1); 
				} 
			}
			
			//others
	}
});