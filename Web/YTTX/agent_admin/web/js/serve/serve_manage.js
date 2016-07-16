/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){

		/*dom引用和相关变量定义*/
		var $serve_manage_wrap=$('#serve_manage_wrap')/*表格*/,
			module_id='serve_manage'/*模块id，主要用于本地存储传值*/,
			table=null,
			$edit_wrap=$('#edit_wrap')/*编辑容器*/,
			$manage_add_btn=$('#manage_add_btn'),/*添加角色*/
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
			$member_detail_wrap=$('#member_detail_wrap')/*查看详情容器*/,
			$member_detail_title=$('#member_detail_title')/*查看详情标题*/,
			$member_detail_show=$('#member_detail_show')/*查看详情内容*/;

		/*表单对象*/
		var $edit_cance_btn=$('#edit_cance_btn')/*编辑取消按钮*/,
			edit_form=document.getElementById('manage_edit_form'),
			$province=$('#province'),
			$city=$('#city'),
			$area=$('#area'),
			$province_value=$('#province_value'),
			$city_value=$('#city_value'),
			$area_value=$('#area_value'),
		$manage_edit_form=$('#manage_edit_form')/*编辑表单*/,
		$manage_id=$('#manage_id'),/*成员id*/
		$member_username=$('#member_username'),/*成员用户名*/
		$member_adminname=$('#member_adminname')/*成员管理员姓名*/,
		$member_adminphone=$('#member_adminphone')/*成员管理员电话*/,
		$member_remark=$('#member_remark')/*成员描述*/;


		//初始化请求
		table=$serve_manage_wrap.DataTable({
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
				url:"../../json/admin/admin_power_user.json",
				dataType:'JSON',
				method:'post',
				data:(function(){
					/*查询本地,如果有则带参数查询，如果没有则初始化查询*/
					var param=public_tool.getParams(module_id);
					//获取参数后清除参数
					public_tool.removeParams(module_id);
					if(param){
						return {"id":param.id};
					}
					return '';
				}()),
				dataSrc:"data"
			},/*默认配置排序规则*/
			columns: [
				{
					"data":"id",
					"orderable":false,
					"render":function(data, type, full, meta ){
						return '<input type="checkbox" data-id="'+full.id+'" name="member" class="cbr">';
					}
				},
				{"data":"companyName"},
				{"data":"name"},
				{"data":"phone"},
				{"data":"companyAddress"},
				{"data":"serve"},
				{"data":"grade"},
				{
					"data":"id",
					"render":function(data, type, full, meta ){
						var id=full.id,
							btns='<span data-action="select" data-id="'+id+'" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-group"></i>\
											<span>查看</span>\
											</span>\
											<span data-id="'+id+'" data-action="update" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa fa-pencil"></i>\
											<span>修改</span>\
											</span>\
											<span data-href="serve_send.html" data-module="serve_send" data-action="select" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-gear"></i>\
											<span>发货</span>\
											</span>\
											<span data-href="serve_repair.html" data-module="serve_repair" data-action="select" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-gear"></i>\
											<span>返修</span>\
											</span>';

						return btns;
					}
				}
			],/*控制列数*/
			aLengthMenu: [
				[10,20,50],
				[10,20,50]
			],/*控制是否每页可改变显示条数*/
			lengthChange:true/*是否可改变长度*/
		});




		/*事件绑定*/
		/*绑定查看，修改操作*/
		$serve_manage_wrap.delegate('span','click',function(e){
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
				/*修改操作*/
				if(action==='update'){
					/*调整布局*/
					$edit_wrap.addClass('g-d-showi');
					table.columns(visible_arr).visible(false);
					$colgroup_wrap.html(visible_group);
					//重置信息
					$edit_close_btn.prev().html('修改成员');
					$edit_cance_btn.prev().html('修改成员');
					//赋值
					var datas=table.row($tr).data();
							for(var i in datas){
								switch (i){
									case 'userName':
										$member_username.val(datas[i]);
										break;
									case 'adminName':
										$member_adminname.val(datas[i]);
										break;
									case 'adminPhone':
										$member_adminphone.val(datas[i]);
										break;
									case 'remark':
										$member_remark.val(datas[i]);
										break;
									case 'btn':;
										$manage_id.val(datas[i][id]);
										break;
								}
							}
				}else if(action==='select'){
							/*查看详情*/
							$member_detail_wrap.modal('show',{backdrop:'static'});
							$.ajax({
									url:"../../json/admin/admin_memberdetail.json",
									dataType:'JSON',
									method:'post',
									data:{
										"id":id,
										"type":type
									}
							})
							.done(function(resp){
									if(resp.flag){
										var datas=resp.data,
											str='';
										for(var i in datas){
												if(i==='userName'||i==='username'){
													$member_detail_title.html(i+'成员详情信息');
												}else{
													str+='<tr><th>'+i+'</th><td>'+datas[i]+'</td></tr>';
												}
										};
										$member_detail_show.html(str);
									}else{
										$member_detail_title.html('');
										$member_detail_show.html('');
									}
							})
							.fail(function(resp){
									if(!resp.flag){
											$member_detail_title.html('');
											$member_detail_show.html('');
									}
							});
				}
			}



		});


		/*//取消修改*/
		$edit_cance_btn.on('click',function(e){
			//切换显示隐藏表格和编辑区
			/*调整布局*/
			$edit_wrap.removeClass('g-d-showi');
			table.columns(visible_arr).visible(true);
			$colgroup_wrap.html(init_group);
		});

		/*添加角色*/
		$manage_add_btn.on('click',function(){
			//重置表单
			edit_form.reset();
			$edit_close_btn.prev().html('添加成员');
			$edit_cance_btn.prev().html('添加成员');
			/*调整布局*/
			$edit_wrap.addClass('g-d-showi');
			table.columns(visible_arr).visible(false);
			$colgroup_wrap.html(visible_group);
			//第一行获取焦点
			$member_username.focus();
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
						var id=$manage_id.val(),
							config={
								url:"",
								method: 'POST',
								dataType: 'json',
								data: {
									"userName":$member_username.val(),
									"adminName":$member_adminname.val(),
									"adminPhone":$member_adminphone.val(),
									"memberRemark":$member_remark.val()
								}
							};

						if(id!==''&&typeof id==='number'){
							//此处配置修改稿角色地址（开发阶段）
							config.url="../../json/admin/admin_role_update.json";
							config.data['member_Id']=id;
						}else{
							//此处配置添加角色地址（开发阶段）
							config.url="../../json/admin/admin_role_update.json";
							if(config.data['member_Id']){
								delete config.data['member_Id'];
							}
						}

						$.ajax(config)
							.done(function(resp){
								if(resp.flag){
									dia.content('<span class="g-c-bs-success g-btips-succ">操作成功</span>').show();

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
			$manage_edit_form.validate(form_opt);
		}



		/*格式化手机号码*/
		$member_adminphone.on('keyup',function(){
			this.value=public_tool.phoneFormat(this.value);
		});




		/*初始化地址信息*/
		if(public_tool){
			//var areaSelect=new public_tool.areaSelect();
			new public_tool.areaSelect().areaSelect({
				$province:$province,
				$city:$city,
				$area:$area,
				$provinceinput:$province_value,
				$cityinput:$city_value,
				$areainput:$area_value
			});
		}else{
			new areaSelect().areaSelect({
				$province:$province,
				$city:$city,
				$area:$area,
				$provinceinput:$province_value,
				$cityinput:$city_value,
				$areainput:$area_value
			});
		}








	});


})(jQuery);