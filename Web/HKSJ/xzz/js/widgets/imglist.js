/***
name:imglist
author:yipin
随记图片九宫格或者多宫格
***/

define(['jquery'],function($){
	$.imgList=function(wrap,selector,n){
		
		
					var $items=wrap.find(selector),
					len=$items.size(),
					winwidth=$(wrap).width(),
					itemheight=parseInt(winwidth/n,10);
					

					
					
					//初始化
					if(len<=n){
							wrap.height(parseInt(winwidth/n - 10,10));	
					}else if(len>n&&len<=2*n){
							wrap.height(parseInt((winwidth*2)/n - 10,10));
					}else if(len>2*n){
							wrap.height(parseInt(winwidth - 10,10));
					}
					for(var i=0;i<len;i++){
							$items.eq(i).css({
								'height':itemheight
							});
					}
					
					//绑定转屏事件
					$(window).on('orientationchange',function(e){
							winwidth=$(wrap).width();
							itemheight=parseInt(winwidth/n,10);
							if(len<=n){
									wrap.height(parseInt(winwidth/n - 10,10));	
							}else if(len>n&&len<=2*n){
									wrap.height(parseInt((winwidth*2)/n - 10,10));
							}else if(len>2*n){
									wrap.height(parseInt(winwidth - 10,10));
							}
							for(var i=0;i<len;i++){
									$items.eq(i).css({
										'height':itemheight
									});
							}
					});
			}
});
