$(function(){
	var mapObj,toolbar,overview,scale,contextMenu,mouseTool,inforWindow;
  //mapview
if($.browser.msie && $.browser.version<=6)
	{
		$(".mapView").css("position","absolute");
	}  
var ch=document.documentElement.clientHeight;
var dh=$(document).height();
var viewH=$('.mapView').outerHeight();
var okh=(ch-viewH)/2;
$('.mapView').css({'top':okh+'px','opacity':0});
  
$('#screen').click(function(){
  $('.mapView').stop(true).animate({opacity:0},1500);
  $('#screen').hide();
  $('.mapView').hide();
})
$('.mapprev').live("click",function(){
	$('.mapView').show();
  var h = $(document).height();
  $('#screen').css({ 'height': h });

  $('#screen').show();
  $('.mapView').stop(true).animate({opacity:1},1500);
  baiduapi($(this).attr("data"),"mapView01");
});
function boxCheck(){
  if(viewH==ch || viewH==dh){
  //  alert('123');
	}else{
	  var okh2=(document.documentElement.clientHeight-viewH)/2;
      $('.mapView').stop(true).animate({top:okh2},1500);
	}
}
$(window).resize(function(){
  boxCheck();
})

function baiduapi(data,divid){
	var path = $('#path').val();
	$('#'+divid).html('');
	var data=data.split(',');
	var opt = {center:new MMap.LngLat(data[1],data[0]),doubleclick:true,
			   keyboardEnable:false, dragEnable:true,scrollWheel : true,level:14};
	mapObj = new MMap.Map(divid, opt);
	var marker2 = new MMap.Marker({
		position:new MMap.LngLat(data[1], data[0]),
		icon:path+"/resources/images/curmarker.png",
		draggable:false,
		visible:true,
		offset:{x:-9,y:-28}
	});
	mapObj.plugin(["MMap.ToolBar", "MMap.OverView", "MMap.Scale","MMap.MouseTool"], function(){
		toolbar = new MMap.ToolBar(); toolbar.autoPosition = false; mapObj.addControl(toolbar); toolbar.hideRuler();
		overview = new MMap.OverView();  mapObj.addControl(overview);  overview.close(); toolbar.hideDirection();
		scale = new MMap.Scale();mapObj.addControl(scale); 
//		mouseTool = new MMap.MouseTool(mapObj); 
		mapObj.bind(mapObj,"mouseover",function(e) {
			mapObj.setStatus({dragEnable:true});
		});
		mapObj.bind(mapObj,"click",function(e){
			mapObj.setStatus({dragEnable:true});
			});
		});
	
	var info = [];  
	info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>车友分享</b>");   
	info.push("地址 : "+data[2]+"</div></div>");   
	inforWindow = new MMap.InfoWindow({   
		content:info.join("<br/>")   
	});
	mapObj.addOverlays(marker2);
	
	mapObj.bind(marker2,"click",function(){
		inforWindow.open(mapObj,new MMap.LngLat(data[1], data[0])); 
	});
	inforWindow.open(mapObj,new MMap.LngLat(data[1], data[0])); 
	}
})

function mapInit(data,divid){
	var path = $('#path').val();
	$('#'+divid).empty();
	var data=data.split(',');
	var opt = {center:new MMap.LngLat(data[1],data[0]),level:14};
	var mapObj = new MMap.Map(divid, opt);
	var marker2 = new MMap.Marker({
		position:new MMap.LngLat(data[1], data[0]),
		icon:path+"/resources/images/curmarker.png",
		draggable:false,
		visible:true,
		offset:{x:-9,y:-28}
	});
	mapObj.setStatus({scrollWheel:false});
	mapObj.addOverlays(marker2);
}


