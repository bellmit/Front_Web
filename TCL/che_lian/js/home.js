$(function(){
	/*hot_btn declare*/
	var hots_btn_up=$("#hots_btn_up"),hots_btn_down=$("#hots_btn_down"),hots_show=$("#hots_show"),hots_btn=$("#hots_btn"),home_theme=$("#home_theme");
	var text_index=hots_show.find("li").index(),c_down=(function(){var i=0;return function(){return ++i;}}()),c_up=(function(){var j=0;return function(){return ++j;}}());
	var interval_id=setInterval(function(){news_slide(-1)},8000);
	
	/*up(left) click*/
	hots_btn_up.click(function(e){
		e.preventDefault();
		news_slide(1);
	});
	/*down(right) click*/
	hots_btn_down.click(function(e){
		e.preventDefault();
		news_slide(-1);
	});
	/*active function*/
	function news_slide(direction){
		if(arguments[0]==1){
			text_effect(hots_show,1,300);
		}else if(arguments[0]==-1){
			text_effect(hots_show,-1,300);
		}
	}
	/*text effect*/
	function text_effect(objs,direction,dur_times){
		if(arguments[1]==1){
			/*left*/
			var counts_down=c_down();
			if(counts_down<=(text_index+1)){
				objs.animate({top:(counts_down-(text_index+1))*31},dur_times);
			}else{
				counts_down%=(text_index+1);
				if(counts_down==0){
					objs.animate({top:counts_down*31},dur_times);
				}else if(counts_down==1){
					objs.animate({top:(counts_down-(text_index+1))*31},10);	
				}else{
					objs.animate({top:(counts_down-(text_index+1))*31},dur_times);
				}
			}
		}else if(arguments[1]==-1){
			/*right*/
			var counts_up=c_up();
			counts_up>text_index?counts_up%=(text_index+1):counts_up;
			if(counts_up==0){
				objs.animate({top:-counts_up*31},10);
			}else{
				objs.animate({top:-counts_up*31},dur_times);
			}
		}
	}
	/*mouse hover,out*/
	hots_btn.hover(function(){
		clearInterval(interval_id);
	},function(){
		interval_id=setInterval(function(){news_slide(-1)},8000);
	});
	hots_show.hover(function(){
		clearInterval(interval_id);
	},function(){
		interval_id=setInterval(function(){news_slide(-1)},8000);
	});
	/*theme img*/
	home_theme.each(function(){
        if($(this).width()>=950){
			this.width=950;
		}
    });
});