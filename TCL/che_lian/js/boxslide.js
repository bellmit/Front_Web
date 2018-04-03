$(function(){
  //mapview
if($.browser.msie && $.browser.version<=6)
	{
		$(".mapView").css("position","absolute");
	}  
var ch=document.documentElement.clientHeight;
var dh=$(document).height();
var viewH=$('.mapView').outerHeight();
var okh=(ch-viewH)/2;
$('.mapView').css({'top':viewH*-1+'px','opacity':0});
  
$('#screen').click(function(){
  $('.mapView').stop(true).animate({top:-viewH,opacity:0},1500);
  $('#screen').hide();
})
$('.mapprev').click(function(){
  var h = $(document).height();
  $('#screen').css({ 'height': h });

  $('#screen').show();
  $('.mapView').stop(true).animate({top:okh,opacity:1},1500);
  baiduapi($(this).attr("data"));
})
function boxCheck(){
  if(viewH==ch || viewH==dh){
    alert('123');
	}else{
	  var okh2=(document.documentElement.clientHeight-viewH)/2;
      $('.mapView').stop(true).animate({top:okh2},1500);
	}
}
$(window).resize(function(){
  boxCheck();
})

function baiduapi(data){
var data=data.split(',');
var map = new BMap.Map("mapView01");
	var point = new BMap.Point(data[0],data[1]);
	map.centerAndZoom(point,13); 
	map.enableScrollWheelZoom();
	map.enableKeyboard();
	map.enableInertialDragging();
	map.enableContinuousZoom();
	map.addControl(new BMap.NavigationControl());//添加操作控件
	map.addControl(new BMap.OverviewMapControl());
	map.addControl(new BMap.MapTypeControl());
	var scalecs={offset:new BMap.Size(10,50)};
	map.addControl(new BMap.ScaleControl(scalecs));
}
})