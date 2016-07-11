/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){

		/*dom引用和相关变量定义*/
		var $admin_member_wrap=$('#admin_member_wrap')/*表格*/,
			module_id='admin_member'/*模块id，主要用于本地存储传值*/,
			table=null/*datatable 解析后的对象*/,
			$table_wrap=$('#table_wrap')/*表格容器*/,
			$edit_wrap=$('#edit_wrap')/*编辑容器*/,
			$member_add_btn=$('#member_add_btn'),/*添加角色*/
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
			edit_form=document.getElementById('member_edit_form'),
		$member_edit_form=$('#member_edit_form')/*编辑表单*/,
		$member_id=$('#member_id'),/*角色id*/
		$member_name=$('#member_name'),/*角色名称*/
		$member_remark=$('#member_remark')/*角色描述*/;


		//初始化请求
		table=$admin_member_wrap.dataTable({
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
			ajax:{
				url:"../../json/admin/admin_member.json",
				dataType:'JSON',
				method:'post',
				data:(function(){
					/*查询本地,如果有则带参数查询，如果没有则初始化查询*/
					var param=public_tool.getParams(module_id);
					if(param){
						return {"id":param.id,"type":param.type};
					}
					return '';
				}())
			},/*默认配置排序规则*/
			columnDefs:[
				/*{
					target:[0,-1],
					ordering:false
				}*/
			],/*解析每列数据*/
			columns: [
				{
					"data":"btn",
					"render":function(data, type, full, meta ){
						return '<input type="checkbox" data-id="'+full.btn.id+'" name="member" class="cbr">';
					}
				},
				{"data":"userName"},
				{"data":"adminName"},
				{"data":"adminPhone"},
				{"data":"createDateTime"},
				{"data":"loginDateTime"},
				{"data":"createDateTime"},
				{"data":"power"},
				{"data":"remark"},
				{
					"data":"btn",
					"render":function(data, type, full, meta ){
						var id=full.btn.id,
							types=parseInt(full.btn.type,10),
							btns='<span data-href="admin_power.html" data-module="admin_power" data-action="select" data-id="'+id+'" data-type="'+types+'" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-group"></i>\
											<span>查看</span>\
											</span>\
											<span data-id="'+id+'" data-type="'+types+'" data-action="update" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa fa-pencil"></i>\
											<span>修改</span>\
											</span>\
											<span data-href="admin_power.html" data-module="admin_power" data-action="select" data-id="'+id+'" data-type="'+types+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-gear"></i>\
											<span>权限</span>\
											</span>';

						return btns;
					}
				}
			],/*控制分页数*/
			aLengthMenu: [
				[10,20,50],
				[10,20,50]
			],/*控制是否每页可改变显示条数*/
			lengthChange:true/*是否可改变长度*/
		});




		/*事件绑定*/
		/*绑定查看，修改，删除操作*/
		$admin_member_wrap.delegate('span','click',function(e){
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
				dia.content('<span class="g-c-warn g-btips-warn">请选中数据</span>').show();
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
										$admin_member_wrap.DataTable().row($tr).remove().draw();
										setTimeout(function(){
											self.content('<span class="g-c-succ g-btips-succ">删除数据成功</span>');
										},100);
									}
								})
								.fail(function(resp){
									if(!resp.flag&&resp.message){
										setTimeout(function(){
											self.content('<span class="g-c-error g-btips-error">'+resp.message+'</span>');
										},100);
									}else{
										setTimeout(function(){
											self.content('<span class="g-c-error g-btips-error">删除数据失败</span>');
										},100);

									}
								});
						},'admin_delete');
					//确认删除
					dialogObj.dialog.content('<span class="g-c-warn g-btips-warn">是否删除此数据？</span>').showModal();

				}else if(action==='update'){
					/*修改操作*/
					$table_wrap.addClass('col-md-9');
					$edit_wrap.addClass('g-d-showi');
					//重置信息
					$edit_close_btn.prev().html('修改角色');
					$edit_cance_btn.prev().html('修改角色');
					//赋值
					var datas=$admin_member_wrap.DataTable().row($tr).data();
							for(var i in datas){
								switch (i){
									case 'name':
										$member_name.val(datas[i]);
										break;
									case 'remark':
										$member_remark.val(datas[i]);
										break;
									case 'btn':;
										$member_id.val(datas[i][id]);
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
		$member_add_btn.on('click',function(){
			//重置表单
			edit_form.reset();
			$edit_close_btn.prev().html('添加角色');
			$edit_cance_btn.prev().html('添加角色');
			//显示表单
			$table_wrap.addClass('col-md-9');
			$edit_wrap.addClass('g-d-showi');
			//第一行获取焦点
			$member_name.focus();
		});

		/*//关闭编辑区*/
		$edit_close_btn.click(function(){
			$edit_cance_btn.trigger('click');
		});


		/*表单验证*/
		if($.isFunction($.fn.validate)) {
			/*配置信息*/
			var form_opt={};
			if(public_tool.cache.form_opt){
				$.extend(true,form_opt,public_tool.cache.form_opt,{
					submitHandler: function(form){
						//判断是否存在id号
						var id=$member_id.val(),
							config={
								url:"",
								method: 'POST',
								dataType: 'json',
								data: {
									"roleName":$member_name.val(),
									"roleRemark":$member_remark.val()
								}
							};

						if(id!==''&&typeof id==='number'){
							//此处配置添加角色地址（开发阶段）
							config.url="../../json/admin/admin_role_update.json";
							if(config.data['role_Id']){
								delete config.data['role_Id'];
							}
						}else{
							//此处配置修改稿角色地址（开发阶段）
							config.url="../../json/admin/admin_role_update.json";
							config.data['role_Id']=$member_id.val();
						}

						$.ajax(config)
							.done(function(resp){
								if(resp.flag){
									dia.content('<span class="g-c-succ g-btips-succ">操作成功</span>').show();

									$edit_cance_btn.trigger('click');
									//重绘表格
									$admin_member_wrap.DataTable().draw();
								}else{
									dia.content('<span class="g-c-succ g-btips-succ">操作失败</span>').show();
								}
								setTimeout(function () {
									dia.close();
								},2000);
							})
							.fail(function(){
								dia.content('<span class="g-c-succ g-btips-succ">操作失败</span>').show();
								setTimeout(function () {
									dia.close();
								},2000)

							});

					}
				});
			}
			/*提交验证*/
			$member_edit_form.validate(form_opt);
		}







	});


})(jQuery);