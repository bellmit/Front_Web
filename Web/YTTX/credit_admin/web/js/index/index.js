(function($){
	"use strict";
	$(function(){
		
		
		/*报表数据定义区*/
		var isnodata=false,
		chart_color=['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a'],
		chart_item=[],
		/*时间定义*/
		now=moment(),
		now_format=now.format('YYYY-MM-DD'),
		ago_format=now.subtract(12,'month').format('YYYY-MM-DD'),
		/*页面元素引用*/
		$chart_search_time=$("#chart_search_time"),
		$chart_search_btn=$("#chart_search_btn"),
		$chart_wrap=$('#chart_wrap'),
		/*柱状图对象*/
		chartobj={
            chart: {
                type: 'column',
								spacingBottom:20,
								style:{
									margin:"0 auto"	
								}
						},
						title: {
								text:""
						},
						legend:{
							enabled:false
						},
						colors:chart_color,
						xAxis: {
								categories:chart_item,
								lineColor:"#aaa",
								tickLength:0,
								labels:{
									y:25,
									style:{
										color:"#999"
									}
								}
						},
						yAxis:{
							title:{
								text:""
							},
							gridLineColor:"#ffffff",
							labels:{
								enabled:false
							}
						},
						credits: {
								enabled:false
						},
						series: [{
								name:"",
								data:[454,748,982,1563,674,823,1252,1836]
						}],
						tooltip:{
							shadow:false
						},
						plotOptions: {
							series: {
								dataLabels: {
									enabled: true
								}
							}
						}
		};
		
		
		/*日历支持*/
		$chart_search_time.val(ago_format+','+now_format).daterangepicker({
				format: 'YYYY-MM-DD',
        todayBtn: true,
				endDate:now_format,
				startDate:ago_format,
				maxDate:now_format,
				minDate:now.subtract(60,'month').format('YYYY-MM-DD'),
				separator:','
		});
		
		
		/*查询操作*/
		$chart_search_btn.on('click',function(){
				var time_val=$chart_search_time.val().split(','),
						dateobj=datePosZ(time_val[0],time_val[1]);
		});
		
		
		/*柱状图报表*/
		/*$('#chart_wrap').highcharts(chartobj,function(chart){
			if(!isnodata){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;display:inline-block;width:100%;height:100%;text-align:center;min-height:200px;line-height:200px;\">暂无数据</span>').add();
		});*/
		

		
		
	});
	
	
	//根据时间差处理坐标系
	function datePosZ(start,end){
			var sdate=start.split(/[\-|\-\-|\/]/),
					edate=end.split(/[\-|\-\-|\/]/),
					sy=sdate[0],
					sm=sdate[1],
					ey=edate[0],
					em=edate[1],
					y=ey-sy,
					i=1,
					j=y-1,
					posz=[];
					
					if(y===0){
						//处理同一年
						for(i;i<=em;i++){
								posz.push(sy+'年'+i+'月');
						}
					}else if(y===1){
						//处理上一年
						for(i;i<=12;i++){
								posz.push(sy+'年'+i+'月');
						}
						//处理当前年
						i=1;
						for(i;i<=em;i++){
								posz.push(ey+'年'+i+'月');
						}
					}else if(y>=2){
						//处理上一年
						for(i;i<=12;i++){
								posz.push(sy+'年'+i+'月');
						}
						//处理中间全年
						for(j;j>=1;j--){
							var tempyear=ey - j;
							for(var k=1;k<=12;k++){
								posz.push(tempyear+'年'+k+'月');
							}
						}
						//处理当前年
						i=1;
						for(i;i<=em;i++){
								posz.push(ey+'年'+i+'月');
						}
					}
					return posz;
	}
	
	
	
})(jQuery);