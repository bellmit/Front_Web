(function($){
	"use strict";
	$(function(){
		
		
		//页面元素引用
		var $search_time=$("#search_time");
		
		
		
		//日历支持
		//(function(){
//			//初始化
//			/*var ranges = {
//						'Today':[moment(),moment()],
//						'Yesterday':[moment().subtract('days', 1), moment().subtract('days', 1)],
//						'Last 7 Days': [moment().subtract('days', 6), moment()],
//						'Last 30 Days': [moment().subtract('days', 29), moment()],
//						'This Month': [moment().startOf('month'), moment().endOf('month')],
//						'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
//				},
//				opts = {
//						format: attrDefault($search_time, 'format', 'MM/DD/YYYY'),
//						timePicker: attrDefault($search_time, 'timePicker', false),
//						timePickerIncrement: attrDefault($search_time, 'timePickerIncrement', false),
//						separator: attrDefault($search_time, 'separator', ' - '),
//					},
//					min_date = attrDefault($search_time, 'minDate', ''),
//					max_date = attrDefault($search_time, 'maxDate', ''),
//					start_date = attrDefault($search_time, 'startDate', ''),
//					end_date = attrDefault($search_time, 'endDate', '');
//				
//				if($search_time.hasClass('add-ranges')){
//					opts['ranges'] = ranges;
//				}	
//				if(min_date.length){
//					opts['minDate'] = min_date;
//				}
//				if(max_date.length){
//					opts['maxDate'] = max_date;
//				}
//				if(start_date.length){
//					opts['startDate'] = start_date;
//				}
//				if(end_date.length){
//					opts['endDate'] = end_date;
//				};*/
//				
//				//调用
//				$search_time.daterangepicker(/*opts,*/ function(start, end){
//					alert('ni mei');
//						var $this=$(this),
//								drp = $search_time.data('daterangepicker');
//
//						if($search_time.hasClass('daterange-inline')){
//							$search_time.find('span').html(start.format(drp.format) + drp.separator + end.format(drp.format));
//						}
//				});
//				//设置
//				/*if(typeof opts['ranges'] == 'object'){
//						$search_time.data('daterangepicker').container.removeClass('show-calendar');
//				}*/
//
//		}());
		
		
		
		
		if($.isFunction($.fn.daterangepicker))
		{
			$(".daterange").each(function(i, el)
			{
				// Change the range as you desire
				var ranges = {
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
					'Last 7 Days': [moment().subtract('days', 6), moment()],
					'Last 30 Days': [moment().subtract('days', 29), moment()],
					'This Month': [moment().startOf('month'), moment().endOf('month')],
					'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
				};
				
				var $this = $(el),
					opts = {
						format: attrDefault($this, 'format', 'MM/DD/YYYY'),
						timePicker: attrDefault($this, 'timePicker', false),
						timePickerIncrement: attrDefault($this, 'timePickerIncrement', false),
						separator: attrDefault($this, 'separator', ' - '),
					},
					min_date = attrDefault($this, 'minDate', ''),
					max_date = attrDefault($this, 'maxDate', ''),
					start_date = attrDefault($this, 'startDate', ''),
					end_date = attrDefault($this, 'endDate', '');
				
				if($this.hasClass('add-ranges'))
				{
					opts['ranges'] = ranges;
				}	
					
				if(min_date.length)
				{
					opts['minDate'] = min_date;
				}
					
				if(max_date.length)
				{
					opts['maxDate'] = max_date;
				}
					
				if(start_date.length)
				{
					opts['startDate'] = start_date;
				}
					
				if(end_date.length)
				{
					opts['endDate'] = end_date;
				}
				
				
				$this.daterangepicker(opts, function(start, end)
				{
					var drp = $this.data('daterangepicker');
					
					if($this.is('[data-callback]'))
					{
						//daterange_callback(start, end);
						callback_test(start, end);
					}
					
					if($this.hasClass('daterange-inline'))
					{
						$this.find('span').html(start.format(drp.format) + drp.separator + end.format(drp.format));
					}
				});
				
				if(typeof opts['ranges'] == 'object')
				{
					$this.data('daterangepicker').container.removeClass('show-calendar');
				}
			});
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
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