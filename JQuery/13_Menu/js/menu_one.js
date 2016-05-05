// JavaScript Document
$(function(){
	$.easing.def="easeOutBounce";
	$("#menuitem p").click(function(){
		var cur_show=$(this).parent().next();
		$("#menuitem li").not(cur_show).find("ul").slideUp(500);
		cur_show.find("ul").slideToggle(500);
	});
});