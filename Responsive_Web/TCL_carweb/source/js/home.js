$(function(){
	/*hot_btn declare*/
	var hots_btn_up=$("#hots_btn_up"),hots_btn_down=$("#hots_btn_down"),upi=0,downi=0,hots_show=$("#hots_show li"),hots_btn=$("#hots_btn"),home_theme=$("#home_theme");
	var text_index=hots_show.index(),interval_id=setInterval(news_slide,8000);
	/*up(left) click*/
	hots_btn_up.click(function(e){
		e.preventDefault();
		news_slide();
	});
	/*down(right) click*/
	hots_btn_down.click(function(e){
		e.preventDefault();
		downi--;
		if(downi==-1){
			downi=text_index;
		}
		hots_show.eq(downi).slideDown(200).siblings().slideUp(200);
	});
	/*timer function*/
	function news_slide(){
		upi++;
		hots_show.eq(upi).slideDown(200).siblings().slideUp(200);
		if(upi==text_index){
			upi=-1;
		}
	}
	/*mouse hover,out*/
	hots_btn.hover(function(){
		clearInterval(interval_id);
	},function(){
		interval_id=setInterval(news_slide,8000);
	});
	hots_show.hover(function(){
		clearInterval(interval_id);
	},function(){
		interval_id=setInterval(news_slide,8000);
	});
	/*theme img*/
	home_theme.each(function(){
        if($(this).width()>=950){
			this.width=950;
		}
    });
});