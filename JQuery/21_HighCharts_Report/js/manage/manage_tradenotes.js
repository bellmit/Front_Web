/*查询结果集字符*/
var rescg="<colgroup><col class=\"tn_rcg1\"/><col class=\"tn_rcg2\"/><col class=\"tn_rcg3\"/><col class=\"tn_rcg4\"/><col class=\"tn_rcg5\"/><col class=\"tn_rcg6\"/></colgroup>",reshead="<tr class=\"tn_rdh\"><th>日期</th><th>交易类型</th><th>收入</th><th>支出</th><th>结余</th><th>备注</th></tr>";
(function($){
	$(function(){
		/*页面文档节点引用*/
		var tn_btncash=$("#tn_btncash");
		var tn_dateinterval=$("#tn_dateinterval"),tn_sctag=$("#tn_sctag"),tn_pagewrap=$("#tn_pagewrap");
		var tn_start=document.getElementById("tn_startdate"),tn_end=document.getElementById("tn_enddate"),tn_tradetype=document.getElementById("tn_tradetype");
		/*分页隐藏域*/
		var tn_pagetotal=document.getElementById("tn_pagetotal");//总记录数
		var tn_pagecurrent=document.getElementById("tn_pagecurrent");//当前第几页
		var tn_pagesize=document.getElementById("tn_pagesize");//每页显示数量
		/*数据展现初始化*/
		if(tn_amountdata!=""||tn_amountdata!="undefined"){
			var tn_amountarr="";
			if(tn_amountdata.indexOf(".")!=-1){
				tn_amountarr=tn_amountdata.split(".");
				document.getElementById("tn_amountinfo").innerHTML="<div>账户余额:￥</div><span class=\"tn_amountpart1\">"+tn_amountarr[0]+".</span><span class=\"tn_amountpart2\">"+tn_amountarr[1]+"</span>";
			}else{
				document.getElementById("tn_amountinfo").innerHTML="<div>账户余额:￥</div><span class=\"tn_amountpart1\">"+tn_amountdata+".</span><span class=\"tn_amountpart2\">00</span>";
			}
		}
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
		if(tn_tradetype.value==""||tn_tradetype.value=="ALL"){
			tn_sctag.find("li").each(function(index, element) {
				if(index==0){
					element.className="tn_tagsel";
				}else{
					element.className="";
				}
            });
		}else{
			tn_sctag.find("li").each(function(index, element) {
				var tn_sctagid=element.id;
				if(tn_sctagid==tn_tradetype.value){
					element.className="tn_tagsel";
				}else{
					element.className="";
				}
            });
		}
		/*查询功能初始化*/
		/*参数说明：[开始时间，结束时间，交易类型]，[请求地址，结果集列结构，结果集头部，结果集容器],[分页父容器,分页参数(当前第几页，每页显示记录数)]*/
		tn_HandleReq([tn_start.value,tn_end.value,tn_tradetype.value],["queryTrades",rescg,reshead,"tn_result"],["tn_pagewrap",tn_pagecurrent.value,tn_pagesize.value]);
		/*时间段选择事件*/
		$("#tn_startdate,#tn_enddate").click(function(e){
			var curid=e.target.id;
			if(curid=="tn_startdate"){
				WdatePicker({
					onpicked:function(dp){
						e.target.value=dp.cal.getNewDateStr()
						tn_dateinterval.find("li").each(function(index,element){
							element.className="";
						});
						if(tn_start.value!=""&&tn_end.value!=""){
							/*参数说明：请求参数，[请求地址，结果集列结构，结果集头部，结果集容器],[分页父容器,分页参数(当前第几页，每页显示记录数)]*/
							tn_HandleReq([tn_start.value,tn_end.value,tn_tradetype.value],["queryTrades",rescg,reshead,"tn_result"],["tn_pagewrap",tn_pagecurrent.value,tn_pagesize.value]);
						}
					},
					maxDate:'#F{$dp.$D(\'tn_enddate\')}',
					position:{left:0,top:2}
				})	
			}else if(curid=="tn_enddate"){
				WdatePicker({
					onpicked:function(dp){
						e.target.value=dp.cal.getNewDateStr()
						tn_dateinterval.find("li").each(function(index,element){
							element.className="";
						});
						if(tn_start.value!=""&&tn_end.value!=""){
							/*参数说明：[开始时间，结束时间，交易类型]，[请求地址，结果集列结构，结果集头部，结果集容器],[分页父容器,分页参数(当前第几页，每页显示记录数)]*/
							tn_HandleReq([tn_start.value,tn_end.value,tn_tradetype.value],["queryTrades",rescg,reshead,"tn_result"],["tn_pagewrap",tn_pagecurrent.value,tn_pagesize.value]);
						}

					},
					minDate:'#F{$dp.$D(\'tn_startdate\')}',
					position:{left:0,top:2}
				})
			}
		});
		/*认证条件初始化*/
		var veriobj=verif_Infos();
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
					var curid=curobj.attr("id");
					if(curid=="ALL")
					{
						tn_tradetype.value="";
					}else{
						tn_tradetype.value=curid;
					}
				}
				tn_pagecurrent.value=1;
				/*参数说明：[开始时间，结束时间，交易类型]，[请求地址，结果集列结构，结果集头部，结果集容器],[分页父容器,分页参数(当前第几页，每页显示记录数)]*/
				tn_HandleReq([tn_start.value,tn_end.value,tn_tradetype.value],["queryTrades",rescg,reshead,"tn_result"],["tn_pagewrap",tn_pagecurrent.value,tn_pagesize.value]);
			}
		});
		/*实名认证检测*/
		/*
		to do
		*/
		
		
		
		/*点击提现按钮*/
		tn_btncash.click(function(e){
			$.unblockUI();
			e.preventDefault();
			if(!veriobj.issureId||!veriobj.issureName||!veriobj.issurePhone||!veriobj.issurePwd){
				$.blockUI({  
					title:'认证不全', 
					message:'<div class="warn"><p>为了交易安全，请您先完成&nbsp;'+veriobj.asurl+'</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
					css:{
						width:'auto',
						cursor:'auto'
						},
					overlayCSS: {
						cursor:'auto'
						}
				});
				return false;
			}else{
				//window.open("../../fund/trade/withdrawInit");
				window.location.href="../../fund/trade/withdrawInit";
			}
		});
		
		
		
	});
})(jQuery);
/*判断闰年并获取月份值*/
function is_LeapYear(ys,ms){
	var ms=parseInt(ms,10);
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
			if(curmonth==1||curmonth==01){
				formaty=curyear-1;
				formatm=12;
			}else{
				formaty=curyear;
				formatm=curmonth-1;
			}
			formatd=parseInt(is_LeapYear(curyear,curmonth)+curdays)-nums;
		}else{
			formaty=curyear;
			formatm=curmonth;
			formatd=curdays-nums;
		}
		formatm=formatm<10?"0"+formatm:formatm;
		formatd=formatd<10?"0"+formatd:formatd;
	}
	if(units=="月"){
		if(nums==curmonth&&nums!=12){
			months=12;
			years=1;
		}else if(nums>12||nums==12){
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
			if(nums==curmonth&&nums!=12){
				formatm=12;
			}else if(curmonth<months){
				formatm=parseInt(curmonth+12)-months;
				formaty=formaty-1;
			}else{
				formatm=curmonth-months;
			}
		}
		if((formatm=="2"||formatm=="02")&&curdays>=28){
			formatd=is_LeapYear(formaty,formatm);
		}else{
			formatd=curdays<10?"0"+curdays:curdays;
		}
		formatm=formatm<10?"0"+formatm:formatm;
	}
	curmonth=curmonth<10?"0"+curmonth:curmonth;
	curdays=curdays<10?"0"+curdays:curdays;
	return [formaty+"-"+formatm+"-"+formatd,curyear+"-"+curmonth+"-"+curdays];
}

