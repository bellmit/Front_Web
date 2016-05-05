/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var othergroup_handle=$("#othergroup_handle");
	/*绑定点击事件*/
	othergroup_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		othergroupMenuShow([tempx,tempy]);
	});
	/*绑定系统点击事件*/
	othergroup_handle.mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		winothergroupMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#othergroup_flush,#othergroup_delete,#othergroup_info,#othergroup_help").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "othergroup_flush":
				window.location.reload();
				break;
			case "othergroup_delete":
				break;
			case "othergroup_info":
				window.open("operate/user_property.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "othergroup_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
		}
		$.unblockUI();
	});
	/*绑定系统菜单点击隐藏事件,同时绑定功能面板*/
	$("#winothergroup_join,#winothergroup_flush,#winothergroup_help").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "winothergroup_join":
				window.open("operate/user_addotherrole.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "winothergroup_flush":
				window.location.reload();
				break;
			case "winothergroup_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
		}
		$.unblockUI();
	});
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});