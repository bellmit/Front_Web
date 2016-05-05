// JavaScript Document
$(document).ready(function(){
						   /*新书排行三甲样式*/
						   $(".readbooks ul li:nth-child(1)").removeClass("readbooksdefalt").addClass("readbooksone").find("a").css("color","#ff0000");
						   $(".readbooks ul li:nth-child(2)").removeClass("readbooksdefalt").addClass("readbookstwo").find("a").css("color","#fd8300");
						   $(".readbooks ul li:nth-child(3)").removeClass("readbooksdefalt").addClass("readbooksthree").find("a").css("color","#a3c002");	
						   
							/*查询按钮切换及初始化*/
							$(function(){
								var index = 0;
								$("#searchswitch li").eq(index).addClass("searchswitchs").siblings().removeClass("searchswitchs");
								$("#searchswitch li").click(function(){
									index = $("#searchswitch li").index(this);
									$("#searchswitch li").eq(index).addClass("searchswitchs").removeClass("searchswitchd").siblings().removeClass("searchswitchs").addClass("searchswitchd");
									if(index==0){
										$("#baseselect").show();
										$("#highselect").hide();
										}
									if(index==1){
										$("#baseselect").hide();
										$("#highselect").show();
										}
								});
							});   
							
							/*基本下拉框*/
							baseSelect();
							/*高级下拉框*/
							highSelect();
							/*基本搜索*/
							baseSearchs();
							/*高级查询样式*/
							$("#hsearchtable label").hover(function(){
													   $(this).css({color:'red',cursor:'pointer'});
													   },function(){
													   $(this).css({color:'#000'});
													});
						    $("#hsearchbtn").hover(function(){
													   $(this).css({color:'red',cursor:'pointer'});
													   },function(){
													   $(this).css({color:'#000'});
													});
							/*实时监测输入情况是否为默认*/
							setInterval(searchCSS,1000);
							
							/*新书推荐提示信息*/

							$("#newbooktips1").hover(function(){
													   	$("#newbookremark1").fadeIn(300);
													   },function(){
													   	$("#newbookremark1").delay(1000).fadeOut(300);
													   });
							$("#newbooktips2").hover(function(){
													   	$("#newbookremark2").fadeIn(300);
													   },function(){
													   	$("#newbookremark2").delay(1000).fadeOut(300);
													   });
							$("#newbooktips3").hover(function(){
													   	$("#newbookremark3").fadeIn(300);
													   },function(){
													   	$("#newbookremark3").delay(1000).fadeOut(300);
													   });
							
					
						
						   
						   
						   
						   
		});

		/*检测输入内容是否为默认值 搜索框样式改变(无刷新情况)*/
		function searchCSS(){
							var bsv=$("#bsearchbook").val();
							if(bsv!="请输入相关书籍信息"){
								$("#bsearchbook").removeClass("bsearchbookdef").addClass("bsearchbooksel");
							}
							if(bsv=="请输入相关书籍信息"){
								$("#bsearchbook").removeClass("bsearchbooksel").addClass("bsearchbookdef");
							}
						}
		/*基本下拉框*/
		function baseSelect(){
							/*初始化下拉框和模拟下拉框*/
						   /*初始化--从下拉框中获取值并加入数组中*/
						   var oparr=new Array();
						   var opindex=$("#bbooktype option:last").index();
						   for(var i=1;i<=opindex+1;i++){
								var opv=$("#bbooktype option:nth-child("+i+")").text();
								oparr.push(opv);
							}
						   /*初始化--动态从数组中读取数据并创建li节点放入ul节点中*/
						   var str="";
						   for(var j=0;j<oparr.length;j++){
								jd="<li>"+oparr[j]+"</li>";
								str=str+jd;
							}							
						   $("#bbooktypeul").append(str);
						   /*显示(隐藏)模拟下拉框及其相关状态变化切换*/
							$("#bbooktypeshow").click(function(){
														$("#bbooktypeul").width(149).height((opindex+1)*16).toggle(500);
														$("#bbooktypeimgdef").toggle();
														$("#bbooktypeimgsel").toggle();
								});	   
						   /*点击模拟下拉框时，给下拉框赋值*/
						   $("#bbooktypeul li").click(function(){
														$("#bbooktypeul").toggle(300);
														$("#bbooktypeimgsel").hide();
														$("#bbooktypeimgdef").show();
														$("#bbooktypecotent").text("").text($(this).text());
														$("#bbooktype option:").eq($(this).index()).attr("selected","true").siblings().removeAttr("selected");	
							});
						   /*li伪类样式，同时兼容ie6*/
						   $("#bbooktypeul li").hover(function(){
													$(this).css({background:"#7ddefe",color:"red"});			 
												},function(){
													$(this).css({background:"#fff",color:"black"});			 
											}); 
			}
		/*高级下拉框*/
		function highSelect(){
							/*初始化下拉框和模拟下拉框*/
						   /*初始化--从下拉框中获取值并加入数组中*/
						   var oparr=new Array();
						   var opindex=$("#hbooktype option:last").index();
						   for(var i=1;i<=opindex+1;i++){
								var opv=$("#hbooktype option:nth-child("+i+")").text();
								oparr.push(opv);
							}
						   /*初始化--动态从数组中读取数据并创建li节点放入ul节点中*/
						   var str="";
						   for(var j=0;j<oparr.length;j++){
								jd="<li>"+oparr[j]+"</li>";
								str=str+jd;
							}							
						   $("#hbooktypeul").append(str);
						   /*显示(隐藏)模拟下拉框及其相关状态变化切换*/
							$("#hbooktypeshow").click(function(){
														$("#hbooktypeul").width(149).height((opindex+1)*16).toggle(500);
														$("#hbooktypeimgdef").toggle();
														$("#hbooktypeimgsel").toggle();
								});	   
						   /*点击模拟下拉框时，给下拉框赋值*/
						   $("#hbooktypeul li").click(function(){
														$("#hbooktypeul").toggle(300);
														$("#hbooktypeimgsel").hide();
														$("#hbooktypeimgdef").show();
														$("#hbooktypecotent").text("").text($(this).text());
														$("#hbooktype option").eq($(this).index()).attr("selected","true").siblings().removeAttr("selected");	
							});
						   /*li伪类样式，同时兼容ie6*/
						   $("#hbooktypeul li").hover(function(){
													$(this).css({background:"#7ddefe",color:"red"});			 
												},function(){
													$(this).css({background:"#fff",color:"black"});			 
											}); 
			}
		/*基本搜索*/
		function baseSearchs(){
							/*搜索框样式*/
							/*搜索框样式改变(刷新情况)*/
							var sbv=$("#bsearchbook").val();
							if(sbv!="请输入相关书籍信息"){
								$("#bsearchbook").removeClass("bsearchbookdef").addClass("bsearchbooksel");
							}
						   
						   $("#bsearchbook").focusin(function(){
												var svs=$("#bsearchbook").val();
												if(svs=="请输入相关书籍信息"){
														$(this).val("");
														$(this).removeClass("bsearchbookdef").addClass("bsearchbooksel");
													}
												if(svs!="请输入相关书籍信息")	
													{
														$(this).removeClass("bsearchbookdef").addClass("bsearchbooksel");
													}
									});
						   /*搜索功能*/
						  $("#bsearchbtn").click(function(){					  
														  var svs=$("#bsearchbook").val();
														  if(svs==""){
															  return false;													  
															  }
														  if(svs=="请输入相关书籍信息"){
																$("#bsearchbook").val("").focus();
																return false;
															}else{
																//ajax后台交互
																return true;
																}
														  });
						/*搜索按钮样式*/
						$("#bsearchbtn").hover(function(){
													   $(this).css({color:'red',cursor:'pointer'});
													   },function(){
													   $(this).css({color:'#000'});
													});
			}