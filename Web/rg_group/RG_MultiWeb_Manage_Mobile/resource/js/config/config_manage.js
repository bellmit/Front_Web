(function($,w){
	$(function(){	
			/*页面元素引用*/
			var $config_wrap=$('#config_wrap');
	
			/*按钮形状*/
			$config_wrap.columnBtnRender('li',2);
			var tempi=0;
			$(w).on('resize',function(){
					tempi++;
					if(tempi==1){
						  //延迟执行主要为了防止频繁切换窗口大小和缓慢切换窗口大小
							setTimeout(function(){
									$config_wrap.columnBtnRender('li',2);
									tempi=0;
							},250);
					}
			});
			

	});
})(Zepto,window);












