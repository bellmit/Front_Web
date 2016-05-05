/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var download_handle=$("#download_handle");
	/*绑定点击事件*/
	download_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var menuobj=$(this);
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		downloadMenuShow([tempx,tempy]);
	});
	/*绑定系统点击事件*/
	download_handle.mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var menuobj=$(this);
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		windownloadMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#download_dow,#download_info").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "download_dow":
				break;
			case "download_info":
				break;
		}
		$.unblockUI();
	});
	/*绑定系统菜单点击隐藏事件,同时绑定功能面板*/
	$("#window_bigicon,#window_smallicon,#window_pre,#window_next,#window_goto,#window_help,#window_about").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "window_bigicon":
				break;
			case "window_smallicon":
				break;
			case "window_pre":
				break;
			case "window_next":
				break;
			case "window_goto":
				break;
			case "window_help":
				break;
			case "window_about":
				break;
		}
		$.unblockUI();
	});
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});









