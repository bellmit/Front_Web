/***
name:grid
author:yipin
多宫格布局
***/

define(['jquery'],function($){
	var isMobile=(function(){
			 if(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i.test(navigator.userAgent)){
				 return true;
			 }else{
				 return false;
			 }
		 }());
		 
		 
	return {
		
		imgList:function(wrap,selector,n){
					var $items=wrap.find(selector),
					len=$items.size(),
					winwidth=$(wrap).width(),
					itemheight=parseInt(winwidth/n,10);
					
					
					//初始化
					doLayout(wrap,$items,len,n);
					
					
					//绑定转屏事件或者窗口事件适配pc和移动端
					$(window).on(isMobile?'orientationchange':'resize',function(e){
						doLayout(wrap,$items,len,n);
					});
			}
	}
	
	
	//服务函数
	function doLayout(wrap,$items,len,n){
		var winwidth=$(wrap).width(),
			itemheight=parseInt(winwidth/n,10);
			
		for(var i=0;i<len;i++){
				$items.eq(i).css({
					'height':itemheight
				});
		}
	}
	
	
});
