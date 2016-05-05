(function($){
	$(function(){
		var $geo_wrap=$('#geo_wrap');
		var geo=window.navigator.geolocation,geoid=null,geocound=0;
		$geo_wrap.click(function(e){
			var o=e.target,on=o.nodeName;
			if(on.toLowerCase()=='li'){
				var $o=$(o),txt=$o.text();
				if(geo){
					switch(txt){
						case 'getCurrentPosition':
							geo.getCurrentPosition(function(suc){
								var sucobj=suc.coords;
								alert('纬度：'+sucobj.latitude+', 纬度：'+sucobj.longitude+', 精度：'+sucobj.accuracy);
							},function(err){
								if(err.code==0){
									alert('包含相关错误信息: '+err.message);
								}else if(err.code==1){
									alert('用户拒绝浏览器获取位置信息的请求');
								}else if(err.code==2){
									alert('网络不可用或者连接不到相关定位服务');
								}else if(err.code==3){
									alert('获取超时');
								}
							},{
								enableHighAcuracy:false,
								timeout:5000
							});
							break;
						case 'watchPosition':
							geoid=geo.watchPosition(function(suc){
								geocound++;
								var sucobj=suc.coords;
								alert('第'+geocound+'次统计,  纬度：'+sucobj.latitude+', 纬度：'+sucobj.longitude+', 精度：'+sucobj.accuracy);
							},function(err){
								geocound++;
								if(err.code==0){
									alert('第'+geocound+'次统计, 包含相关错误信息: '+err.message);
								}else if(err.code==1){
									alert('第'+geocound+'次统计, 用户拒绝浏览器获取位置信息的请求');
								}else if(err.code==2){
									alert('第'+geocound+'次统计, 网络不可用或者连接不到相关定位服务');
								}else if(err.code==3){
									alert('第'+geocound+'次统计, 获取超时');
								}
							},{
								enableHighAcuracy:false,
								timeout:5000,
								maximumAge:20000
							});
							break;
						case 'clearWatch':
							if(geoid!=null){
								geo.clearWatch(geoid);
								geoid=null;
								geocound=0;
								alert('清除成功! 计数器置默认值： '+geocound);
							}else{
								alert('已经执行过清除操作');
							}
							break;	
					}		
				}else{
					alert('no geolocation');
					return false;
				}
			}
		});
	});
})(jQuery);