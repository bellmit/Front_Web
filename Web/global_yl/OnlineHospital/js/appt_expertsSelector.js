// JavaScript Document
$(function(){
	/*expertselect btn event*/
	var current_operate=$("#exp_midbox li");
	current_operate.first().find("div:first div img:first").show();
	current_operate.first().find("div:first div img:last").hide();
	current_operate.first().find("div:last").show();
	current_operate.click(function(){
		var current_obj=$(this);
		var current_index=current_obj.index();
		var current_operate_btn=current_obj.find("div:first div");
		var target_show=current_obj.find("div:last");
		current_operate_btn.find("img:first").toggle();
		current_operate_btn.find("img:last").toggle();
		target_show.slideToggle();
		current_obj.siblings().find("div:last").slideUp();
		current_obj.siblings().find("div:first div img:first").show();
		current_obj.siblings().find("div:first div img:last").hide();
	});
})