// JavaScript Document
$(function(){
	var list_selector=$("#side-list li"),content_selector=$("#main-wrap li");
	var list_wrap=list_selector.parent(),content_wrap=content_selector.parent();
	/*init*/
	list_selector.eq(0).addClass("side-sel").find("p").addClass("list-sel").end().siblings().removeClass("side-sel").find("p").removeClass("list-sel");
	list_wrap.height()>=content_wrap.height()?list_wrap.css("border-right","1px solid #ccc"):content_wrap.css("border-left","1px solid #ccc");
	/*click event*/
	list_selector.click(function(){
		var sel_current=$(this);
		/*list,content css*/
		sel_current.addClass("side-sel").find("p").addClass("list-sel").end().siblings().removeClass("side-sel").find("p").removeClass("list-sel");
		content_selector.eq(sel_current.index()).show().siblings().hide();
		/*wrap border*/
		if(list_wrap.height()>=content_wrap.height()){
			list_wrap.css("border-right","1px solid #ccc");
			content_wrap.css("border-left","none")
		}else{
			content_wrap.css("border-left","1px solid #ccc")
			list_wrap.css("border-right","none");
		}
	});
});