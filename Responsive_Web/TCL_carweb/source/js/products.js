$(function(){
	/*pro_tab click*/
	var pro_tag=$("#pro_tag li"),pro_show=$("#pro_show>li"),pro_rule=$("#pro_rule table");
	pro_tag.click(function(){
		var pro_tag_obj=$(this);
		var pro_tag_index=pro_tag_obj.index();
		pro_tag_obj.addClass("tag_sel").siblings().removeClass("tag_sel");
		pro_show.eq(pro_tag_index).show().siblings().hide();
	});
	/*clear pro_info,pro_rule,pro_match className*/
	/*$("#pro_info,#pro_rule,#pro_match").find("p,div,ul,li,a,img,h1,h2,h3,h4,h5,h6,span,font,dd,dl,ol,table,tr,td,col,colgroup").each(function(){
		$(this).removeClass(function(){
			return $(this).attr("class");	
		});
	})*/	
});