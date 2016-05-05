(function($){
	$(function(){
		/*----页面标签获取-----*/
		var cityinputpro=$("#cityinputpro"),cityinputcity=$("#cityinputcity"),citymenu=$("#citymenu"),cityprovince=$("#cityprovince"),citycity=$("#citycity");
		/*-----变量定义----*/
		var provalue=cityinputpro.val(),cityvalue=cityinputcity.val();
		var prolen=province.length,citylen=0;
		var prowidth=cityinputpro.width(),citywidth=cityinputcity.width(),themewidth=cityinputpro.prev().width();
		var prostr="",citystr="";
		/*初始化加载*/
		for(var i=0;i<prolen;i++){
			if(provalue!=""&&provalue==province[i]){
				prostr+="<li class=\"citysel\">"+province[i]+"</li>";
				citylen=city[i].length;
				for(var j=0;j<citylen;j++){
					if(cityvalue!=""&&cityvalue==city[i][j]){
						citystr+="<li class=\"citysel\">"+city[i][j]+"</li>";
					}else{
						citystr+="<li class=\"\">"+city[i][j]+"</li>";
					}
				}
				continue;	
			}
			prostr+="<li class=\"\">"+province[i]+"</li>";
		}
		cityprovince.append(prostr);
		citycity.append(citystr);
		/*input绑定事件*/
		cityinputpro.click(function(){
			var proleft=themewidth;
			citymenu.css({"left":proleft}).show();
		});
		cityinputcity.click(function(){
			var cityleft=themewidth+prowidth;
			citymenu.css({"left":cityleft}).show();
		});
		
		/*citymenu绑定事件*/
		citymenu.hover(function(e){},function(e){$(this).hide();});
		
		/*cityselect绑定事件*/
		cityprovince.find("li").live("click",function(e){
			citystr="";
			var curobj=$(this),curindex=curobj.index(),curcity=city[curindex],curcitylen=curcity.length;
			var curvalue=curobj.addClass("citysel").siblings().removeClass("citysel").end().text();
			for(var i=0;i<curcitylen;i++){
				 	citystr+="<li class=\"\">"+curcity[i]+"</li>";
			}
			citycity.html(citystr);
			cityinputpro.focus().val(curvalue);
			cityinputcity.val("");
		});
		
		citycity.find("li").live("click",function(e){
			var curobj=$(this);
			var curvalue=curobj.addClass("citysel").siblings().removeClass("citysel").end().text();
			cityinputcity.focus().val(curvalue);
		});
	});
})(jQuery);