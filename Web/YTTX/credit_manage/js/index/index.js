/*配置依赖*/
require.config({
	baseUrl:'../js/',
	paths:{
		'jquery':'lib/jquery/jquery.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min',
		'dialog':'lib/artDialog/dialog-plus'
	},
	shim:{
		'jquery_mobile':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','jquery_mobile','dialog'],function($,$jm,Dialog) {
	$(function(){
      	var $test=$('#test');
		$test.on('click',function(){
			console.log('aaa');
			console.log(Dialog);
			//dialog();
		});
	});
});



