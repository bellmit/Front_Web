(function($,w){
	/*设备判断*/
	if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
			var EventName = {"click": "tap"};
	}else{ //电脑访问
			var EventName = {"click": "click"};
	}
	/*服务对象*/
	var storeinfo_obj=storeinfo_obj||{
				/*显示得分形状*/
				showScoreShape:function(wrap1,wrap2,str){
						var score=wrap1.text().match(/[\d*\.*]/g),
								scores=parseInt(str,10);
						if(score==null){
							wrap2.css({width:0});
						}else{
							score=score.join('');
							if(score==scores||score>scores){
								wrap2.css({width:'100%'});
							}else{
								var templen=parseInt((score/scores)*100);
								wrap2.css({width:templen+'%'});
							}	
						}
				}
	};
	
	$(function(){
		/*页面元素引用*/
		var $score_shape=$('#score_shape'),
				$score_number=$('#score_number');
		/*图像显示*/
		storeinfo_obj.showScoreShape($score_number,$score_shape,5);
		
	});
})(Zepto,window);