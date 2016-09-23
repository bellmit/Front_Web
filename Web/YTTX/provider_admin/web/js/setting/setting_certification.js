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
			var module_id='setting_certification'/*模块id，主要用于本地存储传值*/,
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
				$admin_certification_wrap=$('#admin_certification_wrap'),
				QN=new QiniuJsSDK()/*七牛对象*/,
				img_token=/*getToken()||*/null,
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

			$('.admin-upload-imgage',$admin_certification_wrap).on('click',function(){
				console.log('aaa');
				if(img_token===null){
					dia.content('<span class="g-c-bs-warning g-btips-warn">暂未开通此接口</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					return false;
				}
			});








		}


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
					var str='',
						identity='',
						business='';
					for(var i in result){
						switch (i){
							case 'legalName':
								str+='<div class="admin-list-item">法人名称:<br />'+result[i]+'</div>';
								break;
							case 'identity':
								str+='<div class="admin-list-item">身份证号:<br />'+result[i]+'</div>';
								break;
							case 'identityJust':
								identity+=validImages(i,result[i],'身份证照(正面)');
								break;
							case 'identityBack':
								identity+=validImages(i,result[i],'身份证照(反面)');
								break;
							case 'identityHand':
								identity+=validImages(i,result[i],'手持身份证正面照片');
								break;
							case 'businessLicense':
								str+='<div class="admin-list-item">营业执照号:<br />'+result[i]+'</div>';
								break;
							case 'businessLicenseImage':
								business+=validImages(i,result[i],'营业执照图片');
								break;
						}
					}
					str+='<div class="admin-list-item"><div class="row">'+identity+'</div></div><div class="admin-list-item"><div class="row">'+business+'</div></div>';
					$(str).appendTo($admin_certification_wrap.html(''));
				}


			}).fail(function(resp){
				console.log('error');
			});
		};


		/*判断图片合法格式*/
		function validImages(key,value,txt){
			var str='';
			var tempimg=value,
				imgreg=/(jpeg|jpg|gif|png)/g;

			if(tempimg.indexOf('.')!==-1){
				if(imgreg.test(tempimg)){
					str+='<div class="col-md-4"><div data-type="'+key+'"  class="admin-upload-imgage"><img alt="" src="'+value+'"></div><p>'+txt+'</p></div>';
				}else{
					str+='<div class="col-md-4"><div data-type="'+key+'"  class="admin-upload-imgage"></div><p>'+txt+'</p></div>';
				};
			}else{
				str+='<div class="col-md-4"><div data-type="'+key+'"  class="admin-upload-imgage"></div><p>'+txt+'</p></div>';
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