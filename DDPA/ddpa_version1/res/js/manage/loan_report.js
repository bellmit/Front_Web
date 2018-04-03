(function($){
	$(function(){
		/*全局颜色定义*/
		var global_color=['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a']
		var global_pie1=["利息","居间服务费","成交服务费","提前还款违约金"],global_pie2=["本金","利息","居间服务费","成交服务费","提前还款违约金","提前还款违约金"];
		/*初始化日期数据*/
		var lr_radates=[];
		/*累积投资结果集对象*/
		var lr_raresult1=[],lr_raresult2=[],lr_raresult3=[],lr_raresult4=[];//第一个柱状图
		/*初始化数据*/
		var dataColorObj={0:{colors:"#e5bfb8"},1:{colors:"#fee5d9"},2:{colors:"#fcae91"},3:{colors:"#fb6a4a"},4:{colors:"#cb181d"},5:{colors:"#c51016"}};
		var lr_LoanNumber={"澳门":0,"香港":60,"台湾":0,"广东":800,"广西":20,"海南":0,"云南":0,"福建":0,"江西":0,"湖南":0,"贵州":0,"浙江":40,"安徽":0,"上海":50,"江苏":0,"湖北":0,"西藏":0,"青海":0,"甘肃":0,"新疆":0,"陕西":0,"河南":0,"山西":0,"山东":0,"河北":0,"天津":0,"北京":30,"宁夏":0,"内蒙古":0,"辽宁":0,"吉林":0,"黑龙江":0,"重庆":0,"四川":45};
		/*初始化排行*/
		lr_Top(5,lr_LoanNumber);
		/*初始化地图*/
		lr_MapInit(lr_LoanNumber,dataColorObj);
		/*初始化数据绑定*/
		lr_DataAction();
		/*全局表格对象定义*/
		/*累积投资柱状图对象*/
		var lr_raobj={
				chart:{
					type:'column'
				},
				title:{text:'待还款总额'},
				colors:["#ec8372","#84ccc9","#fbb634","#d1c0a5"],
				legend:{
					padding:12,
					backgroundColor:"#fff",
					shadow:true
				},
				xAxis:{categories:lr_radates},
				yAxis:{},
				credits: {enabled:false},
				series: [{
						name:'预期违约金',
						data:lr_raresult1
					},{
						name:'居间服务费',
						data:lr_raresult2
					},{
						name:'利息',
						data:lr_raresult3
					},{
						name:'本金',
						data:lr_raresult4
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
		var lr_ccdobj={
				chart:{
					type:'pie',
					spacingBottom:50
				},
				title:{
					text:'累积成本明细',
					align:"center",
					y:310
				},
				colors:["#fbb634","#7ecef4","#ccd2ee","#ec8372"],
				credits: {enabled:false},
				series: [{
						name:["累积成本明细百分比"],
						data:[["利息",4000],["居间服务费",1000],["成交服务费",1000],["提前还款违约金",300]]
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
								return "<span style=\"color:"+this.point.color+";\">"+global_pie1[tempindex]+":"+Number(this.percentage).toFixed(2)+"%</span>";
							}
						}
					}
				}
			}
			var lr_lraobj={
				chart:{
					type:'pie',
					spacingBottom:50
				},
				title:{
					text:'已还明细',
					align:"center",
					y:310
				},
				colors:["#d1c0a5","#fbb634","#7ecef4","#ccd2ee","#fc6a23","#ec8372"],
				credits: {enabled:false},
				series: [{
						name:["已还明细百分比"],
						data:[["本金",10000],["利息",4000],["居间服务费",1000],["成交服务费",1000],["逾期还款违约金",100],["提前还款违约金",200]]
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
								return "<span style=\"color:"+this.point.color+";\">"+global_pie2[tempindex]+":"+Number(this.percentage).toFixed(2)+"%</span>";
							}
						}
					}
				}
			}
		/*账户报表初始化*/
		handleReqAll();
		$('#lr_radatachart').highcharts(lr_raobj);
		/*饼图初始化*/
		$('#lr_ccddatapie').highcharts(lr_ccdobj);
		$('#lr_lradatapie').highcharts(lr_lraobj);
		/*绑定查询事件*/
		$("#lr_rabtn").click(function(e){
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
						var tempa=parseInt(curmonth+12,10);
						tempmonth.push(parseInt(tempa-i,10)+"月");
					}else{
						tempmonth.push(parseInt(curmonth-i,10)+"月");
					}
				}
				if(curid=="lr_ca"){
					lr_caobj.xAxis.categories=tempmonth;
					lr_caobj.series[0].lr_caresult1;
					lr_caobj.series[1].lr_caresult2;
					lr_caobj.series[2].lr_caresult3;
					lr_caobj.series[3].lr_caresult4;
					charwraps.highcharts(lr_caobj);
				}
			}
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
					lr_caobj.xAxis.categories=tempmonth;
					lr_caobj.series[0].lr_caresult1;
					lr_caobj.series[1].lr_caresult2;
					lr_caobj.series[2].lr_caresult3;
					lr_caobj.series[3].lr_caresult4;
					charwraps.highcharts(lr_caobj);
				}
			});
			
		}
		
		
		
	});
})(jQuery);

