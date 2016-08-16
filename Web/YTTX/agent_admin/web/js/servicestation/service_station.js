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
			var powermap=public_tool.getPower();


			/*dom引用和相关变量定义*/
			var $station_wrap=$('#station_wrap')/*表格*/,
				module_id='station_list'/*模块id，主要用于本地存储传值*/,
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
				dialogObj=public_tool.dialog()/*回调提示对象*/;



			/*查询对象*/
			var $search_shortName=$('#search_shortName'),
				$search_name=$('#search_name'),
				$search_phone=$('#search_phone'),
				$search_inventory=$('#search_inventory'),
				$search_agentShortName=$('#search_agentShortName'),
				$search_superShortName=$('#search_superShortName'),
				$search_repairs=$('#search_repairs'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');



			/*表单对象*/
			var send_form=document.getElementById('station_send_form')/*表单dom*/,
				repair_form=document.getElementById('station_repair_form')/*表单dom*/,
				$station_send_form=$(send_form)/*编辑表单*/,
				$station_repair_form=$(repair_form)/*编辑表单*/,
				$send_id=$('#send_id'),/*发货id*/
				$repair_id=$('#repair_id'),/*返修id*/
				$send_cance_btn=$('#send_cance_btn')/*编辑取消按钮*/,
				$repair_cance_btn=$('#repair_cance_btn')/*编辑取消按钮*/,
				$send_trackingnumber=$('#send_trackingnumber'),/*快递单号*/
				$send_deliveryhandler=$('#send_deliveryhandler')/*发货经手人*/,
				$send_deliverytime=$('#send_deliverytime')/*发货时间*/;


			/*发货单附件*/
			var $send_ischeckeddevice=$('#send_ischeckeddevice'),
				$send_devicewrap=$('#send_devicewrap'),
				$send_ischeckedfittings=$('#send_ischeckedfittings'),
				$send_fittingwrap=$('#send_fittingwrap'),
				$send_ischeckedrepair=$('#send_ischeckedrepair'),
				$send_repairwrap=$('#send_repairwrap');




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
							return data.toString().slice(0,10)+'...';
						}
					},
					{
						"data":"sales",
						"render":function(data, type, full, meta ){
							return data?"<span class='g-c-info'>"+data+"</span>":'';
						}
					},
					{
						"data":"inventory",
						"render":function(data, type, full, meta ){
							return data?"<span class='g-c-gray3'>"+data+"</span>":'';
						}
					},
					{
						"data":"repairs",
						"render":function(data, type, full, meta ){
							return data?"<span class='g-c-red1'>"+data+"</span>":'';
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


							if(typeof powermap[543]!=='undefined'){
									/*发货*/
									btns+='<span data-id="'+data+'" data-action="send" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									 <i class="fa-truck"></i>\
									 <span>发货</span>\
									 </span>';
								/*返修*/
								btns+='<span  data-id="'+data+'" data-action="repair" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-rotate-left"></i>\
									<span>返修</span>\
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
				send_form.reset();
				repair_form.reset();
			}());


			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_shortName,$search_name,$search_phone,$search_inventory,$search_repairs,$search_agentShortName,$search_superShortName],function(){
					this.val('');
				});
			});


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},station_config.data);

				$.each([$search_shortName,$search_name,$search_phone,$search_inventory,$search_repairs,$search_agentShortName,$search_superShortName],function(){
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
				var datas=table.row($tr).data();

				/*发货操作*/
				if(action==='send'){
					/*调整布局*/
					$data_wrap.addClass('collapsed');
					$repair_wrap.addClass('collapsed');
					$send_wrap.removeClass('collapsed');
					$("html,body").animate({scrollTop:300},200);
					//重置信息
					repair_form.reset();
					$repair_title.html('');
					$send_title.html('给"'+datas['shortName']+'"服务站发货');
					$send_id.val(id);
				}else if(action==='repair'){
					/*调整布局*/
					$data_wrap.addClass('collapsed');
					$repair_wrap.removeClass('collapsed');
					$send_wrap.addClass('collapsed');
					$("html,body").animate({scrollTop:380},200);
					//重置信息
					send_form.reset();
					$send_title.html('');
					$repair_title.html(datas['shortName']+'"服务站返修');
					$repair_id.val(id);
				}
			});


			/*取消发货，返修*/
			$.each([$send_cance_btn,$repair_cance_btn],function(){
				var selector=this.selector,
					issend=selector.indexOf('send')!==-1?true:false;

				this.on('click',function(e){
					/*调整布局*/
					if(issend){
						send_form.reset();
					}else{
						repair_form.reset();
					}
					$data_wrap.removeClass('collapsed');
					$send_wrap.addClass('collapsed');
					$repair_wrap.addClass('collapsed');
					if(!$data_wrap.hasClass('collapsed')){
						$("html,body").animate({scrollTop:200},200);
					}
				});

			});




			/*最小化窗口*/
			$.each([$send_title,$repair_title], function () {
				var selector=this.selector,
					issend=selector.indexOf('send')!==-1?true:false;

				this.next().on('click',function(e){
					if($data_wrap.hasClass('collapsed')){
						e.stopPropagation();
						e.preventDefault();
						issend?$send_cance_btn.trigger('click'):$repair_cance_btn.trigger('click');
					}
				});
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
								//判断是否存在id号
								
								if(issend){
									var config={
										url:"http://120.24.226.70:8081/yttx-agentbms-api/article/advertisement/update",
										dataType:'JSON',
										method:'post',
										data:{
											articleId:$send_id.val(),
											adminId:decodeURIComponent(logininfo.param.adminId),
											token:decodeURIComponent(logininfo.param.token),
											title:$article_title.val(),
											content:$article_content.val(),
											startTime:times[0],
											endTime:times[1],
											thumbnail:$article_thumbnail.val(),
											belongsCompany:$article_belongscompany.val()
										}
									};
								}else{
									var config={
										url:"http://120.24.226.70:8081/yttx-agentbms-api/article/advertisement/update",
										dataType:'JSON',
										method:'post',
										data:{
											articleId:$repair_id.val(),
											adminId:decodeURIComponent(logininfo.param.adminId),
											token:decodeURIComponent(logininfo.param.token),
											title:$article_title.val(),
											content:$article_content.val(),
											startTime:times[0],
											endTime:times[1],
											thumbnail:$article_thumbnail.val(),
											belongsCompany:$article_belongscompany.val()
										}
									};
								}


								$.ajax(config)
									.done(function(resp){
										var code=parseInt(resp.code,10);
										if(code!==0){
											console.log(resp.message);
											setTimeout(function(){
												id!==''?dia.content('<span class="g-c-bs-warning g-btips-warn">修改文章广告失败</span>').show():dia.content('<span class="g-c-bs-warning g-btips-warn">添加文章广告失败</span>').show();
											},300);
											setTimeout(function () {
												dia.close();
											},2000);
											return false;
										}
										//重绘表格
										getColumnData(article_page,article_config);
										//重置表单
										$send_cance_btn.trigger('click');
										setTimeout(function(){
											id!==''?dia.content('<span class="g-c-bs-success g-btips-succ">修改文章广告成功</span>').show():dia.content('<span class="g-c-bs-success g-btips-succ">添加文章广告成功</span>').show();
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
				$station_send_form.validate(form_opt0);
				$station_repair_form.validate(form_opt1);
			}
		}





	});


})(jQuery);