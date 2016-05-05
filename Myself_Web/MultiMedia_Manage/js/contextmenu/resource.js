/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var file_handle=$("#file_handle");
	/*绑定点击事件*/
	file_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		manageresMenuShow([tempx,tempy]);
	});
	/*绑定系统点击事件*/
	file_handle.mousedown(function(e){
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
				break;
			case "res_resrate":
				break;
			case "res_rename":
				break;
			case "res_info":
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
				break;
			case "winres_file":
				break;
			case "winres_up":
				break;
			case "winres_mlshuzk":
				break;
			case "winres_byname":
				break;
			case "winres_bytime":
				break;
			case "winres_byhand":
				break;
			case "winres_bigicon":
				break;
			case "winres_smallicon":
				break;
			case "winres_detailicon":
				break;
			case "winres_sortname":
				break;
			case "winres_sortsize":
				break;
			case "winres_sorttime":
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