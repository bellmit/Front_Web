/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var log_handle=$("#log_handle");
	/*表格列表样式*/
	log_handle.find("tr:even").css({"background":"#eaf4f8"}).end().find("tr").hover(function(){
		$(this).css({"background":"#f3f3f3"});
	},function(){
		var m_outobj=$(this),m_outindex=m_outobj.index();
		m_outindex%2==0?m_outobj.css({"background":"#eaf4f8"}):m_outobj.css({"background":"#fff"});
	});
	/*绑定点击事件*/
	log_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		logMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#log_flush,#log_current,#log_all,#log_pre,#log_next,#log_delete,#log_find,#log_help").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "log_flush":
				window.location.reload();
				break;
			case "log_current":
				break;
			case "log_all":
				break;
			case "log_pre":
				break;
			case "log_next":
				break;
			case "log_delete":
				break;
			case "log_find":
				break;
			case "log_help":
				break;
		}
		$.unblockUI();
	});
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});