/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	var resurl=window.location.href,resurl_start=resurl.lastIndexOf("/")+1,resurl_end=resurl.indexOf(".");
	var reshtml=resurl.substring(resurl_start,resurl_end);
	/*变量定义*/
	var information_handle=$("#information_handle");
	/*绑定点击事件*/
	information_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		informationMenuShow([tempx,tempy]);
	});
	/*绑定系统点击事件*/
	information_handle.mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		wininformationMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#information_delete,#information_info,#information_help").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "information_delete":
				break;
			case "information_info":
				if(reshtml=="manage_infonews"){
					window.open("operate/resource_infonewsprop.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");	
				}else if(reshtml=="manage_infonotice"){
					window.open("operate/resource_infonoticeprop.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				}else if(reshtml=="manage_infomessage"){
					window.open("operate/resource_infomessageprop.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				}else if(reshtml=="manage_infoemail"){
					window.open("operate/resource_infoemailprop.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				}
				break;
			case "information_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
		}
		$.unblockUI();
	});
	/*绑定系统菜单点击隐藏事件,同时绑定功能面板*/
	$("#wininfo_add,#wininfo_delete,#wininfo_bigicon,#wininfo_smallicon,#wininfo_flush,#wininfo_help,#wininfo_about").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "wininfo_add":
				if(reshtml=="manage_infonews"){
					
					
					
				}else if(reshtml=="manage_infonotice"){
					
				}
				break;
			case "wininfo_delete":
				break;
			case "wininfo_bigicon":
				showIcon(information_handle,"big");
				break;
			case "wininfo_smallicon":
				showIcon(information_handle,"small");
				break;
			case "wininfo_flush":
				window.location.reload();
				break;
			case "wininfo_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
			case "wininfo_about":
				window.open("operate/about.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				break;
		}
		$.unblockUI();
	});
	/*绑定二级菜单显示隐藏*/
	$("#wininfo_show").live("click",function(e){
		e.preventDefault();
		var cursubobj=$(this),cursubid=cursubobj.attr("id");
		$("#sub_"+cursubid).slideToggle(100);
		cursubobj.next("div").find("span").toggleClass("subicon");
	})
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});