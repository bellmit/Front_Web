// JavaScript Document
$(function(){
		   /*事件处理对象引用(变量)定义*/
		   var mask_lay=$("#masking_bg");//遮罩层引用
		   var form_lay=$("#masking_form");//表单层引用
		   var openbtn=$("#open_btn");//触发登录框按钮引用
		   var closebtn=$("#close_btn");//关闭按钮引用
		   /*打开登录框*/
		   openbtn.click(function(){
					/*mask_lay.fadeIn(200);
					form_lay.fadeIn(500);*/	
					mask_lay.show();
					form_lay.show();
					mask_lay.css({width:getWH()[0],height:getWH()[1]});			 			 
					return false;				 
				});
		   /*关闭登录框*/
		   closebtn.click(function(){
					/*form_lay.fadeOut(500);
					mask_lay.fadeOut(200);*/
					form_lay.hide();
					mask_lay.hide();
					mask_lay.css({width:0,height:0});	
					return false;		   
				});
		   /*调节窗口大小时触发事件*/
		   $(window).resize(function(){
					mask_lay.css({width:getWH()[0],height:getWH()[1]});		 
				});
		   
		   //other codes
	});
function getWH(){
	var wharr=new Array();
	var winWidth=0;
	var winHeight=0;
	// 获取窗口宽度
	if (window.innerWidth)
	{
		winWidth = window.innerWidth;
	}
	else if ((document.body) && (document.body.clientWidth))
	{
		winWidth = document.body.clientWidth;
	}
	// 获取窗口高度
	if (window.innerHeight)
	{
		winHeight = window.innerHeight;
	}
	else if ((document.body) && (document.body.clientHeight))
	{
		winHeight = document.body.clientHeight;
	}
	// 通过深入 Document 内部对 body 进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
	{
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
	wharr.push(winWidth);
	wharr.push(winHeight);
	return wharr;
}