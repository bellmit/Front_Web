// JavaScript Document
$(document).ready(
				  function(){
		
var map=new BMap.Map("maps");
var point=new BMap.Point(112.94,28.22);
map.centerAndZoom(point,16);//初始化
map.enableScrollWheelZoom();
map.enableKeyboard();
map.enableInertialDragging();
map.enableContinuousZoom();
map.addControl(new BMap.NavigationControl());//添加操作控件
map.addControl(new BMap.OverviewMapControl());
map.addControl(new BMap.MapTypeControl());
var scalecs={offset:new BMap.Size(10,50)};
map.addControl(new BMap.ScaleControl(scalecs));
//map.addContextMenu(menu:ContextMenu); 
var local=new BMap.LocalSearch(map,{renderOptions:{map:map}});
local.searchInBounds("车",map.getBounds());
var xdzc=new BMap.Geocoder();
xdzc.getPoint("长沙市岳麓区金星路",function(point){
if(point){
map.addOverlay(new BMap.Marker(point));}
},"长沙市");					  
					  
					  
					  
					  }

				  );