/*查询结果集*/
function tn_HandleReq(arr1,arr2,arr3){
	var tempparam=arr1;
	var temptype="";
	if(tempparam[2]=="PAYMENT"||tempparam[2]=="REPAYMENT"){
		temptype=tradeTypeAdapt(tempparam[2]);
	}else{
		temptype="&tradeType="+tempparam[2];
	}
	/*参数说明：[开始时间，结束时间，交易类型]，[请求地址，结果集列结构，结果集头部，结果集容器,错误集容器],[分页父容器,分页参数(当前第几页，每页显示记录数)]*/
	var params="beginDate="+tempparam[0]+"&endDate="+tempparam[1]+temptype+"&currentPage="+arr3[1]+"&pageSize="+arr3[2];
	var urls=arr2[0],rescg=arr2[1],reshead=arr2[2],wraps=$("#"+arr2[3]);
	var ppwrap=$("#"+arr3[0]);
	var tn_resdatas="";
	var pt=document.getElementById("tn_pagetotal"),ps=document.getElementById("tn_pagesize"),pc=document.getElementById("tn_pagecurrent");
	var st=document.getElementById("tn_startdate"),et=document.getElementById("tn_enddate");tt=document.getElementById("tn_tradetype");
	/*请求数据*/
	$.ajax({
		url:urls,
		data:params,
		dataType:"json",
		type:"post",
		success: function(datas){
			var curpage=datas.currentPage;
			var pagesize=datas.pageSize;
			var totalcount=datas.totalCount;
			var modelist=datas.modelList;
			var modelen=modelist.length;
			if(modelen==0){
				wraps.html("").addClass("tn_datanone");
				ppwrap.empty();
				$("#tn_excelwrap").html("");
			}else{
				document.getElementById("tn_pagetotal").value=totalcount;
				for(var k=0;k<modelen;k++){
					var tempobj=modelist[k];
					if(k==modelen-1){
						tn_resdatas+="<tr class=\"tn_rdf\"><td class=\"tn_rtd1\">"+tempobj.tradeTime+"</td><td class=\"tn_rtd2\">"+tempobj.tradeType+"</td><td class=\"tn_rtd3\">"+tradeRMBFormat("",tempobj.income)+"</td><td class=\"tn_rtd4\">"+tradeRMBFormat("",-tempobj.expenses)+"</td><td class=\"tn_rtd5\">"+tradeRMBFormat("",tempobj.tradeBalance)+"</td><td class=\"tn_rtd5 tn_rtdlast\">"+tempobj.remark+"</td></tr>";
					}else{
						tn_resdatas+="<tr class=\"tn_rdb\"><td class=\"tn_rtd1\">"+tempobj.tradeTime+"</td><td class=\"tn_rtd2\">"+tempobj.tradeType+"</td><td class=\"tn_rtd3\">"+tradeRMBFormat("",tempobj.income)+"</td><td class=\"tn_rtd4\">"+tradeRMBFormat("",-tempobj.expenses)+"</td><td class=\"tn_rtd5\">"+tradeRMBFormat("",tempobj.tradeBalance)+"</td><td class=\"tn_rtd5 tn_rtdlast\">"+tempobj.remark+"</td></tr>";
					}
				}
				wraps.removeClass("tn_datanone").html("<table>"+rescg+reshead+tn_resdatas+"</table>");
				$("<div id=\"tn_pageshow\" class=\"easyui-pagination\" data-options=\"\"></div>").appendTo(ppwrap);
				var init_pt=parseInt(pt.value);
				var init_ps=parseInt(ps.value);
				var init_pc=parseInt(pc.value);
				$("#tn_pageshow").pagination({
					total:init_pt,
					pageSize:init_ps,
					pageNumber:init_pc,
					layout:['first','prev','next','last'],
					onSelectPage:function(pageNumber,pageSize){
						pc.value=pageNumber;
						ps.value=pageSize;
						pt.value=totalcount;
						/*参数说明：[开始时间，结束时间，交易类型]，[请求地址，结果集列结构，结果集头部，结果集容器],[分页父容器,分页参数(当前第几页，每页显示记录数)]*/
						tn_HandleReq([st.value,et.value,tt.value],["queryTrades",rescg,reshead,"tn_result"],["tn_pagewrap",pageNumber,pageSize]);
					}
				});
				/*生成导出Excel按钮*/
				$("<p class=\"tn_toexcel\" id=\"tn_toexcel\">&nbsp;&nbsp;</p>").appendTo($("#tn_excelwrap").html(""));
				document.getElementById("tn_toexcel").onclick=function(){
					var tempurl=window.location.href;
					var s_endindex=tempurl.lastIndexOf("/");
					tempurl=tempurl.slice(0,s_endindex)+"/";
					window.location.href=tempurl+"exportTrades?beginDate="+tempparam[0]+"&endDate="+tempparam[1]+temptype;
				}	
			}
		},
		error:function(){
			pc.value=1;
			ps.value=10;
			pt=0;
			wraps.html("").addClass("tn_datanone");
			ppwrap.empty();
			$("#tn_excelwrap").html("");
		}
	});
}
/*适配交易类型一值多条件情况*/
function tradeTypeAdapt(strs){
	var resstr="";
	if(strs=="PAYMENT"){
		resstr="&tradeType=PAYMENT&tradeType=PRE_PAYMENT"
	}else if(strs=="REPAYMENT"){
		resstr="&tradeType=REPAYMENT&tradeType=PRE_REPAYMENT&tradeType=LATE_REPAYMENT"
	}
	return resstr;
}
