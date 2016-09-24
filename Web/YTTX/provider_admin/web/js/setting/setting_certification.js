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
				$admin_businessLicense=$('#admin_businessLicense'),
				$admin_businessLicenseImage=$('#admin_businessLicenseImage'),
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_title=$('#show_detail_title')/*详情标题*/,
				$show_detail_content=$('#show_detail_content')/*详情内容*/,
				QN=new QiniuJsSDK()/*七牛对象*/,
				img_token=getToken()||null,
				logo_upload=null;


			/*加载数据*/
			getSettingData();


			/*上传图片*/
			if(img_token!==null){
				/*logo_upload = QN.uploader({
					runtimes: 'html5,flash,html4',
					browse_button: 'admin_logoImage_file',
					uptoken :img_token.qiniuToken,// uptoken是上传凭证，由其他程序生成
					multi_selection:false,
					get_new_uptoken: false,// 设置上传文件的时候是否每次都重新获取新的uptoken
					unique_names:false,// 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
					save_key:false,//默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
					domain:img_token.qiniuDomain,//bucket域名，下载资源时用到，必需
					container:'admin_logoImage',// 上传区域DOM ID，默认是browser_button的父元素
					flash_swf_url: '../../js/plugins/plupload/Moxie.swf',//引入flash，相对路径
					max_retries: 3,// 上传失败最大重试次数
					dragdrop:false,
					chunk_size: '500kb',
					auto_start:false,
					filters:{
						max_file_size : '500kb',
						mime_types: [
							{
								title : "Image files", extensions : "jpg,png,jpeg"
							}
						]
					},
					init: {
						'FilesAdded': function(up, files) {
							$admin_logoImage.attr({
								'data-image':''
							});
						},
						'BeforeUpload': function(up, file) {
						},
						'UploadProgress': function(up, file) {},
						'FileUploaded': function(up, file, info) {
							/!*获取上传成功后的文件的Url*!/
							var domain=up.getOption('domain'),
								name=JSON.parse(info);

							$admin_logoImage.attr({
								'data-image':domain+'/'+name.key+"?imageView2/1/w/160/h/160"
							}).html('<img src="'+domain+'/'+name.key+"?imageView2/1/w/160/h/160"+'" alt="店铺LOGO">');
						},
						'Error': function(up, err, errTip) {
							var opt=up.settings,
								file=err.file,
								setsize=parseInt(opt.filters.max_file_size,10),
								realsize=parseInt(file.size / 1024,10);

							if(realsize>setsize){
								dia.content('<span class="g-c-bs-warning g-btips-warn">您选择的文件太大(<span class="g-c-red1"> '+realsize+'kb</span>),不能超过(<span class="g-c-red1"> '+setsize+'kb</span>)</span>').show();
								setTimeout(function(){
									dia.close();
								},3000);
							}
							console.log(errTip);
						},
						'UploadComplete': function() {
							dia.content('<span class="g-c-bs-success g-btips-succ">上传成功</span>').show()
							setTimeout(function(){
								dia.close();
							},2000);
						},
						'Key': function(up, file) {
							var str=moment().format("YYYYMMDDHHmmSSSS");
							return "provider_"+str;
						}
					}
				});*/
			}else {

			}

			$.each([$admin_identityJust,$admin_identityBack,$admin_identityHand,$admin_businessLicenseImage],function(){

				var self=this;

				/*上传图片*/
				this.on('click',function(e){
					if(img_token===null){
						dia.content('<span class="g-c-bs-warning g-btips-warn">暂未开通此接口</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
						return false;
					}
				});

				/*查询切换显示隐藏*/
				this.parent().on('mouseover mouseout',function(e){
					var type= e.type;
					if(type==='mouseover'){
						self.prev().addClass('admin-upload-detail-active');
					}else if(type==='mouseout'){
						self.prev().removeClass('admin-upload-detail-active');
					}
				});

				/*绑定查看*/
				this.prev().on('click',function(e){
					$show_detail_title.html(self.next().html());
					$show_detail_content.html('<tr><td>'+self.html()+'</td></tr>');
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
				url:"http://120.24.226.70:8081/yttx-providerbms-api/provider/enterprise/certification",
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
		};


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
				url:'http://120.24.226.70:8081/yttx-providerbms-api/commom/getQiniuToken',
				async:false,
				type:'post',
				datatype:'json',
				data:{
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
		};

	});

})(jQuery);