$(function(){
	/*news_pages click*/
	var news_page=$("#news_pages li"),news_img=$("#news_contents img"),news_active=$("#news_active img");
	news_page.click(function(){
		$(this).css({"color":"#f00"}).siblings().css({"color":"#666"});
	});
	/*news_details img*/
	news_img.each(function(){
        if($(this).width()>=600){
			this.width=600;
		}
    });
	news_active.each(function(){
        if($(this).width()>=160||$(this).height()>=120){
			this.width=160;
			this.height=120;
		}
    });
});