;(function(){
	if(typeof define === "function" && define.amd) {
		/*AMD模块支持*/
		define('eventSupport',function(){
				var EventName={"click": "click"};
				if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {
						EventName= {"click": "tap"};
				}else{
						EventName= {"click": "click"};
				}
				return EventName;
		});
	}else{
		/*非AMD模块*/
		(function(){
				var EventName={"click": "click"};
				if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {
						EventName= {"click": "tap"};
				}else{
						EventName= {"click": "click"};
				}
				if(typeof Zepto==='undefined'){
					window.Zepto.EventName=EventName;
				}else{
					Zepto.EventName=EventName;
				}
		}());
	}
}());