//crres=[-10,20,66,30,10,5,3,25,45];
(function($){
	$(function(){
		/*数据定义区*/
		var global_color=['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a']
		var global_xitem=['借款负债','冻结金额','可用金额','待收收益','累计收益','待收本金','账户净资产','理财资产']
		var global_results=[-10,20,66,30,10,15,35,25];
		/*账户报表*/
		$('#home_chart').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '我的资产'
            },
			colors:global_color,
            xAxis: {
                categories:global_xitem,
				plotLines : [{
					color:'#ffffff',
					value:11,
					width:11
				}]
            },
			yAxis: {
				plotLines : [{
					color:'#ffffff',
					value:11,
					width:11
				}]
			},
            credits: {
                enabled:false
            },
            series: [{
                name: '詹姆斯大战杜兰特',
                data:(function(){
						var tempdata=[],templen=global_results.length;
						for(var i=0;i<templen;i++){
							var tempobj={};
							if(global_results[i]<0){
								tempobj.y=Math.abs(global_results[i]);
								tempobj.color="#f00";
							}else if(i==1){
								tempobj.y=global_results[i];
								tempobj.color="#ccc";
							}else{
								tempobj.y=global_results[i];
								tempobj.color=global_color[0];
							}
							tempobj.name=global_xitem[i];
							tempdata.push(tempobj);
							tempobj=null;
						}
						return tempdata;
					}())
            }],
			tooltip:{
				formatter: function(){
					if(this.x=="借款负债"){
						return "<span>"+this.x+"</span><br /><span>"+this.series.name+": </span><span>￥<span style=\"color:#f00;\">-"+this.y+".00</span></span>"
					}else{
						return "<span>"+this.x+"</span><br /><span>"+this.series.name+": </span><span>￥<span style=\"color:"+global_color[0]+"\">"+this.y+".00</span></span>"
					}
				}
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						formatter:function(){
							if(this.x=="借款负债"){
								return "<span>￥<span style=\"color:#f00;\">-"+this.y+".00</span></span>";
							}else{
								return "<span>￥<span style=\"color:#666;\">"+this.y+".00</span></span>";
							}
						}
					}
				}
			}
        });
		/*提示信息*/
		$("#account_amount,#freeze_amount,#account_capital,#manage_capital,#loan_negative,#heap_income,#average_rate,#average_yield").hover(
		function(){
			$(this).next().show();
		},
		function(){
			$(this).next().hide();
		});
		$("#infounvip,#infovip,#unicon1,#unicon2,#unicon3,#unicon4,#icon1,#icon2,#icon3,#icon4").hover(
		function(){
			var itipsarr=["infounvip","infovip","unicon1","unicon2","unicon3","unicon4","icon1","icon2","icon3","icon4"];
			var temppos=Math.random()*20;
			var tempobj=$(this),tempid=tempobj.attr("id");
			if(tempid=="infounvip"||tempid=="infovip"){
				tempobj.next().show().css({"top":-parseInt(temppos+20)});
			}else{
				tempobj.next().show().css({"top":parseInt(temppos+20)});
			}
			for(var i=0;i<10;i++){
				if(tempid!=itipsarr[i]){
					$("#"+itipsarr[i]).next().hide();
				}
			}
		},
		function(){
			$(this).next().hover(function(){},function(){
				$(this).hide();
			}).click(function(){$(this).hide();});
		});
	});
})(jQuery);


