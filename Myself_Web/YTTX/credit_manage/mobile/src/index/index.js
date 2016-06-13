/*配置依赖*/
require.config({
	baseUrl:'../../',
	paths:{
		'zepto':'../js/lib/zepto/zepto',
	}
});


/*程序入口*/
require(['zepto'],function($) {
	$(function(){
      	console.log('aaaaa');
	});
});



