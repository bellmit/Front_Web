/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){
		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.76.237.100:8082/mall-agentbms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*权限调用*/
			var powermap=public_tool.getPower(),
				receiveedit_power=public_tool.getKeyPower('mall-store-receive',powermap);


			/*dom引用和相关变量定义*/
			var module_id='mall-announcement-add'/*模块id，主要用于本地存储传值*/,
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
				admin_storereceive_form=document.getElementById('admin_storereceive_form'),
				$admin_storereceive_form=$(admin_storereceive_form),
				$admin_id=$('#admin_id'),
				$admin_orderid=$('#admin_orderid'),
				$admin_createtime=$('#admin_createtime'),
				$admin_status=$('#admin_status'),
				$admin_print_btn=$('#admin_print_btn'),
				$admin_receive_list=$('#admin_receive_list'),
				$admin_receiveaction=$('#admin_receiveaction'),
				$admin_allreceiveaction=$('#admin_allreceiveaction'),
				resetform0=null,
				submittype='';



			/*重置表单*/
			admin_storereceive_form.reset();




			/*获取编辑缓存*/
			(function () {
				var edit_cache=public_tool.getParams('mall-store-receive');

				if(edit_cache){
					/*判断权限*/
					if(receiveedit_power){
						$admin_receiveaction.parent().removeClass('g-d-hidei');
						$admin_allreceiveaction.parent().removeClass('g-d-hidei');
					}else{
						$admin_receiveaction.parent().addClass('g-d-hidei');
						$admin_allreceiveaction.parent().addClass('g-d-hidei');
					}
					for(var m in edit_cache){
						switch(m){
							case 'id':
								$admin_id.val(edit_cache[m]);
								break;
							case 'orderid':
								$admin_orderid.val('订单编号：'+edit_cache[m]);
								break;
							case 'createtime':
								$admin_createtime.val('下单时间：'+edit_cache[m]);
								break;
							case 'status':
								var statusmap={
									0:'已收货',
									1:'部分收货',
									2:'未收货'
								};
								$admin_status.val(statusmap[edit_cache[m]]);
								break;
							case 'list':
								var receivelist=edit_cache[m],
									len=receivelist.length,
									i=0,
									str='';

								for(i;i<len;i++){
									str+='<tr><td>商品名称：'+i+'</td><td>商品型号：'+i+'</td><td>数量：'+i+'</td><td><input type="text" maxlength="8" name="receivenumber'+i+'" class="receivenumber" /></td><td>待发数量：'+i+'</td></tr>'
								}

								if(len!==0){
									$(str).appendTo($admin_receive_list.html(''));
								}
								break;
						}
					}
				}else{
					$admin_receiveaction.parent().addClass('g-d-hidei');
					$admin_allreceiveaction.parent().addClass('g-d-hidei');
				}
			}());


			/*绑定提交*/
			$.each([$admin_receiveaction,$admin_allreceiveaction],function () {
				var selector=this.selector;

				this.on('click',function () {
					if(selector.indexOf('all')!==-1){
						submittype='sureall';
					}else{
						submittype='sure';
					}
					$admin_storereceive_form.trigger('submit');
				});
			});




			/*绑定添加地址*/
			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt0={},
					formcache=public_tool.cache,
					basedata={
						roleId:decodeURIComponent(logininfo.param.roleId),
						token:decodeURIComponent(logininfo.param.token),
						adminId:decodeURIComponent(logininfo.param.adminId),
						grade:decodeURIComponent(logininfo.param.grade)
					};


				if(formcache.form_opt_0){
					$.each([formcache.form_opt_0],function(index){
						var formtype,
						config={
							dataType:'JSON',
							method:'post'
						};
						if(index===0){
							formtype='storereceive';
						}
						$.extend(true,(function () {
							if(formtype==='storereceive'){
								return form_opt0;
							}
						}()),(function () {
							if(formtype==='storereceive'){
								return formcache.form_opt_0;
							}
						}()),{
							submitHandler: function(form){
								var setdata={},
									id=$admin_id.val();

								if(id===''){
									dia.content('<span class="g-c-bs-warning g-btips-warn">没有收货订单数据</span>').show();
									setTimeout(function () {
										dia.close();
									},2000);
									return false;
								}

								$.extend(true,setdata,basedata);

								if(formtype==='storereceive'){

									/*同步编辑器*/
									$.extend(true,setdata,{
										id:$admin_id.val(),
										orderid:$admin_orderid.val(),
										createtime:$admin_createtime.val(),
										status:$admin_status.val()
									});
									config['url']="http://120.76.237.100:8082/mall-agentbms-api/announcement/update";
									config['data']=setdata;
								}


								return false;
								$.ajax(config).done(function(resp){
									var code;
									if(formtype==='storereceive'){
										code=parseInt(resp.code,10);
										if(code!==0){
											dia.content('<span class="g-c-bs-warning g-btips-warn">收货失败</span>').show();
											return false;
										}else{
											dia.content('<span class="g-c-bs-success g-btips-succ">收货成功</span>').show();
										}
									}


									setTimeout(function () {
										dia.close();
										if(formtype==='storereceive'){
											/*页面跳转*/
											location.href='mall-store-purchase.html';
										}
									},2000);
								}).fail(function(resp){
									console.log('error');
								});



								return false;
							}
						});
					});

				}


				/*提交验证*/
				if(resetform0===null){
					resetform0=$admin_storereceive_form.validate(form_opt0);
				}
			}



		}




	});



})(jQuery);