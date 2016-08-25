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
				agentdelete_power=public_tool.getKeyPower('删除',powermap),
				agentupdate_power=public_tool.getKeyPower('修改',powermap),
				agentdetail_power=public_tool.getKeyPower('查看',powermap),
				agentadd_power=public_tool.getKeyPower('添加',powermap),
				agentbind_power=public_tool.getKeyPower('绑定服务站',powermap);


			/*dom引用和相关变量定义*/
			var $agent_list_wrap=$('#agent_list_wrap')/*表格*/,
				module_id='agent_add'/*模块id，主要用于本地存储传值*/,
				$data_wrap=$('#data_wrap')/*数据展现面板*/,
				$edit_wrap=$('#edit_wrap')/*发货容器面板*/,
				table=null/*数据展现*/,
				$agent_add_btn=$('#agent_add_btn')/*添加*/,
				$edit_title=$('#edit_title')/*编辑标题*/,
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
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_title=$('#show_detail_title')/*详情标题*/,
				$show_detail_content=$('#show_detail_content')/*详情内容*/,
				detail_map={
					fullName:'服务站全称',
					shortName:"服务站简称",
					name:"负责人姓名",
					phone:"负责人手机号码",
					address:"地址",
					sales:"销售",
					inventory:"库存",
					repairs:"返修",
					agentShortName:"所属代理",
					superShortName:"上级代理"
				}/*详情映射*/;



			/*查询对象*/
			var $search_fullName=$('#search_fullName'),
				$search_name=$('#search_name'),
				$search_phone=$('#search_phone'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');



			/*表单对象*/
			var edit_form=document.getElementById('edit_form')/*表单dom*/,
				$edit_form=$(edit_form)/*编辑表单*/,
				$agent_id=$('#agent_id'),/*返修id*/
				$agent_cance_btn=$('#agent_cance_btn')/*编辑取消按钮*/,
				$agent_fullname=$('#agent_fullname'),/*快递单号*/
				$agent_shortname=$('#agent_shortname'),
				$agent_name=$('#agent_name')/*发货经手人*/,
				$agent_phone=$('#agent_phone'),
				$agent_tel=$('#agent_tel')/*发货时间*/,
				$agent_province=$('#agent_province'),
				$agent_city=$('#agent_city'),
				$agent_area=$('#agent_area'),
				$agent_province_value=$('#agent_province_value'),
				$agent_city_value=$('#agent_city_value'),
				$agent_area_value=$('#agent_area_value'),
				$agent_address=$('#agent_address'),
				$agent_parentid=$('#agent_parentid');


			/*分润设置*/
			var	$agent_gradewrap=$('#agent_gradewrap'),
				$agent_runsetupwrap=$('#agent_runsetupwrap'),
				$agent_runsetupsetting=$('#agent_runsetupsetting'),
				$agent_profit=$agent_runsetupsetting.find('input'),
				$agent_self=$('#agent_self'),
				$agent_auto=$('#agent_auto'),
				profit_data={};


			/*绑定代理商*/
			var $admin_bind_wrap=$('#admin_bind_wrap'),
				$admin_bind_title=$('#admin_bind_title'),
				$service_unbindwrap=$('#service_unbindwrap'),
				$service_bindwrap=$('#service_bindwrap'),
				$service_bindbtn=$('#service_bindbtn'),
				$service_unbindbtn=$('#service_unbindbtn');





			/*数据加载*/
			var agent_config={
				url:"http://10.0.5.222:8080/yttx-agentbms-api/agents/related",
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
					var list=json.result.list,
						stationobj=list[0];
					if('serivceStationlist' in stationobj){
						list=list.slice(1);
						if('serivceStationlist' in stationobj){
							list=list.slice(1);
						}
					}
					return list;
				},
				data:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				}
			};
			table=$agent_list_wrap.DataTable({
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
				ajax:agent_config,/*异步请求地址及相关配置*/
				columns: [
					{"data":"fullName"},
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
						"data":"id",
						"render":function(data, type, full, meta ){
							var btns='';


							if(agentdetail_power){
								/*查看*/
								btns+='<span data-id="'+data+'" data-action="select" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									 <i class="fa-file-text-o"></i>\
									 <span>查看</span>\
									 </span>';
							}
							if(agentupdate_power){
								/*修改*/
								btns+='<span  data-id="'+data+'" data-action="update" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-pencil"></i>\
									<span>修改</span>\
									</span>';
							}
							if(agentbind_power){
								/*绑定*/
								btns+='<span  data-id="'+data+'" data-action="bind" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-cogs"></i>\
									<span>绑定服务站</span>\
									</span>';
							}
							if(agentdelete_power){
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
					$province:$agent_province,
					$city:$agent_city,
					$area:$agent_area,
					$provinceinput:$agent_province_value,
					$cityinput:$agent_city_value,
					$areainput:$agent_area_value
				});

				/*查询上级代理商ID*/
				$.ajax({
					url:"http://10.0.5.222:8080/yttx-agentbms-api/agents/list",
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
						$agent_parentid.html('');
						return false;
					}

					var bindlist=resp.result.list,
						len=bindlist.length,
						k= 0,
						str='<option value="" selected >请选择绑定代理商ID</option>';
					for(k;k<len;k++){
						str+='<option value="'+bindlist[k]["id"]+'">'+bindlist[k]["shortName"]+'</option>';
					}
					$(str).appendTo($agent_parentid.html(''));

				}).fail(function(resp){
					console.log('error');
					$agent_parentid.html('');
				});

			}());





			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_fullName,$search_name,$search_phone],function(){
					this.val('');
				});
			});


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},agent_config.data);

				$.each([$search_fullName,$search_name,$search_phone],function(){
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
				agent_config.data= $.extend(true,{},data);
				table.ajax.config(agent_config).load(false);
			});


			/*事件绑定*/
			/*绑定查看，修改操作*/
			$agent_list_wrap.delegate('span','click',function(e){
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

				var datas=table.row($tr).data();

				/*修改操作*/
				if(action==='update'){
					/*调整布局*/
					$data_wrap.addClass('collapsed');
					$edit_wrap.removeClass('collapsed');
					$edit_title.html('修改 "'+datas['fullName']+'" 代理商信息');
					$agent_cance_btn.prev().html('修改');
					$("html,body").animate({scrollTop:300},200);
					//重置信息


					for(var i in datas) {
						switch (i) {
							case "id":
								$agent_id.val(id);
								break;
							case "fullName":
								$agent_fullname.val(datas[i]);
								break;
							case "phone":
								$agent_phone.val(public_tool.phoneFormat(datas[i]));
								break;
							case "shortName":
								$agent_shortname.val(datas[i]);
								break;
							case "name":
								$agent_name.val(datas[i]);
								break;
							case "address":
								$agent_address.val(datas[i]);
								break;
						}
					}
				}else if(action==='delete'){
					/*删除操作*/
					dia.content('<span class="g-c-bs-warning g-btips-warn">目前暂未开放此功能</span>').show();
					setTimeout(function(){
						dia.close();
					},2000);
					return false;
				}else if(action==='select'){
					/*查看*/
					dia.content('<span class="g-c-bs-warning g-btips-warn">目前暂未开放此功能</span>').show();
					setTimeout(function(){
						dia.close();
					},2000);
					return false;

				}else if(action==='bind'){
					/*绑定代理商请求数据*/
					$.when($.ajax({
						url:"http://10.0.5.222:8080/yttx-agentbms-api/servicestation/notbound/list",
						method: 'POST',
						dataType: 'json',
						data:{
							"roleId":decodeURIComponent(logininfo.param.roleId),
							"adminId":decodeURIComponent(logininfo.param.adminId),
							"token":decodeURIComponent(logininfo.param.token)
						}
					}),$.ajax({
						url:"http://10.0.5.222:8080/yttx-agentbms-api/servicestation/bound/list",
						method: 'POST',
						dataType: 'json',
						data:{
							"agentId":id,
							"adminId":decodeURIComponent(logininfo.param.adminId),
							"token":decodeURIComponent(logininfo.param.token)
						}
					})).done(function(resp1,resp2){
						var data1 = resp1[0],
							data2=resp2[0],
							code1 = parseInt(data1.code, 10),
							code2 = parseInt(data2.code, 10);
						if (code1 !== 0&&code2!==0) {
							console.log(data1.message);
							console.log(data2.message);
							return false;
						}
						var list1 = data1.result.list,
							unlen = list1.length,
							list2=data2.result.list,
							len=list2.length;

						if (unlen !== 0) {
							var i = 0,
								unstr = '';
							for (i; i < unlen; i++) {
								unstr += '<li data-id="' + list1[i]['id'] + '">' + list1[i]['shortName'] + '</li>';
							}
							$(unstr).appendTo($service_unbindwrap.html(''));
						}else{
							$service_unbindwrap.html('');
						}

						if(len!==0){
							var j = 0,
								str = '';
							for (j; j < len; j++) {
								str += '<li data-id="' + list2[j]['id'] + '">' + list2[j]['shortName'] + '</li>';
							}
							$(str).appendTo($service_bindwrap.html(''));
						}else {
							$service_bindwrap.html('');
						}

						/*弹出操作框*/
						$admin_bind_title.html(datas['fullName']+'代理商绑定');
						$admin_bind_wrap.attr({
							'data-id':id
						}).modal('show',{backdrop:'static'});

					}).fail(function (resp1,resp2) {
						var data1 = resp1[0],
							data2=resp2[0];
						if(data1.code !==0){
							console.log('unbind error');
							$service_unbindwrap.html('');
						}else if(data2.code !==0){
							console.log('bind error');
							$service_bindwrap.html('');
						}
					});

				}

			});



			/*添加服务站*/
			$agent_add_btn.on('click',function(e){
				e.preventDefault();
				/*调整布局*/
				$data_wrap.addClass('collapsed');
				$edit_wrap.removeClass('collapsed');
				$edit_title.html('添加代理商');
				$agent_cance_btn.prev().html('添加');
				$("html,body").animate({scrollTop:300},200);
				//重置信息
				edit_form.reset();
				//第一行获取焦点
				$agent_fullname.focus();
			});
			/*配置添加和修改的权限*/
			if(agentadd_power){
				$agent_add_btn.removeClass('g-d-hidei');
				$edit_wrap.removeClass('g-d-hidei');
			};



			/*取消添加或修改*/
			$agent_cance_btn.on('click',function(e){
				/*调整布局*/
				$data_wrap.removeClass('collapsed');
				$edit_wrap.addClass('collapsed');
				$edit_title.html('添加代理商');
				$agent_cance_btn.prev().html('添加');
				edit_form.reset();
				if(!$data_wrap.hasClass('collapsed')){
					$("html,body").animate({scrollTop:200},200);
				}
				/*重置选中信息*/
				$agent_runsetupwrap.addClass('g-d-hidei');
				profit_data['runSetup']=0;
				if(typeof profit_data['distributorProfit1']!=='undefined') {
					delete profit_data['distributorProfit1'];
					delete profit_data['distributorProfit2'];
					delete profit_data['distributorProfit3'];
				}
			});


			/*绑定代理商绑定和取消绑定选中*/
			$.each([$service_unbindwrap,$service_bindwrap], function () {
					this.on('click','li',function(){
						var $this=$(this),
							id=$this.attr('data-id');

						if(id===''){
							return false;
						}

						if($this.hasClass('service-bindactive')){
							$this.removeClass('service-bindactive');
						}else{
							$this.addClass('service-bindactive').siblings().removeClass('service-bindactive');
						}
					});
			});



			/*绑定代理商绑定和取消绑定*/
			$.each([$service_bindbtn,$service_unbindbtn], function () {

				this.on('click', function () {


					var $this=$(this),
						type=$this.attr('data-type'),
						hasitem,
						isbind=type==='1'?true:false,
						config={
							url:"http://10.0.5.222:8080/yttx-agentbms-api/servicestation/binding/operation",
							dataType:'JSON',
							method:'post',
							data:{
								agentId:$admin_bind_wrap.attr('data-id'),
								adminId:decodeURIComponent(logininfo.param.adminId),
								token:decodeURIComponent(logininfo.param.token)
							}
						};


					if(isbind){
						/*绑定*/
						hasitem=$service_unbindwrap.find('li.service-bindactive');
					}else{
						/*取消绑定*/
						hasitem=$service_bindwrap.find('li.service-bindactive');
					}

					if(hasitem.length===0){
						dia.content('<span class="g-c-bs-warning g-btips-warn">请选择需要绑定或取消绑定的数据</span>').show();
						return false;
					}

					/*设置参数*/
					config.data['serviceStationId']=hasitem.attr('data-id');
					config.data['isBinding']=type;

					/*发送绑定代理或者取消绑定代理请求*/
					//没有回调则设置回调对象
					dialogObj.setFn(function(){
						var self=this;
						$.ajax(config).done(function(resp){
							var code=parseInt(resp.code,10);
							if(code!==0){
								console.log(resp.message);
								setTimeout(function(){
									self.content('<span class="g-c-bs-warning g-btips-warn">'+(isbind?"绑定服务站失败":"取消绑定服务站失败")+'</span>').show();
								},500);
								return false;
							}

							/*请求成功执行相应交互*/
							self.content('<span class="g-c-bs-success g-btips-succ">'+(isbind?"绑定服务站成功":"取消绑定服务站成功")+'</span>').show();
							setTimeout(function(){
								self.close();
								if(isbind){
									hasitem.appendTo($service_bindwrap);
								}else{
									hasitem.appendTo($service_unbindwrap);
								}
								hasitem.siblings().removeClass('service-bindactive');
								setTimeout(function(){
									hasitem.removeClass('service-bindactive');
								},1000);
							},1000);

						}).fail(function(resp){
							console.log('error');
							setTimeout(function(){
								self.content('<span class="g-c-bs-warning g-btips-warn">'+(isbind?"绑定服务站失败":"取消绑定服务站失败")+'</span>').show();
							},500);
						});

					},'agent_sure');
					//确认删除
					dialogObj.dialog.content('<span class="g-c-bs-warning g-btips-warn">'+(isbind?"是否绑定服务站?":"是否取消绑定服务站?")+'</span>').showModal();

				});
			});
			/*关闭弹出框并重置值*/
			$admin_bind_wrap.on('hide.bs.modal',function(){
				$admin_bind_wrap.attr({
					'data-id':''
				})
			});



			/*手机格式化*/
			/*格式化手机号码*/
			$.each([$search_phone,$agent_phone],function(){
				this.on('keyup',function(){
					var phoneno=this.value.replace(/\D*/g,'');
					if(phoneno==''){
						this.value='';
						return false;
					}
					this.value=public_tool.phoneFormat(this.value);
				});
			});



			/*分润切换*/
			profit_data['runSetup']=0;
			$.each([$agent_self,$agent_auto],function(){
					this.on('click', function (){
						var value=this.value;

						profit_data['runSetup']=value;
						if(value==='1'){
							/*自定义*/
							$agent_runsetupwrap.removeClass('g-d-hidei');
							profit_data['distributorProfit1']='';
							profit_data['distributorProfit2']='';
							profit_data['distributorProfit3']='';
						}else if(value==='0'){
							$agent_runsetupwrap.addClass('g-d-hidei');
							if(typeof profit_data['distributorProfit1']!=='undefined') {
								delete profit_data['distributorProfit1'];
								delete profit_data['distributorProfit2'];
								delete profit_data['distributorProfit3'];
							}
						}
					});
			});



			/*绑定分润输入限制*/
			$agent_profit.each(function () {
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


			/*最小化窗口*/
			$edit_title.next().on('click',function(e){
				if($data_wrap.hasClass('collapsed')){
					e.stopPropagation();
					e.preventDefault();
					$agent_cance_btn.trigger('click');
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
							/*更新*/
							var id=$agent_id.val(),
							isadd=id===''?true:false;

							/*校验分润合法性*/
							if(profit_data['runSetup']==='1'&&!validProfit($agent_profit,dia,profit_data)){
								return false;
							}

							if(isadd){
								var config={
									url:"http://10.0.5.222:8080/yttx-agentbms-api/agent/add",
									dataType:'JSON',
									method:'post',
									data:{
										roleId:decodeURIComponent(logininfo.param.roleId),
										adminId:decodeURIComponent(logininfo.param.adminId),
										token:decodeURIComponent(logininfo.param.token),
										fullName:$agent_fullname.val(),
										shortName:$agent_shortname.val(),
										grade:$agent_gradewrap.find('input:checked').val(),
										name:$agent_name.val(),
										province:$agent_province_value.val(),
										city:$agent_city_value.val(),
										country:$agent_area_value.val(),
										address:$agent_address.val(),
										phone:$agent_phone.val().replace(/\s*/g,''),
										tel:$agent_tel.val(),
										parentId:$agent_parentid.val()
									}
								};
							}else{
								if(id===''){
									dia.content('<span class="g-c-bs-warning g-btips-warn">请选择需要操作的代理商</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
									return false;
								}
								var config={
									url:"http://10.0.5.222:8080/yttx-agentbms-api/agent/update",
									dataType:'JSON',
									method:'post',
									data:{
										agentId:id,
										adminId:decodeURIComponent(logininfo.param.adminId),
										token:decodeURIComponent(logininfo.param.token),
										roleId:decodeURIComponent(logininfo.param.roleId),
										fullName:$agent_fullname.val(),
										shortName:$agent_shortname.val(),
										grade:$agent_gradewrap.find('input:checked').val(),
										name:$agent_name.val(),
										province:$agent_province_value.val(),
										city:$agent_city_value.val(),
										country:$agent_area_value.val(),
										address:$agent_address.val(),
										phone:$agent_phone.val().replace(/\s*/g,''),
										tel:$agent_tel.val(),
										parentId:$agent_parentid.val()
									}
								};
							}

							$.extend(true,config.data,profit_data);


							$.ajax(config)
								.done(function(resp){
									var code=parseInt(resp.code,10);
									if(code!==0){
										console.log(resp.message);
										setTimeout(function(){
											isadd?dia.content('<span class="g-c-bs-warning g-btips-warn">添加代理商失败</span>').show():dia.content('<span class="g-c-bs-warning g-btips-warn">修改代理商失败</span>').show();
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
									$agent_cance_btn.trigger('click');
									setTimeout(function(){
										isadd?dia.content('<span class="g-c-bs-success g-btips-succ">添加代理商成功</span>').show():dia.content('<span class="g-c-bs-success g-btips-succ">修改代理商成功</span>').show();
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
				$edit_form.validate(form_opt);
			}
		}


		/*校验分润设置数据合法性*/
		function validProfit(input,dia,data){
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
			data['distributorProfit1']=ele_a;
			data['distributorProfit2']=ele_aa;
			data['distributorProfit3']=ele_aaa;

			return isvalid;
		}

	});



})(jQuery);