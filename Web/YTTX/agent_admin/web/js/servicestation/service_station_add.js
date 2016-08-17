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
				stationdetail_power=public_tool.getKeyPower('查看',powermap),
				stationadd_power=public_tool.getKeyPower('添加',powermap);


			/*dom引用和相关变量定义*/
			var $station_wrap=$('#station_wrap')/*表格*/,
				module_id='station_add'/*模块id，主要用于本地存储传值*/,
				$data_wrap=$('#data_wrap')/*数据展现面板*/,
				$add_wrap=$('#add_wrap')/*发货容器面板*/,
				$update_wrap=$('#update_wrap')/*返修容器面板*/,
				table=null/*数据展现*/,
				$station_add_btn=$('#station_add_btn')/*添加*/,
				$add_title=$('#add_title')/*编辑标题*/,
				$update_title=$('#update_title')/*编辑标题*/,
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
			var add_form=document.getElementById('station_add_form')/*表单dom*/,
				update_form=document.getElementById('station_update_form')/*表单dom*/,
				$station_add_form=$(add_form)/*编辑表单*/,
				$station_update_form=$(update_form)/*编辑表单*/,
				$add_id=$('#add_id'),/*发货id*/
				$update_id=$('#update_id'),/*返修id*/
				$add_cance_btn=$('#add_cance_btn')/*编辑取消按钮*/,
				$update_cance_btn=$('#update_cance_btn')/*编辑取消按钮*/,
				$add_trackingnumber=$('#add_trackingnumber'),/*快递单号*/
				$update_trackingnumber=$('#update_trackingnumber'),
				$add_deliveryhandler=$('#add_deliveryhandler')/*发货经手人*/,
				$update_deliveryhandler=$('#update_deliveryhandler'),
				$add_deliverytime=$('#add_deliverytime')/*发货时间*/,
				$update_deliverytime=$('#update_deliverytime'),
				$update_name=$('#update_name'),
				$update_startnumber=$('#update_startnumber'),
				$update_endnumber=$('#update_endnumber'),
				$update_listnumber=$('#update_listnumber'),
				$update_quantity=$('#update_quantity');





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
				add_form.reset();
				update_form.reset();
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
								url:"http://120.24.226.70:8081/yttx-agentbms-api/user/delete",
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
							url:"http://120.24.226.70:8081/yttx-agentbms-api/user/detail",
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


			/*if(action==='repair'){
				/!*调整布局*!/
				$data_wrap.addClass('collapsed');
				$update_wrap.removeClass('collapsed');
				$add_wrap.addClass('collapsed');
				$("html,body").animate({scrollTop:380},200);
				//重置信息
				add_form.reset();
				$add_title.html('');
				$update_title.html(datas['shortName']+'"服务站返修');
				$update_id.val(id);
			}*/


			$station_add_btn.on('click',function(e){
				e.preventDefault();
				/*调整布局*/
				$data_wrap.addClass('collapsed');
				$update_wrap.addClass('collapsed');
				$add_wrap.removeClass('collapsed');
				$("html,body").animate({scrollTop:300},200);
				//重置信息
				update_form.reset();
				$update_title.html('');
				//第一行获取焦点
				//$user_nickname.focus();
			});
			if(stationadd_power){
				$station_add_btn.removeClass('g-d-hidei');
				$add_wrap.removeClass('g-d-hidei');
			};


			/*取消发货，返修*/
			$.each([$add_cance_btn,$update_cance_btn],function(){
				var selector=this.selector,
					issend=selector.indexOf('send')!==-1?true:false;

				this.on('click',function(e){
					/*调整布局*/
					if(issend){
						add_form.reset();
					}else{
						update_form.reset();
					}
					$data_wrap.removeClass('collapsed');
					$add_wrap.addClass('collapsed');
					$update_wrap.addClass('collapsed');
					if(!$data_wrap.hasClass('collapsed')){
						$("html,body").animate({scrollTop:200},200);
					}
				});

			});




			/*最小化窗口*/
			$.each([$add_title,$update_title], function () {
				var selector=this.selector,
					issend=selector.indexOf('send')!==-1?true:false;

				this.next().on('click',function(e){
					if($data_wrap.hasClass('collapsed')){
						e.stopPropagation();
						e.preventDefault();
						issend?$add_cance_btn.trigger('click'):$update_cance_btn.trigger('click');
					}
				});
			});


			/*绑定时间插件*/
			$.each([$add_deliverytime,$add_repairtime,$update_deliverytime],function(){
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
				var form_opt0={},
					form_opt1={},
					formcache=public_tool.cache;

				if(formcache.form_opt_0 && formcache.form_opt_1){
					$.each([formcache.form_opt_0,formcache.form_opt_1], function (index) {
						var issend=index===0?true:false;
						$.extend(true,(function () {
							return issend?form_opt0:form_opt1;
						}()),(function () {
							return issend?formcache.form_opt_0:formcache.form_opt_1;
						}()),{
							submitHandler: function(form){
								var id=issend?$add_id.val():$update_id.val();

								if(id===''){
									issend?$add_cance_btn.trigger('click'):$update_cance_btn.trigger('click');
									dia.content('<span class="g-c-bs-warning g-btips-warn">请选择需要操作的服务站</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
									return false;
								}


								if(issend){
									var checkdata=getCheckPlugin(add_checkconfig),
										config={
											url:"http://120.24.226.70:8081/yttx-agentbms-api/servicestation/invoice/add",
											dataType:'JSON',
											method:'post',
											data:{
												serviceStationId:id,
												adminId:decodeURIComponent(logininfo.param.adminId),
												token:decodeURIComponent(logininfo.param.token),
												trackingNumber:$add_trackingnumber.val(),
												deliveryHandler:$add_deliveryhandler.val(),
												deliveryTime:$add_deliverytime.val()
											}
										};
									if(!$.isEmptyObject(checkdata)){
										for(var i in checkdata){
											config.data[i]=JSON.stringify(checkdata[i]);
										}
									}
								}else{
									var config={
										url:"http://120.24.226.70:8081/yttx-agentbms-api/servicestation/repairorder/add",
										dataType:'JSON',
										method:'post',
										data:{
											serviceStationId:id,
											adminId:decodeURIComponent(logininfo.param.adminId),
											token:decodeURIComponent(logininfo.param.token),
											trackingNumber:$update_trackingnumber.val(),
											deliveryHandler:$update_deliveryhandler.val(),
											deliveryTime:$update_deliverytime.val(),
											name:$update_name.val(),
											startNumber:$update_startnumber.val(),
											endNumber:$update_endnumber.val(),
											listNumber:$update_listnumber.val(),
											quantity:$update_quantity.val()
										}
									};
								}


								$.ajax(config)
									.done(function(resp){
										var code=parseInt(resp.code,10);
										if(code!==0){
											console.log(resp.message);
											setTimeout(function(){
												issend?dia.content('<span class="g-c-bs-warning g-btips-warn">发货失败</span>').show():dia.content('<span class="g-c-bs-warning g-btips-warn">返修失败</span>').show();
											},300);
											setTimeout(function () {
												dia.close();
											},2000);
											return false;
										}
										//重绘表格
										table.ajax.reload(null,false);
										//重置表单
										issend?$add_cance_btn.trigger('click'):$update_cance_btn.trigger('click');
										setTimeout(function(){
											issend?dia.content('<span class="g-c-bs-success g-btips-succ">发货成功</span>').show():dia.content('<span class="g-c-bs-success g-btips-succ">返修成功</span>').show();
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

					});
				}
				/*提交验证*/
				$station_add_form.validate(form_opt0);
				$station_update_form.validate(form_opt1);
			}
		}

	});



})(jQuery);