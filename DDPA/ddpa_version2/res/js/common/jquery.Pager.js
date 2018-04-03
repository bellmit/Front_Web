//分页插件
(function($){
	$.fn.Pager = function(handler){
		
		return this.each(function(i,el){
			var $pager = $(el),  //分页导航div
				url = $pager.attr("data-url"),  //分页请求url
				$ftlbox = $($pager.attr("data-ftlbox"));  //获取数据后的容器div
				
			$pager.click(function(e){
				var data= {};
				
				var $this = $(e.target), datatype = $pager.attr("datatype"), actype = $this.attr("actiontype"), pagetype = $pager.attr("pagetype")
				isDis = $this.hasClass("disable"), index = $this.attr("data-index"), url =$pager.attr("data-url");
				var pagetype = $pager.attr("pagetype");
				data.currentPage = index, data.messageType = pagetype;
				if(datatype=="returnRecord"){
					
					data.beginDate = $pager.attr("beginDate");
					data.endDate = $pager.attr("endDate");
				}else{
					if($pager.attr("beginDate") == "" && $pager.attr("endDate")==""){
						data.months = $pager.attr("data-v");
					}else{
						if($pager.attr("beginDate") != ""){
							data.beginDate = $pager.attr("beginDate");
						}
						if($pager.attr("endDate")!=""){
							data.endDate = $pager.attr("endDate");
						}
					}
				}
				//判断是否为不可点击项
				if(isDis){ return false;}
				
				switch(actype){
					case "getPage":
						$(e.target).addClass("cur");
						$(e.target).siblings(".cur").removeClass("cur");
						getPage(url,index)
				}
				
				function getPage(url,index){
					data.pageSize=10;
					if(url=="repayingLoan" || url =="appliedLoan" || url == "repayedLoan"){
						data.pageSize=50;
					}
					$.ajax({
						url:url,
						type:"post",
						data:data,
						success:function(data){
							//判断是否为第一页或者最后一页
							if(data){
								
								var pre = parseInt(data.currentPage)-1, next = parseInt(data.currentPage)+1;
								pre = pre == 0? 1 : pre;
								next = next > data.totalPage?  data.totalPage : next;
								//console.log($pager.attr("class")+":"+pre+";"+next)
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
							//调用局外函数来处理数据
							var ftl = handler(data);
							if(ftl!= false){
								$ftlbox.html(ftl);
								if($ftlbox.find(".checkbox").size() != 0){
									$ftlbox.find(".checkbox").checkbox({});}
							}
						}
					})
				}
			});
		})	
	}	
})(jQuery)
