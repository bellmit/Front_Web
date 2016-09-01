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
				logisticsreceive_power=public_tool.getKeyPower('收货',powermap),
				logisticsrepair_power=public_tool.getKeyPower('返修管理',powermap),
				logisticsdetail_power=public_tool.getKeyPower('查看',powermap),
				logisticsreceivefail_power=public_tool.getKeyPower('收货异常管理',powermap);


			/*dom引用和相关变量定义*/
			var $logistics_agent_wrap=$('#logistics_agent_wrap')/*代理商信息表格*/,
				$logistics_list_wrap=$('#logistics_list_wrap')/*物流信息表格*/,
				module_id='agent_add'/*模块id，主要用于本地存储传值*/,
				$dataagent_wrap=$('#dataagent_wrap')/*数据展现面板*/,
				$datalist_wrap=$('#datalist_wrap')/*数据展现面板*/,
				$edit_wrap=$('#edit_wrap')/*发货容器面板*/,
				agenttable=null/*数据展现*/,
				listtable=null/*数据展现*/,
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
			var $search_deliveryHandler=$('#search_deliveryHandler'),
				$search_receiver=$('#search_receiver'),
				$search_deliveryPhone=$('#search_deliveryPhone'),
				$search_receivingPhone=$('#search_receivingPhone'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');

			/*表单对象*/
			var edit_form=document.getElementById('edit_form')/*表单dom*/,
				$edit_form=$(edit_form)/*编辑表单*/,
				$edit_sure_btn=$('#edit_sure_btn'),
				$edit_error_btn=$('#edit_error_btn'),
				$edit_cance_btn=$('#edit_cance_btn')/*编辑取消按钮*/,
				$logistics_receiveerror=$('#logistics_receiveerror'),
				$logistics_receiveerrorwrap=$('#logistics_receiveerrorwrap'),
				$logistics_receiveno=$('#logistics_receiveno'),/*快递单号*/
				$logistics_receiveauthor=$('#logistics_receiveauthor'),
				$logistics_remark=$('#logistics_remark')/*发货经手人*/;

			/*数据加载*/
			var agent_config={
				url:"http://10.0.5.222:8080/yttx-agentbms-api/servicestation/receivings",
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
			},list_config={
				url:"",
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
			agenttable=$logistics_agent_wrap.DataTable({
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
					{
						"data":"receivingUnit",
						"render":function(data, type, full, meta ){
							return data.toString().slice(0,10);
						}
					},
					{
						"data":"deliverUnit"
					},
					{
						"data":"grade",
					},
					{
						"data":"Reamrk",
					},
					{
						"data":"id",
						"render":function(data, type, full, meta ){
							var btns='';


							if(logisticsdetail_power){
								/*查看*/
								btns+='<span data-id="'+data+'" data-action="select" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									 <i class="fa-file-text-o"></i>\
									 <span>查看</span>\
									 </span>';
							}
							return btns;
						}
					}
				],/*控制分页数*/
				aLengthMenu: [
					[5,10,15,20],
					[5,10,15,20]
				],
				lengthChange:true/*是否可改变长度*/
			}),
			listtable=$logistics_list_wrap.DataTable({
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
					ajax:list_config,/*异步请求地址及相关配置*/
					columns: [
						{
							"data":"deliveryUnit"
						},
						{"data":"deliveryHandler"},
						{
							"data":"deliveryPhone",
							"render":function(data, type, full, meta ){
								return public_tool.phoneFormat(data);
							}
						},
						{
							"data":"receiver"
						},
						{
							"data":"receivingPhone",
							"render":function(data, type, full, meta ){
								return public_tool.phoneFormat(data);
							}
						},
						{
							"data":"totalQuantity"
						},
						{
							"data":"id",
							"render":function(data, type, full, meta ){
								var btns='';


								if(logisticsdetail_power){
									/*查看*/
									btns+='<span data-id="'+data+'" data-action="select" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									 <i class="fa-file-text-o"></i>\
									 <span>查看</span>\
									 </span>';
								}
								/*if(logisticsreceive_power){
									/!*收货*!/
									btns+='<span  data-id="'+data+'" data-action="receive" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-pencil"></i>\
									<span>收货</span>\
									</span>';
								}*/
								/*if(logisticsreceivefail_power){
									/!*收单查看*!/
									btns+='<span  data-id="'+data+'" data-action="selectreceive" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-exclamation"></i>\
									<span>收货异常管理</span>\
									</span>';
								}
								if(logisticsrepair_power){
									/!*返修管理*!/
									btns+='<span  data-id="'+data+'" data-action="repair" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-wrench"></i>\
									<span>返修管理</span>\
									</span>';
								}*/
								return btns;
							}
						}
					],/*控制分页数*/
					aLengthMenu: [
						[5,10,15,20],
						[5,10,15,20]
					],
					lengthChange:true/*是否可改变长度*/
				});



			/*
			 * 初始化
			 * */
			(function(){
				/*重置表单*/
				edit_form.reset();
			}());


			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_deliveryHandler,$search_receiver,$search_deliveryPhone,$search_receivingPhone],function(){
					this.val('');
				});
				listtable.clear().draw();
			});
			$admin_search_clear.trigger('click');

			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},agent_config.data);

				$.each([$search_deliveryHandler,$search_receiver,$search_deliveryPhone,$search_receivingPhone],function(){
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
				agenttable.ajax.config(agent_config).load(false);
				listtable.clear().draw();
			});

			/*事件绑定*/
			/*绑定查看，修改操作*/
			$.each([$logistics_agent_wrap,$logistics_list_wrap],function(){
				var selector=this.selector,
					isagent=selector.indexOf('agent')!==-1?true:false;

				this.delegate('span','click',function(e){
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

					if(isagent){
						if(action==='select'){
							/*查看*/
							if(list_config.url===''){
								list_config.url='http://10.0.5.222:8080/yttx-agentbms-api/servicestation/receivings';
							}
							listtable.ajax.config(list_config).load();
							$edit_cance_btn.trigger('click');
							$("html,body").animate({scrollTop:300},200);
						}
					}else{
						/*收货操作*/
						if(action==='select'){
							/*查看*/
							$dataagent_wrap.addClass('collapsed');
							$edit_wrap.attr({
								'data-id':id
							}).removeClass('collapsed');
							$("html,body").animate({scrollTop:600},200);
						}

					}


				});

			});



			/*配置查看和收货权限*/
			if(logisticsdetail_power){
				$edit_wrap.removeClass('g-d-hidei');
			};



			/*取消添加或修改*/
			$edit_cance_btn.on('click',function(e){
				/*调整布局*/
				$dataagent_wrap.addClass('collapsed');
				$datalist_wrap.removeClass('collapsed');
				$edit_wrap.attr({
					'data-id':''
				}).addClass('collapsed');
				edit_form.reset();
				$logistics_receiveerrorwrap.addClass('g-d-hidei');
				$edit_sure_btn.removeClass('g-d-hidei');
				$edit_error_btn.addClass('g-d-hidei');
				if(!$dataagent_wrap.hasClass('collapsed')){
					$("html,body").animate({scrollTop:200},200);
				}

			});


			/*绑定收货异常*/
			$logistics_receiveerror.on('click',function(){
				var $this=$(this),
					ischeck=$this.is(':checked');

				if(ischeck){
					$logistics_receiveerrorwrap.removeClass('g-d-hidei');
					$edit_sure_btn.addClass('g-d-hidei');
					$edit_error_btn.removeClass('g-d-hidei');
				}else{
					$logistics_receiveerrorwrap.addClass('g-d-hidei');
					$edit_sure_btn.removeClass('g-d-hidei');
					$edit_error_btn.addClass('g-d-hidei');
				}

			});



			/*手机格式化*/
			/*格式化手机号码*/
			$.each([$search_deliveryPhone,$search_receivingPhone],function(){
				this.on('keyup',function(){
					var phoneno=this.value.replace(/\D*/g,'');
					if(phoneno==''){
						this.value='';
						return false;
					}
					this.value=public_tool.phoneFormat(this.value);
				});
			});


			/*最小化窗口*/
			$edit_title.next().on('click',function(e){
				if($dataagent_wrap.hasClass('collapsed')||$datalist_wrap.hasClass('collapsed')){
					e.stopPropagation();
					e.preventDefault();
					$edit_cance_btn.trigger('click');
				}
				if(!$edit_wrap.hasClass('collapsed')){
					$edit_wrap.attr({
						'data-id':''
					});
				}
			});


			/*绑定确认收货*/
			$edit_sure_btn.on('click',function(){
				dia.content('<span class="g-c-bs-success g-btips-succ">暂未开放此功能</span>').show();
				setTimeout(function () {
					dia.close();
				},2000);

				return false;
				$.ajax({
						url:"http://10.0.5.222:8080/yttx-agentbms-api/",
						dataType:'JSON',
						method:'post',
						data:{
							roleId:decodeURIComponent(logininfo.param.roleId),
							adminId:decodeURIComponent(logininfo.param.adminId),
							token:decodeURIComponent(logininfo.param.token),
							id:$edit_wrap.attr('data-id')
						}
					})
					.done(function(resp){
						var code=parseInt(resp.code,10);
						if(code!==0){
							console.log(resp.message);
							dia.content('<span class="g-c-bs-warning g-btips-warn">确认添加收货异常信息失败</span>').show();
							setTimeout(function () {
								dia.close();
							},2000);
							return false;
						}
						//重绘表格
						agenttable.ajax.reload(null,false);
						//重置表单
						//重置表单
						$edit_cance_btn.trigger('click');
						dia.content('<span class="g-c-bs-success g-btips-succ"确认添加收货异常信息成功</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
					})
					.fail(function(resp){
						console.log(resp.message);
					});

			});





			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt={},
					formcache=public_tool.cache;

				if(formcache.form_opt_0){
					$.extend(true,form_opt,formcache.form_opt_0,{
						submitHandler: function(form){

							dia.content('<span class="g-c-bs-success g-btips-succ">暂未开放此功能</span>').show();
							setTimeout(function () {
								dia.close();
							},2000);


							return false;
							/*更新*/
							var config={
								url:"http://10.0.5.222:8080/yttx-agentbms-api/",
								dataType:'JSON',
								method:'post',
								data:{
									roleId:decodeURIComponent(logininfo.param.roleId),
									adminId:decodeURIComponent(logininfo.param.adminId),
									token:decodeURIComponent(logininfo.param.token),
									id:$edit_wrap.attr('data-id'),
									receiveNo:$logistics_receiveno.val(),
									receiveAuthor:$logistics_receiveauthor.val(),
									remark:$logistics_remark.val()
								}
							};


							$.ajax(config)
								.done(function(resp){
									var code=parseInt(resp.code,10);
									if(code!==0){
										console.log(resp.message);
										setTimeout(function(){
											dia.content('<span class="g-c-bs-warning g-btips-warn">确认添加收货异常信息失败</span>').show();
										},300);
										setTimeout(function () {
											dia.close();
										},2000);
										return false;
									}
									//重绘表格
									agenttable.ajax.reload(null,false);
									//重置表单
									//重置表单
									$edit_cance_btn.trigger('click');
									setTimeout(function(){
										dia.content('<span class="g-c-bs-success g-btips-succ"确认添加收货异常信息成功</span>').show();
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



	});



})(jQuery);