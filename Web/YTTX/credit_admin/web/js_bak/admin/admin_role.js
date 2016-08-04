/*admin_role:角色管理*/
(function($){
	'use strict';
	$(function(){

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.24.226.70:8081/yttx-adminbms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*dom引用和相关变量定义*/
			var $admin_role_wrap=$('#admin_role_wrap')/*表格*/,
				module_id='admin_role'/*模块id，主要用于本地存储传值*/,
				table=null/*datatable 解析后的对象*/,
				$table_wrap=$('#table_wrap')/*表格容器*/,
				$edit_wrap=$('#edit_wrap')/*编辑容器*/,
				$role_add_btn=$('#role_add_btn'),/*添加角色*/
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
				dialogObj=public_tool.dialog()/*回调提示对象*/;

			/*表单对象*/
			var $edit_cance_btn=$('#edit_cance_btn')/*编辑取消按钮*/,
				edit_form=document.getElementById('role_edit_form'),
				$role_edit_form=$('#role_edit_form')/*编辑表单*/,
				$role_id=$('#role_id'),/*角色id*/
				$role_name=$('#role_name'),/*角色名称*/
				$role_remark=$('#role_remark')/*角色描述*/;


			//初始化请求
			table=$admin_role_wrap.DataTable({
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
					url:"../../json/admin/admin_role.json",
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
											<span data-href="yttx-admin-permission.html" data-module="admin_permission" data-action="select" data-id="'+id+'" data-type="'+types+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
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
					[10,20,50],
					[10,20,50]
				],/*控制是否每页可改变显示条数*/
				lengthChange:false/*是否可改变长度*/
			});




			/*事件绑定*/
			/*绑定查看，修改，删除操作*/
			$admin_role_wrap.delegate('span','click',function(e){
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
						$table_wrap.addClass('col-md-9');
						$edit_wrap.addClass('g-d-showi');
						//重置信息
						$edit_close_btn.prev().html('修改角色');
						$edit_cance_btn.prev().html('修改角色');
						//赋值
						var datas=table.row($tr).data();
						for(var i in datas){
							switch (i){
								case 'name':
									$role_name.val(datas[i]);
									break;
								case 'remark':
									$role_remark.val(datas[i]);
									break;
								case 'btn':;
									$role_id.val(datas[i][id]);
									break;
							}
						}
					}
				}



			});


			/*//取消修改*/
			$edit_cance_btn.on('click',function(e){
				//切换显示隐藏表格和编辑区
				$table_wrap.removeClass('col-md-9');
				$edit_wrap.removeClass('g-d-showi');
			});

			/*添加角色*/
			$role_add_btn.on('click',function(){
				//重置表单
				edit_form.reset();
				$edit_close_btn.prev().html('添加角色');
				$edit_cance_btn.prev().html('添加角色');
				//显示表单
				$table_wrap.addClass('col-md-9');
				$edit_wrap.addClass('g-d-showi');
				//第一行获取焦点
				$role_name.focus();
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
							var id=$role_id.val(),
								config={
									url:"",
									method: 'POST',
									dataType: 'json',
									data: {
										"roleName":$role_name.val(),
										"roleRemark":$role_remark.val()
									}
								};

							if(id!==''){
								//此处配置修改稿角色地址（开发阶段）
								config.url="../../json/admin/admin_role_update.json";
								config.data['role_Id']=id;
							}else{
								//此处配置添加角色地址（开发阶段）
								config.url="../../json/admin/admin_role_update.json";
								if(config.data['role_Id']){
									delete config.data['role_Id'];
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

							return false;
						}
					});
				}
				/*提交验证*/
				$role_edit_form.validate(form_opt);
			}

		}


	});


})(jQuery);