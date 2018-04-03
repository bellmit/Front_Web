/*配置依赖*/
require.config({
	baseUrl:'../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','common'], function($,$strap,undefined) {
	$(function() {
			
	});
});
