$(function(){
	/*分页选中高亮显示样式*/
	var ser_pro_pages=$("#ser_pro_pages"),bro_url=window.location.href,pagelist_info=$("#pagelist_info").text(),pagelist_arr=[],ser_pro_tag=$("#ser_pro_tag li a"),ser_pro_list=$("#ser_pro_list");
	var current_url=bro_url.substring(bro_url.lastIndexOf('/')+1);
	/*问题分类标签项*/
	ser_pro_tag.each(function(){
        var ser_obj=$(this);
		var ser_index=ser_obj.parent().index(),serurl=ser_obj.attr("href").split("_")[0],tagurl=current_url.split("_");
		if(ser_index==0||ser_index==1){
			if(serurl==tagurl[0])ser_obj.parent().addClass("hot_other_sel");
		}else{
			if(serurl==tagurl[0])ser_obj.parent().addClass("all_sel").removeClass("sp_tag_all");
		}
    });
	/*问题列表初始化*/
	ser_pro_list.find("li:first div.ser_pro_title span").addClass("sp_icon_sel").end().find("li:first div.ser_pro_title h3").addClass("sp_title_sel").end().find("li:first div.ser_pro_contentwrap").addClass("sp_content_sel").end().find("li").each(function() {
        var list_wrapobj=$(this);
		var list_sonwidth=list_wrapobj.find("div.ser_pro_contentwrap p,div.ser_pro_contentwrap table,div.ser_pro_contentwrap ul,div.ser_pro_contentwrap div,div.ser_pro_contentwrap h1,div.ser_pro_contentwrap h2,div.ser_pro_contentwrap h3,div.ser_pro_contentwrap h4,div.ser_pro_contentwrap h5,div.ser_pro_contentwrap h6,div.ser_pro_contentwrap img,div.ser_pro_contentwrap a,div.ser_pro_contentwrap header,div.ser_pro_contentwrap footer,div.ser_pro_contentwrap section,div.ser_pro_contentwrap ol,div.ser_pro_contentwrap tr td").each(function(){
			var list_sonobj=$(this);
			if(list_sonobj.attr("width")>=620||list_sonobj.attr("width")=="100%"){
				list_wrapobj.find("div.ser_pro_contentwrap").css({"overflow":"scroll","overflow-y":"visible"});
			}else if(list_sonobj.attr("class")){
				list_sonobj.removeClass().css({"overflow":"scroll","overflow-y":"visible"});
			}           
        });
    });
	/*问题列表事件*/
	ser_pro_list.find("div.ser_pro_title").click(function(){
		$.easing.def="easeOutBounce";
		var list_obj=$(this);
		var list_parent=list_obj.parent();
		var list_icon=list_obj.find("span");
		var list_title=list_obj.find("h3")
		var list_content=list_parent.find("div.ser_pro_contentwrap");
		list_content.slideToggle(300);
		list_icon.toggleClass("sp_icon_sel");
		list_title.toggleClass("sp_title_sel");
		list_parent.siblings().find("div.ser_pro_contentwrap").slideUp(300).end().find("span").removeClass("sp_icon_sel").end().find("h3").removeClass("sp_title_sel");
	});
});