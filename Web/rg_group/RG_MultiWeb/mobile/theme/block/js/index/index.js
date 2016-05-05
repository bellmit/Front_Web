(function($,w){
		$(function(){
				//页面元素引用
				var $info1_wrap=$('#info1_wrap').find('li'),$info2_wrap=$('#info2_wrap'),info1_width=$(w).width(),info2_width=info1_width;
				
				
				
				//初始化
				info1_width=info1_width-10;
				var wrap_height=parseInt(info1_width/4),
				wrap2_height=parseInt((info2_width-20)*0.80);
				
				if(wrap_height<=65){
						wrap_height=65;
				}
				if(wrap_height%2!=0){
					wrap_height=wrap_height-1;
				}
				if(wrap2_height>640){
					wrap2_height=640;
				}else if(wrap2_height<194){
					wrap2_height=194;
				}
				
				$info1_wrap.height(wrap_height);
				$info2_wrap.height(wrap2_height);
				//改变大小
				$(w).on('resize',function(){
						info1_width=$(w).width();
						info2_width=info1_width;
						info1_width=info1_width-10;
						wrap_height=parseInt(info1_width/4);
						wrap2_height=parseInt((info2_width-20)*0.80);
						if(wrap_height<=65){
								wrap_height=65;
						}
						if(wrap_height%2!=0){
							wrap_height=wrap_height-1;
						}
						if(wrap2_height>640){
							wrap2_height=640;
						}else if(wrap2_height<194){
							wrap2_height=194;
						}
						$info1_wrap.height(wrap_height);
						$info2_wrap.height(wrap2_height);
				});
		});
})(Zepto,window);