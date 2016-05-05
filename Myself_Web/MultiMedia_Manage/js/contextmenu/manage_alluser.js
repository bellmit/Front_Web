/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var alluser_handle=$("#alluser_handle");
	/*绑定点击事件*/
	alluser_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		alluserMenuShow([tempx,tempy]);
	});
	/*绑定系统右键菜单*/
	alluser_handle.mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		winalluserMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#alluser_pwd,#alluser_upload,#alluser_remove,#alluser_flush,#alluser_info,#alluser_help").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "alluser_pwd":
				window.open("operate/user_pwd.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "alluser_upload":
				window.open("operate/user_setspace.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "alluser_remove":
				break;
			case "alluser_flush":
				window.location.reload();
				break;
			case "alluser_info":
				window.open("operate/user_property.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "alluser_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
		}
		$.unblockUI();
	});
	/*绑定系统右键菜单点击隐藏事件,同时绑定功能面板*/
	$("#winalluser_bigicon,#winalluser_smallicon,#winalluser_flush,#winalluser_help,#winalluser_about").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "winalluser_bigicon":
				showIcon(alluser_handle,"big");
				break;
			case "winalluser_smallicon":
				showIcon(alluser_handle,"small");
				break;
			case "winalluser_flush":
				window.location.reload();
				break;
			case "winalluser_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
			case "winalluser_about":
				window.open("operate/about.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				break;
		}
		$.unblockUI();
	});
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});