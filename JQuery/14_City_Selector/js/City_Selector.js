$(function(){
	/*init params*/
	var city_zhou=["亚洲","非洲","欧洲","北美洲","南美洲","大洋洲","南极洲"];
	var city_country={"亚洲":"中国,印度,日本","非洲":"埃及,南非","欧洲":"英国,法国,西班牙,德国,意大利,瑞士,荷兰,希腊,俄罗斯","北美洲":"加拿大,美国,墨西哥","南美洲":"巴西,阿根廷","大洋洲":"澳大利亚,新西兰","南极洲":"冰上高原的国度"};
	var city_city={"中国":"北京故宫,北京中华世纪坛,北京天安门,北京八达岭长城,北京明十三陵,北京山顶洞人遗址,河南开封古建筑群,河南中原文化发源地,山东曲阜孔子故乡,陕西西安秦始皇陵兵马俑,陕西西安大雁塔,陕西西安古帝王都城,内蒙古成吉思汗陵,湖南长沙博物馆马王堆汉墓,湖南长沙岳麓山,湖南衡阳南岳衡山,河北北岳恒山,山东东岳泰山,山西西岳华山,河南中岳嵩山,四川九寨沟,西藏布达拉宫,新疆吐鲁番,云南大理,湖南张家界,湖北武当山,四川峨眉山,浙江杭州西湖,安徽黄山,海南天涯海角,广西桂林山水,云南热带雨林景观,西藏独具特色的高原景观,西藏雅鲁藏布江大峡谷,贵州黄果树瀑布,江西井冈山革命根据地红色旅游,贵州遵义会议遗址,台湾日月潭,吉林长白山天池,福建武夷山","印度":"释迦摩尼古遗址,泰姬陵","日本":"富士山","埃及":"开罗古埃及文明古国文化遗址,尼罗河河口三角洲风光,金字塔狮身人面像","南非":"好望角海滩风光","英国":"泰晤士河,大本钟,双塔桥","法国":"巴黎埃菲尔铁塔,巴黎圣母院,卢浮宫","西班牙":"激情斗牛士","德国":"二战产物--柏林墙","意大利":"古罗马斗兽场,比萨斜塔,水城威尼斯","瑞士":"阿尔卑斯山风情","荷兰":"繁忙的鹿特丹,梦幻的大风车","希腊":"古欧洲文化发源中心,帕特农神庙,奥林匹克发源地遗址","俄罗斯":"莫斯科红墙,伏尔加河畔的纤夫","加拿大":"优美的北美风情,红彤彤的枫叶景观","美国":"激情四射的nba比赛","墨西哥":"古印第安人北美文明遗址(玛雅文明)","巴西":"亚马孙河口热带雨林景观","阿根廷":"潘帕斯上的雄鹰","澳大利亚":"那些与世隔绝动物们","新西兰":"感受温带海洋性气候","冰上高原的国度":"不相信眼泪只相信体重的大陆"}
	var zhou_str="<li><h3>请选择大洲</h3></li>",country_str="<li><h3>请选择国家</h3></li>",city_str="<li><h3>请选择旅游城市</h3></li>";
	var city_wrap=$("#city_show"),zhou_selector=$("#city_zhou"),country_selector=$("#city_country"),city_selector=$("#city_city"),city_close=$("#city_close"),target_flag=$("#target_flag"),body_wrap=$("html,body"),city_tips=$("#city_tips");
	var text_locality=$("#locality"),text_destination=$("#destination"),btn_ok=$("#cityok");
	for(var i=0;i<city_zhou.length;i++){
		zhou_str+="<li><p>"+city_zhou[i]+"</p></li>";
	}       	
	zhou_selector.html(zhou_str);
	/*text click event*/
	text_locality.click(function(){
		if(city_wrap.css("display")=="none"){
			city_wrap.show(500);
			city_tips.hide(10);
		}
		if($(this).val()=="locality"||$(this).val()=="所在地与目的地一致，请重新选择"){
			$(this).val("").removeClass("city_same");
		}
		if(text_destination.val()==""||text_destination.val()=="所在地与目的地一致，请重新选择"){
			text_destination.val("destination").removeClass("city_same");
		}
		target_flag.val($(this).attr("name"));
	});
	text_destination.click(function(){
		if(city_wrap.css("display")=="none"){
			city_wrap.show(500);
			city_tips.hide(10);
		}
		if($(this).val()=="destination"||$(this).val()=="所在地与目的地一致，请重新选择"){
			$(this).val("").removeClass("city_same");
		}
		if(text_locality.val()==""||text_locality.val()=="所在地与目的地一致，请重新选择"){
			text_locality.val("locality").removeClass("city_same");
		}
		target_flag.val($(this).attr("name"));
	});
	/*body,html click event*/
	body_wrap.click(function(evt){
		if(evt.target.id!="locality"&&evt.target.id!="destination"){
			if(text_locality.val()==""){
				text_locality.val("locality");
			}
			if(text_destination.val()==""){
				text_destination.val("destination");
			}
		}
	});
	/*city_zhou click event*/
	zhou_selector.find("li p").click(function(){
		var zhou_current=$(this);
		var zhou_arr=[];
		var zhou_content=zhou_current.html();
		zhou_current.addClass("city_zhousel").parent().siblings().find("p").removeClass("city_zhousel");
		country_str="<li><h3>请选择国家</h3></li>";
		zhou_arr=city_country[zhou_content].split(",");
		for(var m=0;m<zhou_arr.length;m++){
			country_str+="<li><p>"+zhou_arr[m]+"</p></li>";		
		}
		city_selector.html("");
		country_selector.html("").html(country_str);
	});
	/*city_country click event*/
	country_selector.find("li p").live("click",function(){
		var country_current=$(this);
		var country_arr=[];
		var country_content=country_current.html();
		country_current.addClass("city_countrysel").parent().siblings().find("p").removeClass("city_countrysel");
		city_str="<li><h3>请选择旅游城市</h3></li>"
		country_arr=city_city[country_content].split(",");
		for(var k=0;k<country_arr.length;k++){
			city_str+="<li><fieldset><input type=\"checkbox\" id=\"city"+k+"\" name=\"citys"+k+"\" value=\""+country_arr[k]+"\"/><label for=\"city"+k+"\">"+country_arr[k]+"</label></li>";		
		}
		city_selector.html("").html(city_str);
	});
	/*city_city click event*/
	city_selector.find("li fieldset input").live("click",function(){
		var selval=$(this);
		selval.next().addClass("city_citysel").parent().parent().siblings().find("input").removeAttr("checked").end().find("label").removeClass("city_citysel");
		if(target_flag.val()=="locality"){
			if(selval.val()==text_destination.val()){
				text_locality.val("所在地与目的地一致，请重新选择").addClass("city_same");
			}else{
				text_locality.val(selval.val()).removeClass("city_same");
			}
		}else if(target_flag.val()=="destination"){
			if(selval.val()==text_locality.val()){
				text_destination.val("所在地与目的地一致，请重新选择").addClass("city_same");
			}else{
				text_destination.val(selval.val()).removeClass("city_same");
			}
		}
	})
	/*close click event*/
	city_close.click(function(){
		city_wrap.hide(100);
		target_flag.val("");
		city_selector.find("li input").removeAttr("checked");
	});
	/*btn click event*/
	btn_ok.live("click",function(){
		if(text_locality.val()==""||text_destination.val()==""||text_locality.val()=="locality"||text_destination.val()=="destination"||text_locality.val()=="所在地与目的地一致，请重新选择"||text_destination.val()=="所在地与目的地一致，请重新选择"){
			if(city_wrap.css("display")=="none"){
				city_wrap.show(500);
				city_tips.hide(100);
			}
			return false;
		}else if(city_wrap.css("display")=="block"){
				city_wrap.hide(100);
				city_tips.show().find("p").text("祝您旅途愉快!");
		}
		city_tips.show().find("p").text("祝您旅途愉快!");		
	});
});