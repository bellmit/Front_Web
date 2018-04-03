/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
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
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog'],function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog) {
	$(function() {
			


			//初始化所有弹窗
			Modal_Dialog.modalInit();
		
			//初始化指定弹窗
			//Modal_Dialog.modalInit(['apply']);
			
			
			
			
			//弹窗显示调用
			Modal_Dialog.modal('login');
			Modal_Dialog.modal('price');
			Modal_Dialog.modal('design');
			Modal_Dialog.modal('company_success');
			Modal_Dialog.modal('info_success');
			Modal_Dialog.modal('apply');
	});
});


