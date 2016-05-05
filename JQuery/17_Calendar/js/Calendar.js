/*JavaScript Document
editor:yipin
注释部分以双横杆分割相对应的代码段
*/
$(function(){
	/*定义初始化变量*/
	/*定义页面元素引用*/
	var c_month_days=[31,28,31,30,31,30,31,31,30,31,30,31],calendar_show=$("#calendar_show"),calendar_title=$("#calendar_title"),memory_str=[],month_pre_btn=$("#month_pre_btn"),month_next_btn=$("#month_next_btn"),year_pre_btn=$("#year_pre_btn"),year_next_btn=$("#year_next_btn"),year_tgdz=$("#year_tgdz"),year_dz=$("#year_dz"),qs_control=$("#qs_control"),qs_wrap=$("#qs_wrap"),qs_btn=$("#qs_btn"),qs_text=$("#qs_text"),qs_check=$("#qs_check");
	/*定义农历天干地支*/
	var c_tgdz=["甲子年","乙丑年","丙寅年","丁卯年","戊辰年","己巳年","庚午年","辛未年","壬申年","癸酉年","甲戌年","乙亥年","丙子年","丁丑年","戊寅年","己卯年","庚辰年","辛巳年","壬午年","癸未年","甲申年","乙酉年","丙戌年","丁亥年","戊子年","己丑年","庚寅年","辛卯年","壬辰年","癸巳年","甲午年","乙未年","丙申年","丁酉年","戊戌年","己亥年","庚子年","辛丑年","壬寅年","癸卯年","甲辰年","乙巳年","丙午年","丁未年","戊申年","己酉年","庚戌年","辛亥年","壬子年","癸丑年","甲寅年","乙卯年","丙辰年","丁巳年","戊午年","己未年","庚申年","辛酉年","壬戌年","癸亥年"],c_dizhi={"子":"鼠","丑":"牛","寅":"虎","卯":"兔","辰":"龙","巳":"蛇","午":"马","未":"羊","申":"猴","酉":"鸡","戌":"狗","亥":"猪"};
	/*定义阴阳历相关节假日*/
	var c_ct_holiday={"":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":""},c_sj_holiday={0:{"1":"元旦节"},1:{"2":"世界湿地日","14":"情人节"},2:{"1":"国际海豹日","3":"全国爱耳日","5":"学雷锋","8":"妇女节","12":"中国植树节","14":"国际警察日,白色情人节","15":"消费者权益日","17":"国际航海日","21":"世界森林日,世界睡眠日","22":"世界水日","23":"世界气象日","24":"世界防治结核病日"},3:{"1":"愚人节","2":"国际儿童图书日","7":"世界卫生日","18":"国际古迹遗址日","22":"世界地球日","26":"世界知识产权日"},4:{"1":"劳动节","3":"世界新闻自由日","4":"中国青年节","8":"世界微笑日","12":"国际护士节","17":"世界电信日","19":"中国旅游日","22":"生物多样性国际日","31":"世界无烟日"},5:{"1":"国际儿童节","5":"世界环境日","6":"全国爱眼日","17":"世界防治荒漠化和干旱日","23":"国际奥林匹克日","26":"国际禁毒日"},6:{"1":"中国建党日,国际建筑日","7":"中国人民抗日战争纪念日","11":"世界人口日"},7:{"1":"中国建军节","6":"国际电影节","12":"国际青年日"},8:{"8":"国际新闻工作者日,国际扫盲日","10":"中国教师节","14":"世界清洁地球日","16":"国际臭氧层保护日,中国脑健康日","18":"中国国耻日","20":"全国爱牙日","21":"国际和平日","27":"世界旅游日"},9:{"1":"中国国庆节,国际音乐日,国际老年人日","4":"世界动物日","5":"世界教师日","14":"世界标准日","15":"国际盲人节","16":"世界粮食日","17":"世界消除贫困日","22":"世界传统医药日","24":"联合国日,世界发展新闻日","28":"中国男性健康日","29":"国际生物多样性日"},10:{"8":"中国记者节","14":"世界糖尿病日","17":"国际大学生节","25":"国际消除对妇女的暴力日"},11:{"1":"世界艾滋病日","3":"世界残疾人日","4":"全国法制宣传日","25":"圣诞节"}},c_xq_holiday={2:{1:"4,1,全国中小学安全宣传教育日"},3:{1:"4,0,世界儿童日",2:"4,3,秘书节"},4:{1:"2,0,母亲节",2:"2,2,世界哮喘日",3:"3,0,全国助残日"},5:{1:"2,6,中国文化遗产日",2:"3,0,父亲节"},8:{1:"3,6,全民国防教育日",2:"4,0,国际聋人节,世界心脏日"},9:{1:"2,3,减少自然灾害国际日",2:"2,4,世界视觉日"}};
	/*初始化方法,初始化方法位置不能改变,始终放在初始化变量之后*/
	(function(){
		/*初始化日历结构*/
		getCalendars();
	})();
	/*事件监听*/
	/*月份按钮事件监听*/
	var memory_years="",memory_months="",memory_date="";
	month_pre_btn.click(function(){
		if(memory_str[1]==1){
			memory_months=memory_str[1]=12;
		    memory_years=--memory_str[0];
		}else{
			memory_months=--memory_str[1];
		}
		memory_years=memory_str[0];
		memory_date=memory_str[2];
		getCalendars(memory_years,memory_months,memory_date);
	});
	month_next_btn.click(function(){
		if(memory_str[1]==12){
			memory_months=memory_str[1]=1;
		    memory_years=++memory_str[0];
		}else{
			memory_months=++memory_str[1];
		}
		memory_years=memory_str[0];
		memory_date=memory_str[2];
		getCalendars(memory_years,memory_months,memory_date);
	});
	/*年份按钮事件监听*/
	year_pre_btn.click(function(){getCalendars(--memory_str[0],memory_str[1],memory_str[2]);});
	year_next_btn.click(function(){getCalendars(++memory_str[0],memory_str[1],memory_str[2]);});
	/*日期选择事件*/
	calendar_show.find("div").live("click",function(){
		var cur_obj=$(this),cur_text=cur_obj.text().match(/\d+/);
		/*当前选中高亮*/
		cur_obj.addClass("curdates").parents().siblings().find("div").removeClass("curdates");
		/*保存当前选中的日期到记忆数组*/
		memory_str.splice(2,1,cur_text);
		/*同步更新日期标题*/
		memory_str[0]>=0?calendar_title.text(memory_str[0]+"年"+memory_str[1]+"月"+cur_text+"日"):calendar_title.text("公元前:"+Math.abs(memory_str[0])+"年"+memory_str[1]+"月"+cur_text+"日");
	});
	/*兼容样式,主要兼容ie6样式*/
	if($.browser.msie){
		if($.browser.version<7){
			calendar_show.find("td:first-child div").css({"color":"#f00"}).end().find("div").hover(function(){
				var curobj=$(this);
				curobj.text()!=memory_str[2]?curobj.css({"background":"#f1f1f1"}):curobj.css({"background":"#038DC9","font-size":"24px"});
			},function(){
				var curobj=$(this);
				curobj.text()!=memory_str[2]?curobj.css({"background":"transparent"}):curobj.css({"background":"#038DC9","font-size":"18px"});
			});
		}
	}
	/*快捷查询事件监听*/
	var qs_cflag=0;
	qs_control.click(function(){
		qs_cflag=qs_cflag==0?1:0;
		if(qs_cflag==1){
			qs_wrap.css({"display":"block","top":"-30px"});
		}else{
			qs_wrap.css({"display":"none","top":"0"});
			qs_text.val("");
		}
	});
	/*检测输入值是否合法*/
	qs_text.keyup(function(){
		var qs_textobj=$(this);
		if(/\D/.test(qs_textobj.val()))qs_textobj.val("");
	});
	/*处理输入值*/
	qs_btn.click(function(){
		var qs_value=qs_text.val();
		if(qs_value!="")getCalendars(qs_value);
	});
	/*修正实际年,月,日与程序之间的误差*/
	function getCalendars(years,months,dates){
		if(arguments.length==3){
			init_memory(years,months,dates);
			doTGDZ_Year(years);
			var cur_month=months-1;
			doCalendars(years,cur_month,dates);
		}else if(arguments.length==1){
			var isqscheck=qs_check.is(":checked");
			var qs_params=isqscheck?-arguments[0]:arguments[0];
			var qs_month=memory_str[1],qs_date=memory_str[2];
			init_memory(qs_params,qs_month,qs_date);
			doTGDZ_Year(qs_params);
			doCalendars(qs_params,qs_month-1,qs_date);
		}else if(arguments.length==0){
			var calendars=new Date();
			var cur_year=calendars.getFullYear(),cur_month=calendars.getMonth(),cur_date=calendars.getDate();
			init_memory(cur_year,cur_month+1,cur_date);
			doTGDZ_Year(cur_year);
			doCalendars(cur_year,cur_month,cur_date);
		}
	}
	/*记忆当前或者选择操作当前日期*/
	function init_memory(years,months,dates){
		/*存储记忆当前或者选择事件中的日期*/
		if(memory_str.length==0){
			for(var tt=0;tt<arguments.length;tt++){
				memory_str.push(arguments[tt]);
			}
		}else{
			memory_str.splice(0,3,years,months,dates);
		}
		/*初始化标题*/
		memory_str[0]>=0?calendar_title.text(years+"年"+months+"月"+dates+"日"):calendar_title.text("公元前:"+Math.abs(years)+"年"+months+"月"+dates+"日");
	}
	/*农历天干地支核心部分*/
	function doTGDZ_Year(years){
			var tgdz_tem="",tgdz_str="";
			if(years>1984){
				tgdz_temp=years-1984;
				tgdz_temp%=60;
				tgdz_str=c_tgdz[tgdz_temp];
			}else if(Math.abs(1984-years)%60==0){
				tgdz_str="甲子年"
			}else{
				tgdz_temp=60-Math.abs(1984-years)%60;
				tgdz_str=c_tgdz[tgdz_temp];
			}
			year_tgdz.html(tgdz_str);
			year_dz.html(c_dizhi[tgdz_str.charAt(1)]);
	}
	
	/*
	 *	to do
	 *	阴历节假日核心算法
	 */
	
	function suori(){
		var sr="",jr="";
		sr=1.6+29.5306*2+0.4*Math.sin(1-0.45058*2);
		jr=365.242*113+6.2+15.22*5-1.9*Math.sin(0.262*5);
		//alert(sr+"---"+jr);
	};
	/*显示日历核心方法(目前只实现阳历节假日算法)*/
	function doHolidays(months,firdays,maxcount){
			var mon=months,fir=firdays,maxc=maxcount,year_holiday=[];
			/*得到当前月的世界节假日,当前月以星期定义的假期月份*/
			var temp_sj_holiday=c_sj_holiday[mon],temp_xq_holiday=typeof c_xq_holiday[mon]!="undefined"?c_xq_holiday[mon]:"undefined",xq_holiday_obj="",xq_holiday_str="";
			/*当前月以星期定义的假期月份的算法换算*/
			if(typeof temp_xq_holiday==="object"){
				var temp_xq_result=temp_xq_bei=temp_xq_cur=temp_xq_value="";
				for(var xq in temp_xq_holiday){
					temp_xq_value=temp_xq_holiday[xq].split(",");
					temp_xq_bei=temp_xq_value[0],temp_xq_cur=temp_xq_value[1];
					if(temp_xq_cur<fir){
						temp_xq_result=7*temp_xq_bei+parseInt(temp_xq_cur)-fir+1;
					}else{
						temp_xq_result=7*(temp_xq_bei-1)+parseInt(temp_xq_cur)-fir+1;
					}
					xq_holiday_str+="\""+temp_xq_result+"\":\""+temp_xq_value[2]+"\",";
				}
				xq_holiday_str="{"+xq_holiday_str.substring(0,xq_holiday_str.lastIndexOf(","))+"}";
				try{
					xq_holiday_obj=eval('('+xq_holiday_str+')');
					xq_holiday_str="";
				}catch(exception){
					xq_holiday_obj=xq_holiday_str;
					xq_holiday_str="";
			    }
			}
			/*合并固定日期节假日和以星期定义的节假日,同时解析生成到日历字符串*/
			for(var j=1;j<=maxcount;j++){
				if(j==memory_str[2]){
					if(typeof temp_sj_holiday[j]!="undefined"&&typeof xq_holiday_obj[j]=="undefined"){
						year_holiday.push("<td><div class=\"curdates\">"+j+"<p title=\""+temp_sj_holiday[j]+"\">"+temp_sj_holiday[j]+"</p></div></td>");	
					}else if(typeof temp_sj_holiday[j]=="undefined"&&typeof xq_holiday_obj[j]!="undefined"){
						year_holiday.push("<td><div class=\"curdates\">"+j+"<p title=\""+xq_holiday_obj[j]+"\">"+xq_holiday_obj[j]+"</p></div></td>");
					}else if(typeof temp_sj_holiday[j]!="undefined"&&typeof xq_holiday_obj[j]!="undefined"){
						year_holiday.push("<td><div class=\"curdates\">"+j+"<p title=\""+temp_sj_holiday[j]+","+xq_holiday_obj[j]+"\">"+temp_sj_holiday[j]+","+xq_holiday_obj[j]+"</p></div></td>");
					}else{
						year_holiday.push("<td><div class=\"curdates\">"+j+"</div></td>");
					}
				}else{
					if(typeof temp_sj_holiday[j]!="undefined"&&typeof xq_holiday_obj[j]=="undefined"){
						year_holiday.push("<td><div>"+j+"<p title=\""+temp_sj_holiday[j]+"\">"+temp_sj_holiday[j]+"</p></div></td>");	
					}else if(typeof temp_sj_holiday[j]=="undefined"&&typeof xq_holiday_obj[j]!="undefined"){
						year_holiday.push("<td><div>"+j+"<p title=\""+xq_holiday_obj[j]+"\">"+xq_holiday_obj[j]+"</p></div></td>");
					}else if(typeof temp_sj_holiday[j]!="undefined"&&typeof xq_holiday_obj[j]!="undefined"){
						year_holiday.push("<td><div>"+j+"<p title=\""+temp_sj_holiday[j]+","+xq_holiday_obj[j]+"\">"+temp_sj_holiday[j]+","+xq_holiday_obj[j]+"</p></div></td>");
					}else{
						year_holiday.push("<td><div>"+j+"</div></td>");
					}
				}
			}
			return year_holiday;
	}
	
	/*日历数据结构核心部分*/
	function doCalendars(years,months,dates){
			/*根据年份判断当前年是平年还是闰年并返回当前年所有月份值*/
			c_month_days.splice(1,1,is_LeapYear(years));
			/*获取当前月的最大天数--获取当前月第一天为星期几--定义一月中第一天之前日历,当前可用日历,当前结束日历数据格式(便于数据结构统一),保存记忆当前日期值*/
			var max_month_count=c_month_days[months],first_days=new Date(years,months,1).getDay(),arr_pre=[],arr_cur=[],arr_next=[],arr_content=[],content_str="";
			/*判断月份第一天开始出现位置*/
			var per_days=months==0?31-first_days:c_month_days[months-1]-first_days;
			/*当前月不是星期日的情况*/
			if(first_days!=0){
				/*遍历当前月第一天不是星期日(日历表第一天)的空白数据,即当前月的上一月所遗留数据*/
				for(var p=0;p<first_days;p++){
					++per_days;
					arr_pre.push("<td><span>"+per_days+"</span></td>");
				}
			}else{
				arr_pre.length=0;
			}
			/*遍历当前月数据*/
			arr_cur=doHolidays(months,first_days,max_month_count);
			/*遍历当前月有效数据后的数据*/
			var have_days=first_days+max_month_count,last_days=have_days%7;
			if(last_days!=0){
				var temp_last=7-last_days;
				for(var m=0;m<temp_last;m++){
					arr_next.push("<td><span></span></td>");
				}
			}else{
				arr_next.length=0;
			}
			var contents=arr_pre.concat(arr_cur,arr_next);
			for(var k=0;k<contents.length;k++){
				content_str+=contents[k];
				var kk=k+1;
				if(kk%7==0){
					arr_content.push("<tr>"+content_str+"</tr>");
					content_str="";
				}
			}
			calendar_show.html(arr_content);
	}
	/*判断是否闰年*/
	function is_LeapYear(obj){
		var years="";
		arguments.length==1?years=arguments[0]:years=new Date().getFullYear();
		return years%4==0&&years%100!=0?29:years%400==0?29:28;
	}	
	
	
	
	
		   
});