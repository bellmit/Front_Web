/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'slide':'widgets/slide',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select',
		'modal_dialog':'widgets/modal_dialog',
		'cookie':'plugins/cookie'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog','slide','cookie','common'],function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,Slide,undefined,Common) {
	$(function() {
			//页面元素获取
			var $slide_tab=$('#slide_tab'),
					$applytype=$('#applytype'),
					$applyprovince=$('#applyprovince'),
					$applycity=$('#applycity');

			
			//轮播动画
			Slide.slideToggle({
					$wrap:$('#slideimg_show'),
					$slide_img:$('#slide_img'),
					$btnwrap:$('#slideimg_btn'),
					$slide_tipwrap:$('#slide_tips'),
					minwidth:1190,
					times:6000,
					eff_time:500,
					btn_active:'slidebtn-active'
			})
				
			
	});
});
