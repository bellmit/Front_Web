/*
author:yipin,
name:submenu 
子导航执行
*/
define(['common'],function (Common) {
		//回调函数，是否需要跳转（默认为false或不传）
		$.fn.subMenuItem=function(fn,flag){
				var submenu=this;
				
				//初始化
				if(flag){
						(function(){
								var $subitem=submenu.find('li'),
										current=Common['page'];
								$subitem.each(function(index, element) {
										var $this=$(this),
												$a=$this.find('a'),
												data_part=$a.attr('data-part');
												if(data_part==current){
														$this.addClass('submenu-active');
														return false;
												}
								});
						}());
				}else{
						//绑定事件
						submenu.delegate('li','click',function(e){
								e.preventDefault();
								var $this=$(this);
								$this.addClass('submenu-active').siblings().removeClass('submenu-active');
								if(fn){
									fn.call($this);
								}
								return false;
						});
				}
				return this;
		}
		
    return;
});