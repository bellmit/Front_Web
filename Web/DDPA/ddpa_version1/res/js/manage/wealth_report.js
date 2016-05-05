var testdata={"totals":"520","test1":[{"11":"232"},{"1":"34"},{"2":"334"}],"test2":[{"10":"64"},{"12":"39"}]};
(function($){
	$(function(){
		/*全局颜色定义*/
		var global_color=['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a']
		var global_pie=["A级","B级","C级","D级","E级","F级"];
		/*初始化数据对象*/
		/*初始化日期数据*/
		var wr_caidates=[],wr_allidates=[],wr_ccdates=[],wr_ccedates=[];
		/*累积投资结果集对象*/
		var wr_cairesult1=[],wr_cairesult2=[];//第一个柱状图
		var wr_alliresult1=[],wr_alliresult2=[];//第二个柱状图
		var wr_ccresult1=[];//第三个柱状图
		var wr_cceresult1=[],wr_cceresult2=[],wr_cceresult3=[],wr_cceresult4=[];//第四个柱状图
		//handleReqAll();
		/*全局表格对象定义*/
		/*累积投资柱状图对象*/
		var wr_caiobj={
				chart:{
					type:'column',
					spacingTop:50
				},
				title:{text:'累积已收收益'},
				colors:["#ec8372","#fbb634"],
				legend:{
					floating:true,
					align:"right",
					verticalAlign:"top",
					y:-30,
					x:-50,
					padding:12,
					backgroundColor:"#fff",
					shadow:true
				},
				xAxis:{categories:wr_caidates},
				yAxis:{},
				credits: {enabled:false},
				series: [{
						name:'提前还款违约金',
						data:wr_cairesult1
						},{
						name:'利息',
						data:wr_cairesult2
				}],
				tooltip:{},
				plotOptions: {
					column: {
						stacking: 'normal',
						dataLabels: {
							enabled: true,
							color:"#fff"
						}
					}
				}
			}
		var wr_alliobj={
				chart:{
					type:'column',
					spacingTop:50
				},
				title:{text:'待收总收益、待收总本金'},
				colors:["#fbb634","#d1c0a5"],
				legend:{
					floating:true,
					align:"right",
					verticalAlign:"top",
					y:-30,
					x:-50,
					padding:12,
					backgroundColor:"#fff",
					shadow:true
				},
				xAxis:{categories:wr_allidates},
				yAxis:{},
				credits: {enabled:false},
				series: [{
						name:'利息',
						data:wr_alliresult1
					},{
						name:'本金',
						data:wr_alliresult2
				}],
				tooltip:{},
				plotOptions: {
					column: {
						stacking: 'normal',
						dataLabels: {
							enabled: true,
							color:"#fff"
						}
					}
				}
			}
		var wr_ccobj={
				chart:{
					type:'column',
					spacingTop:50
				},
				title:{text:'累积已收收益'},
				colors:["#ec8372"],
				legend:{
					floating:true,
					align:"right",
					verticalAlign:"top",
					y:-30,
					x:-50,
					padding:12,
					backgroundColor:"#fff",
					shadow:true
				},
				xAxis:{categories:wr_ccdates},
				yAxis:{},
				credits: {enabled:false},
				series: [{
						name:'提前还款违约金',
						data:wr_ccresult1
					}],
				tooltip:{},
				plotOptions: {
					column: {
						stacking: 'normal',
						dataLabels: {
							enabled: true,
							color:"#fff"
						}
					}
				}
			}
		var wr_cceobj={
				chart:{
					type:'column',
					spacingTop:50
				},
				title:{text:'累积已收收益'},
				colors:["#ec8372","#84ccc9","#aed500","#4897f1"],
				legend:{
					floating:true,
					align:"right",
					verticalAlign:"top",
					y:-30,
					x:-30,
					padding:12,
					backgroundColor:"#fff",
					shadow:true
				},
				xAxis:{categories:wr_ccedates},
				yAxis:{},
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
				tooltip:{},
				plotOptions: {
					column: {
						stacking: 'normal',
						dataLabels: {
							enabled: true,
							color:"#fff"
						}
					}
				}
			}
		var wr_eigdobj={
				chart:{
					type:'pie',
					spacingBottom:50
				},
				title:{
					text:'投资等级分布',
					align:"center",
					y:310
				},
				colors:["#32b16c","#b6d273","#c7bd17","#feb300","#fc6a23","#ff0000"],
				legend:{},
				xAxis:{categories:wr_ccedates},
				yAxis:{},
				credits: {enabled:false},
				series: [{
						name:["投资等级分布百分比"],
						data:[["A级",40000],["B级",10000],["C级",10000],["D级",0],["E级",20000],["F级",20000]]
				}],
				tooltip:{},
				plotOptions: {
					 pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						shadow:true,
						dataLabels: {
							enabled: true,
							distance:15,
							formatter:function(){
								var tempindex=this.point.x;
								return "<span style=\"color:"+this.point.color+";\">"+global_pie[tempindex]+":"+this.percentage+"%</span>";
							}
						}
					}
				}
			}
		/*账户报表初始化*/
		$('#wr_caidatachart').highcharts(wr_caiobj);
		$('#wr_allidatachart').highcharts(wr_alliobj);
		$('#wr_ccdatachart').highcharts(wr_ccobj);
		$('#wr_ccedatachart').highcharts(wr_cceobj);
		/*饼图初始化*/
		$('#wr_eigddatapie').highcharts(wr_eigdobj);
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
				var tempmonth=[],tempres1=[],tempres2=[],tempres3=[],tempres4=[],temptype="";
				for(var i=0;i<curcon;i++){
					if(i>=curmonth){
						var tempa=parseInt(curmonth+12);
						tempmonth.push(parseInt(tempa-i)+"月");
					}else{
						tempmonth.push(parseInt(curmonth-i)+"月");
					}
				}
				tempmonth.reverse();
				if(curid=="wr_cai"){
					wr_caiobj.xAxis.categories=tempmonth;
					wr_caiobj.series[0].wr_cairesult1;
					wr_caiobj.series[1].wr_cairesult2;
					charwraps.highcharts(wr_caiobj);
				}
				if(curid=="wr_alli"){
					wr_alliobj.xAxis.categories=tempmonth;
					wr_alliobj.series[0].data=wr_alliresult1;
					wr_alliobj.series[1].data=wr_alliresult2;
					charwraps.highcharts(wr_alliobj);
				}
				if(curid=="wr_cc"){
					wr_ccobj.xAxis.categories=tempmonth;
					wr_ccresult1=[];/*testdata={"totals":"520","test1":[{"11":"232"},{"1":"34"},{"2":"334"}],"test2":[{"10":"64"},{"12":"39"}]};*/
					var temptest1=testdata.test1
					if(temptest1.length!=0){
						for(var i=0;i<tempmonth.length;i++){
							var tempmm=tempmonth[i].slice(0,-1);
							//console.log(temptest1[i][]);
							if(typeof temptest1[i]=="undefined"){
								wr_ccresult1.push("0");
							}else{
								for(var j in temptest1[i]){
									if(typeof  temptest1[i][j]!="undefined"){
										wr_ccresult1.push(temptest1[i][j]);
									}
								}
							}
						}
					}
					console.log(wr_ccresult1);
					wr_ccobj.series[0].data=wr_ccresult1;
					charwraps.highcharts(wr_ccobj);
				}
				if(curid=="wr_cce"){
					wr_cceobj.xAxis.categories=tempmonth;
					wr_cceobj.series[0].data=wr_cceresult1;
					wr_cceobj.series[1].data=wr_cceresult2;
					wr_cceobj.series[2].data=wr_cceresult3;
					wr_cceobj.series[3].data=wr_cceresult4;
					charwraps.highcharts(wr_cceobj);
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
		function handleReqDate(ctimes,ctype){
			var params="",types="";
			$.ajax({
				url:"条件查询地址",
				data:params,
				dataType:"json",
				success: function(){
					
					
				},
				error:function(){
					
				}
				
				
				
			});
			
		}
		/*初始化ajax总查询操作*/
		function handleReqAll(){
			$.ajax({
				url:"条件查询地址",
				async:false,
				data:{"times":"6","type":"all"},
				dataType:"json",
				success: function(){
					/*
						var wr_caidates=[],wr_allidates=[],wr_ccdates=[],wr_ccedates=[];
						var wr_cairesult1=[],wr_cairesult2=[];
						var wr_alliresult1=[],wr_alliresult2=[];
						var wr_ccresult1=[];
						var wr_cceresult1=[],wr_cceresult2=[],wr_cceresult3=[],wr_cceresult4=[];
					*/
					
					
					
				},
				error:function(){
					var curcon=wr_SearchCondition("六月");
					var curdate=new Date();
					var curmonth=curdate.getMonth()+1;
					var tempmonth=[];
					for(var i=0;i<curcon;i++){
						if(i>=curmonth){
							var tempa=parseInt(curmonth+12);
							tempmonth.push(parseInt(tempa-i)+"月");
						}else{
							tempmonth.push(parseInt(curmonth-i)+"月");
						}
					}
					tempmonth.reverse();
					wr_caidates=tempmonth;
					wr_allidates=tempmonth;
					wr_ccdates=tempmonth;
					wr_ccedates=tempmonth;
					for(var i=0;i<6;i++){
						var tempb=parseInt(parseInt(i+2)*Math.random());
						var tempc=parseInt(parseInt(i+3)*Math.random());
						wr_cairesult1.push(tempb);
						wr_cairesult2.push(tempc);
						wr_alliresult1.push(tempb);
						wr_alliresult2.push(tempc);
						wr_ccresult1.push(tempb);
						wr_cceresult1.push(tempc);
						wr_cceresult2.push(tempb);
						wr_cceresult3.push(tempb);
						wr_cceresult4.push(tempc);
					}
				}
				
				
				
			});
			
		}
		
		
		
	});
})(jQuery);












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