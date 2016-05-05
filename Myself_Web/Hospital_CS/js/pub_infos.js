// JavaScript Document
$(document).ready(function(){
						   /*党务公开、院务公开按钮操作*/
						   $("#pbhobtn li a").click(function(){
									var pbhoindex=$(this).parent().index();
									$(this).removeClass("pbhobtndef").addClass("pbhobtnsel").parent().siblings().find("a").removeClass("pbhobtnsel").addClass("pbhobtndef");//按钮样式切换
									var pbhotitle=$(this).text();
									$("#pbhomaintitle").text("").text(pbhotitle);//获取按钮标题内容并赋值给显示区标题处
									$("#pbhoshow li").eq(pbhoindex).removeClass("pbhoshowdef").addClass("pbhoshowsel").siblings().removeClass("pbhoshowsel").addClass("pbhoshowdef");//点击左侧按钮，显示隐藏右侧显示内容
									return false;
						});
						   $("#pbhoshow li").find("a").click(function(){return false;});//阻止浏览器默认行为
						   /*职责建设按钮操作*/
						   $("#incbtn li a").click(function(){
									var incindex=$(this).parent().index();
									$(this).removeClass("incbtndef").addClass("incbtnsel").parent().siblings().find("a").removeClass("incbtnsel").addClass("incbtndef");//按钮样式切换
									var inctitle=$(this).text();
									$("#incshowtitle").text("").text(inctitle);//获取按钮标题内容并赋值给显示区标题处
									$("#incshow li").eq(incindex).removeClass("incshowdef").addClass("incshowsel").siblings().removeClass("incshowsel").addClass("incshowdef");//点击左侧按钮，显示隐藏右侧显示内容
									return false;
						});
						    $("#incshow li").find("a").click(function(){return false;});//阻止浏览器默认行为
						   /*投诉反馈按钮操作*/
						   $("#crbtn li a").click(function(){
									var crindex=$(this).parent().index();
									$(this).removeClass("crbtndef").addClass("crbtnsel").parent().siblings().find("a").removeClass("crbtnsel").addClass("crbtndef");//按钮样式切换
									var crtitle=$(this).text();
									$("#crshowtitle").text("").text(crtitle);//获取按钮标题内容并赋值给显示区标题处
									$("#crshow li").eq(crindex).removeClass("crshowdef").addClass("crshowsel").siblings().removeClass("crshowsel").addClass("crshowdef");//点击左侧按钮，显示隐藏右侧显示内容
									return false;
						});
						   $("#crshow li").find("a").click(function(){return false;});//阻止浏览器默认行为
						/*回到顶部（目标显示隐藏判断）*/
						$(window).scroll(function(){
									var curtarget=$("#gototop");
									var curtop=$(this).scrollTop();	  
									curtop>100?curtarget.fadeIn(1000):curtarget.fadeOut(500);
									});
						/*回到顶部（执行按钮动作）*/
						$("#gototop").click(function(){
									$("html,body").animate({scrollTop:0},500);		 
									return false;		 
							});
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   });