(function($,w){
		$(function(){
				//页面元素引用
				var $info1_wrap=$('#info1_wrap').find('li'),info1_width=$(w).width()-10;
				//初始化
				var wrap_height=parseInt(info1_width/4);
				if(wrap_height<=80){
						wrap_height=80;
				}
				if(wrap_height%2!=0){
					wrap_height=wrap_height-1;
				}
				$info1_wrap.height(wrap_height);
				//改变大小
				$(w).on('resize',function(){
						info1_width=$(w).width()-10;
						wrap_height=parseInt(info1_width/4);
						if(wrap_height<=80){
								wrap_height=80;
						}
						if(wrap_height%2!=0){
							wrap_height=wrap_height-1;
						}
						$info1_wrap.height(wrap_height);
				});
		});
})(Zepto,window);