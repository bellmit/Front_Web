// JavaScript Document
$(document).ready(function(){
			/*基本下拉框*/
			baseSelect();
			/*基本搜索*/
			var snewsarr=new Array("bsearchbook","bsearchbtn");
			var sbookresarr=new Array("ressearchbook","ressearchbtn");	
			baseSearchs(snewsarr[0],snewsarr[1]);
			baseSearchs(sbookresarr[0],sbookresarr[1]);
			/*实时监测输入情况是否为默认*/
			setInterval(function(){searchCSS(snewsarr[0]);},1000);
			setInterval(function(){searchCSS(sbookresarr[0]);},1000);
			/*图片轮播切换*/
			var maxindex=$("#newsimgbtn li:last").index();
			var getindex=0;
			/*默认执行播放动画*/
			silderPlay(getindex);
			/*自动轮播*/
			var indexid=setInterval(function(){
							 silderPlay(getindex);
							 getindex++;
							 if(getindex>maxindex)
								 {
									getindex=0;
								 }
							 },8000);
			/*轮播鼠标行为*/
			hoversilderPlay(indexid);
			/*图书资源左侧导航*/
			$("#booksreslist li h4").click(function(){
							var cin=$(this).parent().index();//找到h4节点的父节点索引
							var cul=$(this).parent().find("ul");//找到ul节点，进行隐藏和显示操作
							
							/*if(cin==1){
								$(this).toggleClass("resparenthicon");
								cul.toggleClass("ressonhide");
							}
							if(cin>1){
								$(this).addClass("resparentsicon").toggleClass("resparenthicon");
								var parentindex=cul.addClass("ressonshow").toggleClass("ressonhide");
							}*/
							
							$(this).addClass("resparentsicon").toggleClass("resparenthicon");
							cul.addClass("ressonshow").toggleClass("ressonhide");

							//$(this).next("ul").slideToggle(500).siblings("ul").sildeUp(200);		
			});
			
			/*提交*/
			/*$(".ressonshow li button").click(function(){
							var names=$(this).attr("name");
							$("#reslistaction").submit();
			});*/
			
			/*图书资源表格样式*/
			$("#brtbody tr:even").css({"background":"#fffac3"});/*隔行换色*/
			$("#brtbody tr:last").find("td").css({"border-bottom":"none"});/*最后一行去掉下边框*/
			$("#brtbody tr").find("td:last").css({"border-right":"none"}).parent().hover(function(){/*最后一列去掉右边框*/
										$(this).css({"background":"#eaffb8","cursor":"pointer"});/*伪类效果*/			
									},function(){
										$(this).css({"background":"white"});/*伪类效果*/											
									}).parent().find("tr:even").hover(function(){
														$(this).css({"background":"#eaffb8"});/*伪类效果叠加问题*/
													},function(){
														$(this).css({"background":"#fffac3"});/*伪类效果叠加问题*/
									});
			
			/*借书指南导航切换*/
			$("#bgselect li").click(function(){
									var bgindex=$(this).removeClass("bgselectdef").removeClass("bgselectsel").addClass("bgselectsel").siblings().removeClass("bgselectsel").addClass("bgselectdef").end().index();
									$("#bgshow table").eq(bgindex).removeClass("bgshowdef").removeClass("bgshowsel").addClass("bgshowsel").siblings().removeClass("bgshowsel").addClass("bgshowdef");
							});
			$("#bgshowfir tr:last,#bgshowsec tr:last,#bgshowthr tr:last").find("td").css({"border-bottom":"none"});
			
			/*我的书架表格*/
			$('#mbsborrowtable').flexigrid({height : 'auto',width:'600',striped :false});
			$('#mbslogtable').flexigrid({height : 'auto',width:'800',striped :false});
			
			//其他类代码
			
		});

/*检测输入内容是否为默认值 搜索框样式改变(无刷新情况)*/
function searchCSS(arra){
			var bsv=$("#"+arra).val();
			if(bsv!="请输入查询信息"||bsv!="请输入相关书籍信息"){
				$("#"+arra).removeClass(arra+"def").addClass(arra+"sel");
			}
			if(bsv=="请输入查询信息"||bsv=="请输入相关书籍信息"){
				$("#"+arra).removeClass(arra+"sel").addClass(arra+"def");
			}
		}
