$(function(){
	/*service tag declare*/
	var ser_pro_tag=$("#ser_pro_tag li"),sp_list0=$("#sp_list0 ul:first li"),sp_list1=$("#sp_list1 ul:first li"),sp_list2=$("#sp_list2 ul:first li");
	/*tag,list init*/
	ser_pro_tag.eq(0).addClass("hot_other_sel").siblings().removeClass("hot_other_sel all_sel");
	sp_list0.first().find("div span").addClass("sp_icon_sel").end().find("p").addClass("sp_content_sel");
	sp_list1.first().find("div span").addClass("sp_icon_sel").end().find("p").addClass("sp_content_sel");
	sp_list2.first().find("div span").addClass("sp_icon_sel").end().find("p").addClass("sp_content_sel");
	/*tag click event*/
	ser_pro_tag.click(function(){
		var ser_obj=$(this);
		var ser_index=ser_obj.index();
		$("#sp_list"+ser_index).slideDown(300).siblings().slideUp(300);
		if(ser_index==0||ser_index==1){
			ser_obj.addClass("hot_other_sel").siblings().removeClass("hot_other_sel all_sel");
		}else{
			ser_obj.addClass("all_sel").siblings().removeClass("all_sel hot_other_sel");
		}
	});
	/*list content click event*/
	$("#sp_list0 ul div,#sp_list1 ul div,#sp_list2 ul div").click(function(){
		//$.easing.def="easeOutBounce";
		var list_obj=$(this);
		var list_parent=list_obj.parent();
		var list_index=list_parent.index();
		var list_icon=list_obj.find("span");
		var list_content=list_obj.next();
		list_content.slideToggle(300);
		list_icon.toggleClass("sp_icon_sel");
		list_parent.siblings().find("p").slideUp(300).end().find("span").removeClass("sp_icon_sel");
	});
});