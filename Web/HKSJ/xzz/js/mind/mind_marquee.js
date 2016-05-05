/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-2.1.4.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min',
		'marquee':'widgets/marquee'
	},
	shim:{
		'jquery_mobile':{
				deps:['jquery']
		}
	}
});





/*程序入口*/
/*程序入口*/
require(['jquery','jquery_mobile','marquee'],function($,$jm,Marquee) {
		$(function(){
	

			//页面元素获取
			var $marquee_wrap=$('#marquee_wrap'),
				$marquee_remark=$('#marquee_remark'),
				$marquee_number=$('#marquee_number');
					
		

				//初始化调用图片浏览
				Marquee.init({
					$marquee_wrap:$marquee_wrap,
					$marquee_remark:$marquee_remark,
					$marquee_number:$marquee_number
				});

				//执行图片渲染请求
				Marquee.render({
					'url':'../../json/mind_marquee.json',
					'params':'id=1'
				});

	});
});






