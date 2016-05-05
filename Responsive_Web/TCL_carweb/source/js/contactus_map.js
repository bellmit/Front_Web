(function(){
	 var mapObj,tool,view,scale, inforWindow; 
	 var path = $("#managerpath").val()+"/"+$("#paperFile").val();
	 var opt = {level:13,center:new MMap.LngLat(113.929138,22.574227), doubleclick:true, scrollwheel:true,
			   keyboardEnable:true};
		var mapObj = new MMap.Map('contact_maps', opt);
		mapObj.plugin(["MMap.ToolBar", "MMap.OverView", "MMap.Scale","MMap.MouseTool"], function(){
		toolbar = new MMap.ToolBar(); toolbar.autoPosition = false; mapObj.addControl(toolbar);
		overview = new MMap.OverView();  mapObj.addControl(overview);  overview.close();
		scale = new MMap.Scale();mapObj.addControl(scale); 
		mouseTool = new MMap.MouseTool(mapObj); 
		mapObj.bind(mapObj,"mouseover",function(e) {
			mapObj.setStatus({dragEnable:true});
		});
		mapObj.bind(mapObj,"click",function(e){
			mapObj.setStatus({dragEnable:true});
		}); 
	});
	var info = [];  
		info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>TCL康钛汽车信息服务有限公司</b>");   
		info.push("地址 : 深圳市南山区中山园路1001号TCL国际E城C11栋F号</div>");   
		inforWindow = new MMap.InfoWindow({   
			content:info.join("<br/>")   
		});
		var marker2 = new MMap.Marker({
			position:new MMap.LngLat(113.929138,22.574227),
			icon:path+"/images/curmarker.png",
			draggable:false,
			visible:true,
			offset:{x:-9,y:-28}
		});
		
		mapObj.addOverlays(marker2);
		
		mapObj.bind(marker2,"click",function(){
			inforWindow.open(mapObj,new MMap.LngLat(113.929138,22.574227));
		});
		inforWindow.open(mapObj,new MMap.LngLat(113.929138,22.574227));
})();