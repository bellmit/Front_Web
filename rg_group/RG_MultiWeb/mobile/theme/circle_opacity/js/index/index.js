(function($,w){
		$(function(){
				var $info1_wrap=$('#info1_wrap'),info1_width=$(w).width();
				/*init*/
				var wrap_height=parseInt(info1_width*0.9);
				if(wrap_height<=200){
						wrap_height=200;
				}
				if(wrap_height%2!=0){
					wrap_height=wrap_height-1;
				}
				$info1_wrap.height(wrap_height);
				/*resize*/
				$(w).on('resize',function(){
						info1_width=$(w).width();
						wrap_height=parseInt(info1_width*0.9);
						if(wrap_height<=200){
								wrap_height=200;
						}
						if(wrap_height%2!=0){
							wrap_height=wrap_height-1;
						}
						$info1_wrap.height(wrap_height);
				});
		});
})(Zepto,window);