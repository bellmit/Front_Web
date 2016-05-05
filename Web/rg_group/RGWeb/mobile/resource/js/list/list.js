(function($,w){
		/*设备适配*/
		if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
				var EventName = {"click": "tap"};
		}else{ //电脑访问
				var EventName = {"click": "click"};
		}
		
		$(function(){
				var $info1_wrap=$('#info1_wrap').find('tr'),$info2_wrap=$('#info2_wrap').find('tr'),info1_width=$(w).width()-10;
				/*init*/
				var wrap_height=parseInt((info1_width/3));
				if(info1_width<=200){
						info1_width=200;
				}
				if(wrap_height%2!=0){
					wrap_height=wrap_height-1;
				}
				$info1_wrap.height(wrap_height);
				$info2_wrap.height(wrap_height);
				/*resize*/
				$(w).on('resize',function(){
						info1_width=$(w).width()-10;
						wrap_height=parseInt((info1_width/3));
						if(info1_width<=200){
								info1_width=200;
						}
						if(wrap_height%2!=0){
							wrap_height=wrap_height-1;
						}
						$info1_wrap.height(wrap_height);
						$info2_wrap.height(wrap_height);
				});
		});
})(Zepto,window);