// JavaScript Document
$(document).ready(function(){
						   
					/*判断当前页面，并高亮显示导航*/ 
				  $(".menu ul li a").click(function(){
												var curindex=$(".menu ul li a").index(this);
												var cururl=window.location.href.toLowerCase();
												var newurl=$(this).attr("href").toLowerCase();
													if(cururl.indexOf(newurl)!=-1){
												 		$(this).blur().removeClass("menudefault").addClass("menuselect");
												 		return false;
													}	
										});			   			
						   /*初始化下拉框和模拟下拉框*/
						   /*初始化--从下拉框中获取值并加入数组中*/
						   var oparr=new Array();
						   var opindex=$("#cpttype option:last").index();
						   for(var i=1;i<=opindex+1;i++){
								var opv=$("#cpttype option:nth-child("+i+")").text();
								oparr.push(opv);
							}
						   /*初始化--动态从数组中读取数据并创建li节点放入ul节点中*/
						   var str="";
						   for(var i=0;i<oparr.length;i++){
								jd="<li>"+oparr[i]+"</li>";
								str=str+jd;
							}							
						   $("#cpttypeul").append(str);
						   /*显示(隐藏)模拟下拉框及其相关状态变化切换*/
										   $("#cpttypeshow").click(function(){
																		var ulh=$("#cpttypeul").height();
																		$("#cpttypeul").toggle(500);
																		$("#cpttypeimgdef").toggle();
																		$("#cpttypeimgsel").toggle();
								});	   
						   /*点击模拟下拉框时，给下拉框赋值*/
						   $("#cpttypeul li").click(function(){
														var curtext=$(this).text();
														var curattr=$(this).attr("value");
														var curindex=$(this).index()+1;
														var curvalue=curindex+1;
														$("#cpttypeul").toggle(300);
														$("#cpttypeimgsel").hide();
														$("#cpttypeimgdef").show();
														$("#cpttypecotent").text("").text(curtext);
														$("#cpttype option:nth-child("+curindex+")").attr("selected","true").siblings().removeAttr("selected");	
							});
						   /*li伪类样式，同时兼容ie6*/
						   $("#cpttypeul li").hover(function(){
													$(this).css({background:"#7ddefe",color:"red"});	 
												},function(){
													$(this).css({background:"#fff",color:"black"});			 
											});
				   
				   
				   	/*搜索框样式改变(刷新情况)*/
				   	var sv=$("#search").val();
				   	if(sv!="请输入搜索内容"){
						$("#search").removeClass("search").addClass("searchselect");
					}
				   setInterval(searchcss,1000);
				   $("#search").focusin(function(){
										var svs=$("#search").val();
				   						if(svs=="请输入搜索内容"){
					   						$(this).val("");
											$(this).removeClass("search").addClass("searchselect");
					   						}
										if(svs!="请输入搜索内容")	
										{
												$(this).removeClass("search").addClass("searchselect");
										}
							});
				   
				   /*搜索功能*/
				   $("#searchbtn").click(function(){					  
												  var svs=$("#search").val();
												  if(svs==""){
													  return false;													  
													  }
												  if(svs=="请输入搜索内容"){
													  	$("#search").val("");
														return false;
													}else{
														//ajax后台交互
														return true;
														}
												  });
				   
				   /*文章查看页面回到顶部按钮动画功能*/
				   /*判断出现滚动条情况*/
				   $(window).scroll(
									function(){
										var divshow=$("#nnsgototop");
										var tops=$(this).scrollTop();
										tops>200?divshow.fadeIn(1000):divshow.fadeOut(500);
										});
				   /*点击回到顶部按钮响应*/
				   $("#nnsgototop").click(
										  function(){
												   $("html,body").animate({scrollTop:0},500);
												   });
				 
				   /*药品详细查看页面表格换色*/
				   $("#drugstable tr:even").css("background","#bbe7fe");
				   
				   /*投诉选择按钮事件*/
				   $("#cptdnbtn").click(function(){
												  var getv = window.showModalDialog('companySelector.html', null, 'dialogWidth:600px;dialogHeight:400px;help:no;unadorned:no;resizable:yes;status:no');
									});

				   $("#cptsbtn").click(function(){
												  var getv = window.showModalDialog('drugSelector.html', null, 'dialogWidth:600px;dialogHeight:400px;help:no;unadorned:no;resizable:yes;status:no');
											});
				   
				   /*模拟投诉下拉菜单*/
				   $("#cpttypebtn").click(function(){
												   $("#cpttsel").show();
												   $("#cptticonc").hide();
												   $("#cptticonh").show();
												   $("#cpttype").val("");
												   $("#cpttsel li").click(function(){
																$("#cpttype").val("");
																$("#cpttype").val($(this).text());
																$("#cpttsel").hide();
																$("#cptticonh").hide();
																$("#cptticonc").show();
																				   });
												   });
				   $("#cptticonc").click(function(){
												   $("#cpttsel").show();
												   $("#cptticonc").hide();
												   $("#cptticonh").show();
												   $("#cpttype").val("");
												   $("#cpttsel li").click(function(){
																$("#cpttype").val("");
																$("#cpttype").val($(this).text());
																$("#cpttsel").hide();
																$("#cptticonh").hide();
																$("#cptticonc").show();
																				   });
												   });
				   
				   
				   /*医疗机构表格样式*/
				   //最后一行去掉下边框
				   $(".dseltbody tr:last").find("td").css("border-bottom","none");
				   //最后一列去掉右边框
				   $(".dseltbody tr").find("td:last").css("border-right","none");
				   //隔行换色
				   $(".dseltbody tr:odd").css("background","#eee");
				   //鼠标经过高亮
				   $(".dseltbody tr").hover(function(){
												$(this).addClass("dseltbodyjq");
												},
												function(){
												$(this).removeClass("dseltbodyjq");
						   });
				   //鼠标经过高亮加隔行换色叠加
				   $(".dseltbody tr:odd").hover(function(){
												$(this).css("background","#bbe7fe");
												},
												function(){
												$(this).css("background","#eee");
						   });
				   /*（医疗机构查询）基本查询与高级查询切换*/
				   $("#dselhigh").click(function(){
												$(".dselsearchh").slideDown(500);
												$(".dselsearchb").slideUp(500);
											   });
				   $("#dselbase").click(function(){
												$(".dselsearchh").slideUp(500);
												$(".dselsearchb").slideDown(500);
											   });
				   
				   
				   /*药品缺陷批号表格样式*/
				   //最后一行去掉下边框
				   $(".ddfntbody tr:last").find("td").css("border-bottom","none");
				    //最后一列去掉右边框
				   $(".ddfntbody tr").find("td:last").css("border-right","none");
				   //隔行换色
				   $(".ddfntbody tr:odd").css("background","#eee");
				   //鼠标经过高亮
				   $(".ddfntbody tr").hover(function(){
												$(this).addClass("ddfntbodyjq");
												},
												function(){
												$(this).removeClass("ddfntbodyjq");
						   });
				   //鼠标经过高亮加隔行换色叠加
				   $(".ddfntbody tr:odd").hover(function(){
												$(this).css("background","#bbe7fe");
												},
												function(){
												$(this).css("background","#eee");
						   });
				   /*（药品缺陷批号）基本查询与高级查询切换*/
				   $("#ddfnhigh").click(function(){
												$(".ddfnsearchh").slideDown(500);
												$(".ddfnsearchb").slideUp(500);
											   });
				   $("#ddfnbase").click(function(){
												$(".ddfnsearchh").slideUp(500);
												$(".ddfnsearchb").slideDown(500);
											   });
				   
				   /*药品不良反应表格样式*/
				   //最后一行去掉下边框
				   $(".dbrtbody tr:last").find("td").css("border-bottom","none");
				    //最后一列去掉右边框
				   $(".dbrtbody tr").find("td:last").css("border-right","none");
				   //隔行换色
				   $(".dbrtbody tr:odd").css("background","#eee");
				   //鼠标经过高亮
				   $(".dbrtbody tr").hover(function(){
												$(this).addClass("dbrtbodyjq");
												},
												function(){
												$(this).removeClass("dbrtbodyjq");
						   });
				   //鼠标经过高亮加隔行换色叠加
				   $(".dbrtbody tr:odd").hover(function(){
												$(this).css("background","#bbe7fe");
												},
												function(){
												$(this).css("background","#eee");
						   });
				   /*（药品不良反应）基本查询与高级查询切换*/
				   $("#dbrhigh").click(function(){
												$(".dbrsearchh").slideDown(500);
												$(".dbrsearchb").slideUp(500);
											   });
				   $("#dbrbase").click(function(){
												$(".dbrsearchh").slideUp(500);
												$(".dbrsearchb").slideDown(500);
											   });
				   
				   
				   /*药品抽送检表格样式*/
				   //最后一行去掉下边框
				   $(".dstbody tr:last").find("td").css("border-bottom","none");
				    //最后一列去掉右边框
				   $(".dstbody tr").find("td:last").css("border-right","none");
				   //隔行换色
				   $(".dstbody tr:odd").css("background","#eee");
				   //鼠标经过高亮
				   $(".dstbody tr").hover(function(){
												$(this).addClass("dstbodyjq");
												},
												function(){
												$(this).removeClass("dstbodyjq");
						   });
				   //鼠标经过高亮加隔行换色叠加
				   $(".dstbody tr:odd").hover(function(){
												$(this).css("background","#bbe7fe");
												},
												function(){
												$(this).css("background","#eee");
						   });
				   /*（药品抽送检反应）基本查询与高级查询切换*/
				   $("#dshigh").click(function(){
												$(".dssearchh").slideDown(500);
												$(".dssearchb").slideUp(500);
											   });
				   $("#dsbase").click(function(){
												$(".dssearchh").slideUp(500);
												$(".dssearchb").slideDown(500);
											   });
				   
				   
				   
				   /*药品事故查询表格样式*/
				   //最后一行去掉下边框
				   $(".dacctbody tr:last").find("td").css("border-bottom","none");
				    //最后一列去掉右边框
				   $(".dacctbody tr").find("td:last").css("border-right","none");
				   //隔行换色
				   $(".dacctbody tr:odd").css("background","#eee");
				   //鼠标经过高亮
				   $(".dacctbody tr").hover(function(){
												$(this).addClass("dacctbodyjq");
												},
												function(){
												$(this).removeClass("dacctbodyjq");
						   });
				   //鼠标经过高亮加隔行换色叠加
				   $(".dacctbody tr:odd").hover(function(){
												$(this).css("background","#bbe7fe");
												},
												function(){
												$(this).css("background","#eee");
						   });
				   /*（药品事故查询）基本查询与高级查询切换*/
				   $("#dacchigh").click(function(){
												$(".daccsearchh").slideDown(500);
												$(".daccsearchb").slideUp(500);
											   });
				   $("#daccbase").click(function(){
												$(".daccsearchh").slideUp(500);
												$(".daccsearchb").slideDown(500);
											   });
				   
				   
				   
				    /*drug选择子页面表格样式*/
				   //最后一行去掉下边框
				   $(".dselecttbody tr:last").find("td").css("border-bottom","none");
				    //最后一列去掉右边框
				   $(".dselecttbody tr").find("td:last").css("border-right","none");
				   //隔行换色
				   $(".dselecttbody tr:odd").css("background","#eee");
				   //鼠标经过高亮
				   $(".dselecttbody tr").hover(function(){
												$(this).addClass("dselecttbodyjq");
												},
												function(){
												$(this).removeClass("dselecttbodyjq");
						   });
				   //鼠标经过高亮加隔行换色叠加
				   $(".dselecttbody tr:odd").hover(function(){
												$(this).css("background","#bbe7fe");
												},
												function(){
												$(this).css("background","#eee");
						   });
				   
				   
				    /*company选择子页面表格样式*/
				   //最后一行去掉下边框
				   $(".cselecttbody tr:last").find("td").css("border-bottom","none");
				    //最后一列去掉右边框
				   $(".cselecttbody tr").find("td:last").css("border-right","none");
				   //隔行换色
				   $(".cselecttbody tr:odd").css("background","#eee");
				   //鼠标经过高亮
				   $(".cselecttbody tr").hover(function(){
												$(this).addClass("cselecttbodyjq");
												},
												function(){
												$(this).removeClass("cselecttbodyjq");
						   });
				   //鼠标经过高亮加隔行换色叠加
				   $(".cselecttbody tr:odd").hover(function(){
												$(this).css("background","#bbe7fe");
												},
												function(){
												$(this).css("background","#eee");
						   });

				   
	   
   
		});

/*检测输入内容是否为默认值 搜索框样式改变(无刷新情况)*/
function searchcss(){
					var sv=$("#search").val();
				   	if(sv!="请输入搜索内容"){
						$("#search").removeClass("search").addClass("searchselect");
					}
					if(sv=="请输入搜索内容"){
						$("#search").removeClass("searchselect").addClass("search");
					}
				}
				
/*药品查看页面企业相关信息tab切换*/
$(function(){
							var index = 0;  
							$(".drugsbox li").click(function(){
								index = $(".drugsbox li").index(this);
								$(".drugscor_show table").eq(index).show().siblings().hide();
							});
						});

