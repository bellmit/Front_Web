// JavaScript Document
$(document).ready(
				   function(){
					   	$("#news tr:even").css("background-color","#E4E4E4");/*表格换色*/	
						$(".resourcedowncontent table tr:even").css("background-color","#E4E4E4");
					   }					
				   );
/*运行浮动QQ*/
function runqq(){
	createqqpane();/*悬挂QQ*//*创建QQ面板*/
		moveqqpanes();/*移动QQ面板 兼容性*/
		/*$("#hiddenqqicon").click(function(){showqq();});显示聊天面板*/
		$("#showqqicon").click(function(){hiddenqq();});/*隐藏聊天面板*/
		$("#hiddenqqpane").mouseover(function(){showqq();});/*显示聊天面板*/
	}
/*创建QQ面板*/
function createqqpane(){
	var qq="<div id='qqpane' class='qqpane'>";
		qq+="<div id='hiddenqqpane' class='hiddenqqpane'></div>";
		qq+="<div id='showqqpane' class='showqqpane'><div id='showqqicon' title='点击隐藏聊天面板' class='showqqicon'></div>";
		qq+="<a id='disonline' class='disonline' title='给老师留言' target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=156275104&site=qq&menu=yes'></a>";
		qq+="<a id='online' class='online' title='与老师交谈' target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=423607035&site=qq&menu=yes'></a>";
		qq+="</div>";
	    qq+="</div>";
		document.body.innerHTML+= qq;
	}
/*移动qq面板*//*无兼容性*/
    function moveqqpane(){
	 var s;
						var d;
						window.onscroll = function () {
						s = document.documentElement.scrollTop;
							var t = window.setInterval(function () {
								d = document.getElementById("qqpane").style.top;
								d = d.toString().substr(0, d.toString().indexOf('p'));
								if ((d - 200) != s) 
								{
									if ((d - 200) > s) 
									{
										d -= 1;
										document.getElementById("qqpane").style.top = d + "px"; 
									}else { 
									d -= (-1);
									document.getElementById("qqpane").style.top = d + "px"; 
									}
								}else{
									window.clearInterval(t);
								}
							}, 1);
						}
	}
/*移动qq面板*/
function moveqqpanes(){
	var _windowScrollTop=0;    //滚动条距离顶端距离   
    //var _windowWidth=jQuery(window).width(); //窗口宽度   
    jQuery(window).scroll(actionEvent).resize(actionEvent);  //监听滚动条事件和窗口缩放事件   
    //响应事件      
    function actionEvent(){  
        _windowScrollTop = jQuery(window).scrollTop();  //获取当前滚动条高度   
        //_windowWidth=jQuery(window).width();//获取当前窗口宽度   
        moveQQonline();//移动面板   
    }  
    //移动面板   
    function moveQQonline(){  
    //.stop()首先将上一次的未完事件停止，否则IE下会出现慢速僵死状态，然后重新设置面板的位置。            
    $("#qqpane").stop().animate({  
            //left: _windowWidth-156, 
	top: _windowScrollTop+200}, "normal");  
    }
}
/*显示qq面板*/
function showqq(){
	var parentpane=$("#qqpane");
	var sonshow=$("#showqqpane");
	var parenthidden=$("#hiddenqqpane");
	sonshow.slideToggle(1000);
	parenthidden.slideToggle(100);
	}
/*隐藏qq面板*/
function hiddenqq(){
	var parentpane=$("#qqpane");
	var sonhidden=$("#showqqpane");
	var parenthidden=$("#hiddenqqpane");
	sonhidden.slideToggle(500);
	parenthidden.slideToggle(1000);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	