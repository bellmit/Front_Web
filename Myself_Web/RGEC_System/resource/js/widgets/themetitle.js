/*
author:yipin,
name:submenu 
主题标题跳转效果
*/
define(['common'],function (Common) {
		//回调函数，是否需要跳转（默认为false或不传）

		
		$.fn.ThemeTitle=function(fn,flag){
				var themetitle=this;
				
				//初始化
				if(flag){
						(function(){
								var $themetitle=themetitle.find('li'),
										current=Common['page'];
										
								$themetitle.each(function(index, element) {
										var $this=$(this),
												data_part=$this.attr('data-part');
												if(data_part==current){
														$this.removeClass('theme-mask').siblings().addClass('theme-mask');
														return false;
												}
								});
						}());
				}else{
						//绑定事件
						themetitle.delegate('li','click',function(e){
								e.preventDefault();
								if(fn){
									fn.call($(this));
								}
								return false;
						});
				}
				return this;
		}
		
    return;
});