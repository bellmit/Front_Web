/*查询结果集字符*/
		var rescg="<colgroup><col class=\"tn_rcg1\"/><col class=\"tn_rcg2\"/><col class=\"tn_rcg3\"/><col class=\"tn_rcg4\"/><col class=\"tn_rcg5\"/><col class=\"tn_rcg6\"/></colgroup>",reshead="<tr class=\"tn_dataheader\"><th>日期</th><th>交易类型</th><th>收入</th><th>支出</th><th>结余</th><th>备注</th></tr>",resfooter="<tr class=\"tn_datafooter\"><td class=\"tn_formatbl\"></td><td></td><td></td><td></td><td></td><td class=\"tn_formatbr\"></td></tr>";
(function($){
	$(function(){
		/*页面文档节点引用*/
		var tn_dateinterval=$("#tn_dateinterval"),tn_sctag=$("#tn_sctag"),tn_pagewrap=$("#tn_pagewrap");
		var tn_start=document.getElementById("tn_startdate"),tn_end=document.getElementById("tn_enddate"),tn_tradetype=document.getElementById("tn_tradetype");
		/*分页隐藏域*/
		var tn_pagetotal=document.getElementById("tn_pagetotal");//总记录数
		var tn_pagecurrent=document.getElementById("tn_pagecurrent");//当前第几页
		var tn_pagesize=document.getElementById("tn_pagesize");//每页显示数量
		/*查询条件初始化*/
		if(tn_start.value==""||tn_end.value==""){
			var tn_temptext=tn_dateinterval.find("li:first").text();
			var tn_tempinits=tn_ToDateFormat(tn_temptext);
			tn_start.value=tn_tempinits[0];
			tn_end.value=tn_tempinits[1];
		}else{
			tn_dateinterval.find("li").each(function(index, element) {
                element.className="";
            });
		}
		if(tn_tradetype.value==""){
			tn_sctag.find("li").each(function(index, element) {
                element.className="";
            });
		}else{
			tn_sctag.find("li").each(function(index, element) {
				if(index==tn_tradetype.value){
					element.className="tn_tagsel";
				}else{
					element.className="";
				}
            });
		}
		/*查询功能初始化*/
		/*参数说明：请求参数，[请求地址，结果集列结构，结果集头部，结果集容器,错误集容器],[分页父容器]*/
		//tn_HandleReq([tn_start.value,tn_end.value,tn_tradetype.value],["请输入请求地址",rescg,reshead,resfooter,"tn_result","tn_dataerror"],["tn_pagewrap"]);
		/*时间段选择事件*/
		$("#tn_startdate,#tn_enddate").click(function(e){
			var curid=e.target.id;
			if(curid=="tn_startdate"){
				WdatePicker({
					onpicked:function(dp){
						tn_dateinterval.find("li").each(function(index,element){
							element.className="";
						});
						if(tn_start.value!=""&&tn_end.value!=""){
							/*参数说明：请求参数，[请求地址，结果集列结构，结果集头部，结果集容器,错误集容器],[分页父容器]*/
							//tn_HandleReq([tn_start.value,tn_end.value,tn_tradetype.value],["请输入请求地址",rescg,reshead,resfooter,"tn_result","tn_dataerror"],["tn_pagewrap"]);
						}
					},
					maxDate:'#F{$dp.$D(\'tn_enddate\')}',
					position:{left:0,top:2}
				})	
			}else if(curid=="tn_enddate"){
				WdatePicker({
					onpicked:function(dp){
						tn_dateinterval.find("li").each(function(index,element){
							element.className="";
						});
						if(tn_start.value!=""&&tn_end.value!=""){
							/*参数说明：请求参数，[请求地址，结果集列结构，结果集头部，结果集容器,错误集容器],[分页父容器]*/
							//tn_HandleReq([tn_start.value,tn_end.value,tn_tradetype.value],["请输入请求地址",rescg,reshead,resfooter,"tn_result","tn_dataerror"],["tn_pagewrap"]);
						}
					},
					minDate:'#F{$dp.$D(\'tn_startdate\')}',
					position:{left:0,top:2}
				})
			}
		});
		
		/*时间段条件,查询类型绑定事件*/
		$("#tn_dateinterval,#tn_sctag").click(function(e){
			if(e.target.nodeName=="LI"){
				var curobj=$(e.target);
				curobj.addClass("tn_tagsel").siblings().removeClass("tn_tagsel");
				if(e.target.parentNode.id=="tn_dateinterval"){
					var tn_tempdates=tn_ToDateFormat(curobj.text());
					tn_start.value=tn_tempdates[0];
					tn_end.value=tn_tempdates[1];
				}
				if(e.target.parentNode.id=="tn_sctag"){
					tn_tradetype.value=curobj.index();
				}
				/*参数说明：请求参数，[请求地址，结果集列结构，结果集头部，结果集容器,错误集容器],[分页父容器]*/
				//tn_HandleReq([tn_start.value,tn_end.value,tn_tradetype.value],["请输入请求地址",rescg,reshead,resfooter,"tn_result","tn_dataerror"],["tn_pagewrap"]);
			}
		});
	});
})(jQuery);
/*判断闰年并获取月份值*/
function is_LeapYear(ys,ms){
	var cmds=[31,28,31,30,31,30,31,31,30,31,30,31];
	var isly=ys%4==0&&ys%100!=0?true:ys%400==0?true:false;
	ms==2&&isly?cmds.splice(1,1,29):cmds.splice(1,1,28);
	return cmds[ms-1];
}
/*日期差转化，获取分别的时间值*/
function tn_ToDateFormat(strs){
	var nums=strs.match(/\d+/g).join(),units=strs.match(/[天月]/).join();
	var dates=new Date();
	var curyear=dates.getFullYear(),curmonth=dates.getMonth()+1,curdays=dates.getDate();
	var years="",months="",formatm="",formatd="",formaty="";
	if(units=="天"){
		if(nums>curdays){
			formaty=curmonth==12?curyear-1:curyear;
			formatd=parseInt(is_LeapYear(curyear,curmonth)+curdays)-nums;
			formatm=curmonth-1;
		}else{
			formaty=curyear;
			formatm=curmonth;
			formatd=curdays-nums;
		}
		formatm=formatm<10?"0"+formatm:formatm;
		formatd=formatd<10?"0"+formatd:formatd;
	}
	if(units=="月"){
		if(nums>12||nums==12){
			if(nums%12==0){
				years=parseInt(nums/12);
				months=0;
			}else{
				years=parseInt(nums/12);
				months=nums%12;
			}
		}else{
			years="";
			months=nums;
		}
		if(years==""){
			if(curmonth<months){
				formatm=parseInt(curmonth+12)-months;
				formaty=curyear-1;
			}else{
				formatm=curmonth-months;
				formaty=curyear;
			}
		}else{
			formaty=curyear-years;
			if(curmonth<months){
				formatm=parseInt(curmonth+12)-months;
				formaty=formaty-1;
			}else{
				formatm=curmonth-months;
			}
		}
		formatm=formatm<10?"0"+formatm:formatm;
		formatd=curdays<10?"0"+curdays:curdays;
	}
	curmonth=curmonth<10?"0"+curmonth:curmonth;
	curdays=curdays<10?"0"+curdays:curdays;
	return [formaty+"-"+formatm+"-"+formatd,curyear+"-"+curmonth+"-"+curdays];
}

