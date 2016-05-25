/*配置依赖*/
require.config({
	baseUrl:'../js/',
	paths:{
		'jquery':'lib/jquery/jquery.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min',
		'artdialog':'lib/artDialog/dialog-plus-min'
	},
	shim:{
		'jquery_mobile':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','jquery_mobile','artdialog'],function($,$jm,ArtDialog=(function(){return window.dialog;}())) {
	$(function(){
      	var $test=$('#test');
		$test.on('click',function(){
			console.log('aaa');
			//console.log(ArtDialog);
			//console.log(dia);
			ArtDialog().show();
			//dialog();
		});
	});
});



