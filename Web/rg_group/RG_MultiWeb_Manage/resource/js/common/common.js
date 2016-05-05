define('common',function(require){
		var $=require('jquery');
		return {
			/*顶部菜单下拉子菜单是否已经显示*/
			isshowmenu:false,
			/*顶部菜单下拉子菜单切换*/
			menuToggle:function(btn){
				this.isshowmenu=this.isshowmenu?false:true;
				btn.toggleClass('subitem').next().slideToggle(200);
			},
			/*顶部菜单下拉子菜单隐藏*/
			menuHide:function(btn){
				btn.removeClass('subitem').next().slideUp(200);
				this.isshowmenu=false;
			}
		}
});



/*程序入口*/
require(['jquery','common'], function($,Common) {
	$(function() {
			/*页面元素引用*/
			var $submenuitem=$('#submenuitem'),
					$submenuwrap=$('#submenuitem').next();
			
					
			/*顶部菜单切换显示隐藏*/
			$submenuitem.click(function(){
					Common.menuToggle($(this));
			});
			$submenuwrap.on('mouseleave',function(){
				Common.menuHide($submenuitem);
			});
			$submenuwrap.delegate('a','click',function(){
				Common.menuHide($submenuitem);
			});

	});
});





