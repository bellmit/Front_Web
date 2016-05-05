// JavaScript Document
$(function(){
	/*declare*/
	var menu_selector=$("#nav-items li");
	var effect_arr=["easeInQuad","easeOutQuad","easeInOutQuad","easeInCubic","easeOutCubic","easeInOutCubic","easeInQuart","easeOutQuart","easeInOutQuart","easeInQuint","easeOutQuint","easeInOutQuint","easeInSine","easeOutSine","easeInOutSine","easeInExpo","easeOutExpo","easeInOutExpo","easeInCirc","easeOutCirc","easeInOutCirc","easeInElastic","easeOutElastic","easeInOutElastic","easeInBack","easeOutBack","easeInOutBack","easeInBounce","easeOutBounce","easeInOutBounce"];
	var slide_size=0,slide_selector=$("#short-img li"),slide_t,temp=0,effect_len=0;
	/*menu*/
	menu_selector.hover(function(){
		$(this).find("ul").slideDown(200);
	},function(){
		$(this).find("ul").slideUp(500);
	});
	/*index mainbox*/
	$("#main-box tr:odd td").css({"background":"#f3f3f3"});
	/*slide play*/
	slide_size=slide_selector.size();
	effect_len=effect_arr.length;
	if(slide_size>1){
		slide_t=setInterval(slide_play,8000);
		slide_selector.hover(function(){
				clearInterval(slide_t);
			},function(){
				slide_t=setInterval(slide_play,8000);
			});
	}
	function slide_play(){
		slide_size=slide_selector.size();
		temp=Math.floor(Math.random()*slide_size);
		slide_selector
		/*def=effect_arr[Math.floor(Math.random()*effect_len)];*/
		slide_selector.eq(temp).show().siblings().hide();
	}
});