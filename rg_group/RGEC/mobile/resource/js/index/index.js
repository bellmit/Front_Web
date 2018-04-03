(function($,w){
		/*设备适配*/
		if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
				var EventName = {"click": "tap"};
		}else{ //电脑访问
				var EventName = {"click": "click"};
		}
		
		$(function(){
				var $gk_wrap=$('#gk_wrap').find('tr'),gk_width=$(w).width()-10;
				/*init*/
				var wrap_height=parseInt((gk_width/3));
				if(gk_width<=240){
						gk_width=240;
				}
				if(wrap_height%2!=0){
					wrap_height=wrap_height-1;
				}
				$gk_wrap.height(wrap_height);
				/*resize*/
				$(w).on('resize',function(){
						gk_width=$(w).width()-10;
						wrap_height=parseInt((gk_width/3));
						if(gk_width<=240){
								gk_width=240;
						}
						if(wrap_height%2!=0){
							wrap_height=wrap_height-1;
						}
						$gk_wrap.height(wrap_height);
				});
		});
})(Zepto,window);