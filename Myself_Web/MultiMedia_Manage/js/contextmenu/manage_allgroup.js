/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var allgroup_handle=$("#allgroup_handle");
	/*绑定点击事件*/
	allgroup_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		allgroupMenuShow([tempx,tempy]);
	});
	/*绑定系统点击事件*/
	allgroup_handle.mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		winallgroupMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#allgroup_delete,#allgroup_info,#allgroup_help").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "allgroup_delete":
				break;
			case "allgroup_info":
				window.open("operate/usergroup_property.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "allgroup_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
		}
		$.unblockUI();
	});
	/*绑定系统菜单点击隐藏事件,同时绑定功能面板*/
	$("#winallgroup_new,#winallgroup_bigicon,#winallgroup_smallicon,#winallgroup_help,#winallgroup_about").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "winallgroup_new":
				window.open("operate/user_creategroup.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "winallgroup_bigicon":
				showIcon(allgroup_handle,"big");
				break;
			case "winallgroup_smallicon":
				showIcon(allgroup_handle,"small");
				break;
			case "winallgroup_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
			case "winallgroup_about":
				window.open("operate/about.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				break;
		}
		$.unblockUI();
	});
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});