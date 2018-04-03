// JavaScript Document
$(document).ready(function(){	
		// When a link is clicked
		$("a.nav_news_title").click(function () {

			// switch all tabs off
			$(".active").removeClass("nav_news_title");
			
			// switch this tab on
			$(this).addClass("nav_news_title");
			
			// slide all content up
			$(".nav_content").slideUp();
			
			// slide this content up
			var content_show = $(this).attr("title");
			$("#"+content_show).slideDown();
		});
	  });