/*根据数据获取颜色*/
function lr_NumToColor(nobjs,names,cobj){
	var nums=nobjs[names];
	var num_rule=0;
	if(nums==0){
		num_rule=0;
	}else if(nums>=1&&nums<7){
		num_rule=1;
	}else if(nums>=7&&nums<21){
		num_rule=2;
	}else if(nums>=21&&nums<43){
		num_rule=3;
	}else if(nums>=43&&nums<564){
		num_rule=4;
	}else{
		num_rule=5;
	}
	return cobj[num_rule].colors;
}
/*比较数据大小*/
function lr_Top(counts,objs){
	var topnum=counts,topobj=objs,i=0,topres="";
	var toparr=[];
	for(var lr_key in topobj){
		toparr.push(topobj[lr_key]+","+lr_key);
	}
	toparr.sort();
	toparr.reverse();
	toparr.slice(0,topnum);
	for(i=0;i<topnum;i++){
		var tempres=toparr[i].split(",");
		topres+="<li><p>"+tempres[1]+"</p><div>"+tempres[0]+"人</div></li>";
	}
	$("#lr_maptop").html(topres);
}
/*初始化地图*/
function lr_MapInit(nobjs,cobjs) {
    $("#map").html("");
    Raphael.getColor.reset();
	var R = Raphael("map",650,500);
    var current = null;
    var textAttr = {"fill":"#000","font-size":"12px","cursor":"pointer","font-family":"微软雅黑"};
    lr_PaintMap(R);
	var lr_tiptitle = $("#lr_tiptitle");
    for(var state in china) {
        china[state]['path'].color="#eee";
        china[state]['path'].transform("t30,0");
        (function (st, state){
			var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);
			var tempname=china[state]['name'];
			st.attr({fill:lr_NumToColor(nobjs,tempname,cobjs)});
			/*修正文字定位*/
            switch (tempname){
                case "江苏":
                    xx += 5;
                    yy -=0;
                    break;
                case "河北":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津":
                    xx += 20;
                    yy += 10;
                    break;
                case "上海":
                    xx += 20;
                    break;
                case "广东":
                    yy -= 10;
                    break;
                case "澳门":
                    yy += 10;
                    break;
                case "香港":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西":
                    xx += 5;
                    yy += 20;
                    break;
                case "内蒙古":
                    xx -= 15;
                    yy += 65;
                    break;
				case "江西":
                    xx -= 10;
                    yy +=0;
                    break;
            }
            china[state]['text']=R.text(xx,yy,tempname).attr(textAttr).click(function(){
                lr_ClickMap();
            }).hover(function(){
                var $sl = $("#topList").find("[title='" + tempname + "']:not([select])");
                $sl.css({"font-size":"14px"});
            },function(){
                var $sl = $("#topList").find("[title='" + tempname+ "']:not([select])");
                $sl.css({"font-size":"18px"});
            });
            //移入事件,显示信息
            $(st[0]).css({"cursor":"pointer"}).click(function (e) {
                lr_ClickMap();
            }).hover(function(e){
                var _ST = this;
                var $sl = $("#topList").find("[title='" + tempname+ "']:not([select])");
                if (e.type =="mouseenter") {
                    lr_tiptitle.html(tempname).next().find("p").html(nobjs[tempname]).parent().parent().css({"display":"block",'top': (e.pageY-180)+'px','left':(e.pageX-500)+'px'});
                }else{
					lr_tiptitle.parent().hide().stop();
                }
            });
			/*选择省市*/
            function lr_ClickMap(){
				/*如果点击的是已选中状态，则不做任何操作*//*取消选择后恢复默认*/
				 current && china[current]['path'].animate({transform:"t30,0",fill:china[current]['isClick']?china[current]['path'].color:lr_NumToColor(nobjs,current,cobjs),stroke:"#fff"},500);
                if(current == state){
					return;
				}else{
					current = state;
				}
				/*选中高亮*/
                china[state]['path'].animate({transform:"t30,0 s1.2 1.2",fill:china[state]['path'].color=lr_NumToColor(nobjs,state,cobjs),stroke:"#fff"},500);
                st.toFront();
                R.safari();
                china[current]['text'].toFront();
				/*不存在地图对象情况*/
                if(china[current]===undefined||china[current] =="undefined"){return;}
            }
        })(china[state]['path'],state);
    }
}
/*绑定数据并交互数据*/
function lr_DataAction() {
    /*
	to do
	*/
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