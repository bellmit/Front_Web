(function($,p){
	/*公共模块引用*/
	var c=p.common;
	$(function(){
		/*页面元素引用*/
		var $mbtn=$('#rg_menu_menu'),
			$nbox=$('#rg_navbox'),
			$nbtn=$('#rg_navtog'),
			$nbar=$('#rg_navbar'),
			$sbtn=$('#rg_menu_search'),
			$sbox=$('#rg_searchbox');
		/*菜单显示隐藏*/
		c.navTog($mbtn,$nbox);
		c.subNavTog($nbtn,$nbar);
		/*菜单格式化*/
		c.subNavFormat($nbar,18);
		/*菜单高亮效果*/
		c.subNavLH($nbar);
		/*搜索显示隐藏*/
		c.searchTog($sbtn,$sbox);
	});
})(Zepto,rg_portal);