jQuery(function($){
	/*页面元素引用*/
	var clock_wrap=$("#clock_wrap"),clock_hour=$("#clock_hour"),clock_minute=$("#clock_minute"),clock_second=$("#clock_second"),clock_times=$("#clock_times");
	var c_wrapwidth=clock_hour.width()/2;
	/*角度与时间的刻度的对应关系*/
	var angle_mstime={0:90,1:84,2:78,3:72,4:66,5:60,6:54,7:48,8:42,9:36,10:30,11:24,12:18,13:12,14:6,15:0,16:354,17:348,18:342,19:336,20:330,21:324,22:318,23:312,24:306,25:300,26:294,27:288,28:282,29:276,30:270,31:264,32:258,33:252,34:246,35:240,36:234,37:228,38:222,39:216,40:210,41:204,42:198,43:192,44:186,45:180,46:174,47:168,48:162,49:156,50:150,51:144,52:138,53:132,54:126,55:120,56:114,57:108,58:102,59:96},angle_htime={0:90,1:60,2:30,3:0,4:330,5:300,6:270,7:240,8:210,9:180,10:150,11:120,12:90,13:60,14:30,15:0,16:330,17:300,18:270,19:240,20:210,21:180,22:150,23:120,24:90};
	/*初始化*/
	Clock_init();
	/*周期调用*/
	setInterval(Clock_init,1000);
	/*程序入口*/
	function Clock_init(){
		var cur_date=new Date();
		var cur_hours=cur_date.getHours(),cur_minute=cur_date.getMinutes(),cur_second=cur_date.getSeconds();
		var cur_minutetext=cur_minute<10?"0"+cur_minute:cur_minute;
		var cur_secondtext=cur_second<10?"0"+cur_second:cur_second;
		clock_times.text(cur_hours+":"+cur_minutetext+":"+cur_secondtext);
		doP_Hour(cur_hours,cur_minute);
		doP_Minutes(cur_minute);
		doP_Seconds(cur_second);
	}
	
	/*处理时针算法*/
	function doP_Hour(hours,minutes){
		clock_hour.html("");
		var hourstr="";
		/*换算成实际角度值,并将角度值转化为弧度值*/
		var hour_angle=(angle_htime[hours]-minutes/2)/360;
		hour_angle=hour_angle*2*Math.PI;
		var h_commony=Number(Math.sin(hour_angle)).toFixed(2);
		var h_commonx=-Number(Math.cos(hour_angle)).toFixed(2);
		/*计算标签坐标*/
		for(var hh=0;hh>-14;hh--){
			var temp_hleft=c_wrapwidth+h_commonx*19*hh-8;
			var temp_htop=c_wrapwidth+h_commony*19*hh-8;
			hourstr+="<span style=\"left:"+temp_hleft+"px;top:"+temp_htop+"px;\"></span>";
		}
		clock_hour.append(hourstr);
	}
	
	/*处理分针算法*/
	function doP_Minutes(minutes){
		clock_minute.html("");
		var minutestr="";
		/*换算成实际角度值,并将角度值转化为弧度值*/
		var minute_angle=(angle_mstime[minutes])/360;
		minute_angle=minute_angle*2*Math.PI;
		var m_commony=Number(Math.sin(minute_angle)).toFixed(2);
		var m_commonx=-Number(Math.cos(minute_angle)).toFixed(2);
		/*计算标签坐标*/
		for(var mm=0;mm>-26;mm--){
			var temp_mleft=c_wrapwidth+m_commonx*12*mm-5;
			var temp_mtop=c_wrapwidth+m_commony*12*mm-5;
			minutestr+="<span style=\"left:"+temp_mleft+"px;top:"+temp_mtop+"px;\"></span>";
		}
		clock_minute.append(minutestr);
	}
	/*处理秒针算法*/
	function doP_Seconds(seconds){
		clock_second.html("");
		var secondstr="";
		/*换算成实际角度值,并将角度值转化为弧度值*/
		var second_angle=(angle_mstime[seconds])/360;
		second_angle=second_angle*2*Math.PI;
		var s_commony=Number(Math.sin(second_angle)).toFixed(2);
		var s_commonx=-Number(Math.cos(second_angle)).toFixed(2);
		var temp_sleft="";
		var temp_stop="";
		for(var ss=0;ss>-56;ss--){
			temp_sleft=c_wrapwidth+s_commonx*6*ss;
			temp_stop=c_wrapwidth+s_commony*6*ss;
			if(ss==0){
				temp_sleft=temp_sleft-10;
				temp_stop=temp_stop-10;
				secondstr+="<span style=\"left:"+temp_sleft+"px;top:"+temp_stop+"px;width:20px;height:20px;-moz-border-radius:10px;-ms-border-radius:10px;-o-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;\"></span>";
			}else{
				secondstr+="<span style=\"left:"+temp_sleft+"px;top:"+temp_stop+"px;\"></span>";
			}
		}
		clock_second.append(secondstr);
	}
});