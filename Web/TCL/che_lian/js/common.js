$(function(){
  $('.select_sim a').click(function(e){
    e.preventDefault();
	$(this).parent().find('ul').toggle();
	window.setTimeout("method('nvul')",5000);
  })
  $(".select_sim li").click(function(){
		var _text= $(this).text();
		$(this).parent().hide().siblings("span").text(_text);
	});

  $('.navigation li a.sp').hover(function(){
    $(this).parent().addClass('mhover');
	$(this).parent().find('span').removeClass('bdline');
	$(this).parent().find('ul.navlist').slideDown('fast').show();
	
	
	$(this).parent().hover(function(){
	},function(){
	$(this).find("ul.navlist").slideUp('slow');
	})
	
			 
  },function(){
    $(this).parent().removeClass('mhover');
	$(this).parent().find('span').addClass('bdline');
	
  })

})

function method(obj){
  document.getElementById(obj).style.display="none";

}