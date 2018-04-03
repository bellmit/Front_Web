;(function(w, $) {
	/*设备判断*/
	if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
		var EventName = {
			"click": "tap"
		};
	} else {
		var EventName = {
			"click": "click"
		};
	}
	/*服务类*/
	var sh_detail = sh_detail || ({
		/*参数初始化*/
		paramInit:function() {
			this.tempsecond = 1000;
			this.tempminute = 60000;
			this.temphour = 3600000;
			this.tempday = 86400000;

			this.currentdate = new Date();
			this.currentyear = this.currentdate.getFullYear();
			this.currentmonth = this.currentdate.getMonth() + 1;
			this.currentday = this.currentdate.getDate();
			this.currentymd=this.toStrDate(this.currentyear.toString()+'/'+this.currentmonth.toString()+'/'+this.currentday.toString(),'/');
			this.current_enddate=this.toStrDate(this.currentymd,'-');
			this.html_template='<a href="$linkhref" title=""><li><p>消费时间:<span>$datetime</span></p><p>产品名称:<span>$productname</span></p><p>消费金额:<strong>$money</strong></p><p>股票数量:<em>$shnumber</em></p></li></a>';
			return this;
		},
		/*初始化*/
		init: function(textobj) {
			/*初始化最近日期信息*/
			this.absDate(this.currentymd,this.currentday,'sub');
			/*文本框赋值*/
			this.setTextDate(textobj);
		},
		/*日立控件初始化*/
		calendarInit:function(obj){
				var tempthis=this;
				/*开始日期初始化*/
				obj.dpstart.calendar({
					date:tempthis.current_startdate,
					maxDate:tempthis.current_enddate,
					select: function(e, date, dateStr){
							obj.dpend.calendar('refresh');
							obj.dpwrap.hide();
							obj.start.val(dateStr);
							tempthis.current_startdate=dateStr;
					}
				});
				/*结束日期初始化*/
				obj.dpend.calendar({
						date:tempthis.current_enddate,
						maxDate:tempthis.current_enddate,
						select: function(e, date, dateStr){
								obj.dpstart.calendar('maxDate', date).calendar('refresh');
								obj.dpwrap.hide();
								obj.end.val(dateStr);
								tempthis.current_enddate=dateStr;
						}
				});
		},
		/*快捷值转换实际值*/
		quickToDate: function(str,type) {
			var datemobj1,
				datemobj2,
				tempstr = 0,
				j=this.currentmonth,
				datearr1,
				datearr2;
				if(type=='sub'){
					var k=j<str?j:str;
					datemobj1 = this.isLeapYear(this.currentyear);
					datearr1=datemobj1.months.reverse();
					for(var i=0;i<k;i++){
						if(i==0){
							tempstr+=parseInt(this.currentday);
						}else{
							tempstr+=parseInt(datearr1[12-j+i]);	
						}
					}
					if(j<str){
						datemobj2 = this.isLeapYear(this.currentyear-1);
						datearr2=datemobj2.months.reverse();
						for(var i=0;i<str-j;i++){
							tempstr+=parseInt(datearr2[i]);
						}
					}
				}else if(type=='add'){
					var ti=parseInt(str)+j-12,k=12-j<str?12-j:ti;
					datemobj1 = this.isLeapYear(this.currentyear);
					datearr1=datemobj1.months;
					for(var i=0;i<k;i++){
						if(i==0){
							tempstr+=parseInt(datearr1[j-1]-this.currentday);
						}else{
							var ti=parseInt(j+i)
							tempstr+=parseInt(datearr1[ti-1]);	
						}
					}
					if(12-j<str){
						datemobj2 = this.isLeapYear(this.currentyear+1);
						datearr2=datemobj2.months;
						var ti=parseInt(str)+j-12;
						for(var i=0;i<ti;i++){
							tempstr+=parseInt(datearr2[i]);
						}
					}
				}
				this.absDate(this.currentymd,tempstr,type);
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
		setTextDate:function(obj){
			obj.start.val(this.current_startdate);
			obj.end.val(this.current_enddate);
		},
		/*获取日期*/
		getTextDate:function(){
				var svalue=this.current_startdate;
				var evalue=this.current_enddate;
				if(svalue==''||evalue==''||svalue==null||evalue==null||typeof svalue==='undefined'||typeof evalue==='undefined'){
						setErrorDate('sub');
						return [this.current_startdate,this.current_enddate];
				}else{
					return [svalue,evalue];
				}
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
		/*转换所需格式*/
		toStrDate: function(d,s) {
				var str=d.toString(),tempstr,tempm,tempd;
				str=str.replace(/[\/\|\s\-]/g,s);
				tempstr=str.split(s);
				tempm=parseInt(tempstr[1])<=9?'0'+parseInt(tempstr[1]):tempstr[1];
				tempd=parseInt(tempstr[2])<=9?tempd='0'+parseInt(tempstr[2]):tempstr[2];
				return tempstr[0]+s+tempm+s+tempd;
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
		},
		/*渲染tab*/
		renderTab: function(wrap) {
			wrap.addClass('shd-date-quicksel').siblings().removeClass('shd-date-quicksel');
		},
		/*数据查询*/
		handlerSearch:function(params,more){
				var start_value=this.current_startdate,
						end_value=this.current_enddate;
						if(start_value!=''||end_value!=''||start_value!=null||end_value!=null){
								params.startdate=start_value;
								params.enddate=end_value;
								this.doAjax(params,str);
						}else{
								this.handlerResult('error',null,params);
						}
		},
		/*查询具体业务处理*/
		doAjax:function(params,more){
				var tempthis=this;
				$.ajax({
						url:params.url,
						async:false,
						type: "post",
						dataType:"json",
						data:{
								'StartDate':params.startdate,
								'EndDate':params.enddate,
								'pageTotal':params.pagetotal,
								'pageCurrent':params.pagecurrent,
								'pageSize':params.pagesize
						},
						success:function(res){
								if(res){
									tempthis.handlerResult('success',res,params,more);
								}else{
									tempthis.handlerResult('fail',null,params);
								}
						},
						error:function(){
								tempthis.handlerResult('error',null,params);
						}
				});
			
		},
		/*查询具体业务处理*/
		handlerResult:function(str,res,params,more){
				if(str=='success'){
						var html=this.html_template,temparr=[],tempstr;
						for(var i in res){
								tempstr=html.replace('$linkhref',res[i].urls).replace('$datetime',res[i].datetime).replace('$productname',res[i].productname).replace('$money',res[i].money).replace('$shnumber',res[i].shnumber);
								temparr.push(tempstr);
						}
						if(typeof more==='undefined'){
							params.wrap.html('');
						}
						$(temparr.join('')).appendTo(params.wrap);
				}else if(str=='fail'){
						params.wrap.html('<li class="result_fail"><div>暂无数据</div></li>');
				}else if(str=='error'){
						params.wrap.html('<li class="result_error"><div>查询错误</div></li>');
				}
		}
	}).paramInit();

	/*事件绑定*/
	$(function() {
		/*页面元素引用*/
		var $tab = $('#shd_datetab')/*快捷选项*/,
			$start = $('#shd_datestart')/*开始日期文本*/,
			$end = $('#shd_dateend')/*结束日期文本*/,
			$btn = $('#shd_datesearch')/*查询按钮*/,
			$dpwrap=$('#shd_dpwrap')/*日历控件容器*/,
			$dpstart=$('#shd_dpstartwrap')/*开始日历控件*/,
			$dpend=$('#shd_dpendwrap')/*结束日历控件*/,
			$itemstart=$('#shd_dpitemstart')/*开始日历控件父容器*/,
			$itemend=$('#shd_dpitemend')/*结束日历控件父容器*/,
			$list=$('#shd_listwrap')/*列表*/,
			$lm=$('#shd_loadmore')/*加载更多*/,
			$lm_top=$('#shd_loadmore_top')/*加载更多*/,
			$dateurl=$('#dateAjaxURL')/*URL，隐藏域*/,
			$pagetotal=$('#pageTotal')/*分页总记录数,隐藏域*/,
			$pagecurrent=$('#pageCurrent')/*分页当前第几条,隐藏域*/,
			$pagesize=$('#pageSize')/*每页显示多少条，隐藏域*/;
		/*变量对象*/
		var textobj={
				/*日历文本对象*/
				start:$start,
				end:$end
			},
			calendarobj={
					/*日期对象*/
					start:$start,
					end:$end,
					dpwrap:$dpwrap,
					dpstart:$dpstart,
					dpend:$dpend
			},
			searchobj={
						/*查询参数对象*/
						url:(function(){
							return $dateurl.val();
						}()),
						pagetotal:(function(){
							return $pagetotal.val();
						}()),
						pagecurrent:(function(){
							return $pagecurrent.val();
						}()),
						pagesize:(function(){
							return $pagesize.val();
						}()),
						wrap:$list
			};
			/*快捷方式初始化*/
			sh_detail.init(textobj);
			/*日历控件初始化*/
			sh_detail.calendarInit(calendarobj);
			/*日期初始化查询（程序开发只注重这个入口即可）*/
			sh_detail.handlerSearch(searchobj);
			/*日历关闭*/
			$('.shd-dp-dtitle').on(EventName.click, function(e) {
					$dpwrap.hide();
			});
			/*tab快捷查询*/
			$tab.on(EventName.click, 'li', function(e) {
				var $this = $(this),
						datadate = $this.attr('data-date');
						/*tab 渲染*/
						sh_detail.renderTab($this);
						/*快捷值转换实际日期格式*/
						sh_detail.quickToDate(datadate,'sub');
						/*文本框赋值*/
						sh_detail.setTextDate(textobj);
						/*日历关闭*/
						$dpwrap.hide();
						/*数据查询（程序开发只注重这个入口即可）*/
						sh_detail.handlerSearch(searchobj);
			});
			/*点击查询事件*/
			$btn.on(EventName.click,function(e) {
						/*日历关闭*/
						$dpwrap.hide();					
						/*数据查询*/
						sh_detail.handlerSearch(searchobj);
			});
			/*日历控件展现*/
			$start.on('focus',function(){
					$dpwrap.show();
					$itemend.hide();
					$itemstart.show();
			});
			$end.on('focus',function(){
					$dpwrap.show();
					$itemstart.hide();
					$itemend.show();
			});
			/*加载更多*/
			$lm.on(EventName.click, function(e) {
						/*日历关闭*/
						$dpwrap.hide();
						/*数据查询（程序开发只注重这个入口即可）*/
						sh_detail.handlerSearch(searchobj,'loadmore');
			});
			$lm_top.on(EventName.click, function(e) {
						/*日历关闭*/
						$dpwrap.hide();
						/*数据查询（程序开发只注重这个入口即可）*/
						sh_detail.handlerSearch(searchobj,'loadmore');
						$(w).scrollTop(0);
			});
	});
})(window, Zepto);