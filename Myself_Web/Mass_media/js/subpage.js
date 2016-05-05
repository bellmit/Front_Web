// JavaScript Document
$(function(){
	/*declare*/
	var menu_selector=$("#nav-items li");
	/*menu*/
	menu_selector.hover(function(){
		$(this).find("ul").slideDown(200);
	},function(){
		$(this).find("ul").slideUp(500);
	});
});