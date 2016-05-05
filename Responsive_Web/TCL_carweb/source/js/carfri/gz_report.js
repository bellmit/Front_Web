$(function(){
	carServer.run();
	$('#screenBack,#fancybox-close').click(function(){
		$('#screenBack,#detail').hide();
		
	})
});

var carServer = {
	run:function(){
		this._init_();
		this._bind_event_();
		this._start_();
	},
	
	_init_:function(){
	    this.contextPath = $("#contextPath").val();	
	    this._gzReportInfo();
	    this._carShop('');
	    
	},
	_bind_event_:function(){
		var me = this;
	},
	_start_:function(){
		
	},
	_carShop:function(currentShopPage){
		 var sessionUrl = this.contextPath+"/friend/isHaveFriendInfo?pk="+new Date().getTime();
		 var friendid ='';
	     $.ajax({
	    	   type: "GET",
	    	   url: sessionUrl,
	    	   async:false,
	    	   success: function(msg){
	    	   friendid = msg; 
	    	   }
	    	});
	    if(friendid!=''){
			var shopUrl = this.contextPath+"/carfri/car_shop?pk="+new Date().getTime()+"&currentPage="+currentShopPage;
		    $("#redAgaency-info").load(shopUrl,"",function(){
		    	initShopPagination($('#totalShopResults').val(),($('#currentShopPage').val()-1));
		    });
	    }else{
	    	 var url = this.contextPath+"/friend/login";
	    	 window.location.href=url;
	    }
	},
	_gzReportInfo:function(){
		 var sessionUrl = this.contextPath+"/friend/isHaveFriendInfo?pk="+new Date().getTime();
		 var friendid ='';
	     $.ajax({
	    	   type: "GET",
	    	   url: sessionUrl,
	    	   async:false,
	    	   success: function(msg){
	    	   friendid = msg; 
	    	   }
	    	});
	    if(friendid!=''){
			var data = $("#choseForm").serialize();
			if(data!=''){
			  data = data+"&pk="+new Date().getTime();
			}else if($("#tempselDate").val()!='' || $("#tempchoseYear").val()!=''){//返回列表
				data = "selYear="+$("#tempchoseYear").val()+"&selMonth="+$("#tempselDate").val()+"&pk="+new Date().getTime();
			}else{
				data = "pk="+new Date().getTime();
			}
			var url = this.contextPath+"/carfri/gz_report_chart";
			$("#gzReport_info").load(url,data,function(){
					var currentYear = new Date().getFullYear();
					var selYear = $("#selyear").val();
					for(var i=0;i<=3;i++){
						var year = (currentYear-i);
						if(selYear==year){
						   $("#choseYear").append("<option value='"+year+"' selected='selected'>"+year+"年</option>");
						}else{
						   $("#choseYear").append("<option value='"+year+"'>"+year+"年</option>");
						}
					}
					carServer._gzReport();
			});
	    }else{
	    	 var url = this.contextPath+"/friend/login";
	    	 window.location.href=url;
	     }
	},_gzReport:function(){
		    var selDate = $("#seldate").val();
		    var total = $("#total").val();
		    var year = $("#selyear").val();
		    $("#description").text(year+"-"+selDate+" 故障信息统计表(总故障数:"+total+")");
		    var data =$("#fault").val();
		    var a = [];
		    if(data.length>0){
		    	data = eval(data);
		    	$.each(data,function(index,item){
		    		a[index]=item.fcode;
		    	});
			    var placeholder = $("#placeholder");
			    placeholder.unbind();
				var options = {
				            series: {
				            	pie: { 
				            		innerRadius: 0.5,
				            		show: true,
									label: {
										show: true,
										radius:3/5,
										formatter: labelFormatter,
										background: {
											opacity: 0.5
										}﻿
									}
								}
						    },
							grid: {
								hoverable: true,
								clickable: true
							}
				         };
				 $.plot(placeholder, data, options); 
				 
				 placeholder.bind("plothover", function(event, pos, obj) {

						if (!obj) {
							return;
						}

						var percent = parseFloat(obj.series.percent).toFixed(2);
						$("#hover").html("<span style='font-weight:bold; color:" + obj.series.color + "'>" + obj.series.label + " (" + percent + "%)</span>");
					});

				 placeholder.bind("plotclick", function(event, pos, obj) {
						if (!obj) {
							return;
						}
						percent = parseFloat(obj.series.percent).toFixed(2);
						var url = $("#contextPath").val()+"/carfri/getFaultByFcode";
						var data = {fcode:a[obj.seriesIndex],selDate:selDate}//获取fcode
						$("#detailInner").load(url,data,function(){
							var clientHeight=document.documentElement.clientHeight;
							var detail_H=(clientHeight-$('#detail').outerHeight())/2;
							$("#detail").css({"top":detail_H}).show();
							$("#screenBack").css({"height":document.body.scrollHeight}).show();
							
						});
						$("#fcodeVal").val(a[obj.seriesIndex]);
	                    $("#selDateVal").val(selDate);
	                    $("#selYearVal").val(year);
	                    $("#detail").submit(); 
					});

		    }
	}
};
function labelFormatter(label, series) {
	return "<div style='font-size:10pt; text-align:center; padding:2px; color:white;'>" + Math.round(series.percent) + "%</div>";
}

function shopPageselectCallback(page_index,jq){
	$('#currentShopPage').val(page_index+1);
    var currentShopPage = page_index+1;
    carServer._carShop(currentShopPage);
    return false;
}

function initShopPagination(num_entries,current_page) {
    $("#PaginationShop").pagination(num_entries, {
        callback: shopPageselectCallback,
        items_per_page:$('#pageShopSize').val(),
        current_page:current_page
    });
 }

function yearChange(year){
	carServer._gzReportInfo();
}

function monthChange(month){
	carServer._gzReportInfo();
	
}
