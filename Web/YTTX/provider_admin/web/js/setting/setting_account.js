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
			var module_id='setting_account'/*模块id，主要用于本地存储传值*/,
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
				dialogObj=public_tool.dialog()/*回调提示对象*/,
				$admin_nickName=$('#admin_nickName'),
				$admin_phone=$('#admin_phone'),
				$admin_consigneeName=$('#admin_consigneeName'),
				$admin_consigneePhone=$('#admin_consigneePhone'),
				$admin_addressadd_btn=$('#admin_addressadd_btn'),
				$admin_addresstoggle=$('#admin_addresstoggle'),
				$admin_province=$('#admin_province'),
				$admin_city=$('#admin_city'),
				$admin_area=$('#admin_area'),
				$admin_province_value=$('#admin_province_value'),
				$admin_city_value=$('#admin_city_value'),
				$admin_area_value=$('#admin_area_value'),
				$admin_address_list=$('#admin_address_list'),
				$admin_address_wrap=$('#admin_address_wrap'),
				$admin_address=$('#admin_address'),
				$admin_isDefault=$('#admin_isDefault'),
				$admin_nickName_btn=$('#admin_nickName_btn'),
				admin_address_form=document.getElementById('admin_address_form');


			/*加载数据*/
			getSettingData();


			/*绑定修改昵称*/
			$admin_nickName_btn.on('click',function(){
					var tempnickname=$admin_nickName.val();
					if(tempnickname===''){
						dia.content('<span class="g-c-bs-warning g-btips-warn">昵称不能为空</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
						return false;
					}

				$.ajax({
					url:"http://120.24.226.70:8081/yttx-providerbms-api/user/account/update",
					dataType:'JSON',
					method:'post',
					data:{
						userId:decodeURIComponent(logininfo.param.userId),
						token:decodeURIComponent(logininfo.param.token),
						nickName:tempnickname
					}
				}).done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||'修改 "昵称" 失败')+'</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
						console.log(resp.message);
						return false;
					}
					dia.content('<span class="g-c-bs-success g-btips-succ">修改 "昵称" 成功</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
				}).fail(function(resp){
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||'修改 "昵称" 失败')+'</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					console.log('error');
				});


			});


			/*格式化手机号*/
			$admin_consigneePhone.on('keyup',function(){
				var phoneno=this.value.replace(/\D*/g,'');
				if(phoneno==''){
					this.value='';
					return false;
				}
				this.value=public_tool.phoneFormat(this.value);
			});

			/*切换添加地址*/
			$admin_addresstoggle.on('click',function(){
				if($admin_address_wrap.hasClass('g-d-hidei')){
					$admin_address_wrap.removeClass('g-d-hidei');
					$admin_addresstoggle.html('-&nbsp;取消');
					admin_address_form.reset();
				}else{
					$admin_address_wrap.addClass('g-d-hidei');
					$admin_addresstoggle.html('+&nbsp;添加');
				}
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


			/*绑定地址操作*/
			$admin_address_list.on('click','li',function(e){
				var target= e.target,
					node=target.nodeName.toLowerCase(),
					$this,
					type='active',
					id=null;

				if(node==='li'){
					type='active';
					$this=$(target);
					id=$this.attr('data-id');
				}else if(node==='label'){
					type='active';
					$this=$(target).parent();
					id=$this.attr('data-id');
				}else if(node==='span'){
					type='delete';
					$this=$(target);
					id=$this.parent().attr('data-id');
				}

				if(type==='active'){
					/*切换默认地址操作*/
					return false;
					var isactive=$this.hasClass('address-active');
					if(isactive){
						$this.removeClass('address-active');
						return false;
					}else{
						$admin_address_list.append($this.addClass('address-active'));
						/*to do*/
					}
				}else if(type==='delete'){
					if(!id||id===null){
						dia.content('<span class="g-c-bs-warning g-btips-warn">数据不正确</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
						return false;
					}
					/*删除操作*/
					dialogObj.setFn(function(){
						var self=this;
						$.ajax({
							url:"http://120.24.226.70:8081/yttx-providerbms-api/receiptaddress/delete",
							dataType:'JSON',
							method:'post',
							data:{
								userId:decodeURIComponent(logininfo.param.userId),
								token:decodeURIComponent(logininfo.param.token),
								id:id
							}
						}).done(function(resp){
							var code=parseInt(resp.code,10);
							if(code!==0){
								console.log(resp.message);
								self.content('<span class="g-c-bs-warning g-btips-warn">删除地址失败</span>').show();
								setTimeout(function(){
									self.close();
								},2000);
								return false;
							}

							/*请求成功执行相应交互*/
							self.content('<span class="g-c-bs-success g-btips-succ">删除地址成功</span>').show();
							setTimeout(function(){
								self.close();
							},1000);
							$this.remove();

						}).fail(function(resp){
							console.log('error');
							self.content('<span class="g-c-bs-warning g-btips-warn">删除地址失败</span>').show();
							setTimeout(function(){
								self.close();
							},2000);
						});

					},'setting_account');
					//确认删除
					dialogObj.dialog.content('<span class="g-c-bs-warning g-btips-warn">是否真要删除此地址</span>').showModal();
				}
			});


			/*绑定添加地址*/
			$admin_addressadd_btn.on('click',function(){
				var province=$admin_province_value.val(),
					city=$admin_city_value.val(),
					area=$admin_area_value.val(),
					detailed=$admin_address.val(),
					name=$admin_consigneeName.val(),
					phone=public_tool.trims($admin_consigneePhone.val());




				if(province===''||city===''||area===''||detailed===''||name===''||phone===''){
					dia.content('<span class="g-c-bs-warning g-btips-warn">相关地址信息不能为空</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					return false;
				}
				if(!public_tool.isMobilePhone(phone)){
					dia.content('<span class="g-c-bs-warning g-btips-warn">收货人手机号不合法</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					return false;
				}
				var active=$admin_isDefault.is('checked')?1:0;
				$.ajax({
					url:"http://120.24.226.70:8081/yttx-providerbms-api/user/account/info",
					dataType:'JSON',
					method:'post',
					data:{
						userId:decodeURIComponent(logininfo.param.userId),
						token:decodeURIComponent(logininfo.param.token),
						consigneeName:name,
						consigneePhone:phone,
						detailedAddress:detailed,
						province:province,
						city:city,
						county:area,
						isDefault:active
					}
				}).done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						return false;
					}
					var id=resp.result;
					if(active===1){
						$admin_address_list.append($('<li class="address-active" data-id="' + id + '" xmlns="http://www.w3.org/1999/html"><label>'+province+city+area+detailed+'</label>,</label>'+name+'</label>,</label>'+phone+'</label><span class="btn btn-sm btn-white g-br2">-删除</span></li>'));
					}else{
						$('<li data-id="' + id + '" xmlns="http://www.w3.org/1999/html"><label>'+province+city+area+detailed+'</label>,</label>'+name+'</label>,</label>'+phone+'</label><span class="btn btn-sm btn-white g-br2">-删除</span></li>').appendTo($admin_address_list);
					}
					dia.content('<span class="g-c-bs-success g-btips-succ">添加地址成功</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
				}).fail(function(resp){
					console.log('error');
				});

			});


		}


		/*获取*/
		function getSettingData(){
			$.ajax({
				url:"http://120.24.226.70:8081/yttx-providerbms-api/user/account/info",
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
							case 'nickName':
								$admin_nickName.val(result[i]);
								break;
							case 'receiptaddress':
								renderAddress(result[i]);
								break;
							case 'phone':
								$admin_phone.html(public_tool.phoneFormat(result[i]));
								break;
						}
					}
				}


			}).fail(function(resp){
				console.log('error');
			});
		};


		/*渲染地址*/
		function renderAddress(data){
			var tempaddress=data,
				len=tempaddress.length,
				j= 0,
				str='';
			if(len!==0){
				for(j;j<len;j++){
					var addressitem=tempaddress[j],
						active=parseInt(addressitem['isDefault'],10);
					if(active===0){
						str+='<li data-id="'+addressitem['id']+'"><label>'+addressitem["address"]+'</label>,<label>'+addressitem["consigneeName"]+'</label>,<label>'+addressitem["consigneePhone"]+'</label><span class="btn btn-sm btn-white g-br2">-删除</span></li>';
					}else{
						str+='<li class="address-active" data-id="'+addressitem['id']+'"><label>'+addressitem["address"]+'</label>,<label>'+addressitem["consigneeName"]+'</label>,<label>'+addressitem["consigneePhone"]+'</label><span class="btn btn-sm btn-white g-br2">-删除</span></li>';
					}
				}
				$(str).appendTo($admin_address_list.html(''));
			}else {
				$admin_address_list.html('');
			}
		};
	});



})(jQuery);