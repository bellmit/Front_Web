/*配置依赖*/
require.config({
	baseUrl:'../../resource/js',
	paths:{
		'jquery':'lib/jquery.min',
		'dialog':'plugins/artdialog/dialog',
		'page':'plugins/easyui_page/pagination',
		'common':'common/common'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'page':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		}
	}
});

	

/*程序入口*/
require(['jquery','dialog','page','common'], function($,undefined,undefined,undefined) {
	$(function() {
			/*加载完成即渲染分页组件*/
			$.parser.parse();
			
			var $template_wrap=$('#template_wrap');
			
			/*启用模板*/
			$('#template1,#template2,#template3,#template4').click(function(){
				$(this).parent().parent().insertBefore($template_wrap.find('li.template-type:first'));
				//to do 可能需要做数据交互的地方
			});
			
	});
});












