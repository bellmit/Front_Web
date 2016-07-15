


/*程序入口*/
require(['jquery','city_select'],
function($,City_Select) {
	$(function() {
			//页面元素获取
			var $applytype=$('#applytype'),
				$applyprovince=$('#applyprovince'),
				$applycity=$('#applycity');
			

			
			//省份和城市选择
			City_Select.areaSelect({
					$province:$applyprovince,
					$city:$applycity,
					$area:null
			});

	});
});
