(function($){
	"use strict";
	$(function(){
		
		
		/*报表数据定义区*/
		var isnodata=false,
		chart_color=['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a'],
		chart_item=[],
		now=moment(),
		now_format=now.format('YYYY-MM-DD'),
		ago_format=now.subtract(12,'month').format('YYYY-MM-DD');
		
	

		
		//页面元素引用
		var $search_time=$("#search_time");
		

		/*柱状图对象*/
		var chartobj={
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
				
		/*柱状图报表*/
		$('#chart_wrap').highcharts(chartobj,function(chart){
			if(!isnodata){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;display:inline-block;width:100%;height:100%;text-align:center;min-height:200px;line-height:200px;\">暂无数据</span>').add();
		});
		
		
		//日历支持
		
		$search_time.val(ago_format+','+now_format).daterangepicker({
				format: 'YYYY-MM-DD',
        todayBtn: true,
				endDate:now_format,
				startDate:ago_format,
				separator:','
		});
		
		
		
		
		

		
		
	});
	
	
	
	//function 
	
})(jQuery);