/*配置依赖*/
require.config({
	baseUrl:'../js/',
	paths:{
		'jquery':'lib/jquery/jquery-2.1.4.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min',
		'dialog':'lib/artDialog/dialog',
		'slide':'widgets/slide'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'jquery_mobile':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','jquery_mobile','dialog','slide'],function($,$jm,undefined,Slide) {
	$(function(){
       console.log('watch aaaaaaaaaaaaa');
	});
});



