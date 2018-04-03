/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-2.1.4.min'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery'],function($) {
	$(function() {

			//页面元素获取
			var $share_download=$('#share_download'),
					type=navigator.userAgent;
			
				
				
				if(/(iPhone|iPod|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone|android|Android)/i.test(type)){
						//移动设备
						if(/(android|Android)/i.test(type)){
								//android
								$share_download.attr('href','http://a.app.qq.com/o/simple.jsp?pkgname=com.huika.xiaozizhuan');
						}else if(/(iPhone|iPod|ios|iOS|iPad)/i.test(type)){
								//ios
								$share_download.attr('href','#');
						}else if(/Backerry|WebOS|Symbian/i.test(type)){
								//other phone
								$share_download.attr('href','#');
						}else if(/Windows Phone|Phone/i.test(type)){
								//window phone
								$share_download.attr('href','#');
						}
				}else if(/Linux/i.test(type)){
					//linux
					$share_download.attr('href','http://a.app.qq.com/o/simple.jsp?pkgname=com.huika.xiaozizhuan');
				}else if(/MicroMessenger/i.test(type)){
					//微信
					$share_download.attr('href','#');
				}else{
					//pc平台
					$share_download.attr('href','http://xiaozizhuan.com/');
				}
				

	});
});




