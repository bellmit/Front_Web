/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var authority_handle=$("#authority_handle");
	/*绑定点击事件*/
	authority_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		authorityMenuShow([tempx,tempy]);
	});
	/*绑定系统点击事件*/
	authority_handle.mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		winauthorityMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#res_authority,#res_delete").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "res_authority":
				window.open("operate/resource_authority.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "res_delete":
				break;
		}
		$.unblockUI();
	});
	/*绑定系统菜单点击隐藏事件,同时绑定功能面板*/
	$("#winres_user,#winres_group,#winres_userqx,#winres_groupqx,#winres_bigicon,#winres_smallicon,#winres_flush,#winres_help,#winres_about").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "winres_user":
				window.open("operate/user_addgroup.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=500,left=300,top=100","");
				break;
			case "winres_group":
				window.open("operate/user_addgroup.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=500,left=300,top=100","");
				break;
			case "winres_userqx":
				window.open("operate/resource_authority.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "winres_groupqx":
				window.open("operate/resource_authority.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "winres_bigicon":
				showIcon(authority_handle,"big");
				break;
			case "winres_smallicon":
				showIcon(authority_handle,"small");
				break;
			case "winres_flush":
				window.location.reload();
				break;
			case "winres_help":
				window.open("http://221.176.116.98:8882/Help/Help.htm","_blank");
				break;
			case "winres_about":
				window.open("operate/about.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				break;
		}
		$.unblockUI();
	});
	/*绑定二级菜单显示隐藏*/
	$("#winres_add,#winres_qx,#winres_show").live("click",function(e){
		e.preventDefault();
		var cursubobj=$(this),cursubid=cursubobj.attr("id");
		$("#sub_"+cursubid).slideToggle(100);
		cursubobj.next("div").find("span").toggleClass("subicon");
	})
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});