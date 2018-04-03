/*配置依赖*/
require.config({
	baseUrl:'../../js',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/manage_cityselect',
		'cookie':'plugins/cookie',
		'kindeditor':'plugins/kindeditor/kindeditor-all-min'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','cookie','common','kindeditor'],
function($,undefined,undefined,Common,undefined) {
	$(function() {
		
				//图片上传
				(function(K){
						var K_fileupload_btn=K('#fileupload_btn'),
								K_fileupload_text=K('#fileupload_text');
						

						var editor = K.editor({
								uploadJson : '地址',		
								imageSizeLimit : "8MB",
								allowFileManager : true
						});
						
						K_fileupload_btn.click(function(){
									var curobj=K(this);
									editor.loadPlugin('image', function() {
												editor.plugin.imageDialog({
														showRemote : false,
														imageUrl:'',
														clickFn : function(url, title, width, height, border, align) {								
															//上传之前的操作
															editor.hideDialog();
														}
												});
									});
						});
					
				})(KindEditor);
				
				
				
				//其他交互
				
				
		
	});
});
