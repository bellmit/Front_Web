// JavaScript Document
$(function(){
	$.easing.def="easeInOutBounce";
	$("#menuitem li").click(function(){
		var cur_index=$(this).index();
		$(this).find("ul").slideToggle(500);
		
	});
	
	
});