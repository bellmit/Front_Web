$(function(){
	/*菜单对象*/
	var menu_obj={0:"nav_firstsel",1:"nav_secondsel",2:"nav_thirdsel",3:"nav_fourthsel",4:"nav_fifthsel",5:"nav_sixthsel",6:"nav_seventhsel",7:"nav_eighthsel"};
	/*主菜单注册点击事件*/
	$("#mainmenu li").click(function(){
		var curmenu_obj=$(this),curmenu_index=curmenu_obj.index();
		curmenu_obj.find("a").addClass(menu_obj[curmenu_index]).parent().siblings().find("a").removeClass();
	});
	/*小菜单注册点击显示菜单事件*/
	$("#sub_menutask,#sub_menuserve").click(function(){$(this).next("div").toggle().parent().siblings().find("div").hide();});
	/*小菜单注册鼠标移出隐藏菜单事件*/
	$("#sub_taskwrap,#sub_servewrap").hover(function(){},function(){$(this).hide();});
});