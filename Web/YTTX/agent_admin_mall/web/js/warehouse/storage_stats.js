/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){

		var table=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.76.237.100:8082/mall-agentbms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});
			/*权限调用*/
			var powermap=public_tool.getPower(86),
				storageshow_power=public_tool.getKeyPower('mall-storage-stats',powermap),
				storageadd_power=public_tool.getKeyPower('mall-storage-add',powermap);



			
			/*dom引用和相关变量定义*/
			var $storage_stats_wrap=$('#storage_stats_wrap')/*表格*/,
				module_id='mall-storage-stats'/*模块id，主要用于本地存储传值*/,
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
				$admin_page_wrap=$('#admin_page_wrap'),
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_content=$('#show_detail_content'),/*详情内容*/
				$show_detail_list=$('#show_detail_list'),
				$storage_surebtn=$('#storage_surebtn');




			/*列表请求配置*/
			var storage_page={
					page:1,
					pageSize:10,
					total:0
				},
				storage_config={
					$storage_stats_wrap:$storage_stats_wrap,
					$admin_page_wrap:$admin_page_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:"http://120.76.237.100:8082/mall-agentbms-api/announcements/related",
							dataType:'JSON',
							method:'post',
							dataSrc:function ( json ) {
								var code=parseInt(json.code,10);
								if(code!==0){
									if(code===999){
										/*清空缓存*/
										public_tool.loginTips(function () {
											public_tool.clear();
											public_tool.clearCacheData();
										});
									}
									console.log(json.message);
									return [];
								}
								var result=json.result;
								/*设置分页*/
								storage_page.page=result.page;
								storage_page.pageSize=result.pageSize;
								storage_page.total=result.count;
								/*分页调用*/
								$admin_page_wrap.pagination({
									pageSize:storage_page.pageSize,
									total:storage_page.total,
									pageNumber:storage_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=storage_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										storage_config.config.ajax.data=param;
										getColumnData(storage_page,storage_config);
									}
								});
								return result.list;
							},
							data:{
								roleId:decodeURIComponent(logininfo.param.roleId),
								adminId:decodeURIComponent(logininfo.param.adminId),
								token:decodeURIComponent(logininfo.param.token),
								grade:decodeURIComponent(logininfo.param.grade),
								page:1,
								pageSize:10
							}
						},
						info:false,
						searching:true,
						ordering:true,
						columns: [
							{
								"defaultContent":""
							},
							{
								"defaultContent":""
							},
							{
								"defaultContent":""
							},
							{
								"defaultContent":""
							},
							{
								"defaultContent":""
							},
							{
								"defaultContent":""
							},
							{
								"data":"status",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"默认",
											1:"上架",
											2:"下架"
										},
										str='';

									if(stauts===0){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}else if(stauts===2){
										str='<div class="g-c-gray12">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='';


									if(storageshow_power){
										btns+='<span data-action="select" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-file-text-o"></i>\
											<span>查看</span>\
											</span>';
									}

									return btns;
								}
							}
						]
					}
				};
			

			/*初始化请求*/
			getColumnData(storage_page,storage_config);
			


			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$storage_stats_wrap.delegate('span','click',function(e){
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

				/*修改,编辑操作*/
				if(action==='select'){
					showStorage(id,$tr);
				}
			});


			/*绑定关闭详情*/
			$show_detail_wrap.on('hide.bs.modal',function(){
				if(operate_item){
					setTimeout(function(){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					},1000);
				}
			});


			/*绑定确定收货单*/
			$storage_surebtn.on('click',function () {
				/*to do*/
			});


		}


		/*获取数据*/
		function getColumnData(page,opt){
			if(table===null){
				table=opt.$storage_stats_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}


		/*查看出库单*/
		function showStorage(id,$tr) {
			if(!id){
				return false;
			}

			return false;

			$.ajax({
					url:"http://120.76.237.100:8082/mall-agentbms-api/salesman/detail",
					dataType:'JSON',
					method:'post',
					data:{
						"id":id,
						"adminId":decodeURIComponent(logininfo.param.adminId),
						"token":decodeURIComponent(logininfo.param.token),
						"grade":decodeURIComponent(logininfo.param.grade)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10),
						isok=false;
					if(code!==0){
						console.log(resp.message);
						isok=false;
						return false;
					}
					/*是否是正确的返回数据*/
					/*是否是正确的返回数据*/
					var result=resp.result;
					if(!result){
						isok=false;
					}

					if(!isok){
						dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
					}


					$('<td>'+result[""]+'</td><td>'+result[""]+'</td><td>'+result[""]+'</td><td>'+result[""]+'</td><td>'+result[""]+'</td><td>'+result[""]+'</td><td>'+result[""]+'</td>').appendTo($show_detail_content.html(''));


					var list=result.list,
						str='<tr><th>&nbsp;</th><th colspan="2">商品名称</th><th colspan="2">商品型号</th><th colspan="2">数量</th></tr>',
						i=0;

					if(list){
						var len=list.length;
						if(len!==0){
							for(i;i<len;i++){
								var tempstorage=list[i];
								str+='<tr>\
								<td><input type="checkbox" name="storageId" value="'+tempstorage["id"]+'"></td>\
								<td colspan="2">'+tempstorage["a"]+'</td>\
								<td colspan="2">'+tempstorage["b"]+'</td>\
								<td colspan="2">'+tempstorage["c"]+'</td>\
								</tr>';
							}
							$(str).appendTo($show_detail_list.html(''));
						}
						/*添加高亮状态*/
						if(operate_item){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						}
						operate_item=$tr.addClass('item-lighten');
						$show_detail_wrap.modal('show',{backdrop:'static'});
					}else{
						$show_detail_content.html('');
						$show_detail_list.html('');
					}
				})
				.fail(function(resp){
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
				});
		}



	});


})(jQuery);