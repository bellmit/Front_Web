// JavaScript Document
$(document).ready(function(){
						   
						   /*党务公开按钮操作*/
						   $("#pbbtn li").click(function(){
									var pbindex=$(this).index();
									var pbtitle=$(this).removeClass("pbbtndef").addClass("pbbtnsel").siblings().removeClass("pbbtnsel").addClass("pbbtndef").end().text();//按钮样式切换
									$("#pbmaintitle").text("").text(pbtitle);//获取按钮标题内容并赋值给显示区标题处
									$("#pbshow li").eq(pbindex).removeClass("pbshowdef").addClass("pbshowsel").siblings().removeClass("pbshowsel").addClass("pbshowdef");//点击左侧按钮，显示隐藏右侧显示内容
						});
						   /*院务公开按钮操作*/
						   $("#hosbtn li").click(function(){
									var hosindex=$(this).index();
									var hostitle=$(this).removeClass("hosbtndef").addClass("hosbtnsel").siblings().removeClass("hosbtnsel").addClass("hosbtndef").end().text();//按钮样式切换
									$("#hosmaintitle").text("").text(hostitle);//获取按钮标题内容并赋值给显示区标题处
									$("#hosshow li").eq(hosindex).removeClass("hosshowdef").addClass("hosshowsel").siblings().removeClass("hosshowsel").addClass("hosshowdef");//点击左侧按钮，显示隐藏右侧显示内容
						});
						   /*职责建设按钮操作*/
						   $("#incbtn li").click(function(){
									var incindex=$(this).index();
									var inctitle=$(this).removeClass("incbtndef").addClass("incbtnsel").siblings().removeClass("incbtnsel").addClass("incbtndef").end().text();//按钮样式切换
									$("#incshowtitle").text("").text(inctitle);//获取按钮标题内容并赋值给显示区标题处
									$("#incshow li").eq(incindex).removeClass("incshowdef").addClass("incshowsel").siblings().removeClass("incshowsel").addClass("incshowdef");//点击左侧按钮，显示隐藏右侧显示内容
						});
						/*回到顶部（目标显示隐藏判断）*/
						$(window).scroll(function(){
											var curtarget=$("#gototop");
											var curtop=$(this).scrollTop();	  
											curtop>200?curtarget.fadeIn(1000):curtarget.fadeOut(500);
									});
						/*回到顶部（执行按钮动作）*/
						$("#gototop").click(function(){
											$("html,body").animate({scrollTop:0},500);		 
											return false;		 
							});
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   });