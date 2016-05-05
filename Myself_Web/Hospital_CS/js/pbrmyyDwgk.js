// JavaScript Document
$(document).ready(function(){
						   $("#btn li").click(function(){
									var curindex=$(this).index();
									var curtitle=$(this).removeClass("btndef").addClass("btnsel").siblings().removeClass("btnsel").addClass("btndef").end().text();//按钮样式切换
									$("#maintitle").text("").text(curtitle);//获取按钮标题内容并赋值给显示区标题处
									$("#show li").eq(curindex).removeClass("showdef").addClass("showsel").siblings().removeClass("showsel").addClass("showdef");//点击左侧按钮，显示隐藏右侧显示内容
									});

						   
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   });