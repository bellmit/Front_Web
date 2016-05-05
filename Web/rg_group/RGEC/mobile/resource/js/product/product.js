if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
    var EventName = {"click": "tap"};
}else{ //电脑访问
    var EventName = {"click": "click"};
}
(function($){
	$(function(){
		/*产品列表*/
		$('.rg-la-title').click(function(e){
			$(this).find('span').toggleClass('rg-la-iconshow').end().next('ul').toggle().end().parent().siblings().find('h2 span').removeClass('rg-la-iconshow').end().find('ul').hide();
		});		
	});
})(Zepto);