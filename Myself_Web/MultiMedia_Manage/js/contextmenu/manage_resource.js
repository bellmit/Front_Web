/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	var resurl=window.location.href,resurl_start=resurl.lastIndexOf("/")+1,resurl_end=resurl.indexOf(".");
	var reshtml=resurl.substring(resurl_start,resurl_end);
	var rescururl=resurl.substring(0,resurl_start);
	/*变量定义*/
	var manageres_handle=$("#manageres_handle");
	/*绑定点击事件*/
	manageres_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		manageresMenuShow([tempx,tempy]);
	});
	/*绑定系统点击事件*/
	manageres_handle.mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		winmanageresMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#res_open,#res_share,#res_download,#res_cut,#res_copy,#res_paste,#res_delete,#res_fileurl,#res_resrate,#res_rename,#res_info").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "res_open":
				break;
			case "res_share":
				break;
			case "res_download":
				break;
			case "res_cut":
				break;
			case "res_copy":
				break;
			case "res_paste":
				break;
			case "res_delete":
				break;
			case "res_fileurl":
				window.open("operate/resource_fileurl.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "res_resrate":
				window.open("operate/resource_rate.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "res_rename":
				break;
			case "res_info":
				window.open("operate/resource_property.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
		}
		$.unblockUI();
	});
	/*绑定系统菜单点击隐藏事件,同时绑定功能面板*/
	$("#winres_mulu,#winres_file,#winres_up,#winres_mlshuzk,#winres_byname,#winres_bytime,#winres_byhand,#winres_bigicon,#winres_smallicon,#winres_detailicon,#winres_sortname,#winres_sortsize,#winres_sorttime,#winres_pre,#winres_next,#winres_goto,#winres_paste,#winres_flush,#winres_about").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "winres_mulu":
				window.open("operate/resource_newml.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=400,left=300,top=100","");
				break;
			case "winres_file":
				break;
			case "winres_up":
				break;
			case "winres_mlshuzk":
				break;
			case "winres_byname":
				if(reshtml=="manage_resourcelist"){
					window.location.href=rescururl+"manage_resource.html";
				}else if(reshtml=="manage_resource"){
					/*
					to do
					*/
				};
				break;
			case "winres_bytime":
				if(reshtml=="manage_resourcelist"){
					window.location.href=rescururl+"manage_resource.html";
				}else if(reshtml=="manage_resource"){
					/*
					to do
					*/
					
				};
				break;
			case "winres_byhand":
				if(reshtml=="manage_resourcelist"){
					window.location.href=rescururl+"manage_resource.html";
				}else if(reshtml=="manage_resource"){
					/*
					to do
					
					*/
					
				};
				break;
			case "winres_bigicon":
				if(reshtml=="manage_resourcelist"){
					window.location.href=rescururl+"manage_resource.html";
				}else if(reshtml=="manage_resource"){
					showIcon(manageres_handle,"big");
				};
				break;
			case "winres_smallicon":
				if(reshtml=="manage_resourcelist"){
					window.location.href=rescururl+"manage_resource.html";
				}else if(reshtml=="manage_resource"){
					showIcon(manageres_handle,"small");
				};
				break;
			case "winres_detailicon":
				if(reshtml=="manage_resource"){
					window.location.href=rescururl+"manage_resourcelist.html";
				};
				break;
			case "winres_sortname":
				if(reshtml=="manage_resourcelist"){
					window.location.href=rescururl+"manage_resource.html";
				}else if(reshtml=="manage_resource"){
					/*
					to do
					*/
					
				};
				break;
			case "winres_sortsize":
				if(reshtml=="manage_resourcelist"){
					window.location.href=rescururl+"manage_resource.html";
				}else if(reshtml=="manage_resource"){
					/*
					to do
					*/
					
				};
				break;
			case "winres_sorttime":
				if(reshtml=="manage_resourcelist"){
					window.location.href=rescururl+"manage_resource.html";
				}else if(reshtml=="manage_resource"){
					/*
					to do
					*/
					
				};
				break;
			case "winres_pre":
				break;
			case "winres_next":
				break;
			case "winres_goto":
				break;
			case "winres_paste":
				break;
			case "winres_flush":
				window.location.reload();
				break;
			case "winres_about":
				window.open("operate/about.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				break;
		}
		$.unblockUI();
	});
	/*绑定二级菜单显示隐藏*/
	$("#winres_new,#winres_mlshupx,#winres_show,#winres_sort,#winres_pages").live("click",function(e){
		e.preventDefault();
		var cursubobj=$(this),cursubid=cursubobj.attr("id");
		$("#sub_"+cursubid).slideToggle(100);
		cursubobj.next("div").find("span").toggleClass("subicon");
	})
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});