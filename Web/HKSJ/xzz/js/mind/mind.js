/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-2.1.4.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min',
		'imglist':'widgets/imglist'
	},
	shim:{
		'jquery_mobile':{
				deps:['jquery']
		},
		'imglist':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','jquery_mobile','imglist'],function($,$jm,undefined) {

	$(function(){
			
			var $mind_show=$('#mind_show');
			
			
			//九宫格图片布局
			$.imgList($mind_show,'a',3);



	});
});



