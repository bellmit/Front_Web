(function(){
	var map = new BMap.Map("contact_maps");
	var point = new BMap.Point(113.9500,22.5800);
	map.centerAndZoom(point,16); 
	map.enableScrollWheelZoom();
	map.enableKeyboard();
	map.enableInertialDragging();
	map.enableContinuousZoom();
	map.addControl(new BMap.NavigationControl());//添加操作控件
	map.addControl(new BMap.OverviewMapControl());
	map.addControl(new BMap.MapTypeControl());
	var scalecs={offset:new BMap.Size(10,50)};
	map.addControl(new BMap.ScaleControl(scalecs));
})();