//转换日期
		function DateFormat(dObj){
			var y = dObj.getFullYear(), m = dObj.getMonth() + 1, d = dObj.getDate();
			if(m <= 9) m = "0"+m;
			if(d <= 9) d = "0"+d;
			return y+"-"+m+"-"+d;
		}
		
		//日期计算：加法
		function AddDays(date,days){
			if(navigator.userAgent.indexOf("MSIE")>0) {    
				var date = date.replace(/-/g,"/");     //IE浏览器  
			} 
			var nd = new Date(date);
			   nd = nd.valueOf();
			   nd = nd + days * 24 * 60 * 60 * 1000;
			   nd = new Date(nd);
			   //alert(nd.getFullYear() + "年" + (nd.getMonth() + 1) + "月" + nd.getDate() + "日");
			var y = nd.getFullYear();
			var m = nd.getMonth()+1;
			var d = nd.getDate();
			if(m <= 9) m = "0"+m;
			if(d <= 9) d = "0"+d; 
			return y+"-"+m+"-"+d;
		}
		
		//日期计算：减法
		function SubDays(date,days){
			if(navigator.userAgent.indexOf("MSIE")>0) {    
				var date = date.replace(/-/g,"/");     //IE浏览器  
			} 
			
			var nd = new Date(date);
			   nd = nd.valueOf();
			   nd = nd - days * 24 * 60 * 60 * 1000;
			   nd = new Date(nd);
			   //alert(nd.getFullYear() + "年" + (nd.getMonth() + 1) + "月" + nd.getDate() + "日");
			var y = nd.getFullYear();
			var m = nd.getMonth()+1;
			var d = nd.getDate();
			if(m <= 9) m = "0"+m;
			if(d <= 9) d = "0"+d; 
			return y+"-"+m+"-"+d;
		}
		
		//日期计算：比较
		function DateDiff(d1,d2){
			var day = 24 * 60 * 60 *1000;
			try{    
				var dateArr = d1.split("-");
			   var checkDate = new Date();
					checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
			   var checkTime = checkDate.getTime();
			  
			   var dateArr2 = d2.split("-");
			   var checkDate2 = new Date();
					checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
			   var checkTime2 = checkDate2.getTime();
				
			   var cha = (checkTime - checkTime2)/day;  
					return cha;
				}catch(e){
			   return false;
			}
		}
		
		//手机号码输入检测
		function turnPhoneNo(event){
			if(event.keyCode==8 || event.keyCode==37 || event.keyCode==39){
				return;
			}
			
			var $this = $(event.target), no = $this.val();
			tno = no.replace(/(\s*)/g,"");
			var l = tno.length;
			if(l==3 || l==7){
				no = no+" ";
				$this.val(no);
			}
		}
		
		//身份证号码输入检测
		function turnIDNo(event){
			if(event.keyCode==8 || event.keyCode==37 || event.keyCode==39){
				return;
			}
			
			var $this = $(event.target), no = $this.val();
			tno = no.replace(/(\s*)/g,"");
			var l = tno.length;
			if(l==6 || l==10 || l==14){
				no = no + " ";
				$this.val(no);
			}
		}
		
		//银行卡号输入检测
		function turnCardNo(event){
			if(event.keyCode==8){
				return;
			}
			
			var $this = $(event.target), no = $this.val();
			if(no.length >= 23){
				return false;
			}
			tno = no.replace(/(\s*)/g,"");
			var l = tno.length, y=l%4;
			if(l!=0 && y==0){
				no = no + " ";
				$this.val(no);
			}
			
		}
		
		function formatBCNo(v){
			var tv = v.replace(/(\s*)/g,"");
			var l = tv.length;
			var v2="", f1="",f2="",f3="",f4="",f5="";
			if(l<=4){ 
				f1=tv
			}else if(l>4 && l<=8){
				f1= tv.slice(0,4)+" ";
				f2= tv.slice(4,l);
			}else if(l>8 && l<=12){
				f1= tv.slice(0,4)+" ";
				f2= tv.slice(4,8)+" ";
				f3= tv.slice(8,l);
			}else if(l>12 && l<=16){
				f1= tv.slice(0,4)+" ";
				f2= tv.slice(4,8)+" ";
				f3= tv.slice(8,12)+" ";
				f4= tv.slice(12,l);
			}else{
				f1= tv.slice(0,4)+" ";
				f2= tv.slice(4,8)+" ";
				f3= tv.slice(8,12)+" ";
				f4= tv.slice(12,16)+" ";
				f5= tv.slice(16,l);
			}
			return f1+f2+f3+f4+f5;
		}

		/*
		判断闰年并获取月份值
		参数：年份，月份(实际)
		*/
		function is_LeapYear(ys,ms){
			var ms=parseInt(ms,10);
			var mcds=[31,28,31,30,31,30,31,31,30,31,30,31];
			var isly=ys%4==0&&ys%100!=0?true:ys%400==0?true:false;
			ms==2&&isly?mcds.splice(1,1,29):mcds.splice(1,1,28);
			return mcds[ms-1];
		}
		
		
		
		$(document).ready(function(e){
			$("input.cpFNo").keyup(turnPhoneNo);
			$("input.idFNo").keyup(turnIDNo);
			$("input.bankFNo").keyup(turnCardNo);
		})
		
		/*
		 * 光标定位
		 */
		function setCaretPosition(tObj, sPos){
				if(tObj.setSelectionRange){
		        setTimeout(function(){
		            tObj.setSelectionRange(sPos, sPos);
		            tObj.focus();
		        }, 0);
			    }else if(tObj.createTextRange){
			        var rng = tObj.createTextRange();
			        rng.move('character', sPos);
			        rng.select();
			}
		}
		//选择文本
		function selectText(obj,start,end){
			if(obj.createTextRange){//IE浏览器
				var rng=obj.createTextRange()  
				var sel = rng.duplicate();  
				sel.moveStart("character", start);  
				sel.moveEnd("character", end);  
				sel.select();  
				
			}else{//非IE浏览器
				obj.setSelectionRange(start, end);
				obj.focus();
			}
		}
			
		//选中文本
		function sel(obj,v){  
			var rng=obj.createTextRange()  
			var sel = rng.duplicate();  
			sel.moveStart("character", v);  
			sel.setEndPoint("EndToStart", rng);  
			sel.select();  
		}  
		
		/*身份证判断*/
		function getIDCard(values){
			var values = values.replace(/(\s*)/g,"");
			var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
			var cfarr=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],lastarr=[1,0,"x",9,8,7,6,5,4,3,2];
			var len=values.length;
			if(values==""){
				return false;
			}
			if(len<=2&&area[parseInt(values.substr(0,2),10)]==null){
				return false;
			}
			if(len==15||len==18){
				if(area[parseInt(values.substr(0,2),10)]==null){	
					return false;		
				}
				if(len==15){
					var tempsyear=parseInt(19+values.slice(6,8),10),tempsmonth=parseInt(values.slice(8,10),10),tempsdays=parseInt(values.slice(10,12),10);
					if(tempsmonth<1||tempsdays<1||tempsmonth>12){
						return false;
					}
					tempsmonth=tempsmonth>12?(tempsmonth%12)==0?12:tempsmonth%12:tempsmonth;
					if(is_LeapYear(tempsyear,tempsmonth)<tempsdays){
						return false;
					}
					if(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(values)){
						return true;
					}else{
						return false;
					}
				}
				if(len==18){
					var templyear=parseInt(values.slice(6,10),10),templmonth=parseInt(values.slice(10,12),10),templdays=parseInt(values.slice(12,14),10);
					if(templmonth<1||templdays<1||templmonth>12){
						return false;
					}
					templmonth=templmonth>12?(templmonth%12)==0?12:templmonth%12:templmonth;
					if(is_LeapYear(templyear,templmonth)<templdays){
						return false;
					}
					if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(values)){
						return true;
					}else{
						return false;
					}
					/*var temparr=values.slice(0,17).split(""),templast=values.slice(17,18).toLowerCase();
					var tempsum=0,tempresult=null;
					for(var i=0;i<17;i++){
						tempsum+=parseInt(temparr[i])*parseInt(cfarr[i]);
					}
					tempresult=lastarr[tempsum%11];
					if(tempresult!=templast){
						return false;
					}else{
						return true;
					}*/
				}
			}else{
				return false;
			}
		}
	
		function setCountDown(rel){
			rel.after("<span class='timerholder'><span id='timer'>3</span>秒后刷新</span>");
			var timer = setInterval(function(){ 
				var t = $("#timer");
				if((parseInt($("#timer").text())-1)<1){
					clearInterval(timer);
					window.location.reload();
				};
				t.text(parseInt($("#timer").text())-1);
			},1000);
		}

