/*程序入口*/
(function($,w){
	$(function(){
		
			//页面元素引用
			var $index_list=$('#index_list');
		
		
			
			
			//菜单排版
			$index_list.columnBtnRender('li',3,true);
			var tempi=0;
			$(w).on('resize',function(){
					tempi++;
					if(tempi==1){
						  //延迟执行主要为了防止频繁切换窗口大小和缓慢切换窗口大小
							setTimeout(function(){
									$index_list.columnBtnRender('li',3,true);
									tempi=0;
							},250);
					}
			});
			
			
			
	});
})(Zepto,window);



    









