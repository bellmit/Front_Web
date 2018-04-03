// JavaScript Document
$(function(){
	/*init first*/
	$("#sh_diagnosis li").eq(0).find("p img:first").hide().end().find("p img:last").show();
	$("#sh_diagnosis li").eq(1).find("ul").show();
	/*li slide*/
	$.easing.def="easeOutBounce";
	$("#sh_diagnosis p").click(function(){
		var current_obj=$(this);
		var current_parobj=current_obj.parent();
		var cur_show=current_parobj.next();
		$("#sh_diagnosis li").not(cur_show).find("ul").slideUp(500);
		cur_show.find("ul").slideToggle(500);
		current_obj.find("img:first").toggle();
		current_obj.find("img:last").toggle();
		current_parobj.siblings().find("p img:first").show().end().find("p img:last").hide();
	});

})