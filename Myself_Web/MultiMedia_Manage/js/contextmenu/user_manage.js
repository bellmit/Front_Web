/* JavaScript Document*/
/*禁用右键菜单*/
document.oncontextmenu=function(){return false;}
$(function(){
	/*变量定义*/
	var manage_handle=$("#manage_handle");
	/*绑定点击事件*/
	manage_handle.find("a").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(e.button!=2)return false;
		var menuobj=$(this);
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		manageMenuShow([tempx,tempy]);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#user_addgroup,#user_deletegroup,#user_groupinfo,#user_joingroup,#user_show,#user_sorticon,#user_pages,#user_paste,#user_flush,#user_about").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id");
		switch(submenuid){
			case "user_addgroup":
				window.open("operate/user_addgroup.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=500,left=300,top=100","");
				break;
			case "user_deletegroup":
				break;
			case "user_groupinfo":
				break;
			case "user_joingroup":
				break;
			case "user_show":
				break;
			case "user_sorticon":
				break;
			case "user_pages":
				break;
			case "user_paste":
				break;
			case "user_flush":
				window.location.reload();
				break;
			case "user_about":
				window.open("operate/about.html","_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=600, height=250,left=300,top=100","");
				break;
		}
		$.unblockUI();
	});
	/*绑定二级菜单显示隐藏*/
	$("#user_managegroup").live("click",function(){
		$("#sub_managegroup").slideToggle(100);
		$(this).next("div").find("span").toggleClass("subicon");
	})
	/*隐藏右键菜单*/
	$("div.blockUI").live("click",function(e){if(e.target.nodeName.toLowerCase()!="a"){$.unblockUI();}});
});









