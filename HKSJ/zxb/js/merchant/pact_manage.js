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
					var K_householder_contract=K('#householder_contract'),
							K_zxb_contract=K('#zxb_contract');

					//户主合同上传
					var editor_householder = K.editor({
						uploadJson : '地址',		
						imageSizeLimit : "8MB",
						allowFileManager : true
					});
					
					//绑定上传还是浏览
					K_householder_contract.click(function(){
								var curobj=K(this),
										$this=$(this),
										$img=$this.children('img'),
										size=$img.length;
										
								if(size!=0){
										//to do
										//此处设置参数
										Common.setParams('pactmanage_params','id='+parseInt(Math.random()*100));
										window.location.href='pact_detail.html';
										return false;
								}else{
									editor_householder.loadPlugin('image', function() {
											editor_householder.plugin.imageDialog({
													showRemote : false,
													imageUrl:'',
													clickFn : function(url, title, width, height, border, align) {								
														//上传之前的操作
														editor_householder.hideDialog();
													}
											});
								});
								}
					});
					
					
					//装小宝合同上传
					var editor_zxb = K.editor({
						uploadJson : '地址',		
						imageSizeLimit : "8MB",
						allowFileManager : true
					});
					K_zxb_contract.click(function(){
								var curobj=K(this),
										$this=$(this),
										$img=$this.children('img'),
										size=$img.length;
									
								if(size!=0){
										//to do
										//此处设置参数
										Common.setParams('pactmanage_params','id='+parseInt(Math.random()*100));
										window.location.href='pact_detail.html';
										return false;
								}else{
									editor_zxb.loadPlugin('image', function() {
											editor_zxb.plugin.imageDialog({
													showRemote : false,
													imageUrl:'',
													clickFn : function(url, title, width, height, border, align) {								
														//上传之前的操作
														editor_zxb.hideDialog();
													}
											});
								});
								}	
								
					});
				
				
			})(KindEditor);
			
			
			//其他交互
			
			
	});
});
