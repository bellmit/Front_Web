/*初始化地图*/
var R=(function(){
	 $("#map").html("");
	 Raphael.getColor.reset();
	 var rap = Raphael("map",650,500);
	 lr_PaintMap(rap);
	 return rap;
})();
(function($){
	$(function(){
		/*数据全为空时的全局标识*/
		var isnodata=false,isnaodata1=false,isnaodata2=false,isnaodata3=false,isnaodata4=false;
		var pienodata1=false,pienodata2=false;
		/*全局颜色定义(默认：逾期违约金1，居间服务费2，利息3，本金4)*/
		var global_color=['#2f7ed8','#0d233a','#8bbc21','#910000','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a']
		var global_pie1=["利息","居间服务费","成交服务费","提前还款违约金"],global_pie2=["本金","利息","居间服务费","成交服务费","逾期还款违约金","提前还款违约金"];
		/*初始化日期数据*/
		var summontwrap=document.getElementById("lr_raresult");
		var sumthemewrap=document.getElementById("lr_otheme");
		var lr_radates=[];
		/*累积投资结果集对象*/
		var lr_raresult1=[],lr_raresult2=[],lr_raresult3=[],lr_raresult4=[];//第一个柱状图
		var lr_piedate1=[],lr_piedate2=[];
		/*柱状图初始化数据*/
		handleReqAll();
		/*饼图初始化数据*/
		var lr_piesum1=0,lr_piesum2=0;
		$("#lr_pietable1").find("tr").each(function(index){
			if(index>=3){
				if(index==3&&lr_piesum1==0){
					pienodata1=true;
				}else{
					pienodata1=false;
				}
				return false;
			}
			var curobj=$(this),curtd=curobj.find("td:first"),curtext=curtd.text();
			curtext=curtext.replace(/(\,*)/g,"");
			curtext=parseInt(curtext,10);
			lr_piesum1=parseInt(lr_piesum1+curtext);
			lr_piedate1.push([global_pie1[index],curtext]);
			curtd.text(tradeRMBFormat("",curtext));
		});
		$("#lr_pietable2").find("tr").each(function(index){
			if(index>=5){
				if(index==5&&lr_piesum2==0){
					pienodata2=true;
				}else{
					pienodata2=false;
				}
				return false;
			}
			var curobj=$(this),curtd=curobj.find("td:first"),curtext=curtd.text();
			curtext=curtext.replace(/(\,*)/g,"");
			curtext=parseInt(curtext,10);
			lr_piesum2=parseInt(lr_piesum2+curtext);
			lr_piedate2.push([global_pie2[index],curtext]);
			curtd.text(tradeRMBFormat("",curtext));
		});
		/*累积投资柱状图对象定义*/
		var lr_raobj={
			chart:{
				type:'column',
				width:"722",
				style:{
					margin:"0 auto"	
				}
			},
			title:{text:''},
			colors:["#d1c0a5","#fbb634","#7ecef4","#ec313a"],
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
				categories:lr_radates,
				lineColor:"#cecece"
			},
			yAxis:{
				gridLineColor:"#fff",
				stackLabels: {
					enabled: true,
					formatter:function(){
						var tempy=(this.total==null||typeof this.total===undefined)?"-01":this.total;
						if(isnodata){
							return "";
						}else{
							if(tempy=="-01"){
								return "";
							}else if((isnodata1&&tempy==0)||(isnodata2&&tempy==0)||(isnodata3&&tempy==0)||(isnodata4&&tempy==0)){
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
					name:'本金',
					data:lr_raresult4
					},{
					name:'利息',
					data:lr_raresult3
					},{
					name:'居间服务费',
					data:lr_raresult2
					},{
					name:'逾期违约金',
					data:lr_raresult1
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
		/*饼图对象定义*/
		var lr_ccdobj={
			chart:{
				type:'pie'
			},
			title:{
				text:''
			},
			colors:["#fbb634","#7ecef4","#ccd2ee","#ec8372"],
			credits: {enabled:false},
			series: [{
					name:["累积成本明细百分比"],
					data:lr_piedate1
			}],
			tooltip:{
				shadow:false,
				enabled:(function(){
					if(pienodata1){
						return false;
					}else{
						return true;
					}
				}()),
				formatter: function(){
					if(pienodata1){
						return "";
					}else{
						var tempindex=this.point.x;
						return "<span style=\"color:"+this.point.color+";\">"+global_pie1[tempindex]+":</span><span>"+Number(this.percentage).toFixed(2)+"%</span>";
					}
				}
			},
			plotOptions: {
				 pie: {
					visible:(function(){
						if(pienodata1){
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
		var lr_lraobj={
			chart:{
				type:'pie'
			},
			title:{
				text:''
			},
			colors:["#d1c0a5","#fbb634","#7ecef4","#ccd2ee","#ec313a","#ec8372"],
			credits: {enabled:false},
			series: [{
					name:["已还明细百分比"],
					data:lr_piedate2
			}],
			tooltip:{
				shadow:false,
				enabled:(function(){
					if(pienodata2){
						return false;
					}else{
						return true;
					}
				}()),
				formatter: function(){
					if(pienodata2){
						return "";
					}else{
						var tempindex=this.point.x;
						return "<span style=\"color:"+this.point.color+";\">"+global_pie2[tempindex]+":</span><span>"+Number(this.percentage).toFixed(2)+"%</span>";
					}
				}
			},
			plotOptions: {
				 pie: {
					visible:(function(){
						if(pienodata2){
							return false;
						}else{
							return true;
						}
					}()),
					allowPointSelect: true,
					borderColor:"#fff",
                	borderWidth:"0.5pt",
					cursor: 'pointer',
					dataLabels:{
						enabled:false
					}
				}
			}
		}
		/*柱状初始化图初始化*/
		$('#lr_radatachart').highcharts(lr_raobj,function(chart){
			if(!isnodata){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
		});
		/*饼图图初始化初始化*/
		$('#lr_ccddatapie').highcharts(lr_ccdobj,function(chart){
			if(!pienodata1){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',120,120).add();
		});
		$('#lr_lradatapie').highcharts(lr_lraobj,function(chart){
			if(!pienodata2){
				return false;
			}
			chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',120,120).add();
		});
		/*柱状图绑定查询事件*/
		$("#lr_rabtn").click(function(e){
			lr_radates=[];
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
					var tempa=parseInt(curmonth+i);
					if(tempa>12){
						tempmonth.push(parseInt(tempa-12)+"月");
					}else{
						tempmonth.push(tempa+"月");
					}
				}
				handleReqDate(curcon);
				lr_raobj.xAxis.categories=tempmonth;
				lr_raobj.series[0].data=lr_raresult4;
				lr_raobj.series[1].data=lr_raresult3;
				lr_raobj.series[2].data=lr_raresult2;
				lr_raobj.series[3].data=lr_raresult1;
				$("#lr_radatachart").highcharts(lr_raobj,function(chart){
					if(!isnodata){
						return false;
					}
					chart.renderer.text('<span style=\"color:#a0a0a0;font-size:12px;\">暂无数据</span>',350,130).add();
				});
			}
		});
		/*点击时间条件ajax查询操作*/
		function handleReqDate(ctimes){
			lr_raresult1=[];
			lr_raresult2=[];
			lr_raresult3=[];
			lr_raresult4=[];
			$.ajax({
				url:"repayment",
				async:false,
				data:{"delayedMonths":ctimes},
				dataType:"json",
				type:"post",
				success: function(datas){
					handleDatas(datas,ctimes);
				},
				error:function(){
					isnodata=true;	
				}
			});
		}
		/*初始化ajax查询操作*/
		function handleReqAll(){
			lr_raresult1=[];
			lr_raresult2=[];
			lr_raresult3=[];
			lr_raresult4=[];
			lr_radates=[];
			var curcon=wr_SearchCondition("六月");
			var curdate=new Date();
			var curmonth=curdate.getMonth()+1;
			var tempmonth=[];
			for(var i=0;i<curcon;i++){
				var tempa=parseInt(curmonth+i);
				if(tempa>12){
					tempmonth.push(parseInt(tempa-12)+"月");
				}else{
					tempmonth.push(tempa+"月");
				}
			}
			lr_radates=tempmonth;
			$.ajax({
				url:"repayment",
				async:false,
				data:{"delayedMonths":6},
				dataType:"json",
				type:"post",
				success: function(datas){
					handleDatas(datas,6);
				},
				error:function(){
					isnodata=true;
				}
			});
		}
		
		/*数据处理*/
		function handleDatas(objs,ctimes){
			var lr_data=objs.monthRepayAmount;
			var lr_theme=objs.totalRepayAmount;
			var lr_sum=0.00;
			if(lr_theme==null||lr_theme=="null"){
				lr_theme=0.00;
			}
			if(lr_data==null||typeof lr_data=="undefined"||lr_data=="null"){
				var mm=0;
				for(;mm<ctimes;mm++){
					lr_raresult1.push(0);
					lr_raresult2.push(0);
					lr_raresult3.push(0);
					lr_raresult4.push(0);
				}
				isnodata=true;
				isnodata1=true;
				isnodata2=true;
				isnodata3=true;
				isnodata4=true;
				lr_sum=0.00;
			}else{
				var lr_datalen=lr_data.length;
				if(lr_datalen!=0){
					var ii=0,icount=0,lr_sum=0,icount1=0,icount2=0,icount3=0,icount4=0;
					for(;ii<lr_datalen;ii++){
						var a=lr_data[ii].lateFee,b=lr_data[ii].intermediaryFee,c=lr_data[ii].interest,d=lr_data[ii].principal;
						var aa=parseInt(a),bb=parseInt(b),cc=parseInt(c),dd=parseInt(d);
						if(aa==0&&bb==0&&cc==0&&dd==0){
							icount++;
						}
						if(aa==0){
							icount1++;
						}
						if(bb==0){
							icount2++;
						}
						if(cc==0){
							icount3++;
						}
						if(dd==0){
							icount4++;
						}
						lr_raresult1.push(a);
						lr_raresult2.push(b);
						lr_raresult3.push(c);
						lr_raresult4.push(d);
						lr_sum+=(function(){return aa+bb+cc+dd})(aa,bb,cc,dd);
					}
					if(icount==ii){
						isnodata=true;
						lr_sum=0.00;
					}
					if(icount1==ii){
						isnodata1=true;
					}else{
						isnodata1=false;
					}
					if(icount2==ii){
						isnodata2=true;
					}else{
						isnodata2=false;
					}
					if(icount3==ii){
						isnodata3=true;
					}else{
						isnodata3=false;
					}
					if(icount4==ii){
						isnodata4=true;
					}else{
						isnodata4=false;
					}
				}else{
					isnodata=true;
					isnodata1=true;
					isnodata2=true;
					isnodata3=true;
					isnodata4=true;
					lr_sum=0.00;
				}
			}
			if(ctimes=="6"){
				sumthemewrap.innerHTML="待还款总额：<span style=\"font-size:18px;color:#fff;font-family:'Arial';font-weight:bold;\">￥"+tradeRMBFormat("",lr_theme)+"</span>";
				summontwrap.innerHTML="未来六月合计：￥"+tradeRMBFormat("",lr_sum);
			}else if(ctimes=="12"){
				sumthemewrap.innerHTML="待还款总额：<span style=\"font-size:18px;color:#fff;font-family:'Arial';font-weight:bold;\">￥"+tradeRMBFormat("",lr_theme)+"</span>";
				summontwrap.innerHTML="未来一年合计：￥"+tradeRMBFormat("",lr_sum);
			}
		}
		
		/*地图功能*/
		/*初始化数据*/
		var dataColorObj={0:{colors:"#f4e3d5"},1:{colors:"#fee5d9"},2:{colors:"#fcae91"},3:{colors:"#fb6a4a"},4:{colors:"#cb181d"},5:{colors:"#c51016"}};
		var lr_LoanNumber={"澳门":0,"香港":0,"台湾":0,"广东":0,"广西":0,"海南":0,"云南":0,"福建":0,"江西":0,"湖南":0,"贵州":0,"浙江":0,"安徽":0,"上海":0,"江苏":0,"湖北":0,"西藏":0,"青海":0,"甘肃":0,"新疆":0,"陕西":0,"河南":0,"山西":0,"山东":0,"河北":0,"天津":0,"北京":0,"宁夏":0,"内蒙古":0,"辽宁":0,"吉林":0,"黑龙江":0,"重庆":0,"四川":0};
		$.ajax({
			url:"region",
			type:"post",
			async:false,
			dataType:"json",
			success: function(datas){
				if(datas){
					for(var ii in datas){
						lr_LoanNumber[ii]=datas[ii];
					}
				}
			}
		});
		/*初始化排行*/
		lr_Top(5,lr_LoanNumber);
		/*感谢投资人*/
		$("#toinvestmsg").click(function(e){
			e.preventDefault();
			window.location.href="../../fund/message/queryMessageList#getLoanBox";	
		});
		/*初始化地图*/
		setTimeout(function(){
			/*延迟加载*/
			lr_MapInit(lr_LoanNumber,dataColorObj);
		},1000);
		/*初始化数据绑定*/
		lr_DataAction();
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
/*地图初始化加载*/
function lr_MapInit(nobjs,cobjs) {
    var current = null;
    var textAttr = {"fill":"#8a8785","font-size":"12px","cursor":"pointer","font-family":"宋体"};
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
                    lr_tiptitle.html(tempname).next().find("p").html(nobjs[tempname]).parent().parent().css({"display":"block",'top': (e.pageY-1580)+'px','left':(e.pageX-520)+'px'});
                }else{
					lr_tiptitle.parent().hide().stop();
                }
            });
			/*选择省市*/
            function lr_ClickMap(){
				/*如果点击的是已选中状态，则不做任何操作*//*取消选择后恢复默认*/
				 current && china[current]['path'].animate({transform:"t30,0",fill:china[current]['isClick']?china[current]['path'].color:lr_NumToColor(nobjs,current,cobjs),stroke:"#eceded"},500);
                if(current == state){
					return;
				}else{
					current = state;
				}
				/*选中高亮*/
                china[state]['path'].animate({transform:"t30,0 s1.2 1.2",fill:china[state]['path'].color=lr_NumToColor(nobjs,state,cobjs),stroke:"#eceded"},500);
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
function lr_DataAction(){
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