//理财记录、借款记录
(function($){
	$(document).ready(function(e) {
        
		//初始化页面
		init();
		
		//init函数：初始化页面
		function init(){
			
			$("body").click(router);
			$(".tools a").click(changeFilter)
			$(".return.tools a").click(function(e){
				e.preventDefault();
				var f = $(e.target).attr("data-filter");
				
				if(f){
					if(f=="#pass"){
						$("#excel").attr("data-url","exportRepayedRecord")
					}else{
						$("#excel").attr("data-url","exportNotRepayRecord")
					}
					filter(e,f);
				}else{
					filter(e,false)
				}
			});
			
			//日期筛选
			if(isBackRecord==false){
				$("#startD").click(function(){
					WdatePicker({
						maxDate:'#F{$dp.$D(\'endD\')}',
						onpicking:function(){
							$(".filter.cur a").removeClass("cur");
						},
						onpicked:function(){
							chooseDate();
						}
					});
				});
				
				$("#endD").click(function(){
					WdatePicker({
						minDate:'#F{$dp.$D(\'startD\')}',
						onpicking:function(){ 
							$(".filter.cur a").removeClass("cur");
						},
						onpicked:function(){
							chooseDate();
						}
					});
				});
			}else{
				$("#startD").click(function(){
					WdatePicker({
						maxDate:'#F{$dp.$D(\'endD\')}',
						onpicking:function(){
							$(".filter.cur a").removeClass("cur");
						},
						onpicked:function(){
							chooseDate1();
						}
					});
				});
				
				$("#endD").click(function(){
					WdatePicker({
						minDate:'#F{$dp.$D(\'startD\')}',
						onpicking:function(){ 
							$(".filter.cur a").removeClass("cur");
						},
						onpicked:function(){
							chooseDate1();
						}
					});
				});
			}
		}
		
		//router函数：根据actiontype进行路由
		function router(e){
			var $target = $(e.target), actiontype = $target.attr("actiontype");	
			
			//根据actiontype路由
			switch(actiontype){
				case "excel":
					//导出excel表
					exportExcel($target);
					break;
				case "filter":
					//do something
					filterReturn($target)
					break;
				case "choosetype":
					//do something
					chooseRType($target)
					break;
				case "getDAL":
					getDAL($target);
					break;
				default:
					//默认处理
			}
		}
		
		//导出excel
		function exportExcel(obj){
			
			var url = obj.attr("data-url");
			if(obj.hasClass("returnRecord")){
				var data = { beginDate :$("#startD").val(), endDate:$("#endD").val() }
			}
			
			/*$.ajax({
				url:url,
				type:"post",
				data:data,
				success:function(data){
					////console.log(data);
				}
			})*/
		}
		
		function getDAL(obj){
			var loanid = obj.attr("data-id"), url = obj.attr("href"), status = obj.attr("data-status");
			$.ajax({
				url:"getProductId",
				type:"post",
				data:{loanId:loanid},
				success:function(data){
					location.href = url+data;
				}
			})
		}
		
		//汇款记录过滤
		function filterReturn(obj){
			var url = obj.attr("href"), v = obj.attr("data-value");
			var field = obj.attr("data-field")
			var dates = getField(field);
			
			$("#startD").val(dates.startD);
			$("#endD").val(dates.endD);
			
			upDateSum({"months":v},url)
			$(".pageUl").attr("data-v",v);
			$(".pageUl").attr("beginDate","")
			$(".pageUl").attr("endDate","")
			
			$.ajax({
				url:url,
				type:"post",
				data:{"months":v,rnd:Math.random()},
				success:function(data){
					if(data){
						var $pager = $(".pageUl");
						setPage($pager,data);
						var ftl = handler(data);
						if(ftl){
							var $ftlbox = $($(".pageUl").attr("data-ftlbox"));
							$ftlbox.html(ftl);
						}
					}
				}
			});
		}
		
		//回款记录选择类型
		function chooseRType(obj){
			var url = obj.attr("href");
			$(".pageUl").attr("data-url",url);
			if(url=="returnedMoneyPage"){
				$("#excel").attr("href","exportReturnedMoney");
			}else{
				$("#excel").attr("href","exportWaitReturnedMoney");
			}
			
			if($(".filter.cur").find(".cur").size()>0){
				$(".filter.cur").find(".cur").click();
				return false;
			}
			
			var type = obj.attr("data-filter");
			if(type){
				var startD = $("#startD").val(), endD = $("#endD").val();
				$(".pageUl").attr("data-url",url);
				
				if(startD=="" && endD==""){
					if(type == "#pass"){
						endD = DateFormat(new Date());
						startD = SubDays(endD,7);
						$("#startD").val(startD);
						$("#endD").val(endD);
					}else{
						startD = DateFormat(new Date());
						endD = AddDays(startD,7);
						$("#startD").val(startD);
						$("#endD").val(endD);
					}
				}else if(startD==""){
					startD = endD == "" ? new Date().toString() : SubDays(endD,7);
					$("#startD").val(startD);
				}else if(endD==""){
					endD = startD == "" ? new Date().toString() : AddDays(startD,7);
					$("#endD").val(endD);
				}
			}
			
			upDateSum({},url)
			$.ajax({
				url:url,
				type:"post",
				data:{rnd:Math.random()},
				success:function(data){
					if(data){
						var $pager = $(".pageUl");
						setPage($pager,data);
						var ftl = handler(data);
						if(ftl){
							var $ftlbox = $($(".pageUl").attr("data-ftlbox"));
							$ftlbox.html(ftl);
						}
					}
				}
			});
		}
		
		//根据筛选条件请求数据,例如点击：回款类型、未来一个月、过去一年
		function filter(e, hasFilter){
			var $target = $(e.target), url = $target.attr("href");
			var data={}; //发送请求时的数据
			data.rnd = Math.random();
			
			if(hasFilter){
				var startD = $("#startD").val(), endD = $("#endD").val();
				$(".pageUl").attr("data-url",url);
				
				if(startD=="" && endD==""){
					if(hasFilter == "#pass"){
						endD = DateFormat(new Date());
						startD = SubDays(endD,7);
						$("#startD").val(startD);
						$("#endD").val(endD);
					}else{
						startD = DateFormat(new Date());
						endD = AddDays(startD,7);
						$("#startD").val(startD);
						$("#endD").val(endD);
					}
				}else if(startD==""){
					startD = endD == "" ? new Date().toString() : SubDays(endD,7);
					$("#startD").val(startD);
				}else if(endD==""){
					endD = startD == "" ? new Date().toString() : AddDays(startD,7);
					$("#endD").val(endD);
				}
				
			}else{
				var field = $target.attr("data-field")
				hasFilter = $(".datatype a.cur").attr("data-filter");
				var dates = getField(field);
				startD = dates.startD;
				endD = dates.endD;
				$("#startD").val(startD);
				$("#endD").val(endD);
			}
			
			//pass为已收，future为待收
			data.beginDate = startD;
			data.endDate = endD;
			data.currentPage = 1;
			//console.log(data.endDate);
			$(".pageUl").attr("beginDate", startD);
			$(".pageUl").attr("endDate", endD);
			
			var href = $("#excel").attr("data-url")+"?beginDate="+startD+"&endDate="+endD
			$("#excel").attr("href",href);
			
			$.ajax({
				url:url,
				type:"post",
				data:data,
				success: function(data){
					if(data){
						var $pager = $(".pageUl");
						setPage($pager,data);
						var ftl = handler(data);
						if(ftl){
							var $ftlbox = $($(".pageUl").attr("data-ftlbox"));
							$ftlbox.html(ftl);
						}
					}
				}
			})
		}
		
		//还款记录日期筛选，点击选择日期
		function chooseDate(){
			var hasFilter = $(".datatype a.cur").attr("data-filter");
			var startD = $("#startD").val(), endD = $("#endD").val(), url = $(".datatype a.cur").attr("href");
				if(startD=="" && endD==""){
					if(hasFilter == "#pass"){
						endD = DateFormat(new Date());
						startD = SubDays(new Date(),7)
					}else{
						startD = DateFormat(new Date());
						endD = AddDays(new Date(),7);
					}
				}else if(startD==""){
					startD = endD == "" ? new Date().toString() : SubDays(endD,7);
				}else if(endD==""){
					endD = startD == "" ? new Date().toString() : AddDays(startD,7);
				}
			
			var data = {};
			data.rnd = Math.random();
			if(url != "waitReturnedMoneyPage" && url != "returnedMoneyPage"){
				data.beginDate = startD;
				data.endDate = endD;
			}
			data.beginDate = startD;
			data.endDate = endD;
			data.currentPage = 1;
			////console.log(data)
			
			$(".pageUl").attr("beginDate", startD);
			$(".pageUl").attr("endDate", endD);
			
			var href = $("#excel").attr("data-url")+"?beginDate="+startD+"&endDate="+endD
			$("#excel").attr("href",href);
			
			$.ajax({
				url:url,
				type:"post",
				data:data,
				success: function(data){
					if(data){
						var $pager = $(".pageUl");
						setPage($pager,data);
						var ftl = handler(data);
						if(ftl){
							var $ftlbox = $($(".pageUl").attr("data-ftlbox"));
							$ftlbox.html(ftl); 
						}
					}
				},
				error:function(){
					alert("请求失败！")	
				}
			})
		}
		
		//回款记录日期筛选，点击选择日期
		function chooseDate1(){
			var hasFilter = $(".datatype a.cur").attr("data-filter");
			var startD = $("#startD").val(), endD = $("#endD").val(), url = $(".datatype a.cur").attr("href");

			var data = {};	
			data.rnd = Math.random()
			if(startD=="" && endD==""){
				$(".pageUl").attr("data-v",7);
			}
			if(startD != ""){
				data.beginDate = startD;
				$(".pageUl").attr("beginDate", startD);
			}
			if(endD != ""){
				data.endDate = endD;
				$(".pageUl").attr("endDate", endD);
			}
			
			////console.log(data)
			
			$.ajax({
				url:url,
				type:"post",
				data:data,
				success: function(data){
					if(data){
						var $pager = $(".pageUl");
						setPage($pager,data);
						var ftl = handler(data);
						if(ftl){
							var $ftlbox = $($(".pageUl").attr("data-ftlbox"));
							$ftlbox.html(ftl); 
						}
					}
				},
				error:function(){
					alert("请求失败！")	
				}
			})
		}
				
		//根据不同字段返回时间段
		function getField(field){
			var dates = {};
			switch(field){
				case "fWeek":
					dates.startD = DateFormat(new Date());
					dates.endD = AddDays(dates.startD,7);
				 	break;
				case "fMonth":
					dates.startD = DateFormat(new Date());
					dates.endD = AddDays(dates.startD,30);
					break;
				case "fSixMonth":
					dates.startD = DateFormat(new Date());
					dates.endD = AddDays(dates.startD,180);
					break;
				case "fYear":
					dates.startD = DateFormat(new Date());
					dates.endD = AddDays(dates.startD,365);
					break;
				case "pWeek":
					dates.endD = DateFormat(new Date());
					dates.startD = SubDays(dates.endD,7);
					break;
				case "pMonth":
					dates.endD = DateFormat(new Date());
					dates.startD = SubDays(dates.endD,30);
					break;
				case "pSixMonth":
					dates.endD = DateFormat(new Date());
					dates.startD = SubDays(dates.endD,180);
					break;
				case "pYear":
					dates.endD = DateFormat(new Date());
					dates.startD = SubDays(dates.endD,365);
					break;
			}
			
			return dates;
		}
		
		//切换筛选条件
		function changeFilter(e){
			e.preventDefault();
			var $target = $(e.target), filter = $target.attr("data-filter");
			$target.addClass("cur").siblings("a").removeClass("cur");
			if(filter != ""){
				$(".date").val("");
				var f = $(filter).find(".cur");
				if(f.size() >= 0){
					var tf = f.attr("data-field"), dates = getField(tf);
					$("#startD").val(dates.startD);
					$("#endD").val(dates.endD);
				}
				$(filter).addClass("cur").show().siblings("span").removeClass("cur").hide();
			}
		}
		
		//调整分页控件
		function setPage($pager,data){
			////console.log("set page...")
			var pre = parseInt(data.currentPage)-1, next = parseInt(data.currentPage)+1;
			pre = pre == 0? 1 : pre;
			next = next > data.totalPage?  data.totalPage : next;
			////console.log($pager.attr("class")+":"+pre+";"+next)
			$pager.find("#firstpage").removeClass("disable").attr("data-index","1");
			$pager.find("#lastpage").removeClass("disable").attr("data-index",data.totalPage);
			$pager.find("#totalrows").text(data.totalCount)
			$pager.find("#totalpages").text(data.totalPage)
			$pager.find("#curpage").text(data.currentPage);
			$pager.find("#prepage").removeClass("disable").attr("data-index",pre)
			$pager.find("#nextpage").removeClass("disable").attr("data-index",next)
			if(data.totalPage == 1){
				$pager.find("#nextpage").addClass("disable")
				$pager.find("#lastpage").addClass("disable")
				$pager.find("#prepage").addClass("disable")
				$pager.find("#firstpage").addClass("disable")
			}
			if(data.currentPage==1  && data.totalPage != 1){
				$pager.find("#nextpage").removeClass("disable")
				$pager.find("#lastpage").removeClass("disable")
				$pager.find("#prepage").addClass("disable")
				$pager.find("#firstpage").addClass("disable")
			}
			if(data.currentPage == data.totalPage && data.totalPage != 1){
				$pager.find("#prepage").removeClass("disable")
				$pager.find("#firstpage").removeClass("disable")
				$pager.find("#nextpage").addClass("disable")
				$pager.find("#lastpage").addClass("disable")
			}
		}
		
    });
})(jQuery)