$(function(){
	/*news_pages click*/
	var news_page=$("#news_pages li a"),news_img=$("#news_contents img"),bro_url=window.location.href,localurl=[],cur_index;
	/*pages*/
	var current_url=bro_url.substring(bro_url.lastIndexOf('/')+1);
	news_page.each(function(){
		var curobj=$(this),cururl=curobj.attr("href");
		if(current_url==cururl)curobj.css({"color":"#f00","text-decoration":"underline"});	
    });
	/*news_details img*/
	news_img.each(function(){
        if($(this).width()>=600){
			this.width=600;
		}
    });
});