/*基本搜索*/
function baseSearchs(arra,arrb){
			/*搜索框样式*/
			/*搜索框样式改变(刷新情况)*/
			//alert(arra);
			var sbv=$("#"+arra).val();
			if(sbv!="请输入查询信息"||sbv!="请输入相关书籍信息"){
				$("#"+arra).removeClass(arra+"def").addClass(arra+"sel");
			}
			/*获取焦点时*/
		    $("#"+arra).focusin(function(){
									var svs=$("#"+arra).val();
									if(svs!="请输入查询信息"||svs!="请输入相关书籍信息")	
										{
											$(this).removeClass(arra+"def").addClass(arra+"sel");
										}
									if(svs=="请输入查询信息"||svs=="请输入相关书籍信息"){
										$(this).val("");
										$(this).removeClass(arra+"def").addClass(arra+"sel");
									}
					});
		    /*搜索功能*/
		    $("#"+arrb).click(function(){					  
								  var svs=$("#"+arra).val();
								  if(svs==""){
									  return false;													  
									  }
								  if(svs=="请输入查询信息"||svs=="请输入相关书籍信息"){
										$("#"+arra).val("").focus();
										return false;
									}else{
										//ajax后台交互
										return true;
										}
					});
		    /*搜索按钮样式*/
		    $("#"+arrb).hover(function(){
								   $(this).css({color:'red',cursor:'pointer'});
								   },function(){
								   $(this).css({color:'#000'});
					});
}
	
/*新闻图片轮播--鼠标移入移出事件*/
function hoversilderPlay(indexid){
			var maxindexf=$("#newsimgbtn li:last").index();
			$("#newsimgbtn li").hover(function(){
										getindex=$(this).index();
										clearInterval(indexid);
										silderPlay(getindex)
									  },
									  function(){
										var getindex=$(this).index();
										indexid=setInterval(function(){
													 silderPlay(getindex);
													 getindex++;
													 if(getindex>maxindexf)
														 {
															getindex=0;
														 }
													 },8000);  
								});
	}

/*轮播效果*/
var curindex=0;
var imgremark="";
var imgtitle="";
function silderPlay(getindex){
			$("#silderimg").css({'background':getColors()});
			$("#newsimgbtn li").eq(getindex).removeClass("imgbtndef").addClass("imgbtnsel").siblings().removeClass("imgbtnsel").addClass("imgbtndef");			
			imgremark=$("#silderimg a").eq(getindex).find("img").attr("alt");
			imgtitle=$("#silderimg a").eq(getindex).find("img").attr("title");
			$("#newsimgremark li").eq(getindex).text(imgremark).removeClass("imgremarkhide").addClass("imgremarkshow").siblings().removeClass("imgremarkshow").addClass("imgremarkhide");
			$("#newsimgtitle li").eq(getindex).text(imgtitle).removeClass("imgtitlehide").addClass("imgtitleshow").siblings().removeClass("imgtitleshow").addClass("imgtitlehide");
			$("#silderimg a").eq(getindex).fadeIn(1000).siblings().fadeOut(1000);
}

/*随机背景颜色名*/
function getColors(){
			var	colorarr=new Array('BurlyWood','Chartreuse','DarkKhaki','Darkorange','DeepSkyBlue','Gold','GreenYellow','LightPink','Orange','OrangeRed');
			var	sjys=Math.ceil(Math.random()*10);
			return colorarr[sjys-1];
}

/*基本下拉框*/
function baseSelect(){
			/*初始化下拉框和模拟下拉框*/
		   /*初始化--从下拉框中获取值并加入数组中*/
		   var oparr=new Array();
		   var opindex=$("#resbooktype option:last").index();
		   for(var i=1;i<=opindex+1;i++){
				var opv=$("#resbooktype option:nth-child("+i+")").text();
				oparr.push(opv);
			}
		   /*初始化--动态从数组中读取数据并创建li节点放入ul节点中*/
		   var str="";
		   for(var j=0;j<oparr.length;j++){
				jd="<li>"+oparr[j]+"</li>";
				str=str+jd;
			}							
		   $("#resbooktypeul").append(str);
		   /*显示(隐藏)模拟下拉框及其相关状态变化切换*/
			$("#resbooktypeshow").click(function(){
										$("#resbooktypeul").width(149).height((opindex+1)*16).toggle(500);
										$("#resbooktypeimgdef").toggle();
										$("#resbooktypeimgsel").toggle();
				});
		   /*点击模拟下拉框时，给下拉框赋值*/
		   $("#resbooktypeul li").click(function(){
										$("#resbooktypeul").toggle(300);
										$("#resbooktypeimgsel").hide();
										$("#resbooktypeimgdef").show();
										$("#resbooktypecotent").text("").text($(this).text());
										$("#resbooktype option:").eq($(this).index()).attr("selected","true").siblings().removeAttr("selected");	
			});
		   /*li伪类样式，同时兼容ie6*/
		   $("#resbooktypeul li").hover(function(){
									$(this).css({background:"#7ddefe",color:"red"});			 
								},function(){
									$(this).css({background:"#fff",color:"black"});			 
							}); 
	}

