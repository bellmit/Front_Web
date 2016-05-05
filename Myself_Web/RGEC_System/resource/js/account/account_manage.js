/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'dialog':'js/lib/artDialog/dialog',
		'querydata':'js/widgets/querydata',
		'validform':'js/plugins/validform',
		'common':'js/common/common',
		'submenu':'js/widgets/submenu',
		'themetitle':'js/widgets/themetitle'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'validform':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery','dialog','querydata','validform']
		},
		'submenu':{
				deps:['jquery']
		},
		'themetitle':{
				deps:['jquery','common']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle'], function($,$strap,undefined,undefined,undefined,Common,undefined,undefined) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
			$theme_title=$('#theme_title');
			
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);	
			
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			
	});
});
