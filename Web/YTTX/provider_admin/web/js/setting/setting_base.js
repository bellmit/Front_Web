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
			var module_id='setting_base'/*模块id，主要用于本地存储传值*/,
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
				$admin_storeName_btn=$('#admin_storeName_btn'),
				$admin_logoImage_btn=$('#admin_logoImage_btn'),
				$admin_telephone_btn=$('#admin_telephone_btn'),
				$admin_address_btn=$('#admin_address_btn');



			/*加载数据*/
			$.ajax({
				url:"http://120.24.226.70:8081/yttx-providerbms-api/provider/basicset/info",
				dataType:'JSON',
				method:'post',
				data:{
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
									imgreg=/[jpeg|jpg|gif|png]/g;

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


			/*绑定修改*/
			var update_config={
				url:"http://120.24.226.70:8081/yttx-providerbms-api/provider/basicset/update",
				dataType:'JSON',
				method:'post',
				data:{
					userId:decodeURIComponent(logininfo.param.userId),
					token:decodeURIComponent(logininfo.param.token),
					operationType:1,
					updateValue:''
				}
			};
			$.each([$admin_storeName_btn,$admin_logoImage_btn,$admin_telephone_btn,$admin_address_btn],function(){
				var self=this,
					selector=this.selector.split('_'),
					tips='';

				this.on('click',function(){
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
							if(!resp){
								dia.content('<span class="g-c-bs-warning g-btips-warn">修改 "'+tips+'" 失败</span>').show();
								setTimeout(function () {
									dia.close();
								},2000);
								return false;
							}
							dia.content('<span class=g-c-bs-success g-btips-succ">修改 "'+tips+'" 成功</span>').show();
							setTimeout(function () {
								dia.close();
							},2000);
						}).fail(function(resp){
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



	});



})(jQuery);