$(function(){
	var menu_nav=$("#menu_nav"),bro_url=window.location.href,localurl=[],cur_index;
	var current_url=bro_url.substring(bro_url.lastIndexOf('/')+1);
	/*sidebox nav init*/
	menu_nav.find("li a").each(function() {
        localurl.push($(this).attr("href"));
    });
	cur_index=$.inArray(current_url,localurl);
	menu_nav.find("li").eq(cur_index!=-1?cur_index:0).addClass("nav_sel");	
});