/*查询结果集*/
function tn_HandleReq(arr1,arr2,arr3){
	/*参数说明：请求参数，[请求地址，结果集列结构，结果集头部，结果集容器,错误集容器],[分页父容器]*/
	var params="datestart="+arr1[0]+"&dateend="+arr1[1]+"&tradetype="+arr1[2];
	var urls=arr2[0],rescg=arr2[1],reshead=arr2[2],resfoot=arr2[3],wraps=$("#"+arr2[4]),errors=$("#"+arr2[5]);
	var ppwrap=$("#"+arr3[0]);
	var tn_result="",tn_resultlen=0;
	/*请求数据*/
	$.ajax({
		url:urls,
		data:params,
		dataType:"返回结果集类型",
		success: function(datastr){
			if(datastr.length>0){
				tn_resultlen=datastr.length;
				tn_pagetotal.value=tn_resultlen;
				var tempsize=tn_pagesize.value;
				var sindex=parseInt((tn_pagecurrent.value-1)*tempsize+1);
				var eindex=parseInt(sindex+(tempsize-1));
				$.each(datastr,function(index,value){
					var tempi=parseInt(index+1);
					if(tempi<=eindex&&tempi>=sindex){
						if(tempi%2!=0){
							tn_result+="<tr class=\"tn_dataeven\"><td>"+mostr[index]["tradeTime"]+"</td><td>"+mostr[index]["tradeType"]+"</td><td>"+mostr[index]["income"]+"</td><td>"+mostr[index]["expenses"]+"</td><td>"+mostr[index]["tradeBalance"]+"%</td><td><a href=\""+mostr[index]["remark"]+"\" title=\"\">"+mostr[index]["remark"]+"</a></td></tr>";
						}else{
							tn_result+="<tr class=\"tn_datadef\"><td>"+mostr[index]["tradeTime"]+"</td><td>"+mostr[index]["tradeType"]+"</td><td>"+mostr[index]["income"]+"</td><td>"+mostr[index]["expenses"]+"</td><td>"+mostr[index]["tradeBalance"]+"%</td><td><a href=\""+mostr[index]["remark"]+"\" title=\"\">"+mostr[index]["remark"]+"</a></td></tr>";
						}
					}
				});
				errors.html("");
				wraps.html(rescg+reshead+tn_result+resfoot);
				$("<div id=\"tn_pageshow\" class=\"easyui-pagination\" data-options=\"\"></div>").appendTo(ppwrap);
				$("#tn_pageshow").pagination({
					total:tn_resultlen,/*总记录数*/
					pageSize:tn_pagesize.value,/*默认每页显示记录数*/
					pageNumber:tn_pagecurrent.value,/*默认显示第一页*/
					pageList:[5,10,15,20],/*页面可选每页显示记录数下拉框*/
					layout:['list','sep','first','prev','links','next','last','sep'],/*分页按钮列表*/
					links:8,/*分页页面显示数量*/
					onSelectPage:function(pageNumber,pageSize){
						console.log(pageNumber);
						tn_pagecurrent.value=pageNumber;
						tn_pagesize.value=pageSize;
						/*参数说明：请求参数，[请求地址，结果集列结构，结果集头部，结果集容器,错误集容器],[分页父容器]*/
						tn_HandleReq([document.getElementById("tn_startdate").value,document.getElementById("tn_enddate").value,document.getElementById("tn_tradetype").value],["list",rescg,reshead,resfooter,"tn_result","tn_dataerror"],["tn_pagewrap"]);
					}
				});
				/*生成导出Excel按钮*/
				$("<p class=\"tn_toexcel\" id=\"tn_toexcel\">导出Excel</p>").appendTo($("#tn_excelwrap").html(""));
				$("#tn_toexcel").live("click",function(e){
					/*
						to do
						导出Excel实现
					*/
				});
			}else{
				wraps.html("");
				errors.html("<div class=\"tn_datanone\"></div>");
				ppwrap.empty();
				$("#tn_excelwrap").html("");
			}
		},
		error:function(){
			wraps.html("");
			ppwrap.empty();
			errors.html("<div class=\"tn_datanone\"></div>");
			$("#tn_excelwrap").html("");
		}
	});
}