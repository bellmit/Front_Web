(function($){
	'use strict';
	$(function(){

		var table=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.76.237.100:8082/mall-buzhubms-api/module/menu',
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
				attradd_power=public_tool.getKeyPower('bzw-attribute-add',powermap);

			/*dom引用和相关变量定义*/
			var module_id='bzw-attribute-addval'/*模块id，主要用于本地存储传值*/,
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
				resetform0=null;



			/*表单*/
			var admin_addgoodsattr_form=document.getElementById('admin_addgoodsattr_form'),
				$admin_addgoodsattr_form=$(admin_addgoodsattr_form),
				$admin_attributeadd=$('#admin_attributeadd'),
				$admin_addlabel_tips=$('#admin_addlabel_tips'),
				$admin_labelname=$('#admin_labelname'),
				$admin_addlabel_already=$('#admin_addlabel_already'),
				$admin_addlabel_list=$('#admin_addlabel_list'),
				$admin_attrsort=$('#admin_attrsort');






			/*重置表单*/
			admin_addgoodsattr_form.reset();
			/*根据权限判断显示添加属性按钮*/
			if(attradd_power){
				$admin_attributeadd.removeClass('g-d-hidei');
			}else{
				$admin_attributeadd.addClass('g-d-hidei');
			}

			/*请求属性数据*/
			searchAttr();

			/*绑定显示隐藏新增类型中的已存在编码和名称*/
			$.each([$admin_addlabel_already],function(){
				this.on('click',function(e){
					if($admin_addlabel_list.hasClass('g-d-hidei')){
						$admin_addlabel_list.removeClass('g-d-hidei');
					}else{
						$admin_addlabel_list.addClass('g-d-hidei');
					}
				});
			});



			/*绑定验证是否已经编写存在的分类编码*/
			$.each([$admin_labelname],function(){
				this.on('focusout',function(){
					var self=this,
						txt=this.value,
						value=public_tool.trims(txt),
						$ul,
						$tip;

					if(value!==''){
						$ul=$admin_addlabel_list;
						$tip=$admin_addlabel_tips;

						$ul.find('li').each(function(){
							var $own=$(this),
								litxt=$own.html();
							if(litxt===value){
								$tip.html('"'+value+'" 已经存在，请填写其他标签');
								self.value='';
								$own.addClass('admin-list-widget-active');
								if($ul.hasClass('g-d-hidei')){
									$ul.removeClass('g-d-hidei')
								}
								setTimeout(function () {
									$tip.html('');
									$own.removeClass('admin-list-widget-active');
								},3000);
								return false;
							}
						});
					}
				});
			});


			/*绑定非数字输入*/
			$.each([$admin_attrsort],function () {
				this.on('keyup',function () {
					this.value=this.value.replace(/\D*/g,'');
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
						adminId:decodeURIComponent(logininfo.param.adminId),
						grade:decodeURIComponent(logininfo.param.grade),
						token:decodeURIComponent(logininfo.param.token)
					};


				if(formcache.form_opt_0){
					$.each([formcache.form_opt_0],function(index){
						var formtype,
							config={
								dataType:'JSON',
								method:'post'
							};
						if(index===0){
							formtype='addgoodsattr';
						}
						$.extend(true,(function () {
							if(formtype==='addgoodsattr'){
								return form_opt0;
							}
						}()),(function () {
							if(formtype==='addgoodsattr'){
								return formcache.form_opt_0;
							}
						}()),{
							submitHandler: function(form){
								var setdata={};

								$.extend(true,setdata,basedata);

								if(formtype==='addgoodsattr'){
									$.extend(true,setdata,{
										name:$admin_labelname.val(),
										sort:$admin_attrsort.val(),
									});
									config['url']="../../json/goods/mall_goods_type_all.json";
									config['data']=setdata;
								}

								$.ajax(config).done(function(resp){
									var code;
									if(formtype==='addgoodsattr'){
										code=parseInt(resp.code,10);
										if(code!==0){
											dia.content('<span class="g-c-bs-warning g-btips-warn">添加标签失败</span>').show();
											return false;
										}else{
											dia.content('<span class="g-c-bs-success g-btips-succ">添加标签成功</span>').show();
											/*请求数据,更新列表*/
											searchAttr();
											setTimeout(function () {
												dia.close();
											},2000);
										}
									}
								}).fail(function(resp){
									console.log('error');
									dia.content('<span class="g-c-bs-warning g-btips-warn">添加标签失败</span>').show();
									setTimeout(function () {
										dia.close();
									},2000);
								});
								return false;
							}
						});
					});

				}


				/*提交验证*/
				if(resetform0===null){
					resetform0=$admin_addgoodsattr_form.validate(form_opt0);
				}
				
			}


		}


		
		/*查询标签或属性解析*/
		function doAttrItem(config){
			var dataitem=config['dataitem'],
				id=config['id'],
				str='',
				i=0,
				len=dataitem.length,
				curitem;

			for(i;i<len;i++){
				curitem=dataitem[i];
				str+='<li data-value="'+curitem["id"]+'">'+curitem["name"]+'</li>';
			}
			return str;
		}

		/*查询标签或属性*/
		function searchAttr(config) {
			var str='';
			if(config&&config.dataitem){
				str=doAttrItem({
					dataitem:config.dataitem
				});
			}else{
				var baseconfig={
					url:"../../json/goods/mall_goods_attr.json",
					dataType:'JSON',
					method:'post',
					data:{
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						grade:decodeURIComponent(logininfo.param.grade),
						token:decodeURIComponent(logininfo.param.token)
					}
				};

				$.ajax(baseconfig)
					.done(function(resp){
						var code=parseInt(resp.code,10);
						if(code!==0){
							console.log(resp.message);
							return false;
						}
						var result=resp.result;
						if(result&&result.list){
							str=doAttrItem({
								dataitem:result.list
							});
							$(str).appendTo($admin_addlabel_list.html(''));
						}
					})
					.fail(function(resp){
						console.log(resp.message);
					});
			}
		}


	});


})(jQuery);