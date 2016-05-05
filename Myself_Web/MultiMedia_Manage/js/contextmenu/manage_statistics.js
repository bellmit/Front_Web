/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var statistics_handle=$("#statistics_handle");
	/*绑定点击事件*/
	statistics_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		statisticsMenuShow([tempx,tempy]);
	});
	/*绑定系统点击事件*/
	statistics_handle.mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		winstatisticsMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#statistics_statistics,#statistics_info,#statistics_help").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "statistics_statistics":
				window.location.reload();
				break;
			case "statistics_info":
				break;
			case "statistics_help":
				break;
		}
		$.unblockUI();
	});
	/*绑定系统菜单点击隐藏事件,同时绑定功能面板*/
	$("#wintj_bigicon,#wintj_smallicon,#wintj_flush,#wintj_help,#wintj_about").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "wintj_bigicon":
				break;
			case "wintj_smallicon":
				break;
			case "wintj_flush":
				window.location.reload();
				break;
			case "wintj_help":
				break;
			case "wintj_about":
				break;
		}
		$.unblockUI();
	});
	/*绑定二级菜单显示隐藏*/
	$("#wintj_show").live("click",function(e){
		e.preventDefault();
		var cursubobj=$(this),cursubid=cursubobj.attr("id");
		$("#sub_"+cursubid).slideToggle(100);
		cursubobj.next("div").find("span").toggleClass("subicon");
	})
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});