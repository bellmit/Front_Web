/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){


		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.24.226.70:8081/yttx-agentbms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*权限调用*/
			var powermap=public_tool.getPower(),
				stationdelete_power=public_tool.getKeyPower('删除',powermap),
				stationupdate_power=public_tool.getKeyPower('修改',powermap),
				stationadd_power=public_tool.getKeyPower('添加',powermap);


			/*dom引用和相关变量定义*/
			var $station_wrap=$('#station_wrap')/*表格*/,
				module_id='station_add'/*模块id，主要用于本地存储传值*/,
				$data_wrap=$('#data_wrap')/*数据展现面板*/,
				$edit_wrap=$('#edit_wrap')/*发货容器面板*/,
				table=null/*数据展现*/,
				$station_add_btn=$('#station_add_btn')/*添加*/,
				$edit_title=$('#edit_title')/*编辑标题*/,
				dia=dialog({
					title:'温馨提示',
					okValue:'确定',
					width:300,
					ok:function(){
						this.close();
						return false;
					},
					cancel:false
				})/*一般提示对象*/,
				dialogObj=public_tool.dialog()/*回调提示对象*/;



			/*查询对象*/
			var $search_shortName=$('#search_shortName'),
				$search_name=$('#search_name'),
				$search_phone=$('#search_phone'),
				$search_agentShortName=$('#search_agentShortName'),
				$search_superShortName=$('#search_superShortName'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');



			/*表单对象*/
			var edit_form=document.getElementById('station_edit_form')/*表单dom*/,
				$station_edit_form=$(edit_form)/*编辑表单*/,
				$station_servicestationid=$('#station_servicestationid'),/*返修id*/
				$edit_cance_btn=$('#edit_cance_btn')/*编辑取消按钮*/,
				$station_fullname=$('#station_fullname'),/*快递单号*/
				$station_userwrap=$('#station_userwrap'),
				$station_username=$('#station_username'),
				$station_password=$('#station_password'),
				$station_nickname=$('#station_nickname'),
				$station_shortname=$('#station_shortname'),
				$station_name=$('#station_name')/*发货经手人*/,
				$station_phone=$('#station_phone'),
				$station_tel=$('#station_tel')/*发货时间*/,
				$station_province=$('#station_province'),
				$station_city=$('#station_city'),
				$station_area=$('#station_area'),
				$station_province_value=$('#station_province_value'),
				$station_city_value=$('#station_city_value'),
				$station_area_value=$('#station_area_value'),
				$station_address=$('#station_address'),
				$station_agentid=$('#station_agentid'),
				$station_remark=$('#station_remark');


			/*分润设置*/
			var	$station_becomeagent=$('#station_becomeagent'),
				$station_agentwrap=$('#station_agentwrap'),
				$station_agentinput=$station_agentwrap.find('input'),
				$station_salescheck=$('#station_salescheck'),
				$station_saleswrap=$('#station_saleswrap'),
				$station_salessetting=$('#station_salessetting'),
				$station_salesprofit=$station_salessetting.find('input'),
				$station_salesself=$('#station_salesself'),
				$station_salesauto=$('#station_salesauto'),
				$station_acqcheck=$('#station_acqcheck'),
				$station_acqwrap=$('#station_acqwrap'),
				$station_acqsetting=$('#station_acqsetting'),
				$station_acqprofit=$station_acqsetting.find('input'),
				$station_acqself=$('#station_acqself'),
				$station_acqauto=$('#station_acqauto'),
				$station_profitsumforsales=$('#station_profitsumforsales'),
				$station_profitsumforacquiring=$('#station_profitsumforacquiring'),
				profit_data={},
				$station_bindagentwrap=$('#station_bindagentwrap'),
				$station_becomeagentwrap=$('#station_becomeagentwrap');





			/*数据加载*/
			var station_config={
				url:"http://120.24.226.70:8081/yttx-agentbms-api/servicestations/related",
				dataType:'JSON',
				method:'post',
				dataSrc:function ( json ) {
					var code=parseInt(json.code,10);
					if(code!==0){
						if(code===999){
							/*清空缓存*/
							public_tool.clear();
							public_tool.loginTips();
						}
						console.log(json.message);
						return [];
					}
					return json.result.list;
				},
				data:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				}
			};
			table=$station_wrap.DataTable({
				deferRender:true,/*是否延迟加载数据*/
				//serverSide:true,/*是否服务端处理*/
				searching:true,/*是否搜索*/
				ordering:true,/*是否排序*/
				//order:[[1,'asc']],/*默认排序*/
				paging:true,/*是否开启本地分页*/
				pagingType:'simple_numbers',/*分页按钮排列*/
				autoWidth:true,/*是否*/
				info:true,/*显示分页信息*/
				stateSave:false,/*是否保存重新加载的状态*/
				processing:true,/*大消耗操作时是否显示处理状态*/
				ajax:station_config,/*异步请求地址及相关配置*/
				columns: [
					{"data":"shortName"},
					{"data":"name"},
					{
						"data":"phone",
						"render":function(data, type, full, meta ){
							return public_tool.phoneFormat(data);
						}
					},
					{
						"data":"address",
						"render":function(data, type, full, meta ){
							return data.toString().slice(0,20)+'...';
						}
					},
					{
						"data":"agentShortName"
					},
					{
						"data":"supershortName"
					},
					{
						"data":"id",
						"render":function(data, type, full, meta ){
							var btns='';

							if(stationupdate_power){
								/*修改*/
								btns+='<span  data-id="'+data+'" data-action="update" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-pencil"></i>\
									<span>修改</span>\
									</span>';
							}
							if(stationdelete_power){
								/*删除*/
								btns+='<span  data-id="'+data+'" data-action="delete" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-trash"></i>\
									<span>删除</span>\
									</span>';
							}
							return btns;
						}
					}
				],/*控制分页数*/
				aLengthMenu: [
					[5,10,20,30],
					[5,10,20,30]
				],
				lengthChange:true/*是否可改变长度*/
			});




			/*
			 * 初始化
			 * */
			(function(){
				/*重置表单*/
				edit_form.reset();
				$admin_search_clear.trigger('click');
				/*地址调用*/
				new public_tool.areaSelect().areaSelect({
					$province:$station_province,
					$city:$station_city,
					$area:$station_area,
					$provinceinput:$station_province_value,
					$cityinput:$station_city_value,
					$areainput:$station_area_value
				});
			}());


			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_shortName,$search_name,$search_phone,$search_agentShortName,$search_superShortName],function(){
					this.val('');
				});
			});


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},station_config.data);

				$.each([$search_shortName,$search_name,$search_phone,$search_agentShortName,$search_superShortName],function(){
					var text=this.val(),
						selector=this.selector.slice(1),
						key=selector.split('_');



					if(text===""){
						if(typeof data[key[1]]!=='undefined'){
							delete data[key[1]];
						}
					}else{
						if(key[1].toLowerCase().indexOf('phone')!==-1){
							text=text.replace(/\s*/g,'');
						}
						data[key[1]]=text;
					}

				});
				station_config.data= $.extend(true,{},data);
				table.ajax.config(station_config).load(false);
			});


			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$station_wrap.delegate('span','click',function(e){
				e.stopPropagation();
				e.preventDefault();

				var target= e.target,
					$this,
					id,
					action,
					$tr;

				//适配对象
				if(target.className.indexOf('btn')!==-1){
					$this=$(target);
				}else{
					$this=$(target).parent();
				}
				$tr=$this.closest('tr');
				id=$this.attr('data-id');
				action=$this.attr('data-action');

				/*修改操作*/
				if(action==='update'){
					/*添加高亮状态*/
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					//重置信息
					edit_form.reset();
					$station_userwrap.addClass('g-d-hidei');
					//重置信息
					$station_servicestationid.val(id);
					$.ajax({
						url:"http://120.24.226.70:8081/yttx-agentbms-api/servicestation/detail",
						dataType:'JSON',
						method:'post',
						data:{
							serviceStationId:id,
							roleId:decodeURIComponent(logininfo.param.roleId),
							adminId:decodeURIComponent(logininfo.param.adminId),
							token:decodeURIComponent(logininfo.param.token)
						}
					}).done(function(resp){
						var code=parseInt(resp.code,10);
						if(code!==0){
							if(code===999){
								/*清空缓存*/
								public_tool.clear();
								public_tool.loginTips();
							}
							console.log(resp.message);
							return false;
						}

						var result=resp.result,
							station=result.serviceStation,
							sales=result.salesProfit,
							acq=result.acquiringProfit;

						if(!$.isEmptyObject(station)){
							/*调整布局*/
							$data_wrap.addClass('collapsed');
							$edit_wrap.removeClass('collapsed');
							$edit_cance_btn.prev().html('修改');
							$edit_title.html('修改服务站');
							$("html,body").animate({scrollTop:380},200);


							for(var i in station){
								switch (i){
									case 'fullName':
										$station_fullname.val(station[i]);
										break;

									case 'shortName':
										$station_shortname.val(station[i]);
										break;

									case 'name':
										$station_name.val(station[i]);
										break;

									case 'province':
										$station_province_value.val(station[i]);
										break;

									case 'city':
										$station_city_value.val(station[i]);
										break;

									case 'country':
										$station_area_value.val(station[i]);
										break;

									case 'address':
										$station_address.val(station[i]);
										break;

									case 'phone':
										$station_phone.val(public_tool.phoneFormat(station[i]));
										break;

									case 'tel':
										$station_tel.val(station[i]);
										break;

									case 'agentId':
										var tempagentid=station[i];
										if(tempagentid!==''){
											tempagentid=parseInt(tempagentid,10);
											$station_agentid.find('option').each(function(){
												var $this=$(this),
													value=$this.val();

												if(value!==''){
													value=parseInt(value,10);
													if(value===tempagentid){
														/*选中*/
														$this.prop({
															'selected':true
														});
														/*设置代理商数据*/
														profit_data['becomeAgent']=0;
														if(typeof profit_data['grade']!=='undefined'){
															delete profit_data['grade'];
														}
														$station_agentwrap.addClass('g-d-hidei');
														$station_becomeagentwrap.addClass('g-d-hidei');
														return false;
													}
												}
											});
										}else if(tempagentid===''){
											$station_becomeagentwrap.removeClass('g-d-hidei');
											$station_bindagentwrap.addClass('g-d-hidei');
											$station_agentwrap.removeClass('g-d-hidei');

											profit_data['becomeAgent']=1;
											profit_data['grade']=1;

											$station_agentid.find('option:first-child').prop({
												'checked':true
											});
											$station_agentinput.eq(0).prop({
												'checked':true
											});

										}
										break;
									case 'Remark':
										$station_remark.val(station[i]);
										break;

									case 'isCustomSalesProfit':
										/*销售分润设置*/
										var salesvalue=parseInt(station[i],10);
										if(salesvalue===1){
											/*自定义*/
											$station_salesself.prop({
												'checked':true
											});
											profit_data['isCustomSalesProfit']=1;
											$station_saleswrap.removeClass('g-d-hidei');
											if(!$.isEmptyObject(sales)){
												$station_profitsumforsales.val(sales['profitSum']);
												profit_data['distributorP1ForSales']=sales['distributorProfit1'];
												profit_data['distributorP2ForSales']=sales['distributorProfit2'];
												profit_data['distributorP3ForSales']=sales['distributorProfit3'];
												$station_salesprofit.eq(0).val(sales['distributorProfit1']);
												$station_salesprofit.eq(1).val(sales['distributorProfit2']);
												$station_salesprofit.eq(2).val(sales['distributorProfit3']);
											}else{
												$station_profitsumforsales.val('');
												profit_data['distributorP1ForSales']='';
												profit_data['distributorP2ForSales']='';
												profit_data['distributorP3ForSales']='';
											}
										}else if(salesvalue===0){
											/*按系统定义*/
											$station_salesauto.prop({
												'checked':true
											});
											$station_saleswrap.addClass('g-d-hidei');
											profit_data['isCustomSalesProfit']=0;
											$station_profitsumforsales.val('');
											if(typeof profit_data['distributorP1ForSales']!=='undefined'){
												delete profit_data['distributorP1ForSales'];
												delete profit_data['distributorP2ForSales'];
												delete profit_data['distributorP3ForSales'];
											}
										}
										break;

									case 'isCustomAcquiringProfit':
										/*收单分润设置*/
										var acqvalue=parseInt(station[i],10);
										if(acqvalue===1){
											/*自定义*/
											$station_acqself.prop({
												'checked':true
											});
											profit_data['isCustomAcquiringProfit']=1;
											$station_acqwrap.removeClass('g-d-hidei');
											if(!$.isEmptyObject(acq)){
												$station_profitsumforacquiring.val(acq['profitSum']);
												profit_data['distributorP1ForAcquiring']=acq['distributorProfit1'];
												profit_data['distributorP2ForAcquiring']=acq['distributorProfit2'];
												profit_data['distributorP3ForAcquiring']=acq['distributorProfit3'];
												$station_acqprofit.eq(0).val(sales['distributorProfit1']);
												$station_acqprofit.eq(1).val(sales['distributorProfit2']);
												$station_acqprofit.eq(2).val(sales['distributorProfit3']);
											}else{
												$station_profitsumforacquiring.val('');
												profit_data['distributorP1ForAcquiring']='';
												profit_data['distributorP2ForAcquiring']='';
												profit_data['distributorP3ForAcquiring']='';
											}
										}else if(acqvalue===0){
											/*按系统定义*/
											$station_profitsumforacquiring.val('');
											$station_acqauto.prop({
												'checked':true
											});
											$station_acqwrap.addClass('g-d-hidei');
											profit_data['isCustomAcquiringProfit']=0;
											if(typeof profit_data['distributorP1ForAcquiring']!=='undefined'){
												delete profit_data['distributorP1ForAcquiring'];
												delete profit_data['distributorP2ForAcquiring'];
												delete profit_data['distributorP3ForAcquiring'];
											}
										}
										break;
								}
							};
							return true;
						}

						dia.content('<span class="g-c-bs-warning g-btips-warn">修改失败请重新操作</span>').show();
						setTimeout(function(){
							dia.close();
						},2000);

					}).fail(function(resp){
						console.log('error');
					});
				}else if(action==='delete'){
					/*判断是否可以上下架*/
					dia.content('<span class="g-c-bs-warning g-btips-warn">目前暂未开放此功能</span>').show();
					setTimeout(function(){
						dia.close();
					},2000);
					return false;
				}



			});



			/*添加服务站*/
			$station_add_btn.on('click',function(e){
				e.preventDefault();
				/*调整布局*/
				$data_wrap.addClass('collapsed');
				$edit_wrap.removeClass('collapsed');
				$edit_cance_btn.prev().html('添加');
				$edit_title.html('添加服务站');
				$("html,body").animate({scrollTop:300},200);
				//重置信息
				edit_form.reset();
				$station_userwrap.removeClass('g-d-hidei');
				//第一行获取焦点
				$station_fullname.focus();
			});
			/*配置添加和修改的权限*/
			if(stationadd_power){
				$station_add_btn.removeClass('g-d-hidei');
				$edit_wrap.removeClass('g-d-hidei');
			};
			if(stationupdate_power){
				$edit_wrap.removeClass('g-d-hidei');
			}


			/*取消发货，返修*/
			$edit_cance_btn.on('click',function(e){
				/*调整布局*/
				edit_form.reset();
				$station_userwrap.addClass('g-d-hidei');
				$data_wrap.removeClass('collapsed');
				$edit_wrap.addClass('collapsed');
				$edit_cance_btn.prev().html('添加');
				$edit_title.html('添加服务站');
				if(!$data_wrap.hasClass('collapsed')){
					$("html,body").animate({scrollTop:200},200);
				}
				/*添加高亮状态*/
				if(operate_item){
					operate_item.removeClass('item-lighten');
					operate_item=null;
				}

				/*重置绑定代理商ID,代理商，分润信息*/
				$station_bindagentwrap.removeClass('g-d-hidei').find('option:first-child').prop({
					'selected':true
				});

				$station_becomeagentwrap.removeClass('g-d-hidei');
				$station_agentwrap.addClass('g-d-hidei');
				profit_data['becomeAgent']=0;
				if(typeof profit_data['grade']!=='undefined'){
					delete profit_data['grade'];
				}

				$station_saleswrap.addClass('g-d-hidei');
				profit_data['isCustomSalesProfit']=0;
				if(typeof profit_data['distributorP1ForSales']!=='undefined'){
					delete profit_data['distributorP1ForSales'];
					delete profit_data['distributorP2ForSales'];
					delete profit_data['distributorP3ForSales'];
				}

				$station_acqwrap.addClass('g-d-hidei');
				profit_data['isCustomAcquiringProfit']=0;
				if(typeof profit_data['distributorP1ForAcquiring']!=='undefined'){
					delete profit_data['distributorP1ForAcquiring'];
					delete profit_data['distributorP2ForAcquiring'];
					delete profit_data['distributorP3ForAcquiring'];
				}
			});


			/*手机格式化*/
			/*格式化手机号码*/
			$.each([$search_phone,$station_phone],function(){
				this.on('keyup',function(){
					var phoneno=this.value.replace(/\D*/g,'');
					if(phoneno==''){
						this.value='';
						return false;
					}
					this.value=public_tool.phoneFormat(this.value);
				});
			});


			/*设置代理*/
			/*初始化绑定代理列表*/
			var binddisabled=false;
			$.ajax({
				url:"http://120.24.226.70:8081/yttx-agentbms-api/agents/list",
				dataType:'JSON',
				method:'post',
				data:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				}
			}).done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.clear();
						public_tool.loginTips();
					}
					console.log(resp.message);
					$station_agentid.html('');
					binddisabled=true;
					$station_bindagentwrap.addClass('g-d-hidei');
					return false;
				}
				binddisabled=false;
				$station_bindagentwrap.removeClass('g-d-hidei');
				var bindlist=resp.result.list,
					len=bindlist.length,
					k= 0,
					str='<option value="" selected>请选择绑定代理商ID</option>';
				for(k;k<len;k++){
					str+='<option value="'+bindlist[k]["id"]+'">'+bindlist[k]["shortName"]+'</option>';
				}
				$(str).appendTo($station_agentid.html(''));

				/*绑定事件*/
				$station_agentid.on('change',function(){
					var $this=$(this),
						value=$this.val();
					if(value===''){
						$station_becomeagentwrap.removeClass('g-d-hidei');
					}else{
						/*如果设置了值则重置值*/
						$station_becomeagentwrap.addClass('g-d-hidei');
						if(profit_data['becomeAgent']===1){
							profit_data['becomeAgent']=0;
							$station_becomeagent.prop({
								'checked':false
							});
							$station_agentwrap.addClass('g-d-hidei');
							$station_agentinput.each(function(){
								$(this).prop({
									'checked':false
								});
							});
							/*设置数据*/
							if(typeof profit_data['grade']!=='undefined'){
								delete profit_data['grade'];
							}
						};
					}
				});
			}).fail(function(resp){
					console.log('error');
					$station_agentid.html('');
					binddisabled=true;
					$station_bindagentwrap.addClass('g-d-hidei');
			});


			/*切换代理*/
			profit_data['becomeAgent']=0;
			$station_becomeagent.on('click',function(){
				var $this=$(this),
					ischeck=$this.is(':checked'),
					gradecheck=$station_agentinput.eq(0);

				if(ischeck){
					/*置空绑定代理商ID并隐藏选项*/
					if(!binddisabled){
						if($station_agentid.val()!==''){
							$station_agentid.find('option').each(function (index) {
								if(index===0){
									$(this).prop({
										'selected':true
									});
								}else{
									$(this).prop({
										'selected':false
									});
								}
							});
						}
						$station_bindagentwrap.addClass('g-d-hidei');
					}

					/*初始化成为代理商*/
					$station_agentwrap.removeClass('g-d-hidei');
					profit_data['becomeAgent']=1;
					gradecheck.prop({
						'checked':true
					});
					profit_data['grade']=gradecheck.val();
				}else{
					if(!binddisabled){
						$station_bindagentwrap.removeClass('g-d-hidei');
					}


					$station_agentwrap.addClass('g-d-hidei');
					$station_agentinput.each(function(){
						$(this).prop({
							'checked':false
						});
					});
					/*设置数据*/
					profit_data['becomeAgent']=0;
					if(typeof profit_data['grade']!=='undefined'){
						delete profit_data['grade'];
					}
				}
			});
			/*选择代理*/
			$station_agentwrap.on('click','input',function(){
				profit_data['grade']=this.value;
			});


			/*设置分润*/
			$.each([$station_salescheck,$station_acqcheck],function(index){
				var selector=this.selector,
					issale=selector.indexOf('sales')!==-1?true:false,
					$radio=this.find('input');



				/*绑定设置显示隐藏和初始化*/
				$radio.each(function(){
					var $this=$(this),
						value=parseInt($this.val(),10);

					/*设置默认值为系统设置*//*初始化*/
					if(value===0){
						$this.prop({
							'checked':true
						});
						if(issale){
							profit_data['isCustomSalesProfit']=value;
						}else{
							profit_data['isCustomAcquiringProfit']=value;
						}
					}

					/*绑定事件*/
					$this.on('click',function(){
						if(value===1){
							/*自定义*/
							if(issale){
								$station_saleswrap.removeClass('g-d-hidei');
								profit_data['isCustomSalesProfit']=value;
								/*设置了的三级分润默认值*/
								profit_data['distributorP1ForSales']='';
								profit_data['distributorP2ForSales']='';
								profit_data['distributorP3ForSales']='';

							}else{
								$station_acqwrap.removeClass('g-d-hidei');
								profit_data['isCustomAcquiringProfit']=value;
								/*设置了的三级分润默认值*/
								profit_data['distributorP1ForAcquiring']='';
								profit_data['distributorP2ForAcquiring']='';
								profit_data['distributorP3ForAcquiring']='';
							}
						}else if(value===0){
							/*系统默认*/
							if(issale){
								$station_saleswrap.addClass('g-d-hidei');
								profit_data['isCustomSalesProfit']=value;
								/*删除已经设置了的三级分润*/
								if(typeof profit_data['distributorP1ForSales']!=='undefined'){
									delete profit_data['distributorP1ForSales'];
								}
								if(typeof profit_data['distributorP2ForSales']!=='undefined'){
									delete profit_data['distributorP2ForSales'];
								}
								if(typeof profit_data['distributorP3ForSales']!=='undefined'){
									delete profit_data['distributorP3ForSales'];
								}
							}else{
								$station_acqwrap.addClass('g-d-hidei');
								profit_data['isCustomAcquiringProfit']=value;
								/*删除已经设置了的三级分润*/
								if(typeof profit_data['distributorP1ForAcquiring']!=='undefined'){
									delete profit_data['distributorP1ForAcquiring'];
								}
								if(typeof profit_data['distributorP2ForAcquiring']!=='undefined'){
									delete profit_data['distributorP2ForAcquiring'];
								}
								if(typeof profit_data['distributorP3ForAcquiring']!=='undefined'){
									delete profit_data['distributorP3ForAcquiring'];
								}
							}
						}
					});
				});
			});


			/*绑定分润输入限制*/
			$.each([$station_salesprofit,$station_acqprofit],function(){
				this.each(function () {
					$(this).on('keyup',function(){
						var val=this.value.replace(/[^0-9*\-*^\.]/g,'');
						if(val.indexOf('.')!==-1){
							val=val.split('.');
							if(val.length>=3){
								val.length=2;
								val=val[0]+'.'+val[1];
							}else{
								val=val.join('.');
							}
						}
						this.value=val;
					});
				});
			});

			/*最小化窗口*/
			$edit_title.next().on('click',function(e){
				if($data_wrap.hasClass('collapsed')){
					e.stopPropagation();
					e.preventDefault();
					$edit_cance_btn.trigger('click');
				}
			});


			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt={},
					formcache=public_tool.cache;

				if(formcache.form_opt_0){
					$.extend(true,form_opt,formcache.form_opt_0,{
						submitHandler: function(form){
							var id=$station_servicestationid.val(),
								isadd=id===''?true:false,
								config={
									dataType:'JSON',
									method:'post',
									data:{}
								};

							/*校验分润对象*/
							if($station_salesself.is(':checked')){
								/*自定义*/
								if(!validProfit($station_salesprofit,dia,profit_data,true)){
									if(typeof config.data['profitSumForSales']!=='undefined'){
										delete config.data['profitSumForSales'];
									}
									return false;
								}
								$.extend(true,config.data,{
									profitSumForSales:$station_profitsumforsales.val()
								});
							}
							if($station_acqself.is(':checked')){
								if(!validProfit($station_acqprofit,dia,profit_data,false)){
									if(typeof config.data['profitSumForAcquiring']!=='undefined'){
										delete config.data['profitSumForAcquiring'];
									}
									return false;
								}
								$.extend(true,config.data,{
									profitSumForAcquiring:$station_profitsumforacquiring.val()
								});
							}


							$.extend(true,config.data,{
								roleId:decodeURIComponent(logininfo.param.roleId),
								adminId:decodeURIComponent(logininfo.param.adminId),
								token:decodeURIComponent(logininfo.param.token),
								fullName:$station_fullname.val(),
								shortName:$station_shortname.val(),
								name:$station_name.val(),
								province:$station_province_value.val(),
								city:$station_city_value.val(),
								country:$station_area_value.val(),
								address:$station_address.val(),
								phone:$station_phone.val().replace(/\s*/g,''),
								tel:$station_tel.val(),
								Remark:$station_remark.val()
							});


							if(isadd){
								/*添加*/
								config['url']="http://120.24.226.70:8081/yttx-agentbms-api/servicestation/addupdate";
								if(typeof config['data']['serviceStationId']!=='undefined'){
									delete config['data']['serviceStationId'];
								}
								config['data']['username']=$station_username.val();
								config['data']['password']=$station_password.val();
								config['data']['nickname']=$station_nickname.val();
							}else{
								/*更新*/
								config['url']="http://120.24.226.70:8081/yttx-agentbms-api/servicestation/addupdate";
								config['data']['serviceStationId']=id;
								if(typeof config['data']['username']!=='undefined'){
									delete config['data']['username'];
									delete config['data']['password'];
									delete config['data']['nickname'];
								}
							}
							/*扩展其他参数*/
							$.extend(true,config.data,profit_data);
							if(profit_data['becomeAgent']===0){
								config.data['agentId']=$station_agentid.val();
							}else if(profit_data['becomeAgent']===1){
								if(typeof config.data['agentId']!=='undefined'){
									delete config.data['agentId'];
								}
							}


							$.ajax(config)
								.done(function(resp){
									var code=parseInt(resp.code,10);
									if(code!==0){
										console.log(resp.message);
										setTimeout(function(){
											isadd?dia.content('<span class="g-c-bs-warning g-btips-warn">添加服务站失败</span>').show():dia.content('<span class="g-c-bs-warning g-btips-warn">修改服务站失败</span>').show();
										},300);
										setTimeout(function () {
											dia.close();
										},2000);
										return false;
									}
									//重绘表格
									table.ajax.reload(null,false);
									//重置表单
									//重置表单
									$edit_cance_btn.trigger('click');
									setTimeout(function(){
										isadd?dia.content('<span class="g-c-bs-success g-btips-succ">添加服务站成功</span>').show():dia.content('<span class="g-c-bs-success g-btips-succ">修改服务站成功</span>').show();
									},300);
									setTimeout(function () {
										dia.close();
									},2000);
								})
								.fail(function(resp){
									console.log(resp.message);
								});
							return false;
						}
					});
				}
				/*提交验证*/
				$station_edit_form.validate(form_opt);
			}
		}


		/*校验分润设置数据合法性*/
		function validProfit(input,dia,data,type){
			if(!input){
					return false;
			}

			if(!data){
				return false;
			}

			var isvalid=false,
				ele_a=input.eq(0).val(),
				ele_aa=input.eq(1).val(),
				ele_aaa=input.eq(2).val(),
				temp_a=parseInt(ele_a * 10000,10) / 10000,
				temp_aa=parseInt(ele_aa * 10000,10) / 10000,
				temp_aaa=parseInt(ele_aaa * 10000,10) / 10000;

			/*设置分润规则*/
			if(isNaN(temp_a)||isNaN(temp_aa)||isNaN(temp_aaa)){
				dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置数据非法值</span>').show();
				isvalid=false;
				return isvalid;
			}
			if((temp_a===0||temp_a>=100)||(temp_aa===0||temp_aa>=100)||(temp_aaa===0||temp_aaa>=100)){
				dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置数据不能大于100或为0</span>').show();
				isvalid=false;
				return isvalid;
			}else if((temp_a+temp_aa+temp_aaa)>100){
				dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置总和不能大于100</span>').show();
				isvalid=false;
				return isvalid;
			}else if((temp_a+temp_aa+temp_aaa)<100){
				dia.content('<span class="g-c-bs-warning g-btips-warn">分润设置总和应为100</span>').show();
				isvalid=false;
				return isvalid;
			}

			/*校验*/
			isvalid=true;

			/*设置值*/
			if(type){
				data['distributorP1ForSales']=ele_a;
				data['distributorP2ForSales']=ele_aa;
				data['distributorP3ForSales']=ele_aaa;
			}else{
				data['distributorP1ForAcquiring']=ele_a;
				data['distributorP2ForAcquiring']=ele_aa;
				data['distributorP3ForAcquiring']=ele_aaa;
			}

			return isvalid;
		}

	});



})(jQuery);