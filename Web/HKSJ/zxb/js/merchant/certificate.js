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
		'cookie':'plugins/cookie',
		'kindeditor':'plugins/kindeditor/kindeditor-all-min'
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
require(['jquery','dialog','rule','commonfn','validform','cookie','common','kindeditor'],
function($,undefined,Rule,CommonFn,undefined,undefined,Common,undefined) {
	$(function() {
		
			//文本标题以及提交按钮dom引用，其他变量
			var $license1_title=$('#license1_title'),
					$license2_title=$('#license2_title'),
					$license3_title=$('#license3_title'),
					$aptitude1_title=$('#aptitude1_title'),
					$aptitude2_title=$('#aptitude2_title'),
					$aptitude3_title=$('#aptitude3_title'),
					$certificate1_title=$('#certificate1_title'),
					$certificate2_title=$('#certificate2_title'),
					$certificate3_title=$('#certificate3_title'),
					$other1_title=$('#other1_title'),
					$other2_title=$('#other2_title'),
					$other3_title=$('#other3_title'),
					$save_btn=$('#save_btn'),
					dia=dialog();
					
			//图片上传dom序列		
			var text_item={
									'license1':{
										'name':'licenseTitle1',
										'node':$license1_title,
										'value':'',
										'url':''
									},
									'license2':{
										'name':'licenseTitle2',
										'node':$license2_title,
										'value':'',
										'url':''
									},
									'license3':{
										'name':'licenseTitle3',
										'node':$license3_title,
										'value':'',
										'url':''
									},
									'aptitude1':{
										'name':'aptitudeTitle1',
										'node':$aptitude1_title,
										'value':'',
										'url':''
									},
									'aptitude2':{
										'name':'aptitudeTitle2',
										'node':$aptitude2_title,
										'value':'',
										'url':''
									},
									'aptitude3':{
										'name':'aptitudeTitle3',
										'node':$aptitude3_title,
										'value':'',
										'url':''
									},
									'certificate1':{
										'name':'certificateTitle1',
										'node':$certificate1_title,
										'value':'',
										'url':''
									},
									'certificate2':{
										'name':'certificateTitle2',
										'node':$certificate2_title,
										'value':'',
										'url':''
									},
									'certificate3':{
										'name':'certificateTitle3',
										'node':$certificate3_title,
										'value':'',
										'url':''
									},
									'other1':{
										'name':'otherTitle1',
										'node':$other1_title,
										'value':'',
										'url':''
									},
									'other2':{
										'name':'otherTitle2',
										'node':$other2_title,
										'value':'',
										'url':''
									},
									'other3':{
										'name':'otherTitle3',
										'node':$other3_title,
										'value':'',
										'url':''
									}
							};
							
							
			//绑定监听标题输入
			for(var j in text_item){
					(function(j){
							text_item[j]['node'].on('keyup',function(){
										text_item[j]['value']=text_item[j]['node'].val();
							});
					})(j);	
			}
			
			
			
			//to do
			//保存操作
			$save_btn.on('click',function(){
					var result={};
					for(var m in text_item){
						result[text_item[m]['name']]=text_item[m]['value'];
					}
					
					//to do
					//填充验证相关数据
					$.ajax({
							url:'请求地址',
							type:'post',
							dataType:"json",
							data:result,
							success: function(data){
									//to do
									
									
									dia.content('<span class="g-c-green1">保存成功</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
							},
							error: function(){
									dia.content('<span class="g-c-red2">保存失败</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
							}
					});
					
					
			});
		
		
		
			//图片上传
			(function(K){
							//图片上传dom引用
							var license1=K('#license1'),
									license2=K('#license2'),
									license3=K('#license3'),
									aptitude1=K('#aptitude1'),
									aptitude2=K('#aptitude2'),
									aptitude3=K('#aptitude3'),
									certificate1=K('#certificate1'),
									certificate2=K('#certificate2'),
									certificate3=K('#certificate3'),
									other1=K('#other1'),
									other2=K('#other2'),
									other3=K('#other3');
									

							//图片上传dom序列		
							var upload_item=[license1,license2,license3,aptitude1,aptitude2,aptitude3,certificate1,certificate2,certificate3,other1,other2,other3],
							i=0,
							len=upload_item.length;
							

							var editor = K.editor({
									uploadJson : '地址',		
									imageSizeLimit : "8MB",
									allowFileManager : true
							});
							
							for(i;i<len;i++){
									(function(i){
											//to do
											upload_item[i].click(function(){
												
														var kthis=upload_item[i],
																self=this,
																text=text_item[self.id]['node'].val(),
																$hidden=$('#'+self.id+'_text');
																
																//kthis 为相应的kindeditor对象
																//text 为相应的文字值
																//$hidden为隐藏域对象
																
																
														editor.loadPlugin('image', function() {
																	editor.plugin.imageDialog({
																			showRemote : false,
																			imageUrl:'',
																			clickFn : function(url, title, width, height, border, align) {								//to do
																				//上传之前的操作
																				//发送ajax
																				text_item[self.id]['url']=url?url:'';
																				editor.hideDialog();
																			}
																	});
														});
											});
									})(i);
							}

				})(KindEditor);
		

			
		
			

			
	});
});
