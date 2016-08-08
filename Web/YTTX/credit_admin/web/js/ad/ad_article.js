/*admin_member:成员设置*/
(function($,KE){
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


			/*权限调用*/
			var powermap=public_tool.getPower();


			/*dom引用和相关变量定义*/
			var $ad_article_wrap=$('#ad_article_wrap')/*表格*/,
				module_id='ad_article'/*模块id，主要用于本地存储传值*/,
				table=null,
				$data_wrap=$('#data_wrap')/*数据展现面板*/,
				$edit_wrap=$('#edit_wrap')/*编辑容器面板*/,
				$article_add_btn=$('#article_add_btn'),/*添加角色*/
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

			/*表单对象*/
			var edit_form=document.getElementById('article_edit_form')/*表单dom*/,
				$article_edit_form=$(edit_form)/*编辑表单*/,
				$article_id=$('#article_id'),/*成员id*/
				$edit_continue_btn=$('#edit_continue_btn')/*保存继续添加*/,
				$edit_cance_btn=$('#edit_cance_btn')/*编辑取消按钮*/,
				$article_title=$('#article_title'),/*服务站名称*/
				$article_content=$('#article_content')/*服务站简称*/,
				$article_starttime=$('#article_starttime')/*负责人*/,
				$article_endtime=$('#article_endtime')/*绑定代理商*/,
				$article_thumbnail=$('#article_thumbnail')/*手机号*/,
				$article_belongscompany=$('#article_belongscompany')/*描述，备注*/;


			/*编辑器调用*/
			var editor=KE.create("#article_content",{
					minHeight:'300px',
					height:'300px',
					filterMode :false,
					resizeType:1,/*改变外观大小模式*/
				  bodyClass:"ke-admin-wrap",
					syncType:""/*数据同步模式*/,
					afterUpload : function(url) {
						/*指定上传文件的回调*/
						alert(url);
					},
					uploadJson : '地址',/*指定上传文件的服务器端程序*/
					allowFileManager : true,
					imageSizeLimit : "2MB",
			});




			/*列表请求配置*/
			var article_config={
				url:"http://120.24.226.70:8081/yttx-adminbms-api/article/advertisement/list",
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
				data:(function(){
					/*查询本地,如果有则带参数查询，如果没有则初始化查询*/
					var param=public_tool.getParams(module_id);
					//获取参数后清除参数
					public_tool.removeParams(module_id);
					if(param){
						return {
							roleId:param.roleId,
							adminId:decodeURIComponent(logininfo.param.adminId),
							token:decodeURIComponent(logininfo.param.token),
							page:1,
							pageSize:20,
						};
					}
					return {
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token),
						page:1,
						pageSize:20
					};
				}())
			};


			//初始化请求
			table=$ad_article_wrap.DataTable({
				deferRender:true,/*是否延迟加载数据*/
				serverSide:false,/*是否服务端处理*/
				searching:false,/*是否搜索*/
				ordering:false,/*是否排序*/
				//order:[[1,'asc']],/*默认排序*/
				paging:true,/*是否开启本地分页*/
				pagingType:'simple_numbers',/*分页按钮排列*/
				autoWidth:true,/*是否*/
				info:true,/*显示分页信息*/
				stateSave:false,/*是否保存重新加载的状态*/
				processing:true,/*大消耗操作时是否显示处理状态*/
				ajax:article_config,/*异步请求地址及相关配置*/
				columns: [
					{"data":"title"},
					{
						"data":"content",
						"render":function(data, type, full, meta ){
							return data.subString(0,10)+'...';
						}
					},
					{
						"data":"startTime"
					},
					{
						"data":"endTime"
					},
					{
						"data":"belongsCompany"
					},
					{
						"data":"createTime"
					},
					{
						"data":"id",
						"render":function(data, type, full, meta ){
							var id=parseInt(data,10),
								btns='';

							/*上架,下架*/
							if(typeof powermap[12]!=='undefined'){
								var status=parseInt(full.status,10);
								if(status===0){
									//上架
									btns+='<span data-action="up" data-id="'+id+'" data-isstate="true"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray12">\
									<i class="fa-arrow-up"></i>\
									<span>上架</span>\
									</span>\
									<span data-action="down" data-id="'+id+'" data-isstate="false"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-arrow-down"></i>\
									<span>下架</span>\
									</span>';
								}else if(status===1){
									//下架
									btns+='<span data-action="up" data-id="'+id+'" data-isstate="false"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-arrow-up"></i>\
									<span>上架</span>\
									</span>\
									<span data-action="down" data-id="'+id+'"  data-isstate="true"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray12">\
									<i class="fa-arrow-down"></i>\
									<span>下架</span>\
									</span>';
								}
							}

							/*修改*/
							if(typeof powermap[11]!=='undefined'){
								btns+='<span data-action="update" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-pencil"></i>\
									<span>修改</span>\
									</span>';
							}
							return btns;
						}
					}
				],
				aLengthMenu: [
					[20,30,50],
					[20,30,50]
				],/*控制分页数*/
				lengthChange:true/*是否可改变长度*/
			});




			/*事件绑定*/
			/*绑定查看，修改操作*/
			$ad_article_wrap.delegate('span','click',function(e){
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
					$edit_title.html('修改文章广告');

					var datas=table.row($tr).data();
					for(var i in datas) {
						switch (i) {
							case "id":
								$article_id.val(datas[i]);
								break;
							case "title":
								$article_title.val(datas[i]);
								break;
							case "content":
								$article_content.val(datas[i]);
								break;
							case "startTime":
								$article_starttime.val(datas[i]);
								break;
							case "endTime":
								$article_endtime.val(datas[i]);
								break;
							case "thumbnail":
								$article_thumbnail.val(datas[i]);
								break;
							case "belongsCompany":
								$article_belongscompany.val(datas[i]);
								break;
						}
					}
				}else if(action==='delete'){
					/*删除操作*/
					//没有回调则设置回调对象
					dialogObj.setFn(function(){
						var self=this;

						$.ajax({
								url:"http://120.24.226.70:8081/yttx-adminbms-api/article/advertisement/operate",
								method: 'POST',
								dataType: 'json',
								data:{
									"articleId":id,
									"adminId":decodeURIComponent(logininfo.param.adminId),
									"token":decodeURIComponent(logininfo.param.token),
									"operate":3
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
								table.row($tr).remove().draw(false);
								setTimeout(function(){
									self.content('<span class="g-c-bs-success g-btips-succ">删除数据成功</span>');
								},100);
							})
							.fail(function(resp){
								console.log(resp.message);
							});
					},'article_delete');
					//确认删除
					dialogObj.dialog.content('<span class="g-c-bs-warning g-btips-warn">是否删除此数据？</span>').showModal();

				}else if(action==='up'||action==='down'){
					/*判断是否可以上下架*/
					var isstate=$this.attr('data-isstate');

					if(action==='up'){
						if(isstate){
							dia.content('<span class="g-c-bs-warning g-btips-warn">目前是已经是上架状态请选择下架状态</span>').show();
							return false;
						}
						var state=1;
					}else if(action==='down'){
						if(isstate){
							dia.content('<span class="g-c-bs-warning g-btips-warn">目前是已经是下架状态请选择上架状态</span>').show();
							return false;
						}
						var state=2;
					}

					/*上架和下架*/
					$.ajax({
							url:"http://120.24.226.70:8081/yttx-adminbms-api/article/advertisement/operate",
							method: 'POST',
							dataType: 'json',
							data:{
								"articleId":id,
								"adminId":decodeURIComponent(logininfo.param.adminId),
								"token":decodeURIComponent(logininfo.param.token),
								"operate":state
							}
						})
						.done(function(resp){
							if(resp.flag){

								var datas=resp.data,
									str='',
									len=datas.length,
									i=0;
								/*是否有返回数据*/
								if(len!==0){
									for(i;i<len;i++){
										if(datas[i]['id']===id){
											datas=datas[i];
											break;
										}
									}
								}
								/*是否是正确的返回数据*/
								if($.isPlainObject(datas)){
									var str='';
									for(var i in datas){
										if(i==='userName'||i==='username'){
											$manage_detail_title.html(i+'服务站详情信息');
										}else{
											str+='<tr><th>'+i+'</th><td>'+datas[i]+'</td></tr>';
										}
									};
									$manage_detail_show.html(str);
								}
								$manage_detail_show.html(str);
							}else{
								$manage_detail_title.html('');
								$manage_detail_show.html('');
							}
						})
						.fail(function(resp){
							if(!resp.flag){
								$manage_detail_title.html('');
								$manage_detail_show.html('');
							}
						});
				}



			});


			/*取消修改*/
			$edit_cance_btn.on('click',function(e){
				//切换显示隐藏表格和编辑区
				/*调整布局*/
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


			/*添加文章广告*/
			$article_add_btn.on('click',function(e){
				e.preventDefault();
				//重置表单
				edit_form.reset();
				$edit_title.html('添加文章广告');
				/*调整布局*/
				$data_wrap.addClass('collapsed');
				$edit_wrap.removeClass('collapsed');
				$("html,body").animate({scrollTop:300},200);
				//第一行获取焦点
				$article_title.focus();
			});
			if(typeof powermap[11]!=='undefined'){
				$article_add_btn.removeClass('g-d-hidei');
			}



			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt={};
				if(public_tool.cache.form_opt_0){
					$.extend(true,form_opt,public_tool.cache.form_opt_0,{
						submitHandler: function(form){
							//判断是否存在id号
							var id=$article_id.val();


							if(id!==''){
								//此处配置修改稿角色地址（开发阶段）
								var config={};
								config.url="../../json/admin/admin_role_update.json";
							}else{
								//此处配置添加角色地址（开发阶段）
								config.url="../../json/admin/admin_role_update.json";
								for(i;i<datalen;i++){
									if(data[i]['name']==='id'){
										delete data[i];
										i=0;
										datalen=data.length;
										break;
									}
								}
							}


							for(i;i<datalen;i++){
								var tempdata=data[i];
								if(tempdata['name']==='mobliePhone'){
									tempdata['value']=tempdata['value'].replace(/\s*/g,'');
								}
								res[tempdata['name']]=tempdata['value'];
							}
							config.data=res;

							$.ajax(config)
								.done(function(resp){
									if(resp.flag){
										//重绘表格
										table.draw();
										$edit_cance_btn.trigger('click');

										if(public_tool.cache.form_opt_0['continue']){
											form.reset();
											setTimeout(function(){
												$article_add_btn.trigger('click');
											},200);
										}
										setTimeout(function(){
											dia.content('<span class="g-c-bs-success g-btips-succ">操作成功</span>').show();
										},200);
									}else{
										dia.content('<span class="g-c-bs-warning g-btips-warn">操作失败</span>').show();
									}
									public_tool.cache.form_opt_0['continue']=false;
									setTimeout(function () {
										dia.close();
									},2000);
								})
								.fail(function(){
									dia.content('<span class="g-c-bs-warning g-btips-warn">操作失败</span>').show();
									setTimeout(function () {
										dia.close();
									},2000)
									public_tool.cache.form_opt_0['continue']=false;
								});

							return false;
						}
					});
				}
				/*提交验证*/
				$article_edit_form.validate(form_opt);
			}





		}



	});


})(jQuery,KindEditor);