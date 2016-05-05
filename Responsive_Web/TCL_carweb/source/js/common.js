$(function(){
  var nav_product_show=$("#nav_product_show");
  /*数组中的位置不要调换,其位置与图标位置对应*/
  var product_title_icon=["别克","马自达","一汽,吉林","奇瑞","比亚迪","北汽","丰田","本田","雷克萨斯","三菱","劳斯莱斯","保时捷","奔驰","宝马","奥迪","大众","标致","雪铁龙","法拉利","兰博基尼","菲亚特","捷豹","凯迪拉克","雪佛兰","现代","沃尔沃","路虎","英菲尼迪","长城","日产","五菱","雷诺","宾利","悍马","广汽","江铃","中华","帝豪","长安","福田","双环","中兴","金杯","东风","全球鹰","黄海,曙光","江淮","海马","长丰","福特","MG","庆铃","力帆","陆风","吉奥","奔腾","众泰","荣威","金龙","英伦","风神","郑州,郑州海马","商用,商用长安","启辰","莲花","汇众","华普","昌河","福迪","威旺","纳智捷","宝骏","依维柯","解放","野马","红旗","黑豹","哈飞","华泰","东南","吉利","瑞麒","九龙","开瑞","威麟","北京汽车","理念","南汽","中顺","江南","大迪","永源","自由风","中欧","斯巴鲁","讴歌","铃木","光冈","劳伦士","欧宝","迈巴赫","Smart,smart,SMART","布加迪","帕加尼","玛莎拉蒂","阿尔法罗密欧","迷你","路特斯","阿斯顿马丁","克莱斯勒","GMC,gmc","林肯","吉普,jeep,JEEP","道奇","Rossion,ROSSION","起亚","双龙","斯柯达","柯尼塞格","西亚特","世爵","萨博","大发","威兹曼","迈凯轮","卡尔森","巴博斯","凯佰赫","Fisker,FISKER","观致","大通","恒天"];
  var product_brourl=window.location.href,prourl_pos=product_brourl.lastIndexOf("/")+1;
  var product_cururl=product_brourl.substring(prourl_pos,prourl_pos+7);
	/*初始化车型面板图标*/
	nav_product_show.find("a").each(function(){
          var title_obj=$(this),title_width=title_obj.width(),title_text=title_obj.text();
		  var englen=0,chilen=0;
		  for(jj=0;jj<title_text.length;jj++){
				if(/\w/.test(title_text.charAt(jj)))++englen;
				if(/[\u2E80-\u9FFF]/.test(title_text.charAt(jj)))++chilen
		  }
		  /*系数14为h3样式的当前字体大小加2(即中文加粗)*/
		  var engwidth=Math.ceil((englen*14)/2),chiwidth=chilen*14;
		  var posx=title_width/2-Math.ceil((engwidth+chiwidth)/2)-40;
		  posx=(title_text.length*12)>title_width?-5:posx;
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
						 if(product_cururl.indexOf("product")!=-1){
							 title_obj.css({"background":"url(resources/images/product_title_icon.gif) no-repeat "+tempposx+"px -"+tempii*30+"px"});
						 }else{
							 title_obj.css({"background":"url(../resources/images/product_title_icon.gif) no-repeat "+tempposx+"px -"+tempii*30+"px"});
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
					 if(product_cururl.indexOf("product")!=-1){
						 title_obj.css({"background":"url(resources/images/product_title_icon.gif) no-repeat "+tempposx+"px -"+tempii*30+"px"});
					 }else{
						 title_obj.css({"background":"url(../resources/images/product_title_icon.gif) no-repeat "+tempposx+"px -"+tempii*30+"px"});
					 }
					 break;
				  } 
			  }
		  }
    });
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
					  nav_parent_obj.addClass('mhover').find("span.bddefault").removeClass('bdline').end().find("ul.navlist,div.navlist").show().end().hover(function(){},function(){$(this).find("ul.navlist,div.navlist").hide();});
				  }else{
					if(nav_text.indexOf("产品中心")!=-1){
						  nav_parent_obj.addClass('mhover').find("span.bddefault").removeClass('bdline').end().find("ul.navlist,div.navlist").show().end().hover(function(){},function(){$(this).find("ul.navlist,div.navlist").hide();});
					  }else{
						  nav_parent_obj.addClass('mhover').find("span.bddefault").removeClass('bdline').end().find("ul.navlist,div.navlist").slideDown("100").end().hover(function(){},function(){$(this).find("ul.navlist,div.navlist").slideUp("100");});
					  }  
				  }
			  }else{
				  if(nav_text.indexOf("产品中心")!=-1){
					  nav_parent_obj.addClass('mhover').find("span.bddefault").removeClass('bdline').end().find("ul.navlist,div.navlist").show().end().hover(function(){},function(){$(this).find("ul.navlist,div.navlist").hide();});
				  }else{
					  nav_parent_obj.addClass('mhover').find("span.bddefault").removeClass('bdline').end().find("ul.navlist,div.navlist").slideDown("100").end().hover(function(){},function(){$(this).find("ul.navlist,div.navlist").slideUp("100");});
				  }
			  }
		  },function(){
			  $(this).parent().removeClass('mhover').find("span.bddefault").addClass('bdline');
   });
   
   
   
})

function method(obj){
  document.getElementById(obj).style.display="none";

}