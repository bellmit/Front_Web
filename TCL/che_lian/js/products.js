$(function(){
	/*pro_tab click*/
	var pro_tag=$("#pro_tag li"),pro_show=$("#pro_show li");
	pro_tag.click(function(){
		var pro_tag_obj=$(this);
		var pro_tag_index=pro_tag_obj.index();
		pro_tag_obj.addClass("tag_sel").siblings().removeClass("tag_sel");
		pro_show.eq(pro_tag_index).slideDown(100).siblings().slideUp(100);
	});
});