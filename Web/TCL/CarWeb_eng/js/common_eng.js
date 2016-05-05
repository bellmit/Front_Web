$(function(){
  $('.select_sim p,.select_language p').click(function(){
	var select_obj=$(this).parent();
	select_obj.find('ul').toggle();
	var select_class=select_obj.attr("class").split(" ")[1];
	if(select_class=="member"){
		window.setTimeout("method('nvul')",5000);
	}else if(select_class=="language"){
		window.setTimeout("method('languageul')",5000);
	}
  })
  $(".select_sim li").click(function(){
		var _text= $(this).text();
		$(this).parent().hide().siblings("span").text(_text);
  });
  
  $(".select_language li").click(function(){
	  	var language_obj=$(this),language_text=language_obj.find("a").text();
		language_obj.parent().hide().siblings("span").text(language_text);
  });

  /*主导航显示*/
  $('.navigation li a.sp').hover(function(){
			  var nav_obj=$(this),nav_text=nav_obj.text();
			  var nav_parent_obj=nav_obj.parent();
			  if($.browser.msie){
				  if($.browser.version<="7"){
					  nav_parent_obj.addClass('mhover').find("span").removeClass('bdline').end().find(".navlist").show().end().hover(function(){},function(){$(this).find(".navlist").hide();});
				  }else{
					nav_parent_obj.addClass('mhover').find("span").removeClass('bdline').end().find(".navlist").slideDown("100").end().hover(function(){},function(){$(this).find(".navlist").slideUp("100");});
				  }
			  }else{
				    nav_parent_obj.addClass('mhover').find("span").removeClass('bdline').end().find(".navlist").slideDown("100").end().hover(function(){},function(){$(this).find(".navlist").slideUp("100");});
			  }
		  },function(){
			  $(this).parent().removeClass('mhover').find("span").addClass('bdline');
   });
})

function method(obj){
  document.getElementById(obj).style.display="none";
}