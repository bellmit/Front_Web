/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){
		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'../../json/menu.json',
				async:false,
				type:'post',
				datatype:'json'
			});



			/*dom引用和相关变量定义*/
			var module_id='yttx-setting-certification'/*模块id，主要用于本地存储传值*/,
				dia=dialog({
					zIndex:2000,
					title:'温馨提示',
					okValue:'确定',
					width:300,
					ok:function(){
						this.close();
						return false;
					},
					cancel:false
				})/*一般提示对象*/,
				$admin_legalName=$('#admin_legalName'),
				$admin_identity=$('#admin_identity'),
				$admin_identityJust=$('#admin_identityJust'),
				$admin_identityBack=$('#admin_identityBack'),
				$admin_identityHand=$('#admin_identityHand'),
				$admin_businessLicenseImage=$('#admin_businessLicenseImage'),
				$admin_identityJust_upload=$('#admin_identityJust_upload'),
				$admin_identityBack_upload=$('#admin_identityBack_upload'),
				$admin_identityHand_upload=$('#admin_identityHand_upload'),
				$admin_businessLicenseImage_upload=$('#admin_businessLicenseImage_upload'),
				$admin_identityJust_show=$('#admin_identityJust_show'),
				$admin_identityBack_show=$('#admin_identityBack_show'),
				$admin_identityHand_show=$('#admin_identityHand_show'),
				$admin_businessLicenseImage_show=$('#admin_businessLicenseImage_show'),
				$admin_businessLicense=$('#admin_businessLicense'),
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_title=$('#show_detail_title')/*详情标题*/,
				$show_detail_content=$('#show_detail_content'),
				QN=new QiniuJsSDK()/*七牛对象*/,
				img_token=getToken()||null/*详情内容*/;



			/*上传对象*/
			var logo_uploadjust=new plupload.Uploader({
						runtimes: 'html5,html4,flash,silverlight',
						browse_button : 'admin_identityJust_view',
						multi_selection:false,
						multipart:true,/*默认上传方式表单或二进制*/
						multipart_params:{
							"providerId":decodeURIComponent(logininfo.param.providerId),
							"userId":decodeURIComponent(logininfo.param.userId),
							"token":decodeURIComponent(logininfo.param.token),
							"operationType":2,
							"logoImage":''
						},/*自定义其他参数*/
						container: document.getElementById('admin_identityJust'),
						url : "http://10.0.5.222:8080/yttx-providerbms-api/provider/basicset/update",
						chunk_size: '2mb',
						filters : {
							max_file_size : '3mb',
							mime_types: [
								{title : "Image files", extensions : "jpg,gif,png,jpeg"}
							]
						},
						flash_swf_url : '../../js/plugins/plupload/Moxie.swf',
						max_retries: 3,
						silverlight_xap_url : '../../js/plugins/plupload/Moxie.xap',
						init: {
							'PostInit': function() {
								$admin_identityJust.attr({
									'data-value':''
								});
								/*绑定上传相片*/
								$admin_identityJust_upload.on('click',function(){
									var isupload=$admin_identityJust.attr('data-value');
									if(isupload===''){
										dia.content('<span class="g-c-bs-warning g-btips-warn">您还未选择需要上传的文件</span>').show();
										setTimeout(function(){
											dia.close();
										},3000);
										return false;
									}else{
										logo_uploadjust.start();
										return false;
									}
								});
							},
							'FilesAdded': function(up, files) {
								console.log(files);
								$admin_identityJust.attr({
									'data-value':'image'
								});
							},
							'BeforeUpload': function(up, file) {},
							'UploadProgress': function(up, file) {},
							'FileUploaded': function(up, file, info) {
								/*获取上传成功后的文件的Url*/
								console.log(up);
								console.log(file);
								console.log(info.response);
								/*var domain=up.getOption('domain'),
								 name=JSON.parse(info);

								 $admin_logoImage.attr({
								 'data-image':domain+'/'+name.key+"?imageView2/1/w/160/h/160"
								 }).html('<img src="'+domain+'/'+name.key+"?imageView2/1/w/160/h/160"+'" alt="店铺LOGO">');*/
								$admin_identityJust.attr({
									'data-src':info.response
								});
							},
							'Error': function(up, err, errTip) {
								$admin_identityJust.attr({
									'data-value':''
								});
								var opt=up.settings,
									file=err.file,
									setsize=parseInt(opt.filters.max_file_size,10),
									realsize=parseInt((file.size / 1024) / 1024,10);

								if(realsize>setsize){
									dia.content('<span class="g-c-bs-warning g-btips-warn">您选择的文件太大(<span class="g-c-red1"> '+realsize+'mb</span>),不能超过(<span class="g-c-red1"> '+setsize+'mb</span>)</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
								}
								console.log(errTip);
							},
							'UploadComplete': function() {
								$admin_identityJust.attr({
									'data-value':''
								});
								dia.content('<span class="g-c-bs-success g-btips-succ">上传成功</span>').show();
								setTimeout(function(){
									dia.close();
								},2000);
							},
							'Key': function(up, file) {
								var str=moment().format("YYYYMMDDHHmmSSSS");
								return "provider_"+str;
							}
						}
					}),
				logo_uploadback=new plupload.Uploader({
					runtimes: 'html5,html4,flash,silverlight',
					browse_button : 'admin_identityBack_view',
					multi_selection:false,
					multipart:true,/*默认上传方式表单或二进制*/
					multipart_params:{
						providerId:decodeURIComponent(logininfo.param.providerId),
						userId:decodeURIComponent(logininfo.param.userId),
						token:decodeURIComponent(logininfo.param.token),
						operationType:2,
						logoImage:''
					},/*自定义其他参数*/
					container: document.getElementById('admin_identityBack'),
					url : "http://10.0.5.222:8080/yttx-providerbms-api/provider/basicset/update",
					chunk_size: '2mb',
					filters : {
						max_file_size : '3mb',
						mime_types: [
							{title : "Image files", extensions : "jpg,gif,png,jpeg"}
						]
					},
					flash_swf_url : '../../js/plugins/plupload/Moxie.swf',
					max_retries: 3,
					silverlight_xap_url : '../../js/plugins/plupload/Moxie.xap',
					init: {
						'PostInit': function() {
							$admin_identityBack.attr({
								'data-value':''
							});
							/*绑定上传相片*/
							$admin_identityBack_upload.on('click',function(){
								var isupload=$admin_identityBack.attr('data-value');
								if(isupload===''){
									dia.content('<span class="g-c-bs-warning g-btips-warn">您还未选择需要上传的文件</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
									return false;
								}else{
									logo_uploadback.start();
									return false;
								}
							});
						},
						'FilesAdded': function(up, files) {
							$admin_identityBack.attr({
								'data-value':'image'
							});
						},
						'BeforeUpload': function(up, file) {},
						'UploadProgress': function(up, file) {},
						'FileUploaded': function(up, file, info) {
							/*获取上传成功后的文件的Url*/
							console.log(up);
							console.log(file);
							console.log(info.response);
							/*var domain=up.getOption('domain'),
							 name=JSON.parse(info);

							 $admin_logoImage.attr({
							 'data-image':domain+'/'+name.key+"?imageView2/1/w/160/h/160"
							 }).html('<img src="'+domain+'/'+name.key+"?imageView2/1/w/160/h/160"+'" alt="店铺LOGO">');*/
							$admin_identityBack.attr({
								'data-src':info.response
							});
						},
						'Error': function(up, err, errTip) {
							$admin_identityBack.attr({
								'data-value':''
							});
							var opt=up.settings,
								file=err.file,
								setsize=parseInt(opt.filters.max_file_size,10),
								realsize=parseInt((file.size / 1024) / 1024,10);

							if(realsize>setsize){
								dia.content('<span class="g-c-bs-warning g-btips-warn">您选择的文件太大(<span class="g-c-red1"> '+realsize+'mb</span>),不能超过(<span class="g-c-red1"> '+setsize+'mb</span>)</span>').show();
								setTimeout(function(){
									dia.close();
								},3000);
							}
							console.log(errTip);
						},
						'UploadComplete': function() {
							$admin_identityBack.attr({
								'data-value':''
							});
							dia.content('<span class="g-c-bs-success g-btips-succ">上传成功</span>').show()
							setTimeout(function(){
								dia.close();
							},2000);
						},
						'Key': function(up, file) {
							var str="provider_"+moment().format("YYYYMMDDHHmmSSSS");
							return str;
						}
					}
				}),
				logo_uploadhand=new plupload.Uploader({
					runtimes: 'html5,html4,flash,silverlight',
					browse_button : 'admin_identityHand_view',
					multi_selection:false,
					multipart:true,/*默认上传方式表单或二进制*/
					multipart_params:{
						providerId:decodeURIComponent(logininfo.param.providerId),
						userId:decodeURIComponent(logininfo.param.userId),
						token:decodeURIComponent(logininfo.param.token),
						operationType:2,
						logoImage:''
					},/*自定义其他参数*/
					container: document.getElementById('admin_identityHand'),
					url : "http://10.0.5.222:8080/yttx-providerbms-api/provider/basicset/update",
					chunk_size: '2mb',
					filters : {
						max_file_size : '3mb',
						mime_types: [
							{title : "Image files", extensions : "jpg,gif,png,jpeg"}
						]
					},
					flash_swf_url : '../../js/plugins/plupload/Moxie.swf',
					max_retries: 3,
					silverlight_xap_url : '../../js/plugins/plupload/Moxie.xap',
					init: {
						'PostInit': function() {
							$admin_identityHand.attr({
								'data-value':''
							});
							/*绑定上传相片*/
							$admin_identityHand_upload.on('click',function(){
								var isupload=$admin_identityHand.attr('data-value');
								if(isupload===''){
									dia.content('<span class="g-c-bs-warning g-btips-warn">您还未选择需要上传的文件</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
									return false;
								}else{
									logo_uploadhand.start();
									return false;
								}
							});
						},
						'FilesAdded': function(up, files) {
							$admin_identityHand.attr({
								'data-value':'image'
							});
						},
						'BeforeUpload': function(up, file) {},
						'UploadProgress': function(up, file) {},
						'FileUploaded': function(up, file, info) {
							/*获取上传成功后的文件的Url*/
							console.log(up);
							console.log(file);
							console.log(info.response);
							/*var domain=up.getOption('domain'),
							 name=JSON.parse(info);

							 $admin_logoImage.attr({
							 'data-image':domain+'/'+name.key+"?imageView2/1/w/160/h/160"
							 }).html('<img src="'+domain+'/'+name.key+"?imageView2/1/w/160/h/160"+'" alt="店铺LOGO">');*/
							$admin_identityHand.attr({
								'data-src':info.response
							});
						},
						'Error': function(up, err, errTip) {
							$admin_identityHand.attr({
								'data-value':''
							});
							var opt=up.settings,
								file=err.file,
								setsize=parseInt(opt.filters.max_file_size,10),
								realsize=parseInt((file.size / 1024) / 1024,10);

							if(realsize>setsize){
								dia.content('<span class="g-c-bs-warning g-btips-warn">您选择的文件太大(<span class="g-c-red1"> '+realsize+'mb</span>),不能超过(<span class="g-c-red1"> '+setsize+'mb</span>)</span>').show();
								setTimeout(function(){
									dia.close();
								},3000);
							}
							console.log(errTip);
						},
						'UploadComplete': function() {
							$admin_identityHand.attr({
								'data-value':''
							});
							dia.content('<span class="g-c-bs-success g-btips-succ">上传成功</span>').show()
							setTimeout(function(){
								dia.close();
							},2000);
						},
						'Key': function(up, file) {
							var str="provider_"+moment().format("YYYYMMDDHHmmSSSS");
							return str;
						}
					}
				}),
				logo_uploadlicense=new plupload.Uploader({
					runtimes: 'html5,html4,flash,silverlight',
					browse_button : 'admin_businessLicenseImage_view',
					multi_selection:false,
					multipart:true,/*默认上传方式表单或二进制*/
					multipart_params:{
						providerId:decodeURIComponent(logininfo.param.providerId),
						userId:decodeURIComponent(logininfo.param.userId),
						token:decodeURIComponent(logininfo.param.token),
						operationType:2,
						logoImage:''
					},/*自定义其他参数*/
					container: document.getElementById('admin_businessLicenseImage'),
					url : "http://10.0.5.222:8080/yttx-providerbms-api/provider/basicset/update",
					chunk_size: '2mb',
					filters : {
						max_file_size : '3mb',
						mime_types: [
							{title : "Image files", extensions : "jpg,gif,png,jpeg"}
						]
					},
					flash_swf_url : '../../js/plugins/plupload/Moxie.swf',
					max_retries: 3,
					silverlight_xap_url : '../../js/plugins/plupload/Moxie.xap',
					init: {
						'PostInit': function() {
							$admin_businessLicenseImage.attr({
								'data-value':''
							});
							/*绑定上传相片*/
							$admin_businessLicenseImage_upload.on('click',function(){
								var isupload=$admin_businessLicenseImage.attr('data-value');
								if(isupload===''){
									dia.content('<span class="g-c-bs-warning g-btips-warn">您还未选择需要上传的文件</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
									return false;
								}else{
									logo_uploadlicense.start();
									return false;
								}
							});
						},
						'FilesAdded': function(up, files) {
							$admin_businessLicenseImage.attr({
								'data-value':'image'
							});
						},
						'BeforeUpload': function(up, file) {},
						'UploadProgress': function(up, file) {},
						'FileUploaded': function(up, file, info) {
							/*获取上传成功后的文件的Url*/
							console.log(up);
							console.log(file);
							console.log(info.response);
							/*var domain=up.getOption('domain'),
							 name=JSON.parse(info);

							 $admin_logoImage.attr({
							 'data-image':domain+'/'+name.key+"?imageView2/1/w/160/h/160"
							 }).html('<img src="'+domain+'/'+name.key+"?imageView2/1/w/160/h/160"+'" alt="店铺LOGO">');*/
							$admin_businessLicenseImage.attr({
								'data-src':info.response
							});
						},
						'Error': function(up, err, errTip) {
							$admin_businessLicenseImage.attr({
								'data-value':''
							});
							var opt=up.settings,
								file=err.file,
								setsize=parseInt(opt.filters.max_file_size,10),
								realsize=parseInt((file.size / 1024) / 1024,10);

							if(realsize>setsize){
								dia.content('<span class="g-c-bs-warning g-btips-warn">您选择的文件太大(<span class="g-c-red1"> '+realsize+'mb</span>),不能超过(<span class="g-c-red1"> '+setsize+'mb</span>)</span>').show();
								setTimeout(function(){
									dia.close();
								},3000);
							}
							console.log(errTip);
						},
						'UploadComplete': function() {
							$admin_businessLicenseImage.attr({
								'data-value':''
							});
							dia.content('<span class="g-c-bs-success g-btips-succ">上传成功</span>').show()
							setTimeout(function(){
								dia.close();
							},2000);
						},
						'Key': function(up, file) {
							var str="provider_"+moment().format("YYYYMMDDHHmmSSSS");
							return str;
						}
					}
				});




			/*加载数据*/
			getSettingData();


			/*上传图片*/
			logo_uploadjust.init();
			//logo_uploadback.init();
			//logo_uploadhand.init();
			//logo_uploadlicense.init();



			/*绑定切换显示隐藏*/
			$.each([$admin_identityJust,$admin_identityBack,$admin_identityHand,$admin_businessLicenseImage],function(){

				var self=this;


				/*查询切换显示隐藏*/
				this.parent().on('mouseover mouseout',function(e){
					var type= e.type;
					if(type==='mouseover'){
						self.prev().addClass('admin-upload-detail-active');
					}else if(type==='mouseout'){
						self.prev().removeClass('admin-upload-detail-active');
					}
				});
			});



			/*绑定查看详情*/
			$.each([$admin_identityJust_show,$admin_identityBack_show,$admin_identityHand_show,$admin_businessLicenseImage_show],function(){

				var self=this,
					selector=this.selector;


				/*绑定查看*/
				this.on('click',function(e){
					var $parent=self.parent();
					if(selector.indexOf('Just')!==-1){
						$show_detail_title.html('身份证照(正面)');
					}else if(selector.indexOf('Back')!==-1){
						$show_detail_title.html('身份证照(反面)');
					}else if(selector.indexOf('Hand')!==-1){
						$show_detail_title.html('手持身份证正面照片');
					}else if(selector.indexOf('Image')!==-1){
						$show_detail_title.html('营业执照图片');
					}
					$show_detail_content.html('<tr><td>'+$parent.next().html()+'</td></tr>');
					$show_detail_wrap.modal('show',{
						backdrop:'static'
					});
				});

			});


		}


		/*关闭弹出框并重置值*/
		/*hide.bs.modal*/


		/*获取*/
		function getSettingData(){
			$.ajax({
				url:"http://10.0.5.222:8080/yttx-providerbms-api/provider/enterprise/certification",
				dataType:'JSON',
				method:'post',
				data:{
					providerId:decodeURIComponent(logininfo.param.providerId),
					userId:decodeURIComponent(logininfo.param.userId),
					token:decodeURIComponent(logininfo.param.token)
				}
			}).done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.clear();
						public_tool.clearCacheData();
						public_tool.loginTips();
						return false;
					}
					console.log(resp.message);
					return false;
				}


				var result=resp.result;
				if(result&&!$.isEmptyObject(result)){
					for(var i in result){
						switch (i){
							case 'legalName':
								$admin_legalName.html(result[i]);
								break;
							case 'identity':
								$admin_identity.html(result[i]);
								break;
							case 'identityJust':
								var just=validImages(result[i]);
								if(just!==''){
									$('<img alt="身份证照(正面)" src="'+just+'" />').appendTo($admin_identityJust.html(''));
								}else{
									$admin_identityJust.html('');
								}
								break;
							case 'identityBack':
								var back=validImages(result[i]);
								if(back!==''){
									$('<img alt="身份证照(反面)" src="'+back+'" />').appendTo($admin_identityBack.html(''));
								}else{
									$admin_identityBack.html('');
								}
								break;
							case 'identityHand':
								var hand=validImages(result[i]);
								if(hand!==''){
									$('<img alt="手持身份证正面照片" src="'+hand+'" />').appendTo($admin_identityHand.html(''));
								}else{
									$admin_identityHand.html('');
								}
								break;
							case 'businessLicense':
								$admin_businessLicense.html(result[i]);
								break;
							case 'businessLicenseImage':
								var license=validImages(result[i]);
								if(license!==''){
									$('<img alt="营业执照图片" src="'+license+'" />').appendTo($admin_businessLicenseImage.html(''));
								}else{
									$admin_businessLicenseImage.html('');
								}
								break;
						}
					}
				}


			}).fail(function(resp){
				console.log('error');
			});
		}


		/*判断图片合法格式*/
		function validImages(value){
			var str='';
			var tempimg=value,
				imgreg=/(jpeg|jpg|gif|png)/g;

			if(tempimg.indexOf('.')!==-1){
				if(imgreg.test(tempimg)){
					str=value;
				}else{
					str='';
				};
			}else{
				str='';
			}
			return str;
		}


		/*获取七牛token*/
		function getToken(){
			var result=null;
			$.ajax({
				url:'http://10.0.5.222:8080/yttx-providerbms-api/qiniu/token/get',
				async:false,
				type:'post',
				datatype:'json',
				data:{
					bizType:1,
					providerId:decodeURIComponent(logininfo.param.providerId),
					userId:decodeURIComponent(logininfo.param.userId),
					token:decodeURIComponent(logininfo.param.token)
				}
			}).done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					console.log(resp.message);
					return false;
				}
				result=resp.result;
			}).fail(function(resp){
				console.log(resp.message);
			});
			return result;
		}

	});

})(jQuery);