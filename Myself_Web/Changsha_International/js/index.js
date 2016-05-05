// JavaScript Document
$(function(){
	/*slide play*/
	var effect_arr=["easeInQuad","easeOutQuad","easeInOutQuad","easeInCubic","easeOutCubic","easeInOutCubic","easeInQuart","easeOutQuart","easeInOutQuart","easeInQuint","easeOutQuint","easeInOutQuint","easeInSine","easeOutSine","easeInOutSine","easeInExpo","easeOutExpo","easeInOutExpo","easeInCirc","easeOutCirc","easeInOutCirc","easeInElastic","easeOutElastic","easeInOutElastic","easeInBack","easeOutBack","easeInOutBack","easeInBounce","easeOutBounce","easeInOutBounce"];
	var slide_size=0,slide_selector=$("#slide-wrap li"),slide_t,temp=0,effect_len=0;
	slide_size=slide_selector.size();
	effect_len=effect_arr.length;
	if(slide_size>1){
		slide_t=setInterval(slide_play,6000);
		slide_selector.hover(function(){
				clearInterval(slide_t);
			},function(){
				slide_t=setInterval(slide_play,6000);
			});
	}
	function slide_play(){
		slide_size=slide_selector.size();
		temp=Math.floor(Math.random()*slide_size);
		def=effect_arr[Math.floor(Math.random()*effect_len)];
		slide_selector.eq(temp).fadeIn(1000).siblings().fadeOut(1000);
	}
});