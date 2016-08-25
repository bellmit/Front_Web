/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){


		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://10.0.5.222:8080/yttx-agentbms-api/module/menu',
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
				stationdetail_power=public_tool.getKeyPower('查看',powermap),
				stationadd_power=public_tool.getKeyPower('添加',powermap);


			/*dom引用和相关变量定义*/
			var $station_wrap=$('#station_wrap')/*表格*/,
				module_id='station_add'/*模块id，主要用于本地存储传值*/,
				$data_wrap=$('#data_wrap')/*数据展现面板*/,
				$edit_wrap=$('#edit_wrap')/*发货容器面板*/,
				table=null/*数据展现*/,
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
			var edit_form=document.getElementById('edit_form')/*表单dom*/,
				$edit_form=$(edit_form)/*编辑表单*/,
				$edit_id=$('#edit_id'),/*发货id*/
				$station_add_btn=$('#station_add_btn'),
				$edit_cance_btn=$('#edit_cance_btn')/*编辑取消按钮*/,
				$send_trackingnumber=$('#send_trackingnumber'),/*快递单号*/
				$repair_trackingnumber=$('#repair_trackingnumber'),
				$send_deliveryhandler=$('#send_deliveryhandler')/*发货经手人*/,
				$repair_deliveryhandler=$('#repair_deliveryhandler'),
				$send_deliverytime=$('#send_deliverytime')/*发货时间*/,
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_title=$('#show_detail_title')/*详情标题*/,
				$show_detail_content=$('#show_detail_content')/*详情内容*/,
				detail_map={
					createTime:'创建时间',
					grade:"级别",
					lastLoginIp:"登陆IP地址",
					lastLoginTime:"登陆时间",
					machineCode:"机器码",
					nickName:"用户名",
					phone:"手机号码",
					status:"状态",
					tokenInvalidTime:"登陆权限时间"
				}/*详情映射*/;





			/*数据加载*/
			var station_config={
				url:"http://10.0.5.222:8080/yttx-agentbms-api/servicestations/related",
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
						return null;
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
				ordering:false,/*是否排序*/
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


							if(stationdetail_power){
									/*查看*/
									btns+='<span data-id="'+data+'" data-action="select" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									 <i class="fa-file-text-o"></i>\
									 <span>查看</span>\
									 </span>';
							}
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
						data[key[1]]=text;
					}

				});
				station_config.data= $.extend(true,{},data);
				table.ajax.config(station_config).load(false);
			});


			/*事件绑定*/
			/*绑定查看，修改操作*/
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

					/*调整布局*/
					$data_wrap.addClass('collapsed');
					$edit_wrap.removeClass('collapsed');
					$("html,body").animate({scrollTop:300},200);
					//重置信息
					$edit_title.html('修改账户');

					var datas=table.row($tr).data();
					for(var i in datas) {
						switch (i) {
							case "id":
								$user_id.val(datas[i]);
								break;
							case "nickName":
								$user_nickname.val(datas[i]);
								break;
							case "phone":
								$user_phone.val(datas[i]);
								break;
							case "machineCode":
								$user_machinecode.val(datas[i]);
								break;
							case "agentName":
								$user_agentname.val(datas[i]);
								break;
							case "serviceStationName":
								$user_servicestationname.val(datas[i]);
								break;
						}
					}
				}else if(action==='delete'){
					/*删除操作*/
					//没有回调则设置回调对象
					dialogObj.setFn(function(){
						var self=this;

						$.ajax({
								url:"http://10.0.5.222:8080/yttx-agentbms-api/user/delete",
								method: 'POST',
								dataType: 'json',
								data:{
									"id":id,
									"adminId":decodeURIComponent(logininfo.param.adminId),
									"token":decodeURIComponent(logininfo.param.token)
								}
							})
							.done(function (resp) {
								var code=parseInt(resp.code,10);
								if(code!==0){
									dia.content('<span class="g-c-bs-warning g-btips-warn">删除失败</span>').show();
									setTimeout(function () {
										dia.close();
									},2000);
									console.log(resp.message);
									return false;
								}
								getColumnData(article_page,article_config);
								//table.row($tr).remove().draw(false);
								setTimeout(function(){
									self.content('<span class="g-c-bs-success g-btips-succ">删除数据成功</span>');
								},100);
							})
							.fail(function(resp){
								console.log(resp.message);
							});
					},'user_delete');
					//确认删除
					dialogObj.dialog.content('<span class="g-c-bs-warning g-btips-warn">是否删除此数据？</span>').showModal();
				}else if(action==='audit'){
					/*判断是否可以上下架*/
					dia.content('<span class="g-c-bs-warning g-btips-warn">目前暂未开放此功能</span>').show();
					setTimeout(function(){
						dia.close();
					},2000);
					return false;
				}else if(action==='select'){
					/*查看*/
					$.ajax({
							url:"http://10.0.5.222:8080/yttx-agentbms-api/user/detail",
							method: 'POST',
							dataType: 'json',
							data:{
								"id":id,
								"adminId":decodeURIComponent(logininfo.param.adminId),
								"token":decodeURIComponent(logininfo.param.token)
							}
						})
						.done(function(resp){
							var code=parseInt(resp.code,10);
							if(code!==0){
								/*回滚状态*/
								console.log(resp.message);
								return false;
							}
							/*是否是正确的返回数据*/
							var list=resp.result,
								str='',
								istitle=false;

							if(!$.isEmptyObject(list)){
								for(var j in list){
									if(typeof detail_map[j]!=='undefined'){
										if(j==='name'||j==='Name'){
											istitle=true;
											$show_detail_title.html(list[j]+'成员详情信息');
										}else{
											if(j==='status'){
												var status=parseInt(list[j],10);
												if(status===0){
													status="正常";
												}else if(state===1){
													status="锁定";
												}
												str+='<tr><th>'+detail_map[j]+':</th><td>'+status+'</td></tr>';
											}else if(j==='grade'){
												var grade=parseInt(list[j],10);
												if(grade===0){
													grade="普通用户";
												}else if(grade===1){
													grade="马甲用户";
												}
												str+='<tr><th>'+detail_map[j]+':</th><td>'+grade+'</td></tr>';
											}else{
												str+='<tr><th>'+detail_map[j]+':</th><td>'+list[j]+'</td></tr>';
											}
										}
									}
								};
								if(!istitle){
									$show_detail_title.html('账户详情信息');
								}
								$show_detail_content.html(str);
								$show_detail_wrap.modal('show',{backdrop:'static'});
							}else{
								$show_detail_content.html('');
								$show_detail_title.html('');
							}

						})
						.fail(function(resp){
							console.log(resp.message);
						});
				}



			});


			$station_add_btn.on('click',function(e){
				e.preventDefault();
				//重置表单
				edit_form.reset();
				$edit_title.html('添加马甲用户');

				/*调整布局*/
				$data_wrap.addClass('collapsed');
				$edit_wrap.removeClass('collapsed');
				$("html,body").animate({scrollTop:300},200);
				//第一行获取焦点
				$user_nickname.focus();
			});
			if(stationadd_power){
				$station_add_btn.removeClass('g-d-hidei');
				$edit_wrap.removeClass('g-d-hidei');
			};


			/*取消发货，返修*/
			$edit_cance_btn.on('click',function(e){
				/*调整布局*/
				edit_form.reset();
				$data_wrap.removeClass('collapsed');
				$edit_wrap.addClass('collapsed');
				if(!$data_wrap.hasClass('collapsed')){
					$("html,body").animate({scrollTop:200},200);
				}
			});




			/*最小化窗口*/
			$edit_title.next().on('click',function(e){
				if($data_wrap.hasClass('collapsed')){
					e.stopPropagation();
					e.preventDefault();
					$edit_cance_btn.trigger('click');
				}
			});


			/*绑定时间插件*/
			$.each([$send_deliverytime,$repair_deliverytime],function(){
				this.val('').datepicker({
					autoclose:true,
					clearBtn:true,
					format: 'yyyy-mm-dd',
					todayBtn: true,
					endDate:moment().format('YYYY-MM-DD')
				})
			});







			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt={};
				if(public_tool.cache.form_opt_0){
					$.extend(true,form_opt,public_tool.cache.form_opt_0,{
						submitHandler: function(form){
							//判断是否存在id号
							var id=$user_id.val();

							dia.content('<span class="g-c-bs-warning g-btips-warn">目前暂未开放此功能</span>').show();
							setTimeout(function(){
								dia.close();
							},2000);
							return false;

							if(id!==''){
								//此处配置修改稿角色地址（开发阶段）
								var config={
									url:"http://10.0.5.222:8080/yttx-agentbms-api/user/update",
									dataType:'JSON',
									method:'post',
									data:{
										id:id,
										adminId:decodeURIComponent(logininfo.param.adminId),
										token:decodeURIComponent(logininfo.param.token),
										nickName:$user_nickname.val(),
										phone: function () {
											var txt=$user_phone.val();
											return txt.replace(/\s*/g,'');
										},
										agentName:$user_agentname.val(),
										machineCode:$user_machinecode.val(),
										serviceStationName:$user_servicestationname.val()
									}
								};
							}else{
								//此处配置添加角色地址（开发阶段）
								var config={
									url:"http://10.0.5.222:8080/yttx-agentbms-api/user/add",
									dataType:'JSON',
									method:'post',
									data:{
										adminId:decodeURIComponent(logininfo.param.adminId),
										token:decodeURIComponent(logininfo.param.token),
										nickName:$user_nickname.val(),
										phone: function () {
											var txt=$user_phone.val();
											return txt.replace(/\s*/g,'');
										},
										agentName:$user_agentname.val(),
										machineCode:$user_machinecode.val(),
										serviceStationName:$user_servicestationname.val()
									}
								};
							}

							$.ajax(config)
								.done(function(resp){
									var code=parseInt(resp.code,10);
									if(code!==0){
										console.log(resp.message);
										setTimeout(function(){
											id!==''?dia.content('<span class="g-c-bs-warning g-btips-warn">修改用户信息失败</span>').show():dia.content('<span class="g-c-bs-warning g-btips-warn">添加用户信息失败</span>').show();
										},300);
										setTimeout(function () {
											dia.close();
										},2000);
										return false;
									}
									//重绘表格
									getColumnData(article_page,article_config);
									//重置表单
									$edit_cance_btn.trigger('click');
									setTimeout(function(){
										id!==''?dia.content('<span class="g-c-bs-success g-btips-succ">修改用户信息成功</span>').show():dia.content('<span class="g-c-bs-success g-btips-succ">添加用户信息成功</span>').show();
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
				$user_edit_form.validate(form_opt);
			}




		}

	});




})(jQuery);