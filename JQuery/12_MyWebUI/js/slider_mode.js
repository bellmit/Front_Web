// JavaScript Document
$(function(){
		   var slider_control=$("#slider"),slider_data=$("#slider_data"),slider_width=slider_control.width(),datawrap_width=slider_data.width()/2,slider_load=$("#slider_load");
		   slider_control.slider(); 
		   var slider_id=setInterval(function(){
			   var datas=slider_control.find("a").css("left");
			   var dataleft=Math.ceil(parseInt(datas));
			   var datashow=Math.ceil((dataleft/slider_width)*100);
			   slider_data.html(datashow+"%").css({"left":dataleft-datawrap_width});
			   slider_load.css({"width":dataleft});
		   },1000/60);     
});