(function($) {
	
 function chartChange(type){
	 this.contextPath = $("#contextPath").val();
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
	 var classname='btnhover';
	 var objcon=".report-group";
     var url = this.contextPath +"/carfri/drive_child?type="+type+"&pk="+new Date().getTime();
     if(friendid!=''){
	     $("#p_hy").load(url,"",function(){
	    	$(objcon).eq(eval(type-1)).show().siblings().hide();
	    	$(".reportNav li").eq(eval(type-1)).addClass(classname).siblings().removeClass(classname);
	    	var tempData = eval($("#listDrive").val());
	    	var data =[];
	    	var ticks =[];
	    	var itemType=$(".reportNav li").eq(eval(type-1)).attr("data");
	    	$.each(tempData,function(index,item){
	    		data.push([index,item[itemType]]);
	    		ticks.push([index,item.month]);
	    	});
	    	$("#placeholder"+type).unbind();
	    	/**
	    	 * 设置label标签 color值 y轴显示 单位数
	    	 */
	    	var label="";
	    	var color="";
	    	var axisLabel="";
	    	var unit="";
	    	if(type=="1"){
	    		unit ="L/公里";
	    		label ="平均油耗统计图("+unit+")";
	    		color ="#5482FF";
	    		axisLabel="平均油耗";
	    	}else if(type=="2"){
	    		unit ="次";
	    		label ="急刹车次数统计图("+unit+")";
	    		color ="#00CCFF";
	    		axisLabel="急刹车次数";
	    	}else if(type=="3"){
	    		unit ="小时";
	    		label ="行驶时间统计图("+unit+")";
	    		color ="#FF00CC";
	    		axisLabel="行驶时间";
	    	}else if(type=="4"){
	    		unit ="km";
	    		label ="行驶里程数统计图("+unit+")";
	    		color ="#FF6600";
	    		axisLabel="行驶里程数";
	    	}else if(type=="5"){
	    		unit ="分";
	    		label ="环保得分统计图("+unit+")";
	    		color ="#66AA55";
	    		axisLabel="环保得分";
	    	}
	    	var dataset = [{ label: label, data: data, color:color}]; //设置结果集
	    	var options ={
	    			 series: { 
	                     bars: { 
	                         show: true
	                     } 
	                 },
	                 bars: { 
	                     align: "center", 
	                     barWidth: 0.5 
	                 }, 
	    			xaxis: {
	    				axisLabel: "月份", 
	                    axisLabelUseCanvas: false, 
	                    axisLabelFontSizePixels: 16, 
	                    axisLabelFontFamily: '微软雅黑,Microsoft Yahei', 
	                    axisLabelPadding: 10, 
	                    max:5.5,
	                    ticks: ticks
	    			}, 
	    			yaxis: { 
	                    axisLabel: axisLabel, 
	                    axisLabelUseCanvas: false, 
	                    axisLabelFontSizePixels: 16, 
	                    axisLabelFontFamily:'微软雅黑,Microsoft Yahei', 
	                    axisLabelPadding:3
	                }, 
	                legend: { 
	                    noColumns: 0, 
	                    labelBoxBorderColor: "#000000", 
	                    position: "nw"
	                }, 
	                grid: { 
	                    hoverable: true, 
	                    borderWidth: 2, 
	                    backgroundColor: { colors: ["#ffffff", "#EDF5FF"] } 
	                } 
	    			
	    		};
	    	$(".reportNav li").click(function(){
	    		
	    		var index=$(this).index();
	    	    $(this).addClass(classname).siblings().removeClass(classname);
	    		$(objcon).eq(index).show().siblings().hide();
	    		chartChange($(this).attr("type"));
	    	});
	    	
	    	$.plot("#placeholder"+type,  dataset , options);
	    	//绑定plothover 事件
	    	$("#placeholder"+type).bind("plothover", function (event, pos, item) { 
	    		 var previousPoint = null, previousLabel = null; 
	            if (item) { 
	                if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) { 
	                    previousPoint = item.dataIndex; 
	                    previousLabel = item.series.label; 
	                    $("#tooltip").remove(); 
	
	                    var x = item.datapoint[0]; 
	                    var y = item.datapoint[1]; 
	
	                    var color = item.series.color; 
	
	                    //console.log(item.series.xaxis.ticks[x].label);                 
	                    showTooltip(item.pageX, 
	                    item.pageY, 
	                    color, 
	                    "<strong>" + item.series.label + "</strong><br>" + item.series.xaxis.ticks[x].label + " : <strong>" + y + "</strong> "+unit); 
	                } 
	            } else { 
	                $("#tooltip").remove(); 
	                previousPoint = null; 
	            } 
	        });
	    	
	     });
     }else{
    	 var url = this.contextPath+"/friend/login";
    	 window.location.href=url;
     }
		 
 }
 chartChange(1); 

})(jQuery);
function showTooltip(x, y, color, contents) { 
    $('<div id="tooltip">' + contents + '</div>').css({ 
        position: 'absolute', 
        display: 'none', 
        top: y - 40, 
        left: x - 120, 
        border: '2px solid ' + color, 
        padding: '3px', 
        'font-size': '9px', 
        'border-radius': '5px', 
        'background-color': '#fff', 
        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif', 
        opacity: 0.9 
    }).appendTo("body").show(); 
} 
