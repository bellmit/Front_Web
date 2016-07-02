(function($){
	"use strict";
	$(function(){
		
		/*报表数据定义区*/
		var isnodata=false,
		global_color=['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a'],
		global_xitem=['数据1','数据2','数据3','数据4','数据5','数据6','数据7','数据8'];



		/*柱状图对象*/
		var home_chartobj={
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
							/*enabled:true,
							margin:35,
							padding:10,
							backgroundColor:"#fff",
							borderColor:"#cecece",
							itemDistance:12,
							borderRadius:'3',
							symbolWidth:24,
							symbolHeight:14,
							itemStyle:{
								color:"#4f4f4f"
							},
							y:-5*/
						},
						colors:global_color,
						xAxis: {
								categories:global_xitem,
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
		$('#chart_wrap').highcharts(home_chartobj,function(chart){
			if(!isnodata){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',390,145).add();
		});

		
		
	});
	
	
	
	//function 
	
})(jQuery);