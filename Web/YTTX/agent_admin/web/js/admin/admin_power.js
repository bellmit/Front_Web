/*admin_role:角色管理*/
(function($){
	'use strict';
	$(function(){

		/*dom引用和相关变量定义*/
		var $admin_power_wrap=$('#admin_power_wrap')/*表格*/,
			module_id='admin_power'/*模块id，主要用于本地存储传值*/,
			table=null/*datatable 解析后的对象*/,
			$table_wrap=$('#table_wrap')/*表格容器*/,
			$edit_wrap=$('#edit_wrap')/*编辑容器*/,
			$power_add_btn=$('#power_add_btn'),/*添加角色*/
			$edit_close_btn=$('#edit_close_btn')/*编辑关闭按钮*/,
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
			dialogObj=public_tool.dialog()/*回调提示对象*/,
			visible_arr=[2,3]/*定义需要隐藏的列索引*/,
			$colgroup_wrap=$('#colgroup_wrap')/*表格分组控制容器*/,
			init_group='<col class="g-w-number2"><col class="g-w-number10"><col class="g-w-number10"><col class="g-w-number10"><col class="g-w-number18">'/*表格分组控制全显示情况*/,
			visible_group='<col class="g-w-number4"><col class="g-w-number16"><col class="g-w-number30">'/*表格分组控制部分隐藏情况*/;


		var operate_config={
				deferRender:true,/*是否延迟加载数据*/
				//serverSide:true,/*是否服务端处理*/
				searching:true,/*是否搜索*/
				ordering:true,/*是否排序*/
				//order:[[1,'asc']],/*默认排序*/
				paging:true,/*是否开启本地分页*/
				pagingType:'simple_numbers',/*分页按钮排列*/
				autoWidth:true,/*是否自适应宽度*/
				info:true,/*显示分页信息*/
				stateSave:false,/*是否保存重新加载的状态*/
				processing:true,/*大消耗操作时是否显示处理状态*/
				/*异步请求地址及相关配置*/
				data:'',/*默认配置排序规则*/
				aLengthMenu: [
					[5,10,20],
					[5,10,20]
				],/*控制是否每页可改变显示条数*/
				lengthChange:true/*是否可改变长度*/
			}/*查询数据配置对象*/,
			$operate_selcet_wrap=$('#operate_selcet_wrap')/*查询数据展现容器*/,
			$operate_send_wrap=$('#operate_send_wrap')/*查询数据展现容器*/,
			$operate_record_wrap=$('#operate_record_wrap')/*查询数据展现容器*/,
			$operate_selcet_table=$operate_selcet_wrap.find('table')/*查询数据展现容器*/,
			$operate_send_table=$operate_send_wrap.find('table')/*查询数据展现容器*/,
			$operate_record_table=$operate_record_wrap.find('table')/*查询数据展现容器*/,
			sendtable=null/*查询的数据对象*/,
			selecttable=null/*查询的数据对象*/,
			recordtable=null/*查询的数据对象*/,
			$admin_power_setting=$('#admin_power_setting')/*权限设置按钮区*/,
			$operate_aodlist=$('#operate_aodlist')/*添加与删除显示区*/,
			$operate_showlist=$('#operate_showlist')/*查询显示区*/,
			$operate_addlist=$('#operate_addlist')/*添加显示区*/,
			$operate_aodlist_sub=$('#operate_aodlist_sub')/*权限设置操作区*/,
			$operate_aodlist_add=$('#operate_aodlist_add')/*权限设置操作区*/,
			$operate_addlist_sub=$('#operate_addlist_sub')/*权限设置操作区*/,
			$operate_addlist_add=$('#operate_addlist_add')/*权限设置操作区*/,
			$operate_aodlist_btn=$('#operate_aodlist_btn')/*权限设置操作确定按钮*/,
			$operate_addlist_btn=$('#operate_addlist_btn')/*权限设置操作确定按钮*/,
			module_map={
					"系统管理":"admin",
					"用户管理":"user",
					"服务站管理":"serve",
					"代理管理":"agent",
					"admin":"系统管理",
					"user":"用户管理",
					"serve":"服务站管理",
					"agent":"代理管理"
			}/*服务模块映射*/;

		/*表单对象*/
		var $edit_cance_btn=$('#edit_cance_btn')/*编辑取消按钮*/,
			edit_form=document.getElementById('power_edit_form'),
			$power_edit_form=$('#power_edit_form')/*编辑表单*/,
			$power_id=$('#power_id')/*角色id*/,
			$power_name=$('#power_name')/*角色名称*/,
			$power_remark=$('#power_remark')/*角色描述*/;


		//初始化请求
		table=$admin_power_wrap.DataTable({
			deferRender:true,/*是否延迟加载数据*/
			//serverSide:true,/*是否服务端处理*/
			searching:false,/*是否搜索*/
			ordering:false,/*是否排序*/
			//order:[[1,'asc']],/*默认排序*/
			paging:true,/*是否开启本地分页*/
			pagingType:'simple_numbers',/*分页按钮排列*/
			autoWidth:true,/*是否*/
			info:true,/*显示分页信息*/
			stateSave:false,/*是否保存重新加载的状态*/
			processing:true,/*大消耗操作时是否显示处理状态*/
			/*异步请求地址及相关配置*/
			ajax:{
				url:"../../json/admin/admin_power.json",
				dataType:'JSON',
				method:'post',
				data:(function(){
					/*查询本地,如果有则带参数查询，如果没有则初始化查询*/
					var param=public_tool.getParams(module_id);
					//获取参数后清除参数
					public_tool.removeParams(module_id);
					if(param){
						return {"id":param.id,"type":param.type};
					}
					return '';
				}())
			},/*解析每列数据*/
			columns: [
				{
					"data":"btn",
					"render":function(data, type, full, meta ){
						return '<input type="checkbox" data-id="'+full.btn.id+'" name="role" class="cbr">';
					}
				},
				{"data":"name"},
				{"data":"remark"},
				{"data":"user",
					"render":function(data, type, full, meta ){
						var user=full.user,
								res='',
								i= 0,
								len=user.length;
						for(i;i<len;i++){
								res+='<span class="ul-btn" data-id="'+user[i]['id']+'">'+user[i]['name']+'</span>';
						}
						return res;
					}
				},
				{
					"data":"btn",
					"render":function(data, type, full, meta ){
						var id=full.btn.id,
							types=parseInt(full.btn.type,10),
							btns='';

						if(types===1){
							//超级管理员角色
							btns='<span data-id="'+id+'" data-type="'+types+'" data-action="update" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-pencil"></i>\
											<span>修改</span>\
											</span>';
						}else if(types===2||types===3){
							//普通管理员角色
							btns='<span data-id="'+id+'" data-type="'+types+'" data-action="update" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa fa-pencil"></i>\
											<span>修改</span>\
											</span>\
											<span data-href="admin_member.html" data-module="admin_member" data-action="select" data-id="'+id+'" data-type="'+types+'" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-group"></i>\
											<span>成员</span>\
											</span>\
											<span data-action="select" data-id="'+id+'" data-type="'+types+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-gear"></i>\
											<span>权限</span>\
											</span>\
											<span  data-id="'+id+'" data-type="'+types+'" data-action="delete" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-trash"></i>\
											<span>删除</span>\
											</span>';
						}else{
							//其他角色
						}
						return btns;
					}
				}
			],/*控制分页数*/
			aLengthMenu: [
				[5,10,20],
				[5,10,20]
			],/*控制是否每页可改变显示条数*/
			lengthChange:false/*是否可改变长度*/
		});



		/*事件绑定*/
		/*绑定查看，修改，删除操作*/
		$admin_power_wrap.delegate('span','click',function(e){
			e.stopPropagation();
			e.preventDefault();

			var target= e.target,
				$this,
				id,
				type,
				module,
				action,
				href,
				$cbx,
				$tr;

			//适配对象
			if(target.className.indexOf('btn')!==-1){
				$this=$(target);
			}else{
				$this=$(target).parent();
			}
			$tr=$this.closest('tr'),
			$cbx=$tr.find('td:first-child input');

			//先选中数据
			if(!$cbx.is(':checked')){
				dia.content('<span class="g-c-bs-warning g-btips-warn">请选中数据</span>').show();
				return false;
			}

			id=$this.attr('data-id');
			type=$this.attr('data-type');
			action=$this.attr('data-action');
			href=$this.attr('data-href');

			if(href){
				//跳转查询操作
				//清除本地存储
				module=$this.attr('data-module');
				public_tool.removeParams(module);
				//设置本地存储
				public_tool.setParams(module,{
					'module':module,
					'id':id,
					'type':type,
					'action':action
				});
				//地址跳转
				setTimeout(function(){
					location.href=href;
				},100);

			}else{
				if(action==='delete'){
					/*删除操作*/
					//没有回调则设置回调对象
					dialogObj.setFn(function(){
							var self=this;
							$.ajax({
									url: "../../json/admin/admin_role_delete.json",
									method: 'POST',
									dataType: 'json',
									data:{
										"id":id,
										"type":type
									}
								})
								.done(function (resp) {
									if(resp.flag){
										//datatable重绘
										table.row($tr).remove().draw();
										setTimeout(function(){
											self.content('<span class="g-c-bs-success g-btips-succ">删除数据成功</span>');
										},100);
									}
								})
								.fail(function(resp){
									if(!resp.flag&&resp.message){
										setTimeout(function(){
											self.content('<span class="g-c-bs-warning g-btips-warn">'+resp.message+'</span>');
										},100);
									}else{
										setTimeout(function(){
											self.content('<span class="g-c-bs-warning g-btips-warn">删除数据失败</span>');
										},100);

									}
								});
						},'admin_delete');
					//确认删除
					dialogObj.dialog.content('<span class="g-c-bs-warning g-btips-warn">是否删除此数据？</span>').showModal();

				}else if(action==='update'){
					/*修改操作*/
					/*调整布局*/
					$table_wrap.addClass('col-md-9');
					$edit_wrap.addClass('g-d-showi');
					table.columns(visible_arr).visible(false);
					$colgroup_wrap.html(visible_group);
					//重置信息
					$edit_close_btn.prev().html('修改权限');
					$edit_cance_btn.prev().html('修改权限');
					//赋值
					var datas=table.row($tr).data();
							for(var i in datas){
								switch (i){
									case 'name':
										$power_name.val(datas[i]);
										break;
									case 'remark':
										$power_remark.val(datas[i]);
										break;
									case 'btn':
										$power_id.val(datas[i][id]);
										break;
								}
							}
				}else if(action==='select'){
					/*隐藏操作区域*/
					$operate_aodlist.addClass('g-d-hidei');
					$operate_addlist.addClass('g-d-hidei');
					$operate_showlist.addClass('g-d-hidei');
					/*清空上次已查信息*/
				  $operate_aodlist_add.html('').attr({'data-theme':''});
				  $operate_aodlist_sub.html('').attr({'data-theme':''});
				  $operate_addlist_add.html('').attr({'data-theme':''});
					$operate_addlist_sub.html('').attr({'data-theme':''});
					/*查询权限列表*/
					$.ajax({
							url: "../../json/admin/admin_power_setting.json",
							method: 'POST',
							dataType: 'json',
							data:{
								"id":id,
								"type":type
							}
						})
						.done(function (resp) {
							if(resp.flag){
								var datas=resp.data,
									len=datas?datas.length:0,
									i= 0,
									item=null;

								//存在数据
								if(len!==0){
									for(i;i<len;i++){
										if(datas[i]['type']===type){
											item=datas[i];
											break;
										}
									};
									if(item){
										/*传递父参数，并显示设置权限按钮*/
										/*开启权限控制按钮区域*/
										$admin_power_setting.attr({
											'data-id':id,
											'data-type':type
										}).removeClass('g-d-hidei');
										/*解析数据*/
										var subitem,sublen,res='';
										for(var j in item){
											if(typeof module_map[j]!=='undefined'){
												subitem=item[j];
												sublen=subitem.length;
												if(sublen===0){
													res+='<td>&nbsp;</td>';
												}else{
													res+='<td>';
													var k= 0;
													for(k;k<sublen;k++){
														switch(subitem[k]){
															case 'add':
																res+='<span class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8" data-theme="'+module_map[j]+'" data-action="'+subitem[k]+'">' +
																	'<i class="fa fa-plus"></i>' +
																	'<span>添加</span>' +
																	'</span>';
																break;
															case 'update':
																res+='<span class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8" data-theme="'+module_map[j]+'" data-action="'+subitem[k]+'">' +
																	'<i class="fa fa-edit"></i>' +
																	'<span>修改</span>' +
																	'</span>';
																break;
															case 'select':
																res+='<span class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8" data-theme="'+module_map[j]+'" data-action="'+subitem[k]+'">' +
																	'<i class="fa fa-file-o"></i>' +
																	'<span>查看</span>' +
																	'</span>';
																break;
															case 'send':
																res+='<span class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8" data-theme="'+module_map[j]+'" data-action="'+subitem[k]+'">' +
																	'<i class="fa fa-mail-forward"></i>' +
																	'<span>发货</span>' +
																	'</span>';
																break;
															case 'record':
																res+='<span class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8" data-theme="'+module_map[j]+'" data-action="'+subitem[k]+'">' +
																	'<i class="fa fa-bar-chart"></i>' +
																	'<span>销售记录</span>' +
																	'</span>';
																break;
														}
													};
													res+='</td>';
												}
											}else{
												continue;
											}
										}
										$(res).appendTo($admin_power_setting.html(''));
									}else{
										/*关闭权限控制按钮区域*/
										$admin_power_setting.attr({
											'data-id':'',
											'data-type':''
										}).addClass('g-d-hidei').html('<td colspan="4">&nbsp;</td>');
									}
								}else{
									/*关闭权限控制按钮区域*/
									$admin_power_setting.attr({
										'data-id':'',
										'data-type':''
									}).addClass('g-d-hidei').html('<td colspan="4">&nbsp;</td>');
								}
							}
						})
						.fail(function(resp){
							if(!resp.flag&&resp.message){
								console.log(resp.message);
							}else{
								console.log('获取服务信息失败');
							}
						});
				}
			}



		});



		/*//取消修改*/
		$edit_cance_btn.on('click',function(e){
			//切换显示隐藏表格和编辑区
			/*调整布局*/
			$table_wrap.removeClass('col-md-9');
			$edit_wrap.removeClass('g-d-showi');
			table.columns(visible_arr).visible(true);
			$colgroup_wrap.html(init_group);
		});

		/*添加角色*/
		$power_add_btn.on('click',function(){
			//重置表单
			edit_form.reset();
			$edit_close_btn.prev().html('添加权限');
			$edit_cance_btn.prev().html('添加权限');
			//*调整布局*/
			$table_wrap.addClass('col-md-9');
			$edit_wrap.addClass('g-d-showi');
			table.columns(visible_arr).visible(false);
			$colgroup_wrap.html(visible_group);
			//第一行获取焦点
			$power_name.focus();
		});

		/*//关闭编辑区*/
		$edit_close_btn.click(function(e){
			e.preventDefault();
			$edit_cance_btn.trigger('click');
		});


		/*表单验证*/
		if($.isFunction($.fn.validate)) {
			/*配置信息*/
			var form_opt={};
			if(public_tool.cache.form_opt_0){
				$.extend(true,form_opt,public_tool.cache.form_opt_0,{
					submitHandler: function(form){
						//判断是否存在id号
						var id=$power_id.val(),
							config={
								url:"",
								method: 'POST',
								dataType: 'json',
								data: {
									"powerName":$power_name.val(),
									"powerRemark":$power_remark.val()
								}
							};

						if(id!==''&&typeof id==='number'){
							//此处配置修改稿角色地址（开发阶段）
							config.url="../../json/admin/admin_role_update.json";
							config.data['role_Id']=id;
						}else{
							//此处配置添加角色地址（开发阶段）
							config.url="../../json/admin/admin_role_update.json";
							if(config.data['power_Id']){
								delete config.data['power_Id'];
							}
						}

						$.ajax(config)
							.done(function(resp){
								if(resp.flag){
									dia.content('<span class="g-c-bs-success g-btips-succ">操作成功</span>').show();
									//重置表单
									$edit_cance_btn.trigger('click');
									//重绘表格
									table.draw();
								}else{
									dia.content('<span class="g-c-bs-warning g-btips-warn">操作失败</span>').show();
								}
								setTimeout(function () {
									dia.close();
								},2000);
							})
							.fail(function(){
								dia.content('<span class="g-c-bs-warning g-btips-warn">操作失败</span>').show();
								setTimeout(function () {
									dia.close();
								},2000)

							});

					}
				});
			}
			/*提交验证*/
			$power_edit_form.validate(form_opt);
		}



		/*绑定操作列表添加和删除操作*/
		$.each([$operate_aodlist_add,$operate_aodlist_sub,$operate_addlist_add],function(){
				var selector=this.selector;
				//绑定事件
				this.delegate('i','click',function(e){
					var $this=$(this);

					//区分事件类型
					if(selector.indexOf('aodlist_add')!==-1){
						//添加操作
						$this.parent().appendTo($operate_aodlist_sub);
					}else if(selector.indexOf('aodlist_sub')!==-1){
						//删除操作
						$this.parent().appendTo($operate_aodlist_add);
					}else if(selector.indexOf('addlist_add')!==-1){
						//添加操作
						$this.parent().appendTo($operate_addlist_sub);
					}
				});
		});


		/*绑定修改操作*/
		$admin_power_setting.delegate('span','click',function(e){
			e.stopPropagation();
			e.preventDefault();
			
			var target= e.target,
				$this,
				id=$admin_power_setting.attr('data-id'),
				type=$admin_power_setting.attr('data-type'),
				action,
				theme,
				module;

			//适配对象
			if(target.className.indexOf('btn')!==-1){
				$this=$(target);
			}else{
				$this=$(target).parent();
			}
			action=$this.attr('data-action');
			theme=$this.attr('data-theme');
			module=module_map[theme];
			
			/*初始化界面*/
			$admin_power_setting.attr({'data-theme':theme});

			/*路由*/
			if(action==='update'||action==='add'){
				if(action==='update'){
					/*初始化界面*/
					$operate_aodlist.removeClass('g-d-hidei');
					$operate_addlist.addClass('g-d-hidei');
					$operate_showlist.addClass('g-d-hidei');
					$operate_aodlist_add.attr({'data-theme':theme});
					$operate_aodlist_sub.attr({'data-theme':theme});
				}else if(action==='add'){
					/*初始化界面*/
					$operate_aodlist.addClass('g-d-hidei');
					$operate_addlist.removeClass('g-d-hidei');
					$operate_showlist.addClass('g-d-hidei');
					$operate_addlist_add.attr({'data-theme':theme});
				}

				$.ajax({
					url: "../../json/admin/admin_power_user.json",
					method: 'POST',
					dataType: 'json',
					data:{
						"id":id,
						"type":type,
						"module":module
					}
				})
				.done(function (resp) {
					if(resp.flag){
						var datas=resp.data,
							len=datas?datas.length:0,
							subres='',
							addres='',
							selected=parseInt(Math.random() * len,10),
							i=0;

						//存在数据
						if(len!==0){
							for(i;i<len;i++){
								if(i<selected){
									subres+='<span data-id="'+datas[i]['id']+'">'+datas[i]['name']+'<i></i></span>';
								}else{
									addres+='<span data-id="'+datas[i]['id']+'">'+datas[i]['name']+'<i></i></span>';
								}
							};
							if(action==='update'){
								/*修改操作（添加，删除）*/
								$operate_aodlist_add.html(addres);
								$operate_aodlist_sub.html(subres);
							}else if(action==='add'){
								/*修改操作（添加）*/
								$operate_addlist_add.html(addres);
								$operate_addlist_sub.html(subres);
							}
						}
					}
				})
				.fail(function(resp){
					if(!resp.flag&&resp.message){
						console.log(resp.message);
					}else{
						console.log('获取服务信息失败');
					}
				});
			}else if(action==='select'||action==='send'||action==='record'){
				/*查看,发货，消费记录操作*/
				/*初始化界面*/
				$operate_aodlist.addClass('g-d-hidei');
				$operate_addlist.addClass('g-d-hidei');
				$operate_showlist.removeClass('g-d-hidei');
				/*查看详情*/
				$.ajax({
						url:"../../json/admin/admin_power_user.json",
						dataType:'JSON',
						method:'post',
						data:{
							"id":id,
							"type":type
						}
				})
				.done(function(resp){
					/*重置配置信息*/
					var	datalist=resp.data;

					/*设置配置对象和dom结构*/
					if(action==='send'){
						if(sendtable===null){
							(function(cf,dl){
								var config= $.extend(true,{},cf),
									tablestr='';
								/*设置数据源*/
								if(dl!==null){
									config.data=dl.slice(0);
								}else{
									config.data.data='';
								}
								tablestr='<colgroup><col class="g-w-number12"><col class="g-w-number14"><col class="g-w-number12"><col class="g-w-number12"></colgroup><thead><tr><th class="sorting">发货价格</th><th class="sorting">客户电话</th><th class="sorting">发货数量</th><th class="sorting">发货时间</th></tr></thead><tbody class="middle-align"></tbody>';
								config['columns']=[
									{
										"data":"price"
									},
									{
										"data":"phone"
									},
									{
										"data":"number"
									},
									{
										"data":"endDateTime"
									}
								];
								$(tablestr).appendTo($operate_send_table.html(''));
								sendtable=$operate_send_table.DataTable(config);
							})(operate_config,datalist);
						}
						$operate_send_wrap.removeClass('g-d-hidei');
						$operate_record_wrap.addClass('g-d-hidei');
						$operate_selcet_wrap.addClass('g-d-hidei');
					}else if(action==='record'){
						if(recordtable===null){
							(function(cf,dl){
								var config= $.extend(true,{},cf),
									tablestr='';
								/*设置数据源*/
								if(dl!==null){
									config.data=dl.slice(0);
								}else{
									config.data.data='';
								}
								tablestr='<colgroup><col class="g-w-number10"><col class="g-w-number10"><col class="g-w-number8"><col class="g-w-number8"><col class="g-w-number14"></colgroup><thead><tr><th class="sorting">发货价格</th><th class="sorting">客户电话</th><th class="sorting">发货数量</th><th class="sorting">发货时间</th><th class="no-sorting">描述</th></tr></thead><tbody class="middle-align"></tbody>';
								config['columns']=[
									{
										"data":"price"
									},
									{
										"data":"phone"
									},
									{
										"data":"number"
									},
									{
										"data":"endDateTime"
									},
									{
										"data":"remark"
									}
								];
								$(tablestr).appendTo($operate_record_table.html(''));
								recordtable=$operate_record_table.DataTable(config);
							})(operate_config,datalist);

						}
						$operate_send_wrap.addClass('g-d-hidei');
						$operate_record_wrap.removeClass('g-d-hidei');
						$operate_selcet_wrap.addClass('g-d-hidei');
					}else if(action==='select'){
						if(selecttable===null){
							(function(cf,dl){
								var config= $.extend(true,{},cf),
									tablestr='';
								/*设置数据源*/
								if(dl!==null){
									config.data=dl.slice(0);
								}else{
									config.data.data='';
								}
								tablestr='<colgroup><col class="g-w-number20"><col class="g-w-number16"><col class="g-w-number14"></colgroup><thead><tr><th class="sorting">名称</th><th class="sorting">电话</th><th class="sorting">数量</th></tr></thead><tbody class="middle-align"></tbody>';
								config['columns']=[
									{
										"data":"name"
									},
									{
										"data":"phone"
									},
									{
										"data":"number"
									}
								];
								$(tablestr).appendTo($operate_selcet_table.html(''));
								selecttable=$operate_selcet_table.DataTable(config);
							})(operate_config,datalist);

						}
						$operate_send_wrap.addClass('g-d-hidei');
						$operate_record_wrap.addClass('g-d-hidei');
						$operate_selcet_wrap.removeClass('g-d-hidei');
					}else{
						$operate_selcet_wrap.addClass('g-d-hidei');
						$operate_send_wrap.addClass('g-d-hidei');
						$operate_record_wrap.addClass('g-d-hidei');
					}

				})
				.fail(function(resp){
					$operate_selcet_wrap.addClass('g-d-hidei');
					$operate_send_wrap.addClass('g-d-hidei');
					$operate_record_wrap.addClass('g-d-hidei');
				});
			}
			
			
		});

		/*绑定确定修改*/
		$operate_aodlist_btn.on('click',function () {
				
				var id=$admin_power_setting.attr('data-id'),
				type=$admin_power_setting.attr('data-type'),
				module=module_map[$admin_power_setting.attr('data-theme')],
				res=[];
		
				/*过滤*/
				if((id===''&&module==='')||(id!==''&&module==='')||typeof module==='undefined'){
					dia.content('<span class="g-c-bs-warning g-btips-warn">没有选择权限数据</span>').show();
					return false;
				}
				
				
				
				/*发送请求*/
				var i=0,
				res=[],
				item=$operate_aodlist_sub.find('span'),
				len=item.size();
				
				if(len!==0){
					for(i;i<len;i++){
						res.push(item.eq(i).attr('data-id'));
					}
				}else{
					res='null';
				}
				
				$.ajax({
									url: "../../json/admin/admin_power_user.json",
									method: 'POST',
									dataType: 'json',
									data:{
										"id":id,
										"type":type,
										"module":module,
										"subid":res
									}
								})
				.done(function (resp) {
					if(resp.flag){
						//成功后重置数据，同时防止重复提交
						$admin_power_setting.attr({'data-id':''});
						$admin_power_setting.attr({'data-type':''});
						$admin_power_setting.attr({'data-theme':''}).addClass('g-d-hidei');
						$operate_aodlist_sub.html('');
						$operate_aodlist_add.html('');
						//数据区重绘
						table.draw();
					}
				})
				.fail(function(resp){
					if(!resp.flag&&resp.message){
						console.log(resp.message);
					}else{
						console.log('获取服务信息失败');
					}
				});
		});





	});


})(jQuery);