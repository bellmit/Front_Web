/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-2.1.4.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min',
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
require(['jquery','jquery_mobile','slide'],function($,$jm,Slide) {
	$(function(){
		
		//dom对象引用
		var $slideimg_show=$('#slideimg_show'),
			$slide_img=$('#slide_img'),
			$slideimg_btn=$('#slideimg_btn');
			

		//轮播动画
		Slide.slideToggle({
			$wrap:$slideimg_show,
			$slide_img:$slide_img,
			$btnwrap:$slideimg_btn,
			minwidth:640,
			isresize:false,
			size:3,
			times:5000,
			eff_time:500,
			btn_active:'slidebtn-active'
		});


	});
});



