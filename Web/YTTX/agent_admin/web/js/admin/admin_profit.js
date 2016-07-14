/*admin_role:角色管理*/
(function($){
	'use strict';
	$(function(){

		/*dom引用和相关变量定义*/
		var module_id='admin_profit'/*模块id，主要用于本地存储传值*/,
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

						if(id!==''&&typeof id==='number'){
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

					}
				});
			}
			/*提交验证*/
			$role_edit_form.validate(form_opt);
		}







	});


})(jQuery);