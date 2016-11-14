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
				warehouseadd_power=public_tool.getKeyPower('mall-store-add',powermap);


			/*dom引用和相关变量定义*/
			var module_id='mall-warehouse-add'/*模块id，主要用于本地存储传值*/,
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
				admin_warehouseadd_form=document.getElementById('admin_warehouseadd_form'),
				$admin_warehouseadd_form=$(admin_warehouseadd_form),
				$admin_id=$('#admin_id'),
				$admin_username=$('#admin_username'),
				$admin_name=$('#admin_name'),
				$admin_pwd=$('#admin_pwd'),
				$admin_fullName=$('#admin_fullName'),
				$admin_shortName=$('#admin_shortName'),
				$admin_whCode=$('#admin_whCode'),
				$admin_area=$('#admin_area'),
				$admin_adscriptionRegionCodeNames=$('#admin_adscriptionRegionCodeNames'),
				$admin_status=$('#admin_status'),
				$admin_remark=$('#admin_remark'),
				$admin_action=$('#admin_action'),
				$admin_province=$('#admin_province'),
				$admin_city=$('#admin_city'),
				$admin_country=$('#admin_country'),
				$admin_address=$('#admin_address'),
				$admin_linkman=$('#admin_linkman'),
				$admin_cellphone=$('#admin_cellphone'),
				$admin_telephone=$('#admin_telephone'),
				resetform0=null;



			/*绑定切换地址*/
			$.each([$admin_province,$admin_city,$admin_country],function () {
				var self=this,
					selector=this.selector,
					type='';

				if(selector.indexOf('province')!==-1){
					type='province';
				}else if(selector.indexOf('city')!==-1){
					type='city';
				}else if(selector.indexOf('country')!==-1){
					type='country';
				}

				this.on('change',function () {
					var $this=$(this),
						value=$this.val();
					if(type==='province'){
						getAddress(value,'','city',true);
					}else if(type==='city'){
						getAddress(value,'','country',true);
					}
				});
			});



			/*获取编辑缓存*/
			admin_warehouseadd_form.reset();
			var edit_cache=public_tool.getParams('mall-warehouse-add');
			if(edit_cache){
				$admin_action.html('修改');
				/*判断权限*/
				if(warehouseadd_power){
					$admin_action.removeClass('g-d-hidei');
				}else{
					$admin_action.addClass('g-d-hidei');
				}
				/*查询数据*/
				setWarehouseData(edit_cache['id']);
			}else{
				/*判断权限*/
				if(warehouseadd_power){
					$admin_action.removeClass('g-d-hidei');
				}else{
					$admin_action.addClass('g-d-hidei');
				}
				getAddress(86,'','province',true);
			}



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
							formtype='addwarehouse';
						}
						$.extend(true,(function () {
							if(formtype==='addwarehouse'){
								return form_opt0;
							}
						}()),(function () {
							if(formtype==='addwarehouse'){
								return formcache.form_opt_0;
							}
						}()),{
							submitHandler: function(form){
								var setdata={};

								$.extend(true,setdata,basedata);

								if(formtype==='addwarehouse'){

									$.extend(true,setdata,{
										title:$admin_title.val(),
										type:$admin_type.find(':selected').val(),
										sort:$admin_sort.val(),
										status:$admin_status.find(':selected').val(),
										content:$admin_content.val(),
										isAllReceived:$admin_isAllReceived.is(':checked')?1:0
									});

									var attachment=$admin_attachmentUrl.val();
									if(attachment!==''&&$admin_attachmentUrl.attr('data-value')!==''){
                                        if(attachment.indexOf('#,#')!==-1){
                                            attachment=attachment.split('#,#');
                                            setdata['attachmentUrl']=JSON.stringify(attachment);
                                        }else{
                                            setdata['attachmentUrl']=attachment;
                                        }
									}else{
										delete setdata['attachmentUrl'];
									}


                                    var id=$admin_id.val(),
										actiontype='';
                                    if(id!==''){
										/*修改操作*/
                                        setdata['id']=id;
										actiontype='修改';
                                    }else{
										/*新增操作*/
										actiontype='新增';
                                        delete setdata['id'];
                                    }
									config['url']="http://120.76.237.100:8082/mall-agentbms-api/warehouse/addupdate";
									config['data']=setdata;
								}

								$.ajax(config).done(function(resp){
									var code;
									if(formtype==='addwarehouse'){
										code=parseInt(resp.code,10);
										if(code!==0){
											dia.content('<span class="g-c-bs-warning g-btips-warn">'+actiontype+'公告失败</span>').show();
											return false;
										}else{
											dia.content('<span class="g-c-bs-success g-btips-succ">'+actiontype+'公告成功</span>').show();
										}
									}


									setTimeout(function () {
										dia.close();
										if(formtype==='addwarehouse'){
											/*页面跳转*/
											location.href='mall-warehouse-list.html';
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
					resetform0=$admin_warehouseadd_form.validate(form_opt0);
				}
			}



		}


		/*查询地址*/
		function getAddress(id,sel,type,getflag) {
			$.ajax({
					url:"http://120.24.226.70:8082/yttx-public-api/address/get",
					dataType:'JSON',
					method:'post',
					data:{
						parentCode:id===''?86:id,
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token),
						grade:decodeURIComponent(logininfo.param.grade)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						return false;
					}
					/*是否是正确的返回数据*/
					var res=resp.result;
					if(!res){
						return false;
					}
					var list=res.list;

					if(!list){
						return false;
					}

					var len=list.length,
						str='',
						$wrap='',
						i=0;

					if(type==='province'){
						$wrap=$admin_province;
					}else if(type==='city'){
						$wrap=$admin_city;
					}else if(type==='country'){
						$wrap=$admin_country;
					}

					if(len!==0){
						if(sel!==''){
							for(i;i<len;i++){
								var codes=list[i]["code"];
								if(codes===sel){
									str+='<option selected value="'+codes+'">'+list[i]["name"]+'</option>';
								}else{
									str+='<option value="'+codes+'">'+list[i]["name"]+'</option>';
								}
							}
						}else{
							for(i;i<len;i++){
								if(i===0){
									sel=list[i]["code"];
									str+='<option selected value="'+list[i]["code"]+'">'+list[i]["name"]+'</option>';
								}else{
									str+='<option value="'+list[i]["code"]+'">'+list[i]["name"]+'</option>';
								}
							}
						}
						$(str).appendTo($wrap.html(''));

						if(sel!==''&&getflag){
							if(type==='province'){
								getAddress(sel,'','city',true);
							}else if(type==='city'){
								getAddress(sel,'','country');
							}
						}
					}
				})
				.fail(function(resp){
					console.log(resp.message);
				});
		}


		/*修改时设置值*/
		function setWarehouseData(id) {
			if(!id){
				return false;
			}


			$.ajax({
					url:"http://120.76.237.100:8082/mall-agentbms-api/warehouse/detail",
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
						return false;
					}
					/*是否是正确的返回数据*/
					var list=resp.result;

					if(!$.isEmptyObject(list)){
						$admin_id.val(id);
						for(var j in list){
							switch(j){
								case 'username':
									$admin_username.val(list[j]);
									break;
								case 'password':
									$admin_password.val(list[j]);
									break;
								case 'name':
									$admin_name.val(list[j]);
									break;
								case 'grade':
									var grade=list[j];
									$admin_gradewrap.find('input').each(function () {
										var $this=$(this),
											value=parseInt($this.val(),10);
										if(value===grade){
											$this.prop({
												'checked':true
											});
											return false;
										}
									});
									break;
								case 'fullName':
									$admin_fullName.val(list[j]);
									break;
								case 'shortName':
									$admin_shortName.val(list[j]);
									break;
								case 'adscriptionRegion':
									$admin_adscriptionRegion.val(list[j]);
									break;
								case 'linkman':
									$admin_linkman.val(list[j]);
									break;
								case 'cellphone':
									$admin_cellphone.val(public_tool.phoneFormat(list[j]));
									break;
								case 'telephone':
									$admin_telephone.val(list[j]);
									break;
								case 'province':
									getAddress('86',list[j],'province');
									break;
								case 'city':
									getAddress(list['province'],list[j],'city');
									break;
								case 'country':
									getAddress(list['city'],list[j],'country');
									break;
								case 'address':
									$admin_address.val(list[j]);
									break;
								case 'isAudited':
									var audit=list[j];
									$admin_isAudited.find('option').each(function () {
										var $this=$(this),
											value=parseInt($this.val(),10);
										if(value===audit){
											$this.prop({
												'selected':true
											});
											return false;
										}
									});
									break;
								case 'status':
									var status=list[j];
									$admin_status.find('option').each(function () {
										var $this=$(this),
											value=parseInt($this.val(),10);
										if(value===status){
											$this.prop({
												'selected':true
											});
											return false;
										}
									});
									break;
								case 'salesmanId':
									var salesman=list[j];
									$admin_salesmanId.find('option').each(function () {
										var $this=$(this),
											value=parseInt($this.val(),10);
										if(value===salesman){
											$this.prop({
												'selected':true
											});
											return false;
										}
									});
									break;
								case 'remark':
									$admin_remark.val(list[j]);
									break;
							}
						}

					}
				})
				.fail(function(resp){
					console.log(resp.message);
				});

		}



	});



})(jQuery);