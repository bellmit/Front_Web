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
			var module_id='yttx-setting-base'/*模块id，主要用于本地存储传值*/,
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
				$admin_id=$('#admin_id'),
				$admin_storeName=$('#admin_storeName'),
				$admin_logoImage=$('#admin_logoImage'),
				$admin_telephone=$('#admin_telephone'),
				$admin_companyName=$('#admin_companyName'),
				$admin_province=$('#admin_province'),
				$admin_city=$('#admin_city'),
				$admin_area=$('#admin_area'),
				$admin_province_value=$('#admin_province_value'),
				$admin_city_value=$('#admin_city_value'),
				$admin_area_value=$('#admin_area_value'),
				$admin_address=$('#admin_address'),
				$admin_logoImage_file=$('#admin_logoImage_file'),
				$admin_storeName_btn=$('#admin_storeName_btn'),
				$admin_logoImage_btn=$('#admin_logoImage_btn'),
				$admin_logoImage_upload=$('#admin_logoImage_upload'),
				$admin_telephone_btn=$('#admin_telephone_btn'),
				$admin_address_btn=$('#admin_address_btn'),
				QN=new QiniuJsSDK()/*七牛对象*/,
				img_token=getToken(),
				logo_upload=null,
				update_config={
					url:"http://120.24.226.70:8081/yttx-providerbms-api/provider/basicset/update",
					dataType:'JSON',
					method:'post',
					data:{
						userId:decodeURIComponent(logininfo.param.userId),
						token:decodeURIComponent(logininfo.param.token),
						id:$admin_id.val(),
						operationType:1,
						updateValue:'',
						providerId:decodeURIComponent(logininfo.param.providerId)
					}
				};


			/*加载数据*/
			getSettingData();



			/*绑定logo上传*/
			if(img_token!==null){
				$admin_logoImage.attr({
					'data-image':''
				});
				logo_upload = QN.uploader({
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
							/*获取上传成功后的文件的Url*/
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
				});
			}else {
				$admin_logoImage_file.on('click',function(){
					dia.content('<span class="g-c-bs-warning g-btips-warn">暂未开通此接口</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					return false;
				});
			}
			$admin_logoImage_upload.on('click',function(){
				if(img_token===null){
					dia.content('<span class="g-c-bs-warning g-btips-warn">暂未开通此接口</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					return false;
				}
				if($admin_logoImage.attr('data-image')===''){
					dia.content('<span class="g-c-bs-warning g-btips-warn">请选择您要修改的图片</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					return false;
				}
				/*执行上传*/
				logo_upload.start();
			});






			/*绑定修改*/
			$.each([$admin_storeName_btn,$admin_logoImage_btn,$admin_telephone_btn,$admin_address_btn],function(){
				var self=this,
					selector=this.selector.split('_'),
					tips='';

				this.on('click',function(){
						if(update_config['id']===''){
							update_config['id']=$admin_id.val();
						}

						if(selector[1]==='storeName'){
							update_config.data['operationType']=1;
							update_config.data['updateValue']=$admin_storeName.val();
							tips='店铺名称';
						}else if(selector[1]==='logoImage'){
							var tempimg=$admin_storeName.attr('data-image');
							if(!tempimg||tempimg===''){
								dia.content('<span class="g-c-bs-warning g-btips-warn">请先上传图像</span>').show();
								setTimeout(function () {
									dia.close();
								},2000);
								return false;
							}
							update_config.data['operationType']=2;
							update_config.data['updateValue']=tempimg;
							tips='店铺LOGO';
						}else if(selector[1]==='telephone'){
							var tempphone=public_tool.trims($admin_telephone.val());
							if(!public_tool.isMobilePhone(tempphone)){
								dia.content('<span class="g-c-bs-warning g-btips-warn">联系电话不正确</span>').show();
								setTimeout(function () {
									dia.close();
								},2000);
								return false;
							}
							update_config.data['operationType']=3;
							update_config.data['updateValue']=tempphone;
							tips='联系电话';
						}else if(selector[1]==='address'){
							var tempaddress=public_tool.trims($admin_province_value.val()+$admin_city_value.val()+$admin_area_value.val()+$admin_address.val());
							if(tempaddress===''){
								dia.content('<span class="g-c-bs-warning g-btips-warn">地址详情不能为空</span>').show();
								setTimeout(function () {
									dia.close();
								},2000);
								return false;
							}
							update_config.data['operationType']=4;
							update_config.data['updateValue']=tempaddress;
							tips='地址详情';
						}

						$.ajax(update_config).done(function(resp){
							var code=parseInt(resp.code,10);
							if(code!==0){
								dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||'修改 "'+tips+'" 失败')+'</span>').show();
								setTimeout(function () {
									dia.close();
								},2000);
								console.log(resp.message);
								return false;
							}
							dia.content('<span class="g-c-bs-success g-btips-succ">修改 "'+tips+'" 成功</span>').show();
							setTimeout(function () {
								dia.close();
							},2000);
							/*更新数据*/
							/*to do*/
						}).fail(function(resp){
							dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||'修改 "'+tips+'" 失败')+'</span>').show();
							setTimeout(function () {
								dia.close();
							},2000);
							console.log('error');
						});


				});

			});




			/*格式化手机号*/
			$admin_telephone.on('keyup',function(){
				var phoneno=this.value.replace(/\D*/g,'');
				if(phoneno==''){
					this.value='';
					return false;
				}
				this.value=public_tool.phoneFormat(this.value);
			});




			/*地址调用*/
			new public_tool.areaSelect().areaSelect({
				$province:$admin_province,
				$city:$admin_city,
				$area:$admin_area,
				$provinceinput:$admin_province_value,
				$cityinput:$admin_city_value,
				$areainput:$admin_area_value
			});



		}


		/*获取*/
		function getSettingData(){
			$.ajax({
				url:"http://120.24.226.70:8081/yttx-providerbms-api/provider/basicset/info",
				dataType:'JSON',
				method:'post',
				data:{
					userId:decodeURIComponent(logininfo.param.userId),
					providerId:decodeURIComponent(logininfo.param.providerId),
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
							case 'id':
								$admin_id.val(result[i]);
								break;
							case 'storeName':
								$admin_storeName.val(result[i]);
								break;
							case 'address':
								$admin_address.val(result[i]);
								break;
							case 'companyName':
								$admin_companyName.html(result[i]);
								break;
							case 'telephone':
								$admin_telephone.val(public_tool.phoneFormat(result[i]));
								break;
							case 'logoImage':
								var tempimg=result[i],
									imgreg=/(jpeg|jpg|gif|png)/g;

								if(tempimg.indexOf('.')!==-1){
									if(imgreg.test(tempimg)){
										$admin_logoImage.html('<img src="'+result[i]+'" alt="店铺LOGO">');
									}else{
										$admin_logoImage.html('');
									};
								}else{
									$admin_logoImage.html('');
								}
								break;
						}
					}
				}


			}).fail(function(resp){
				console.log('error');
			});
		};


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