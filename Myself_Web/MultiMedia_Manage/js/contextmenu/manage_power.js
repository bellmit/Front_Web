/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var power_handle=$("#power_handle");
	/*绑定点击事件*/
	power_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		powerMenuShow([tempx,tempy]);
	});
	/*绑定系统点击事件*/
	power_handle.mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		winpowerMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#power_delete,#power_info,#power_help").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "power_delete":
				break;
			case "power_info":
				window.open("operate/resource_powerprop.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "power_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
		}
		$.unblockUI();
	});
	/*绑定系统菜单点击隐藏事件,同时绑定功能面板*/
	$("#winpower_add,#winpower_bigicon,#winpower_smallicon,#winpower_help,#winpower_about").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "winpower_add":
				window.open("operate/resource_poweradd.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "winpower_bigicon":
				showIcon(power_handle,"big");
				break;
			case "winpower_smallicon":
				showIcon(power_handle,"small");
				break;
			case "winpower_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
			case "winpower_about":
				window.open("operate/about.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				break;
		}
		$.unblockUI();
	});
	/*绑定二级菜单显示隐藏*/
	$("#winpower_show").live("click",function(e){
		e.preventDefault();
		var cursubobj=$(this),cursubid=cursubobj.attr("id");
		$("#sub_"+cursubid).slideToggle(100);
		cursubobj.next("div").find("span").toggleClass("subicon");
	})
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});