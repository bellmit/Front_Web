/***
name:date plugin
author:yipin
日历控件服务类，基于zepto和GMU日历控件
***/
(function($,w){
		$.extend((function(){
				return!$.Calendar?$.Calendar={}:$.Calendar;
			}()),{
				//初始化内部数据
				dpInit:function(){
						var self=this;
						this.tempsecond = 1000;
						this.tempminute = 60000;
						this.temphour = 3600000;
						this.tempday = 86400000;
						this.currentdate = new Date();
						this.currentyear = this.currentdate.getFullYear();
						this.currentmonth = this.currentdate.getMonth() + 1;
						//当前日
						this.currentday = this.currentdate.getDate();
						//当前月日年
						this.currentymd=this.toStrDate(this.currentyear.toString()+'/'+this.currentmonth.toString()+'/'+this.currentday.toString(),'/');
						//当前月结束日期
						this.current_enddate=this.toStrDate(this.currentymd,'-');
						//当前开始结束日期
						this.absDate(this.currentymd,this.currentday,'sub');
						return this;
				},
				/*日历控件初始化*/
				calendarInit:function(obj,n){
						var tempthis=this;
						if(n==1){
								/*开始日期初始化*/
								obj.swrap.calendar({
										date:tempthis.current_enddate,
										maxDate:tempthis.current_enddate,
										select: function(e, date, dateStr){
												obj.wrap.hide();
												obj.stxt.val(dateStr);
												tempthis.current_startdate=dateStr;
										}
								});
						}else if(n==2){
							/*开始日期初始化*/
							obj.swrap.calendar({
									date:tempthis.current_enddate,
									maxDate:tempthis.current_enddate,
									select: function(e, date, dateStr){
											tempthis.current_startdate=dateStr;
											obj.ewrap.calendar('minDate', date).calendar('refresh');
											obj.wrap.hide();
											obj.stxt.val(dateStr);
									}
							});
							/*结束日期初始化*/
							obj.ewrap.calendar({
									date:tempthis.current_enddate,
									maxDate:tempthis.current_enddate,
									select: function(e, date, dateStr){
											tempthis.current_enddate=dateStr;
											obj.swrap.calendar('maxDate', date).calendar('refresh');
											obj.wrap.hide();
											obj.etxt.val(dateStr);
									}
							});
						}
				},
				/*日期加减计算*/
				absDate: function(date,day,type){
						var tempy,
								tempm,
								tempd,
								tempymd,
								date=this.toStrDate(date,'/');
						if(date!=this.currentymd){
								this.current_enddate=this.toStrDate(date,'-');
						 }
						var tempdate = new Date(date);
							tempdate = tempdate.valueOf();
						 if(type=='sub'){
							 tempdate=tempdate-day*this.tempday;
						 }else if(type=='add'){
							 tempdate=tempdate+day*this.tempday;
						 }
						 tempdate = new Date(tempdate);
						 tempy = tempdate.getFullYear();
						 tempm = tempdate.getMonth()+1;
						 tempd = tempdate.getDate();
						 if(tempm <= 9){
							 tempm='0'+tempm;
						 }
						 if(tempd <= 9){
							 tempd='0'+tempd;
						 }
						 tempymd=tempy+"-"+tempm+"-"+tempd;
						 this.current_startdate=tempymd;
				},
				/*设置日期*/
				setTextDate:function(obj,n){
					if(n==1){
						obj.stxt(this.current_startdate);
					}else if(n==2){
						obj.stxt.val(this.current_startdate);
						obj.etxt.val(this.current_enddate);
					}
				},
				/*获取日期*/
				getTextDate:function(){
						var svalue=this.current_startdate;
						var evalue=this.current_enddate;
						if(svalue==''||evalue==''||svalue==null||evalue==null||typeof svalue==='undefined'||typeof evalue==='undefined'){
								this.setErrorDate('sub');
								return [this.current_startdate,this.current_enddate];
						}else{
								return [svalue,evalue];
						}
				},
				/*转换所需格式*/
				toStrDate: function(d,s) {
						var str=d.toString(),tempstr,tempm,tempd;
						str=str.replace(/[\/\|\s\-]/g,s);
						tempstr=str.split(s);
						tempm=parseInt(tempstr[1])<=9?'0'+parseInt(tempstr[1]):tempstr[1];
						tempd=parseInt(tempstr[2])<=9?tempd='0'+parseInt(tempstr[2]):tempstr[2];
						return tempstr[0]+s+tempm+s+tempd;
				},
				/*错误时间修正*/
				setErrorDate:function(type){
						if(type=='sub'||typeof type==='undefined'){
								this.absDate(this.currentymd,this.currentday,'sub');
						}else if(type=='add'){
								var tempobj=this.isLeapYear(this.currentyear);
								var tempday=tempobj.months;
								this.absDate(this.currentymd,tempday[this.currentmonth-1]-this.currentday,'add');					
						}
				},
				/*判断闰年并获取月份值*/
				isLeapYear: function(y, m) {
						var m_arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
						var isly = y % 4 == 0 && y % 100 != 0 ? true : y % 400 == 0 ? true : false;
						isly ? m_arr.splice(1, 1, 29) : m_arr.splice(1, 1, 28);
						if (typeof m !== 'undefined') {				
							/*返回对象：分别为是否为闰年，所求月份最大值,所有月份值*/
							return {
								isly: isly,
								m: m_arr[parseInt(m, 10) - 1],
								months: m_arr
							};
						} else {
							/*返回对象：分别为是否为闰年,所有月份值*/
							return {
								isly: isly,
								months: m_arr
							};
						}
				}
		});
		
		
		$(function(){
				//日历初始化调用
				$.Calendar.dpInit();
		});
})(Zepto,window);