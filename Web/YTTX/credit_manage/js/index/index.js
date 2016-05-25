/*配置依赖*/
require.config({
	baseUrl:'../js/',
	paths:{
		'jquery':'lib/jquery/jquery.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min'
	},
	shim:{
		'jquery_mobile':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','jquery_mobile'],function($,$jm) {
	$(function(){
      	
	});
});



