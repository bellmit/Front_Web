/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'cookie':'plugins/cookie',
		'city_select':'widgets/city_select',
		'modal_dialog':'widgets/modal_dialog'
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
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog','cookie','common'],function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Common)  {
	$(function() {
			//页面元素获取
			
			
			
			
			
			
	});
});
