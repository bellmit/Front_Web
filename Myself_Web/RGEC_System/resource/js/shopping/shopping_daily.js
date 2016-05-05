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
		'themetitle':'js/widgets/themetitle',
		'submenu':'js/widgets/submenu',
		'rule':'js/widgets/rules',
		'commonfn':'js/widgets/commonfn',
		'gridaction':'js/widgets/gridaction'
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
		'themetitle':{
				deps:['jquery','common']
		},
		'submenu':{
				deps:['jquery','common']
		},
		'commonfn':{
				deps:['jquery','rule']
		},
		'gridaction':{
				deps:['jquery','dialog']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','themetitle','submenu','rule','commonfn','gridaction'], function($,$strap,undefined,undefined,undefined,Common,undefined,undefined,Rule,CommonFn,GridAction) {
	$(function() {
			//页面元素引用
			var $theme_title=$('#theme_title'),
					$submenu=$('#submenu');

			
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);	
			
			
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			

			
			
			
			
	});
});
