(function($){
	
	$.fn.chooseCity = function(){
		return this.each(function(i, el){
			var $cityselect_wrap = $(el).siblings(".cityselect_wrap");
			
			/*----页面标签获取-----*/
			var place_pro=$(el),place_city=place_pro.siblings(".place_city"),citymenu=$cityselect_wrap.find(".citymenu"),cityprovince=citymenu.find(".cityprovince"),citycity=citymenu.find(".citycity"),provincebox = citymenu.find(".provincebox"),citybox=citymenu.find(".citybox");
			/*-----变量定义----*/
			var provalue=place_pro.val(),cityvalue=place_city.val();
			var prolen=province.length,citylen=0;
			var prowidth=place_pro.width();
			var prostr="",citystr="";
			/*初始化加载*/
			for(var i=0;i<prolen;i++){
				if(provalue!=""&&provalue==province[i]){
					prostr+="<li class=\"citysel\" name='province'>"+province[i]+"</li>";
					citylen=city[i].length;
					for(var j=0;j<citylen;j++){
						if(cityvalue!=""&&cityvalue==city[i][j]){
							citystr+="<li class=\"citysel\" name='city'>"+city[i][j]+"</li>";
						}else{
							citystr+="<li class=\"\" name='city'>"+city[i][j]+"</li>";
						}
					}
					continue;	
				}
				prostr+="<li class='province' name='province'>"+province[i]+"</li>";
			}
			cityprovince.append(prostr);
			citycity.append(citystr);
			/*input绑定事件*/
			place_pro.click(function(){
				citymenu.show();
				citybox.hide();
				provincebox.slideDown();
			});
			place_city.click(function(){
				citymenu.show();
				provincebox.hide();
				citybox.slideDown();
			});
			
			/*citymenu绑定事件*/
			citymenu.hover(function(e){},function(e){$(this).hide();});
			/*cityselect绑定事件*/
			cityprovince.click(function(e){
				var $target = $(e.target);
				var name = $target.attr("name");
				if(name=="province"){
					citystr="";
					var curindex=$target.index(),curcity=city[curindex],curcitylen=curcity.length;
					var curvalue=$target.addClass("citysel").siblings().removeClass("citysel").end().text();
					for(var i=0;i<curcitylen;i++){
							citystr+="<li class='city' name='city'>"+curcity[i]+"</li>";
					}
					citycity.html(citystr);
					place_pro.val(curvalue);
					place_city.val(citycity.find(":first-child").text());
				}
				if(place_pro.val()!="" && place_city.val()!=""){
					place_city.removeClass("Validform_error")
					place_city.siblings(".Validform_wrong").text("").removeClass("Validform_wrong").addClass("Validform_right")
					place_city.siblings("p.tipserror").replaceWith("");
					place_city.siblings("p.terror").replaceWith("");
				}
			});
			citycity.click("click",function(e){
				var $target = $(e.target);
				var name = $target.attr("name");
				if(name=="city"){
					var curvalue=$target.addClass("citysel").siblings().removeClass("citysel").end().text();
					place_city.val(curvalue);
				}
				if(place_pro.val()!="" && place_city.val()!=""){
					place_city.removeClass("Validform_error")
					place_city.siblings(".Validform_wrong").text("").removeClass("Validform_wrong").addClass("Validform_right")
					place_city.siblings("p.tipserror").replaceWith("");
					place_city.siblings("p.terror").replaceWith("");
				}
			});
		})
		
	}
})(jQuery);