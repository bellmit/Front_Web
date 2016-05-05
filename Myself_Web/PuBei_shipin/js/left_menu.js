/*left tab*/
$(function(){
	/*tab tab*/
	/*tab arguments*/
	var sub_tab_menu=$("#news_menu li");
	var sub_tab_content=$("#news_content");	
	var tab_menu_box=$("#menu_box");
	/*tab init*/
	sub_tab_menu.first().css({"background":"#fff url(images/ma_lift_daoh_img2.png) no-repeat 0 0"});
	if(tab_menu_box.height()<sub_tab_content.height()){
		tab_menu_box.height(sub_tab_content.height()-20);
	}
	/*tab click event*/
	sub_tab_menu.click(function(){
		var current_obj=$(this);
		current_obj.css({"background":"#fff url(images/ma_lift_daoh_img2.png) no-repeat 0 0"});
		current_obj.siblings().css({"background":"#fff url(images/ma_lift_daoh_img1.png) no-repeat 0 0"});
		var current_select=sub_tab_content.find("ul").eq(current_obj.index());
		var tab_content_height=current_select.height();
		current_select.show(200).siblings().hide(50);
		if(tab_menu_box.height()<tab_content_height){
			tab_menu_box.height(tab_content_height-20);
		}
		if(tab_menu_box.height()>250&&tab_menu_box.height()>tab_content_height){
			tab_menu_box.height(tab_content_height-20);
		}
	});
	/*left tab height*/
});