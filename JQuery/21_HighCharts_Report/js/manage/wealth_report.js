/*初始化数据对象*/
var wr_totaldata=[0,0,0,0];
/*数据全为空时的全局标识*/
var wr_isnodata1=false,wr_isnodata2=false,wr_isnodata3=false,wr_isnodata4=false;
var wr_isnodata1a=false,wr_isnodata1b=false,wr_isnodata2a=false,wr_isnodata2b=false,wr_isnodata4a=false,wr_isnodata4b=false,wr_isnodata4c=false,wr_isnodata4d=false;
var wr_pienodata1=false;
/*初始化日期数据*/
var wr_caidates=[],wr_allidates=[],wr_ccdates=[],wr_ccedates=[];
/*累积投资结果集对象*/
var wr_cairesult1=[],wr_cairesult2=[];//第一个柱状图
var wr_alliresult1=[],wr_alliresult2=[];//第二个柱状图
var wr_ccresult1=[];//第三个柱状图
var wr_cceresult1=[],wr_cceresult2=[],wr_cceresult3=[],wr_cceresult4=[];//第四个柱状图
(function($){
	$(function(){
		/*全局颜色定义*/
		var global_color=['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a']
		var global_pie=["A级","B级","C级","D级","E级","F级"];
		/*查询初始化*/
		handleReqAll();
		if(wr_sumtype==0){
			wr_pienodata1=true;
		}else{
			wr_pienodata1=false;
		}
		/*全局表格对象定义*/
		/*累积已收收益柱状图对象*/
		var wr_caiobj={
				chart:{
					type:'column',
					width:"722",
					style:{
						margin:"0 auto"	
					}
				},
				title:{text:''},
				colors:["#fbb634","#ec8372"],
				legend:{
					margin:35,
					padding:10,
					backgroundColor:"#fff",
					borderColor:"#cecece",
					itemDistance:12,
					symbolWidth:24,
					symbolHeight:14,
					itemStyle:{
						color:"#4f4f4f"
					},
					y:-5
				},
				xAxis:{
					categories:wr_caidates,
					lineColor:"#cecece"
				},
				yAxis:{
					gridLineColor:"#fff",
					stackLabels: {
						enabled: true,
						formatter:function(){
							var tempy=(this.total==null||typeof this.total===undefined)?"-01":this.total;
							if(wr_isnodata1){
								return "";
							}else{
								if(tempy=="-01"){
									return "";
								}else if((wr_isnodata1a&&tempy==0)||(wr_isnodata1b&&tempy==0)){
									return "";
								}else{
									return "<span style=\'color:#4f4f4f\'>"+tradeRMBFormat("",tempy)+"</span>";
								}
							}
						}
					},
					labels:{
						enabled:false
					}
				},
				credits: {enabled:false},
				series: [{
						name:'利息',
						data:wr_cairesult2
						},{
						name:'提前还款违约金',
						data:wr_cairesult1
				}],
				tooltip:{
					shadow:false
				},
				plotOptions: {
					series: {
						stacking: 'normal',
						pointWidth:38
					}
				}
			}
		/*待收总收益、待收总本金柱状图对象*/
		var wr_alliobj={
				chart:{
					type:'column',
					width:"722",
					style:{
						margin:"0 auto"	
					}
				},
				title:{text:''},
				colors:["#fbb634","#d1c0a5"],
				legend:{
					margin:35,
					padding:10,
					backgroundColor:"#fff",
					borderColor:"#cecece",
					itemDistance:12,
					symbolWidth:24,
					symbolHeight:14,
					itemStyle:{
						color:"#4f4f4f"
					},
					y:-5
				},
				xAxis:{
					categories:wr_allidates,
					lineColor:"#cecece"
				},
				yAxis:{
					gridLineColor:"#fff",
					stackLabels: {
						enabled: true,
						formatter:function(){
							var tempy=(this.total==null||typeof this.total===undefined)?"-01":this.total;
							if(wr_isnodata2){
								return "";
							}else{
								if(tempy=="-01"){
									return "";
								}else if((wr_isnodata2a&&tempy==0)||(wr_isnodata2b&&tempy==0)){
									return "";
								}else{
									return "<span style=\'color:#4f4f4f\'>"+tradeRMBFormat("",tempy)+"</span>";
								}
							}
						}
					},
					labels:{
						enabled:false
					}
				},
				credits: {enabled:false},
				series: [{
						name:'利息',
						data:wr_alliresult1
					},{
						name:'本金',
						data:wr_alliresult2
				}],
				tooltip:{
					shadow:false
				},
				plotOptions: {
					series: {
						stacking: 'normal',
						pointWidth:38
					}
				}
			}
		/*累积已收收益柱状图对象*/
		var wr_ccobj={
				chart:{
					type:'column',
					width:"722",
					style:{
						margin:"0 auto"	
					},
					spacingBottom:60
				},
				title:"",
				colors:["#ec8372"],
				legend:{
					enabled:false
				},
				xAxis:{
					categories:wr_ccdates,
					lineColor:"#cecece"
				},
				yAxis:{
					gridLineColor:"#fff",
					stackLabels: {
						enabled: true,
						formatter:function(){
							var tempy=(this.total==null||typeof this.total===undefined)?"-01":this.total;
							if(wr_isnodata3){
								return "";
							}else{
								if(tempy=="-01"){
									return "";
								}else{
									return "<span style=\'color:#4f4f4f\'>"+tradeRMBFormat("",tempy)+"</span>";
								}
							}
						}
					},
					labels:{
						enabled:false
					}
				},
				credits: {enabled:false},
				series: [{
						name:'累积投资',
						data:wr_ccresult1
					}],
				tooltip:{
					shadow:false
				},
				plotOptions: {
					series: {
						stacking: 'normal',
						pointWidth:38
					}
				}
			}
		/*累积费用支出柱状图对象*/
		var wr_cceobj={
				chart:{
					type:'column',
					width:"722",
					style:{
						margin:"0 auto"	
					}
				},
				title:{text:''},
				colors:["#b283c9","#84ccc9","#aed500","#4897f1"],
				legend:{
					//margin:35,
					padding:10,
					backgroundColor:"#fff",
					borderColor:"#cecece",
					itemDistance:12,
					symbolWidth:24,
					symbolHeight:14,
					itemStyle:{
						color:"#4f4f4f"
					},
					y:-5
				},
				xAxis:{
					categories:wr_ccedates,
					lineColor:"#cecece"
				},
				yAxis:{
					gridLineColor:"#fff",
					stackLabels: {
						enabled: true,
						formatter:function(){
							var tempy=(this.total==null||typeof this.total===undefined)?"-01":this.total;
							if(wr_isnodata4){
								return "";
							}else{
								if(tempy=="-01"){
									return "";
								}else if((wr_isnodata4a&&tempy==0)||(wr_isnodata4b&&tempy==0)||(wr_isnodata4c&&tempy==0)||(wr_isnodata4d&&tempy==0)){
									return "";
								}else{
									return "<span style=\'color:#4f4f4f\'>"+tradeRMBFormat("",tempy)+"</span>";
								}
							}
						}
					},
					labels:{
						enabled:false
					}
				},
				credits: {enabled:false},
				series: [{
						name:'债权转让费',
						data:wr_cceresult1
					},{
						name:'VIP费',
						data:wr_cceresult2
					},{
						name:'提现费',
						data:wr_cceresult3
					},{
						name:'利息管理费',
						data:wr_cceresult4
					}],
				tooltip:{
					shadow:false
				},
				plotOptions: {
					series: {
						stacking: 'normal',
						pointWidth:38
					}
				}
			}
		/*投资等级分布饼状图对象*/
		var wr_eigdobj={
				chart:{
					type:'pie'
				},
				title:{
					text:''
				},
				colors:["#32b16c","#b6d273","#c7bd17","#feb300","#fc6a23","#ff0000"],
				credits: {enabled:false},
				series: [{
						name:["投资等级分布百分比"],
						data:[["A级",wr_atype],["B级",wr_btype],["C级",wr_ctype],["D级",wr_dtype],["E级",wr_etype],["F级",wr_ftype]]
				}],
				tooltip:{
					shadow:false,
					enabled:(function(){
						if(wr_pienodata1){
							return false;
						}else{
							return true;
						}
					}()),
					formatter: function(){
						if(wr_pienodata1){
							return "";
						}else{
							var tempindex=this.point.x;
							return "<span style=\"color:"+this.point.color+";\">"+global_pie[tempindex]+":</span><span>"+Number(this.percentage).toFixed(2)+"%</span>";
						}
					}
				},
				plotOptions: {
					 pie: {
						visible:(function(){
							if(wr_pienodata1){
								return false;
							}else{
								return true;
							}
						}()),
						allowPointSelect: true,
						borderColor:"#fff",
                		borderWidth:"0.5pt",
						cursor: 'pointer',
						dataLabels: {
							enabled:false
						}
					}
				}
			}
		/*账户报表初始化*/
		$('#wr_caidatachart').highcharts(wr_caiobj,function(chart){
			if(!wr_isnodata1){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
		});
		$('#wr_allidatachart').highcharts(wr_alliobj,function(chart){
			if(!wr_isnodata2){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
		});
		$('#wr_ccdatachart').highcharts(wr_ccobj,function(chart){
			if(!wr_isnodata3){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
		});
		$('#wr_ccedatachart').highcharts(wr_cceobj,function(chart){
			if(!wr_isnodata4){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
		});
		/*饼图初始化*/
		$('#wr_eigddatapie').highcharts(wr_eigdobj,function(chart){
			if(!wr_pienodata1){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',120,120).add();
		});
		/*绑定查询事件*/
		$("#wr_caibtn,#wr_allibtn,#wr_ccbtn,#wr_ccebtn").click(function(e){
			var thisobj=e.target;
			if(thisobj.nodeName=="LI"){
				var curid=thisobj.parentNode.id.slice(0,-3);
				var curobj=$(thisobj),curdatas=curobj.text();
				curobj.addClass("obtnsel").siblings().removeClass("obtnsel");
				var curcon=wr_SearchCondition(curdatas);
				var curdate=new Date();
				var curmonth=curdate.getMonth()+1;
				var charwraps=$("#"+curid+"datachart");
				var tempmonth=[],tempmonth1=[],tempres1=[],tempres2=[],tempres3=[],tempres4=[],temptype="";
				for(var i=0;i<curcon;i++){
					if(true){
						if(i>=curmonth){
							var tempa=parseInt(curmonth+12);
							tempmonth.push(parseInt(tempa-i)+"月");
						}else{
							tempmonth.push(parseInt(curmonth-i)+"月");
						}
					}
					if(true){
						var tempb=parseInt(curmonth+i);
						if(tempb>12){
							tempmonth1.push(parseInt(tempb-12)+"月");
						}else{
							tempmonth1.push(tempb+"月");
						}
					}
				}
				tempmonth.reverse();
				if(curid=="wr_cai"){
					handleReqDate(curcon,tempmonth,1);
					wr_caiobj.xAxis.categories=tempmonth;
					wr_caiobj.series[0].data=wr_cairesult1;
					wr_caiobj.series[1].data=wr_cairesult2;
					charwraps.highcharts(wr_caiobj,function(chart){
						if(!wr_isnodata1){
							return false;
						}
						chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
					});
				}
				if(curid=="wr_alli"){
					handleReqDate(curcon,tempmonth1,2);
					wr_alliobj.xAxis.categories=tempmonth1;
					wr_alliobj.series[0].data=wr_alliresult1;
					wr_alliobj.series[1].data=wr_alliresult2;
					charwraps.highcharts(wr_alliobj,function(chart){
						if(!wr_isnodata2){
							return false;
						}
						chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
					});
				}
				if(curid=="wr_cc"){
					handleReqDate(curcon,tempmonth,3);
					wr_ccobj.xAxis.categories=tempmonth;
					wr_ccobj.series[0].data=wr_ccresult1;
					charwraps.highcharts(wr_ccobj,function(chart){
						if(!wr_isnodata3){
							return false;
						}
						chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
					});
				}
				if(curid=="wr_cce"){
					handleReqDate(curcon,tempmonth,4);
					wr_cceobj.xAxis.categories=tempmonth;
					wr_cceobj.series[0].data=wr_cceresult1;
					wr_cceobj.series[1].data=wr_cceresult2;
					wr_cceobj.series[2].data=wr_cceresult3;
					wr_cceobj.series[3].data=wr_cceresult4;
					charwraps.highcharts(wr_cceobj,function(chart){
						if(!wr_isnodata4){
							return false;
						}
						chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
						
					});
				}
			}
		});
		
		/*提示信息*/
		$("#wr_caiicon").hover(function(){
			$(this).next().show();
		},
		function(){
			$(this).next().hide();
		});
		
		
		/*点击时间条件ajax查询操作*/
		function handleReqDate(ctimes,tempmonth,ctype){
			var params="",types="";
			$.ajax({
				url:"queryTotalCountByMonth",
				async:false,
				data:{"months":ctimes,"type":ctype},
				dataType:"json",
				type:"post",
				success: function(datas){
					wr_IteratorCharts(datas,tempmonth,ctype,ctimes);
				},
				error:function(){}
			});
			
		}
		/*初始化ajax总查询操作*/
		function handleReqAll(){
			var curcon=wr_SearchCondition("六月");
			var curdate=new Date();
			var curmonth=curdate.getMonth()+1;
			var tempmonth=[],tempmonth1=[];
			for(var i=0;i<curcon;i++){
				if(true){
					if(i>=curmonth){
						var tempa=parseInt(curmonth+12);
						tempmonth.push(parseInt(tempa-i)+"月");
					}else{
						tempmonth.push(parseInt(curmonth-i)+"月");
					}
				}
				if(true){
					var tempb=parseInt(curmonth+i);
					if(tempb>12){
						tempmonth1.push(parseInt(tempb-12)+"月");
					}else{
						tempmonth1.push(tempb+"月");
					}
				}
			}
			tempmonth.reverse();
			wr_caidates=tempmonth;
			wr_allidates=tempmonth1;
			wr_ccdates=tempmonth;
			wr_ccedates=tempmonth;
			$.ajax({
				url:"queryTotalCountByMonth",
				async:false,
				data:{"months":"6","type":"1"},
				dataType:"json",
				type:"post",
				success: function(datas){
					wr_IteratorCharts(datas,tempmonth,1,6);
				},
				error:function(){
					wr_cairesult1=[];
					wr_cairesult2=[];
				}
			});
			$.ajax({
				url:"queryTotalCountByMonth",
				async:false,
				data:{"months":"6","type":"2"},
				dataType:"json",
				success: function(datas){
					wr_IteratorCharts(datas,tempmonth1,2,6);
				},
				error:function(){
					wr_alliresult1=[];
					wr_alliresult2=[];
				}
			});
			$.ajax({
				url:"queryTotalCountByMonth",
				async:false,
				data:{"months":"6","type":"3"},
				dataType:"json",
				success: function(datas){
					wr_IteratorCharts(datas,tempmonth,3,6);
				},
				error:function(){
					wr_ccresult1=[];
				}
			});
			$.ajax({
				url:"queryTotalCountByMonth",
				async:false,
				data:{"months":"6","type":"4"},
				dataType:"json",
				success: function(datas){
					wr_IteratorCharts(datas,tempmonth,4,6);
				},
				error:function(){
					wr_cceresult1=[];
					wr_cceresult2=[];
					wr_cceresult3=[];
					wr_cceresult4=[];
				}
			});
		}
	});
})(jQuery);


/*适配迭代结果集
参数：y轴结果集,x轴结果集,报表类型(第几个报表),时间范围
*/
function wr_IteratorCharts(datas,tempmonth,types,ctimes){
	if(types==1){
		typeof datas.sumEarningsMonth!="undefined"?wr_totaldata.splice(0,1,datas.sumEarningsMonth):wr_totaldata.splice(0,1,0);
		var tempres11=datas.prePenaltyList,tempres12=datas.interestList;
		if(tempres11!=""||tempres11!="undefined"||tempres11.length!=0){
			wr_cairesult1=wr_ComplateItems(tempres11,tempmonth,ctimes);
			if(wr_IsAllNull(wr_cairesult1)){
				wr_isnodata1a=true;
			}else{
				wr_isnodata1a=false;
			}
		}
		if(tempres12!=""||tempres12!="undefined"||tempres12.length!=0){
			wr_cairesult2=wr_ComplateItems(tempres12,tempmonth,ctimes);
			if(wr_IsAllNull(wr_cairesult2)){
				wr_isnodata1b=true;
			}else{
				wr_isnodata1b=false;
			}
		}
		if(wr_isnodata1a&&wr_isnodata1b){
			wr_isnodata1=true;
		}else{
			wr_isnodata1=false;
		}
		if(ctimes==6){
			$("#wr_cairesult").html("最近六月合计：￥"+tradeRMBFormat("",wr_totaldata[0]));
		}else if(ctimes==12){
			$("#wr_cairesult").html("最近一年合计：￥"+tradeRMBFormat("",wr_totaldata[0]));
		}
		
	}else if(types==2){
		typeof datas.sumCollectMonth!="undefined"?wr_totaldata.splice(1,1,datas.sumCollectMonth):wr_totaldata.splice(1,1,0);
		var tempres21=datas.interestColectList,tempres22=datas.principalColectList;
		if(tempres21!=""||tempres21!="undefined"||tempres21.length!=0){
			wr_alliresult1=wr_ComplateItems(tempres21,tempmonth,ctimes);
			if(wr_IsAllNull(wr_alliresult1)){
				wr_isnodata2a=true;
			}else{
				wr_isnodata2a=false;
			}
		}
		if(tempres22!=""||tempres22!="undefined"||tempres22.length!=0){
			wr_alliresult2=wr_ComplateItems(tempres22,tempmonth,ctimes);
			if(wr_IsAllNull(wr_alliresult2)){
				wr_isnodata2b=true;
			}else{
				wr_isnodata2b=false;
			}
		}
		if(wr_isnodata2a&&wr_isnodata2b){
			wr_isnodata2=true;
		}else{
			wr_isnodata2=false;
		}
		if(ctimes==6){
			$("#wr_alliresult").html("未来六月合计：￥"+tradeRMBFormat("",wr_totaldata[1]));
		}else if(ctimes==12){
			$("#wr_alliresult").html("未来一年合计：￥"+tradeRMBFormat("",wr_totaldata[1]));
		}
	}else if(types==3){
		typeof datas.sumInvestMonth!="undefined"?wr_totaldata.splice(2,1,datas.sumInvestMonth):wr_totaldata.splice(2,1,0);
		var tempres31=datas.investList;
		if(tempres31!=""||tempres31!="undefined"||tempres31.length!=0){
			wr_ccresult1=wr_ComplateItems(tempres31,tempmonth,ctimes);
		}
		if(wr_IsAllNull(wr_ccresult1)){
			wr_isnodata3=true;
		}else{
			wr_isnodata3=false;
		}
		if(ctimes==6){
			$("#wr_ccresult").html("最近六月合计：￥"+tradeRMBFormat("",wr_totaldata[2]));
		}else if(ctimes==12){
			$("#wr_ccresult").html("最近一年合计：￥"+tradeRMBFormat("",wr_totaldata[2]));
		}
		
	}else if(types==4){
		typeof datas.sumCostMonth!="undefined"?wr_totaldata.splice(3,1,datas.sumCostMonth):wr_totaldata.splice(3,1,0);
		var tempres41=datas.claimList,tempres42=datas.vipList,tempres43=datas.withdrawList,tempres44=datas.interestCostList;
		if(tempres41!=""||tempres41!="undefined"||tempres41.length!=0){
			wr_cceresult1=wr_ComplateItems(tempres41,tempmonth,ctimes);
			if(wr_IsAllNull(wr_cceresult1)){
				wr_isnodata4a=true;
			}else{
				wr_isnodata4a=false;
			}
		}
		if(tempres42!=""||tempres42!="undefined"||tempres42.length!=0){
			wr_cceresult2=wr_ComplateItems(tempres42,tempmonth,ctimes);
			if(wr_IsAllNull(wr_cceresult2)){
				wr_isnodata4b=true;
			}else{
				wr_isnodata4b=false;
			}
		}
		if(tempres43!=""||tempres43!="undefined"||tempres43.length!=0){
			wr_cceresult3=wr_ComplateItems(tempres43,tempmonth,ctimes);
			if(wr_IsAllNull(wr_cceresult3)){
				wr_isnodata4c=true;
			}else{
				wr_isnodata4c=false;
			}
		}
		if(tempres44!=""||tempres44!="undefined"||tempres44.length!=0){
			wr_cceresult4=wr_ComplateItems(tempres44,tempmonth,ctimes);
			if(wr_IsAllNull(wr_cceresult4)){
				wr_isnodata4d=true;
			}else{
				wr_isnodata4d=false;
			}
		}
		if(wr_isnodata4a&&wr_isnodata4b&&wr_isnodata4c&&wr_isnodata4d){
			wr_isnodata4=true;
		}else{
			wr_isnodata4=false;
		}
		if(ctimes==6){
			$("#wr_cceresult").html("最近六月合计：￥"+tradeRMBFormat("",wr_totaldata[3]));
		}else if(ctimes==12){
			$("#wr_cceresult").html("最近一年合计：￥"+tradeRMBFormat("",wr_totaldata[3]));
		}
	}	
}

/*比较判断数值并补全空值*/
function wr_ComplateItems(tarobj,tempmonth,conlen){
	var a=[],b=[],resobj=[];
	for(var i=0;i<tarobj.length;i++){
		a.push(tarobj[i]["monthVal"]);
		b.push(tarobj[i]["sumAmount"]);
	}
	for(var i=0;i<conlen;i++){
		resobj.push(0);
		var c=tempmonth[i].slice(0,-1);
		for(var j=0;j<a.length;j++){
			if(a[j]==c&&resobj[i]!=b[j]){
				resobj.splice(i,1,b[j]);
				break;
			}
		}
	}
	return resobj;
}
/*查询条件*/
function wr_SearchCondition(strs){
	var nums_map={"零":0,"一":1,"二":2,"三":3,"四":4,"五":5,"六":6,"七":7,"八":8,"九":9,"十":10,"十一":11,"十二":12}
	var numstr=strs.match(/[零一二三四五六七八九十十一十二]/g).join();
	var units=strs.match(/[月年]/).join();
	var nums=nums_map[numstr];
	var condition=0;
	if(units=="月"){
		condition=nums;
	}else if(units=="年"){
		condition=nums*12;
	}
	return condition;
}
/*判断是否全部为空*/
function wr_IsAllNull(arrs){
	var arr=arrs,alen=arr.length,i=0,acount=0;
	for(;i<alen;i++){
		if(arr[i]==0){
			acount++;
		}else if(arr[i]!=0){
			i=1;
			acount=0;
			break;
		}
	}
	return acount==i?true:false;
}

















