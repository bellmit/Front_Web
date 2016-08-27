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
				distributordetail_power=public_tool.getKeyPower('分销查看',powermap),
				distributoracquiring_power=public_tool.getKeyPower('收单查看',powermap),
				distributorlower_power=public_tool.getKeyPower('分销统计',powermap);



			/*dom引用和相关变量定义*/
			var $distributor_wrap=$('#distributor_wrap')/*表格*/,
				module_id='distributor_list'/*模块id，主要用于本地存储传值*/,
				$data_wrap=$('#data_wrap')/*数据展现面板*/,
				$send_wrap=$('#send_wrap')/*发货容器面板*/,
				$repair_wrap=$('#repair_wrap')/*返修容器面板*/,
				table=null/*数据展现*/,
				$send_title=$('#send_title')/*编辑标题*/,
				$repair_title=$('#repair_title')/*编辑标题*/,
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
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_title=$('#show_detail_title')/*详情标题*/,
				$show_detail_content=$('#show_detail_content')/*详情内容*/,
				detail_map={
					agentFullName:'代理商全称',
					fullName:'服务站全称',
					shortName:"服务站简称",
					name:"负责人姓名",
					phone:"负责人手机号码",
					address:"地址",
					sales:"销售",
					inventory:"库存",
					monthSales:"本月销售",
					totalSales:"总计销售",
					repairs:"返修",
					agentShortName:"所属代理",
					superShortName:"上级代理"
				}/*详情映射*/;



			/*查询对象*/
			var $search_serviceStationName=$('#search_serviceStationName'),
				$search_nickName=$('#search_nickName'),
				$search_Phone=$('#search_Phone'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');



			/*表单对象*/




			/*数据加载*/
			var distributor_config={
				url:"../../json/all_distributor.json"/*"http://120.24.226.70:8081/yttx-agentbms-api/distributor/related"*/,
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

					var map=json.result.map,
						key=map.key,
						list=map.list;

					if(key){
						$distributor_wrap.find('caption').html(key);
					}else{
						$distributor_wrap.find('caption').html('');
					}

					if(map){
						return list;
					}
					return [];
				},
				data:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				}
			};
			table=$distributor_wrap.DataTable({
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
				ajax:distributor_config,/*异步请求地址及相关配置*/
				columns: [
					{"data":"serviceStationName"},
					{"data":"nickName"},
					{
						"data":"Phone",
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
						"data":"machineCode"
					},
					{
						"data":"id",
						"render":function(data, type, full, meta ){
							var btns='';

							if(distributordetail_power){
								/*查看*/
								btns+='<select class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<option selected value="2">二级</option>\
									<option value="3">三级</option>\
									<option value="4">其他</option>\
									</select>&nbsp;\
									<span data-id="'+data+'" data-action="select" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									 <i class="fa-angle-right"></i>\
									 <span>下级分销</span>\
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

			}());


			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_serviceStationName,$search_nickName,$search_Phone],function(){
					this.val('');
				});
			});
			$admin_search_clear.trigger('click');


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},distributor_config.data);

				$.each([$search_serviceStationName,$search_nickName,$search_Phone],function(){
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
				distributor_config.data= $.extend(true,{},data);
				table.ajax.config(distributor_config).load(false);
			});


			/*事件绑定*/
			/*绑定查看，修改操作*/
			$distributor_wrap.delegate('span','click',function(e){
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


				/*发货操作*/
				if(action==='send'){
					/*调整布局*/
					$data_wrap.addClass('collapsed');
					$repair_wrap.addClass('collapsed');
					$send_wrap.removeClass('collapsed');
					$("html,body").animate({scrollTop:300},200);
					$repair_title.html('');
					$send_title.html('给"'+datas['fullName']+'"服务站发货');
				}else if(action==='repair'){
					/*调整布局*/
					$data_wrap.addClass('collapsed');
					$repair_wrap.removeClass('collapsed');
					$send_wrap.addClass('collapsed');
					$("html,body").animate({scrollTop:380},200);
					//重置信息
					$send_title.html('');
					$repair_title.html('"'+datas['fullName']+'"服务站返修设备');
				}else if(action==='select'){
					/*查看下级分销*/
					var level=$this.prev('select').find('option:selected').val(),
						subclass=$this.children('i').hasClass('fa-angle-down'),
						tabletr=table.row($tr);


					if(subclass){
						/*收缩*/
						//去除本次索引
						$this.children('i').removeClass('fa-angle-down');
						tabletr.child().remove();
					}else{

						$.ajax({
							 url:"../../json/all_subdistributor.json"/*"http://120.24.226.70:8081/yttx-agentbms-api/distributor/lower"*/,
							 method: 'POST',
							 dataType: 'json',
							 data:{
								 "distributorId":id,
								 "Level":level,
								 "adminId":decodeURIComponent(logininfo.param.adminId),
								 "token":decodeURIComponent(logininfo.param.token)
							 }
						 }).done(function(resp){
							 var code=parseInt(resp.code,10);
							 if(code!==0){
								 /*回滚状态*/
								 console.log(resp.message);
								 return false;
							 }

							 /*是否是正确的返回数据*/
							 var result=resp.result;

							if(!result){
								return [];
							}

							var list=result.list,
								len=list.length,
								i= 0,
								newstr='<colgroup>\
								<col class="g-w-percent20">\
								<col class="g-w-percent20">\
								<col class="g-w-percent10">\
								</colgroup>\
									<thead>\
									<tr>\
									<th>用户名称</th>\
									<th>机器码</th>\
									<th class="no-sorting">操作</th>\
								</tr>\
								</thead>',
								res='<tr><td colspan="3">代理商：'+result["agentName"]+'</td></tr><tr><td colspan="3">服务站：'+result["serviceStationName"]+'</td></tr><tr><td colspan="3">昵称：'+result["nickName"]+'</td></tr>';
							if(len!==0){

							}else{
								res='<tbody class="middle-align">'+res+'</tbody>';
							}



						 }).fail(function(resp){
						 		console.log(resp.message);
						 });


						var $newtr=$('<tr><td colspan="6"></td></tr>');
						tabletr.child($newtr).show();
						$this.children('i').addClass('fa-angle-down');
						/*展开*/
					}


				}
			});





			/*发货，返修权限*/



			/*最小化窗口*/
			$.each([$send_title,$repair_title], function () {
				var selector=this.selector,
					issend=selector.indexOf('send')!==-1?true:false;

				this.next().on('click',function(e){
					if($data_wrap.hasClass('collapsed')){
						e.stopPropagation();
						e.preventDefault();
					}
				});
			});



			/*格式化手机号码*/
			$.each([$search_Phone],function(){
				this.on('keyup',function(){
					var phoneno=this.value.replace(/\D*/g,'');
					if(phoneno==''){
						this.value='';
						return false;
					}
					this.value=public_tool.phoneFormat(this.value);
				});
			});





			/*表单验证*/
			/*if($.isFunction($.fn.validate)) {
				/!*配置信息*!/
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
								var id=issend?$send_id.val():$repair_id.val();

								if(id===''){
									issend?$send_cance_btn.trigger('click'):$repair_cance_btn.trigger('click');
									dia.content('<span class="g-c-bs-warning g-btips-warn">请选择需要操作的服务站</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
									return false;
								}


								if(issend){
									/!*servicestation/invoice/add*!/
									/!*http://120.24.226.70:8081/yttx-agentbms-api/servicestation/invoice/add*!/
									var checkdata=getCheckPlugin(send_checkconfig),
										config={
											url:"http://120.24.226.70:8081/yttx-agentbms-api/servicestation/invoice/add",
											dataType:'JSON',
											method:'post',
											data:{
												serviceStationId:id,
												adminId:decodeURIComponent(logininfo.param.adminId),
												token:decodeURIComponent(logininfo.param.token),
												trackingNumber:$send_trackingnumber.val(),
												deliveryHandler:$send_deliveryhandler.val(),
												deliveryTime:$send_deliverytime.val()
											}
									};
									$.extend(true,config.data,checkdata);
								}else{
									var config={
										url:"http://120.24.226.70:8081/yttx-agentbms-api/servicestation/repairorder/add",
										dataType:'JSON',
										method:'post',
										data:{
											serviceStationId:id,
											adminId:decodeURIComponent(logininfo.param.adminId),
											token:decodeURIComponent(logininfo.param.token),
											trackingNumber:$repair_trackingnumber.val(),
											deliveryHandler:$repair_deliveryhandler.val(),
											deliveryTime:$repair_deliverytime.val(),
											name:$repair_name.val(),
											startNumber:$repair_startnumber.val(),
											endNumber:$repair_endnumber.val(),
											listNumber:$repair_listnumber.val(),
											quantity:$repair_quantity.val()
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
										issend?$send_cance_btn.trigger('click'):$repair_cance_btn.trigger('click');
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
				/!*提交验证*!/
				$station_send_form.validate(form_opt0);
				$station_repair_form.validate(form_opt1);
			}*/
		}

	});



	/*解析发货插件*/





})(jQuery);