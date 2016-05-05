// JavaScript Document
$(function(){
		   /*accordion*/
		   $("#accordion > li").click(function(){
						var accindex=$(this).index();					   
						$(this).find("h4").removeClass("accordionbtnh").addClass("accordionbtns").parent().siblings().find("h4").removeClass("accordionbtns").addClass("accordionbtnh");					   
						$(this).find("div").removeClass("accordionhide").addClass("accordionshow").parent().siblings().find("div").removeClass("accordionshow").addClass("accordionhide");				   
					});
		   
		   /*tab*/
		   $("#slider").slider({
						range:true,
						values:[10,80]
					});
		   $("#progressbar").progressbar({
        				value:40
					});
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   });