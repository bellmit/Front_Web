(function($){
	$(function(){
		var isnodata=false;
		/*页面元素引用*/
		var amount_cash=$("#amount_cash");
		/*数据定义区*/
		var global_results=[222.33,366.25,457.45,-364.35,5608.45,-2362.45,3247.72,567.68];
		var global_color=['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a']
		var global_xitem=['借款负债','冻结金额','可用金额','待收收益','累计收益','待收本金','账户净资产','理财资产'];
		var real_dataobj={};
		/*柱状图对象*/
		var home_chartobj={
            chart: {
                type: 'column',
				spacingBottom:50
            },
            title: {
                text:""
            },
			legend:{
				enabled:false
			},
			colors:global_color,
            xAxis: {
                categories:global_xitem,
				lineColor:"#cecece",
				tickLength:0,
				labels:{
					y:25,
					style:{
						color:"#a0a0a0"
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
                data:(function(){
						var tempdata=[],templen=global_results.length,tempcount=0,i=0;
						for(;i<templen;i++){
							if(global_results[i]==0){
								tempcount++;
							}
							var tempdas=global_results[i];
							var tempobj={};
							if(tempdas<0){
								tempobj.y=Math.abs(tempdas);
								tempobj.color="#eb4429";
							}else{
								if(i==1){
									tempobj.color="#434343";
								}else{
									tempobj.color=global_color[0];
								}
								tempobj.y=tempdas;
							}
							tempobj.reals=tempdas;
							tempobj.name=global_xitem[i];
							tempdata.push(tempobj);
							real_dataobj[global_xitem[i]]=tempobj;
						}
						if(i==tempcount){
							isnodata=true;
						}
						return tempdata;
					}())
            }],
			tooltip:{
				shadow:false,
				formatter: function(){
					var tempx=this.x;
					if(real_dataobj[tempx]&&real_dataobj[tempx].reals<0){
						return "<span>"+tempx+":</span><span>￥<span style=\"color:#eb4429;\">-"+tradeRMBFormat("",this.y)+"</span></span>"
					}else{
						return "<span>"+tempx+":</span><span>￥<span style=\"color:"+global_color[0]+"\">"+tradeRMBFormat("",this.y)+"</span></span>"
					}
				}
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						formatter:function(){
							var tempx=this.x;
							var tempy=(this.y).toString();
							console.dir(this);
							if(real_dataobj[tempx]&&real_dataobj[tempx].reals<0){
								return "<span>￥<span style=\"color:#eb4429;\">-"+tradeRMBFormat("",tempy)+"</span></span>";
							}else if(isnodata){
								return "";
							}else{
								if(this.point.shapeArgs.y<=35){
									//this.point.shapeArgs.y=-2;
									return "<span style=\"color:#000;\">￥<span style=\"color:#000;\">"+tradeRMBFormat("",tempy)+"</span></span>";
								}else{
									return "<span>￥<span>"+tradeRMBFormat("",tempy)+"</span></span>";
								}
								//return "<span>￥<span>"+tradeRMBFormat("",tempy)+"</span></span>";
							}
						}
					}
				}
			}
        };
		/*账户报表*/
		$('#home_chart').highcharts(home_chartobj,function(chart){
			if(!isnodata){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',390,145).add();
		});
		/*提示信息*/
		$("#account_amount,#account_capital,#manage_capital,#loan_negative,#heap_income,#average_rate,#average_yield").hover(
		function(e){
			var cur=$(this);
			if(e.target.id=="account_amount"){
				var ctxt=cur.text();
				ctxt=ctxt.replace(/(\s*\,*\.*)/g,"");
				ctxt=ctxt.replace(/\D/g,"");
				ctxt=ctxt.split("");
				var clen=ctxt.length;
				if(clen>=0){
					cur.next().find("div").css({"background-position":parseInt((6*clen)+20)+"px 0"}).end().show();
				}else{
					cur.next().show();
				}
			}else{
				cur.next().show();
			}
		},
		function(){
			$(this).next().hide();
		});
		$("#infounvip,#infovip,#unicon1,#unicon2,#unicon3,#unicon4,#icon1,#icon2,#icon3,#icon4").hover(function(){
			var itipsarr=["infounvip","infovip","unicon1","unicon2","unicon3","unicon4","icon1","icon2","icon3","icon4"];
			var tempobj=$(this),tempid=tempobj.attr("id");
			if(tempid=="infounvip"||tempid=="infovip"){
				tempobj.next().show().css({"top":-28});
			}else{
				tempobj.next().show().css({"top":25});
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
		/*判断列表是否有数据*/
		var h_ldwrap1=$("#h_ldwrap1"),h_ldwrap2=$("#h_ldwrap2");
		if(h_ldwrap1.height()<80){
			h_ldwrap1.css({"display":"none"});
			$("#h_ldndwrap1").css({"display":"block"});
		}
		if(h_ldwrap2.height()<80){
			h_ldwrap2.css({"display":"none"});
			$("#h_ldndwrap2").css({"display":"block"});
		}
	});
})(jQuery);