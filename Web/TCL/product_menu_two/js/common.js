$(function(){
  var nav_product_show=$("#nav_product_show"),nav_product_title=$("#nav_product_title"),product_endwrap=$("#product_endwrap");;
  /*数组中的位置不要调换,其位置与图标位置对应*/
  var product_title_icon=["别克","马自达","一汽,吉林","奇瑞","比亚迪","北汽","丰田","本田","雷克萨斯","三菱","劳斯莱斯","保时捷","奔驰","宝马","奥迪","大众","标致","雪铁龙","法拉利","兰博基尼","菲亚特","捷豹","凯迪拉克","雪佛兰","现代","沃尔沃","路虎","英菲尼迪","长城","日产","五菱","雷诺","宾利","悍马","广汽","江铃","中华","帝豪","长安","福田","双环","中兴","金杯","东风","全球鹰","黄海,曙光","江淮","海马","长丰","福特","MG","庆铃","力帆","陆风","吉奥","奔腾","众泰","荣威","金龙","英伦","风神","郑州,郑州海马","商用,商用长安","启辰","莲花","汇众","华普","昌河","福迪","威旺","纳智捷","宝骏","依维柯","解放","野马","红旗","黑豹","哈飞","华泰","东南","吉利","瑞麒","九龙","开瑞","威麟","北京汽车","理念","南汽","中顺","江南","大迪","永源","自由风","中欧","斯巴鲁","讴歌","铃木","光冈","劳伦士","欧宝","迈巴赫","Smart,smart,SMART","布加迪","帕加尼","玛莎拉蒂","阿尔法罗密欧","迷你","路特斯","阿斯顿马丁","克莱斯勒","GMC,gmc","林肯","吉普,jeep,JEEP","道奇","Rossion,ROSSION","起亚","双龙","斯柯达","柯尼塞格","西亚特","世爵","萨博","大发","威兹曼","迈凯轮","卡尔森","巴博斯","凯佰赫","Fisker,FISKER","观致","大通","恒天"];
  var tempmenu=nav_product_show.find("li").has("ul");
  var product_brourl=window.location.href,prourl_pos=product_brourl.lastIndexOf("/")+1;
  var product_cururl=product_brourl.substring(prourl_pos,prourl_pos+4);
    /*初始化主导航中的产品标题样式*/
	/*初始化菜单面板*/
	var show_text=nav_product_show.text().replace(/\s+/,""),all_size=nav_size=nav_product_show.find("h3").size();
	nav_size=nav_size>=4?4:nav_size;
	if(show_text.length<=1){
		nav_product_show.css({"width":232,"left":0}).html("<li style=\"text-align:center;color:#f00;width:100%;\">暂无相关产品</li><li class=\"product_endwrap\" style=\"height:8px;\"></li>");
		nav_product_title.css({"width":234,"left":0});
		if($.browser.msie&&$.browser.version<=8)product_endwrap.css({"width":234});
	}else if(nav_size<=1){
		nav_product_show.css({"width":234,"left":0});
		nav_product_title.css({"width":236,"left":0});
		if($.browser.msie&&$.browser.version<=8)product_endwrap.css({"width":234});
	}else if(2<=nav_size){
		nav_product_show.css({"width":nav_size*234+4,"left":-((nav_size*234)/2)+200});
		nav_product_title.css({"width":nav_size*234+6,"left":-((nav_size*234)/2)+200});
		if($.browser.msie&&$.browser.version<=8)product_endwrap.css({"width":nav_size*234});
	}else{
		nav_product_show.css({"width":nav_size*234,"left":-270});
		nav_product_title.css({"width":nav_size*234+6,"left":-270});
		if($.browser.msie&&$.browser.version<=8)product_endwrap.css({"width":nav_size*234});
	}
	
	/*初始化菜单布局,防止过高列撑起下一列浮动不整齐,以及添加相关分界边框*/
	if(all_size>=2){
		for(var ii=0,jj=1;ii<all_size;ii++,jj++){
			if(all_size==2){
				tempmenu.eq(0).css({"border-right":"1px dashed #ccc"});
			}else if(all_size==3){
				tempmenu.eq(0).css({"border-right":"1px dashed #ccc"});
				tempmenu.eq(1).css({"border-right":"1px dashed #ccc"});
			}else{
				tempmenu.eq(ii).css({"border-right":"1px dashed #ccc"});
				if(jj%4==0)tempmenu.eq(jj-1).css({"border-right":"none"});
			}
		}
	}
	/*初始化菜单图标*/
  nav_product_show.find("h3").each(function(){
	  var title_obj=$(this);
	  var title_text=title_obj.text();
	  var englen=0,chilen=0;
	  for(jj=0;jj<title_text.length;jj++){
			if(/\w/.test(title_text.charAt(jj)))++englen;
			if(/[\u2E80-\u9FFF]/.test(title_text.charAt(jj)))++chilen
	  }
	  /*系数14为h3样式的当前字体大小加2(即中文加粗)*/
	  var engwidth=Math.ceil((englen*14)/2),chiwidth=chilen*14;
	  var posx=title_obj.width()/2-Math.ceil((engwidth+chiwidth)/2)-40;
	  posx=(title_text.length*12)>title_obj.width()?-5:posx;
	  var tempposx=0,tempii=0;
	  for(var ii=0;ii<product_title_icon.length;ii++){
		  if(product_title_icon[ii].indexOf(",")!=-1){
			  var temp_protitle=product_title_icon[ii].split(",");
			  for(var kk=0;kk<temp_protitle.length;kk++){
				  if(title_text.indexOf(temp_protitle[kk])!=-1){
					 if(ii>49){
						 if(ii>99){
							  tempii=ii-100;
							  tempposx=posx-2000;
						 }else{
							  tempii=ii-50;
							  tempposx=posx-1000;
						 }
					 }else{
						 tempii=ii;
						 tempposx=posx;
					 }
					 if(product_cururl=="home"){
						 title_obj.css({"background":"url(images/product_title_icon.png) no-repeat "+tempposx+"px -"+tempii*30+"px"});
					 }else{
						 title_obj.css({"background":"url(images/product_title_icon.png) no-repeat "+tempposx+"px -"+tempii*30+"px"});
					 }
					 break; 
				  }
			  }
		  }else{
			  if(title_text.indexOf(product_title_icon[ii])!=-1){
				  if(ii>49){
					 if(ii>99){
						  tempii=ii-100;
						  tempposx=posx-2000;
					 }else{
						  tempii=ii-50;
						  tempposx=posx-1000;
					 }
				 }else{
					 tempii=ii;
					 tempposx=posx;
				 }
				 if(product_cururl=="home"){
					 title_obj.css({"background":"url(images/product_title_icon.png) no-repeat "+tempposx+"px -"+tempii*30+"px"});
				 }else{
					 title_obj.css({"background":"url(images/product_title_icon.png) no-repeat "+tempposx+"px -"+tempii*30+"px"});
				 }
				 break;
			  } 
		  }
	  }
  });
  
  /*初始化超出部分按钮菜单*/
  tempmenu.each(function(){
	  var submenuobj=$(this);
	  var submenusize=submenuobj.find("li").size();
	  if(submenusize>=3){
		  var temp_titlex="",temp_titley="";
		  submenuobj.find("div.product_listmore").css({"display":"block"}).click(function(e){
			  var subcur_index=submenuobj.index();
			  var submenushow=submenuobj.find("ul");
			  var temp_title=submenuobj.find("h3");
			  if(submenushow.width()<=234){
				  for(var nn=0;nn<product_title_icon.length;nn++){
					  if(product_title_icon[nn].indexOf(",")!=-1){
						  var temp_proicon=product_title_icon[nn].split(",");
						  for(var kk=0;kk<temp_proicon.length;kk++){
							  if(temp_title.text().indexOf(temp_proicon[kk])!=-1){
								 if(nn>49){
									 if(nn>99){
										temp_titley=30*(nn-100);
										temp_titlex=realTitlePos(temp_title,nav_size*234)-2000;
									 }else{
										temp_titley=30*(nn-50);
										temp_titlex=realTitlePos(temp_title,nav_size*234)-1000;
									 }
								 }else{
									 temp_titley=30*nn;
									 temp_titlex=realTitlePos(temp_title,nav_size*234);
								 }
								 break;
							  }
						  }
					  }else{
						  if(temp_title.text().indexOf(product_title_icon[nn])!=-1){
							  if(nn>49){
								 if(nn>99){
									temp_titley=30*(nn-100);
									temp_titlex=realTitlePos(temp_title,nav_size*234)-2000;
								 }else{
									temp_titley=30*(nn-50);
									temp_titlex=realTitlePos(temp_title,nav_size*234)-1000;
								 }
							  }else{
								 temp_titley=30*nn;
								 temp_titlex=realTitlePos(temp_title,nav_size*234);
							  }
							  break;
						  }
					  }
				  }
				  var temp_subheight=nav_size<4?submenusize*27+5:Math.ceil(submenusize/4)*27+5;
				  if((subcur_index+1)%4==0&&subcur_index!=0){
					  submenuobj.css({"border-bottom":"1px dashed #ccc"});
				  }else{
					  submenuobj.css({"border-right":"0 none","border-bottom":"1px dashed #ccc"});
				  }
				  if(product_cururl=="home"){
					 temp_title.css({"width":nav_size*234,"background":"url(images/product_title_icon.png) no-repeat "+temp_titlex+"px -"+temp_titley+"px"});
				  }else{
					 temp_title.css({"width":nav_size*234,"background":"url(images/product_title_icon.png) no-repeat "+temp_titlex+"px -"+temp_titley+"px"});
				  }
				  submenushow.animate({"height":temp_subheight,"width":nav_size*234+2},300).end().find("div.product_listmore").animate({"top":10+temp_subheight,"left":nav_size*234-56},300).find("div").addClass("product_listbtnsel");
			  }else{
				  for(var nn=0;nn<product_title_icon.length;nn++){
					  if(product_title_icon[nn].indexOf(",")!=-1){
						  var temp_proicon=product_title_icon[nn].split(",");
						  for(var kk=0;kk<temp_proicon.length;kk++){
							  if(temp_title.text().indexOf(temp_proicon[kk])!=-1){
								  if(nn>49){
									 if(nn>99){
										temp_titley=30*(nn-100);
										temp_titlex=realTitlePos(temp_title,234)-2000;
									 }else{
										temp_titley=30*(nn-50);
										temp_titlex=realTitlePos(temp_title,234)-1000;
									 }
								  }else{
									 temp_titley=30*nn;
									 temp_titlex=realTitlePos(temp_title,234);
								  }
								  break;
							  }
						  }
					  }else{
						  if(temp_title.text().indexOf(product_title_icon[nn])!=-1){
							  if(nn>49){
								 if(nn>99){
									temp_titley=30*(nn-100);
									temp_titlex=realTitlePos(temp_title,234)-2000;
								 }else{
									temp_titley=30*(nn-50);
									temp_titlex=realTitlePos(temp_title,234)-1000;
								 }
							  }else{
								  temp_titley=30*nn;
								  temp_titlex=realTitlePos(temp_title,234);
							  }
							  break;
						  }
					  }
				  }
				  if((subcur_index+1)%4==0&&subcur_index!=0){
					  submenuobj.css({"border-bottom":"0 none"});
				  }else{
					  if(all_size<4&&(subcur_index+1)/all_size==1){
						  submenuobj.css({"border-bottom":"0 none"});
					  }else{
						  submenuobj.css({"border-right":"1px dashed #ccc","border-bottom":"0 none"});
					  }
				  }
				  if(product_cururl=="home"){
					 temp_title.css({"width":234,"background":"url(images/product_title_icon.png) no-repeat "+temp_titlex+"px -"+temp_titley+"px"});
				  }else{
					 temp_title.css({"width":234,"background":"url(images/product_title_icon.png) no-repeat "+temp_titlex+"px -"+temp_titley+"px"});
				  }
				  submenushow.animate({"height":54,"width":234},300).end().find("div.product_listmore").animate({"top":70,"left":190},300).find("div").removeClass("product_listbtnsel");
			  }
			  e.stopPropagation();
		  });
	  }
  }); 
  
  /*计算图标位置*/
  function realTitlePos(title_obj,obj_width){
	  var title_text=title_obj.text();
	  var englen=0,chilen=0;
	  for(jj=0;jj<title_text.length;jj++){
			if(/\w/.test(title_text.charAt(jj)))++englen;
			if(/[\u2E80-\u9FFF]/.test(title_text.charAt(jj)))++chilen
	  }
	  /*系数14为h3样式的当前字体大小加2(即中文加粗)*/
	  var engwidth=Math.ceil((englen*14)/2),chiwidth=chilen*14;
	  var posx=obj_width/2-Math.ceil((engwidth+chiwidth)/2)-40;
	  posx=(title_text.length*12)>obj_width?-5:posx;
	  return posx;
  }
  
  
  
  $('.select_sim a').click(function(e){
    e.preventDefault();
	$(this).parent().find('ul').toggle();
	window.setTimeout("method('nvul')",5000);
  })
  $(".select_sim li").click(function(){
		var _text= $(this).text();
		$(this).parent().hide().siblings("span").text(_text);
	});

  /*主导航显示*/
  $('.navigation li a.sp').hover(function(){
			  var nav_obj=$(this),nav_text=nav_obj.text();
			  var nav_parent_obj=nav_obj.parent();
			  if($.browser.msie){
				  if($.browser.version<="7"){
					  nav_parent_obj.addClass('mhover').find("span").removeClass('bdline').end().find("ul.navlist").show().end().hover(function(){},function(){$(this).find("ul.navlist").hide();});
				  }else{
					if(nav_text.indexOf("产品中心")!=-1){
						  nav_parent_obj.addClass('mhover').find("span").removeClass('bdline').end().find("ul.navlist").show().end().hover(function(){},function(){$(this).find("ul.navlist").hide();});
					  }else{
						  nav_parent_obj.addClass('mhover').find("span").removeClass('bdline').end().find("ul.navlist").slideDown("100").end().hover(function(){},function(){$(this).find("ul.navlist").slideUp("100");});
					  }  
				  }
			  }else{
				  if(nav_text.indexOf("产品中心")!=-1){
					  nav_parent_obj.addClass('mhover').find("span").removeClass('bdline').end().find("ul.navlist").show().end().hover(function(){},function(){$(this).find("ul.navlist").hide();});
				  }else{
					  nav_parent_obj.addClass('mhover').find("span").removeClass('bdline').end().find("ul.navlist").slideDown("100").end().hover(function(){},function(){$(this).find("ul.navlist").slideUp("100");});
				  }
			  }
		  },function(){
			  $(this).parent().removeClass('mhover').find("span").addClass('bdline');
   });
   
   
   
})

function method(obj){
  document.getElementById(obj).style.display="none";

}