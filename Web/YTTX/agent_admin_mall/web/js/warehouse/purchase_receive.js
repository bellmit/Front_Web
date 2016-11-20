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
			var powermap=public_tool.getPower(86),
				receiveedit_power=public_tool.getKeyPower('mall-purchase-receiving',powermap);



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
				$admin_orderNumber=$('#admin_orderNumber'),
				$admin_orderTime=$('#admin_orderTime'),
				$admin_orderState=$('#admin_orderState'),
				$admin_print_btn=$('#admin_print_btn'),
				$admin_receive_list=$('#admin_receive_list'),
				$admin_receiveaction=$('#admin_receiveaction'),
				$admin_allreceiveaction=$('#admin_allreceiveaction'),
				resetform0=null;


			/*重置表单*/
			admin_storereceive_form.reset();


			/*绑定发货数量控制*/
			$admin_receive_list.on('keyup','input',function (e) {
				receiveFilter($(this));
			});


			/*绑定全单收货*/
			$admin_allreceiveaction.on('change',function () {
				var $this=$(this),
					isselect=$this.is(':checked'),
					$input=$admin_receive_list.find('input');

				if(isselect){
					$input.each(function () {
						var $own=$(this);
						$own.attr({
							'readonly':true
						});
						receiveFilter($own,true);
					});

					/*解除邦输入事件*/
					$admin_receive_list.off('keyup','input');
				}else {
					$input.each(function () {
						var $own=$(this),
							tempvalue=$own.attr('data-value');


						$own.attr({
							'readonly':false
						}).val(tempvalue);
						receiveFilter($own);
					});

					/*绑定输入*/
					$admin_receive_list.on('keyup','input',function (e) {
						receiveFilter($(this));
					});
				}

			});


			/*获取编辑缓存*/
			(function () {
				var edit_cache=public_tool.getParams('mall-purchase-receive');
				if(edit_cache){
					/*判断权限*/
					if(receiveedit_power){
						$admin_receiveaction.parent().removeClass('g-d-hidei');
						$admin_allreceiveaction.parent().removeClass('g-d-hidei');
					}else{
						$admin_receiveaction.parent().addClass('g-d-hidei');
						$admin_allreceiveaction.parent().addClass('g-d-hidei');
					}
					/*查询数据*/
					if(typeof edit_cache==='object'){
						setReceiveData(edit_cache['id']);
					}else{
						setReceiveData(edit_cache);
					}
				}else{
					$admin_receiveaction.parent().addClass('g-d-hidei');
					$admin_allreceiveaction.parent().addClass('g-d-hidei');
				}
			}());


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
										orderId:$admin_id.val(),
										detailsIdQuantlitys:(function () {
											var $input=$admin_receive_list.find('input'),
												receivelist=[];
											$input.each(function () {
												var $this=$(this),
													tempid=$this.attr('data-id'),
													value=$this.val();

												receivelist.push(tempid+'#'+value);
											});
											return JSON.stringify(receivelist);
										}())
									});
									config['url']="http://120.76.237.100:8082/mall-agentbms-api/purchasing/order/delivered";
									config['data']=setdata;
								}

								console.log(setdata);
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

		/*修改时设置值*/
		function setReceiveData(id) {
			if(!id){
				return false;
			}


			$.ajax({
					url:/*"http://120.76.237.100:8082/mall-agentbms-api/purchasing/order/view"*/"../../json/warehouse/mall_purchase_stats_view.json",
					dataType:'JSON',
					method:'post',
					data:{
						"id":id,
						"adminId":decodeURIComponent(logininfo.param.adminId),
						"token":decodeURIComponent(logininfo.param.token),
						"grade":decodeURIComponent(logininfo.param.grade)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						if(code===999){
							public_tool.loginTips(function () {
								public_tool.clear();
								public_tool.clearCacheData();
							});
						}
						return false;
					}
					/*是否是正确的返回数据*/
					var list=resp.result;

					if(!list){
						return false;
					}
					list=list[id-1];

					if(!$.isEmptyObject(list)){
						$admin_id.val(id);
						for(var m in list){
							switch(m){
								case 'orderNumber':
									$admin_orderNumber.html('订单编号：'+list[m]);
									break;
								case 'orderTime':
									$admin_orderTime.html('下单时间：'+list[m]);
									break;
								case 'orderState':
									var statusmap={
										1:'未收货',
										3:'部分收货',
										5:'已收货'
									};
									$admin_orderState.html('订单状态：'+statusmap[list[m]]);
									break;
								case 'detailsList':
									var receivelist=list[m],
										len=receivelist.length,
										i=0,
										str='';

									for(i;i<len;i++){
										var tempdata=(receivelist[i]["purchasingQuantlity"]-receivelist[i]["waitingQuantlity"])||0;
										str+='<tr><td>商品名称：'+receivelist[i]["goodsName"]+'</td><td>'+receivelist[i]["attributeName"]+'</td><td>'+receivelist[i]["purchasingQuantlity"]+'</td><td><input type="text" maxlength="8" class="form-control" data-value="'+tempdata+'" data-id="'+receivelist[i]["id"]+'" value="'+tempdata+'" /></td><td>'+receivelist[i]["waitingQuantlity"]+'</td></tr>';
									}

									if(len!==0){
										$(str).appendTo($admin_receive_list.html(''));
									}
									break;
							}
						}
					}
				})
				.fail(function(resp){
					console.log(resp.message);
				});

		}



		/*数据过滤*/
		function receiveFilter($input,flag) {
			var $parent=$input.parent(),
				$total=$parent.prev(),
				$need=$parent.next(),
				filter=/\s*\D*/g,
				total=$total.html().replace(filter,''),
				text=0,
				need=0;

			if(total===''||isNaN(total)){
				total=0;
			}
			total=parseInt(total,10);

			if(flag){
				text=total;
			}else{
				text=$input.val().replace(filter,'');
				if(text===''||isNaN(text)){
					text=0;
				}
				text=parseInt(text,10);
				if(text>=total){
					text=total;
				}else if(text<0){
					text=0;
				}

			}
			need=total - text;
			$need.html(need);
			$input.val(text);
		}






	});



})(jQuery);