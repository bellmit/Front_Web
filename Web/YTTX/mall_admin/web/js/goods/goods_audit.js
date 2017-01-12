(function($){
	'use strict';
	$(function(){

		var table=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.76.237.100:8082/mall-buzhubms-api/module/menu',
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
			var powermap=public_tool.getPower(),
				user_power=public_tool.getKeyPower('goods-forbid',powermap),
				enabled_power=public_tool.getKeyPower('goods-disabled',powermap),
				detail_power=public_tool.getKeyPower('goods-detail',powermap),
				recommend_power=public_tool.getKeyPower('goods-recommend',powermap);



			/*dom引用和相关变量定义*/
			var $admin_list_wrap=$('#admin_list_wrap')/*表格*/,
				module_id='bzw-goods-audit'/*模块id，主要用于本地存储传值*/,
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
				$admin_page_wrap=$('#admin_page_wrap'),
				goodstype_config={
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj(),
				goodstypeid='';

			/*查询对象*/
			var $search_name=$('#search_name'),
				$search_goodsTypeId=$('#search_goodsTypeId'),
				$search_auditStatus=$('#search_auditStatus'),
				$search_providerName=$('#search_providerName'),
				$search_isForbidden=$('#search_isForbidden'),
				$search_gtione=$('#search_gtione'),
				$search_gtitwo=$('#search_gtitwo'),
				$search_gtithree=$('#search_gtithree'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');




			/*列表请求配置*/
			var goods_page={
					page:1,
					pageSize:10,
					total:0
				},
				goods_config={
					$admin_list_wrap:$admin_list_wrap,
					$admin_page_wrap:$admin_page_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:"http://120.76.237.100:8082/mall-buzhubms-api/goods/list",
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
								if(typeof result==='undefined'){
									return [];
								}
								/*设置分页*/
								goods_page.page=result.page;
								goods_page.pageSize=result.pageSize;
								goods_page.total=result.count;
								/*分页调用*/
								$admin_page_wrap.pagination({
									pageSize:goods_page.pageSize,
									total:goods_page.total,
									pageNumber:goods_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=goods_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										goods_config.config.ajax.data=param;
										getColumnData(goods_page,goods_config);
									}
								});
								return result?result.list||[]:[];
							},
							data:{
								roleId:decodeURIComponent(logininfo.param.roleId),
								adminId:decodeURIComponent(logininfo.param.adminId),
								grade:decodeURIComponent(logininfo.param.grade),
								token:decodeURIComponent(logininfo.param.token),
								auditStatus:0,
								page:1,
								pageSize:10
							}
						},
						info:false,
						searching:true,
						order:[[4, "desc" ]],
						columns: [
							{
								"data":"gcode"
							},
							{
								"data":"name"
							},
							{
								"data":"providerName"
							},
							{
								"data":"goodsTypeName"
							},
							{
								"data":"sort"
							},
							{
								"data":"status",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"仓库",
											1:"上架",
											2:"下架",
											3:"删除",
											4:"待审核"
										},
										str='';

									if(stauts===3){
										str='<div class="g-c-red1">'+statusmap[stauts]+'</div>';
									}else if(stauts===0){
										str='<div class="g-c-warn">'+statusmap[stauts]+'</div>';
									}else if(stauts===1){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}else if(stauts===2){
										str='<div class="g-c-gray9">'+statusmap[stauts]+'</div>';
									}else if(stauts===4){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"isForbidden",
								"render":function(data, type, full, meta ){
									var statusmap={
											true:"禁售",
											false:"可售"
										},
										str='';

									if(data){
										str='<div class="g-c-gray9">'+statusmap[data]+'</div>';
									}else{
										str='<div class="g-c-info">'+statusmap[data]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='',
										user=parseInt(full.user,10),
										enabled=parseInt(full.isEnabled,10),
										recommend=parseInt(full.recommend,10);

									if(user===1){
										if(enabled_power){
											if(enabled===0){
												/*禁用状态则启用*/
												btns+='<span data-action="up" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
													<i class="fa-arrow-up"></i>\
													<span>上架</span>\
												</span>';
											}else if(enabled===1){
												/*启用状态则禁用*/
												btns+='<span data-action="down" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
													<i class="fa-arrow-down"></i>\
													<span>下架</span>\
												</span>';
											}
										}
										if(user_power){
											/*可售状态则禁售*/
											btns+='<span data-action="disabled" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
													<i class="fa-toggle-on"></i>\
													<span>禁售</span>\
												</span>';
										}
										if(recommend_power){
											/*推荐*/
											if(recommend===0){
												btns+='<span data-action="recommend" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
													<i class="fa-heart"></i>\
													<span>推荐</span>\
												</span>';
											}else if(recommend===1){
												btns+='<span data-action="deprecate" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
													<i class="fa-heart-o"></i>\
													<span>取消推荐</span>\
												</span>';
											}

										}
									}else if(user===0){
										if(user_power){
											/*禁用状态则启用*/
											btns+='<span data-action="usable" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
													<i class="fa-toggle-off"></i>\
													<span>可售</span>\
												</span>';
										}
									}
									if(detail_power){
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


			/*查询分类并绑定分类查询*/
			$.each([$search_gtione,$search_gtitwo,$search_gtithree],function(){
				var self=this,
					selector=this.selector,
					hastype=false;

				/*初始化查询一级分类*/
				if(selector.indexOf('one')!==-1){
					getGoodsTypes('','one',true);
				}

				this.on('change',function(){
					var $option=$(this).find(':selected'),
						value=this.value,
						hasub=false;
					if(selector.indexOf('one')!==-1){
						if(value===''){
							$search_gtitwo.html('');
							$search_gtithree.html('');
							goodstypeid='';
							return false;
						}
						hasub=$option.attr('data-hassub');
						goodstypeid=value;
						if(hasub==='true'){
							getGoodsTypes(value,'two');
						}
					}else if(selector.indexOf('two')!==-1){
						if(value===''){
							$search_gtithree.html('');
							goodstypeid=$search_gtione.find(':selected').val();
							return false;
						}
						hasub=$option.attr('data-hassub');
						goodstypeid=value;
						if(hasub==='true'){
							getGoodsTypes(value,'three');
						}
					}else if(selector.indexOf('three')!==-1){
						if(value===''){
							goodstypeid=$search_gtitwo.find(':selected').val();
							return false;
						}
						goodstypeid=value;
					}
				});
			});
			

			/*初始化请求*/
			getColumnData(goods_page,goods_config);


			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_name,$search_providerName,$search_isForbidden,$search_gtione,$search_gtitwo,$search_gtithree],function(){
					var selector=this.selector;
					if(selector.indexOf('isForbidden')!==-1||selector.indexOf('_gti')!==-1){
						this.find(':selected').prop({
							"selected":false
						});
					}else{
						this.val('');
					}
				});
				/*清空分类值*/
				goodstypeid='';
			});
			$admin_search_clear.trigger('click');


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},goods_config.config.ajax.data);

				$.each([$search_name,$search_providerName,$search_isForbidden,$search_auditStatus],function(){
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
				/*分类处理*/
				if(goodstypeid===''){
					delete data['goodsTypeId'];
				}else{
					data['goodsTypeId']=goodstypeid;
				}
				goods_config.config.ajax.data= $.extend(true,{},data);
				getColumnData(goods_page,goods_config);
			});



			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$admin_list_wrap.delegate('span','click',function(e){
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
					/*public_tool.setParams('mall-provider-goods',id);
					window.location.href='mall-provider-goods.html';*/
				}else if(action==='up'||action==='down'){
					/*确认是否启用或禁用*/
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					setEnabled({
						id:id,
						action:action
					});
				}else if(action==='disabled'||action==='usable'){
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					/*确认是否启用或禁用*/
					setSure.sure(action==='disabled'?'禁售':'可售',function(cf){
						/*to do*/
						setUser({
							id:id,
							action:action,
							tip:cf.dia||dia
						});
					});
				}else if(action==='recommend'||action==="deprecate"){
					/*推荐或取消推荐*/
					if(operate_item){
						operate_item.removeClass('item-lighten');
						operate_item=null;
					}
					operate_item=$tr.addClass('item-lighten');
					setRecommond({
						id:id,
						action:action
					});
				}
			});

		}


		/*获取数据*/
		function getColumnData(page,opt){
			if(table===null){
				table=opt.$admin_list_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}


		/*启用禁用*/
		function setEnabled(obj){
			var id=obj.id;

			if(typeof id==='undefined'){
				return false;
			}
			var action=obj.action;
			$.ajax({
					url:"../../json/goods/mall_goods_list.json",
					dataType:'JSON',
					method:'post',
					data:{
						id:id,
						type:action,
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							dia.close();
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
						},2000);
						return false;
					}
					/*是否是正确的返回数据*/
					/*添加高亮状态*/
					dia.content('<span class="g-c-bs-success g-btips-succ">'+(action==="up"?'上架':'下架')+'成功</span>').show();
					setTimeout(function () {
						dia.close();
						setTimeout(function () {
							operate_item=null;
							/*请求数据*/
							getColumnData(goods_page,goods_config);
						},1000);
					},1000);
				})
				.fail(function(resp){
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						dia.close();
						if(operate_item){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						}
					},2000);
				});
		}

		/*推荐取消推荐*/
		function setRecommond(obj){
			var id=obj.id;

			if(typeof id==='undefined'){
				return false;
			}
			var action=obj.action;
			$.ajax({
					url:"../../json/goods/mall_goods_list.json",
					dataType:'JSON',
					method:'post',
					data:{
						id:id,
						type:action,
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							dia.close();
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
						},2000);
						return false;
					}
					/*是否是正确的返回数据*/
					/*添加高亮状态*/
					dia.content('<span class="g-c-bs-success g-btips-succ">'+(action==="recommend"?'推荐':'取消推荐')+'成功</span>').show();
					setTimeout(function () {
						dia.close();
						setTimeout(function () {
							operate_item=null;
							/*请求数据*/
							getColumnData(goods_page,goods_config);
						},1000);
					},1000);
				})
				.fail(function(resp){
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						dia.close();
						if(operate_item){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						}
					},2000);
				});
		}



		/*禁售，可售*/
		function setUser(obj){
			var id=obj.id;

			if(typeof id==='undefined'){
				return false;
			}
			var tip=obj.tip,
				action=obj.action;

			$.ajax({
					url:"../../json/goods/mall_goods_list.json",
					dataType:'JSON',
					method:'post',
					data:{
						id:id,
						type:action,
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							tip.close();
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
						},2000);
						return false;
					}
					/*是否是正确的返回数据*/
					/*添加高亮状态*/
					tip.content('<span class="g-c-bs-success g-btips-succ">'+(action==="disabled"?'禁售':'可售')+'成功</span>').show();
					setTimeout(function () {
						tip.close();
						setTimeout(function () {
							operate_item=null;
							/*请求数据*/
							getColumnData(goods_page,goods_config);
						},1000);
					},1000);
				})
				.fail(function(resp){
					console.log(resp.message);
					tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						tip.close();
						if(operate_item){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						}
					},2000);
				});
		}



		/*级联类型查询*/
		function getGoodsTypes(value,type,flag){
			var typemap={
					'one':'一级',
					'two':'二级',
					'three':'三级'
				};

			goodstype_config['parentId']=value;
			$.ajax({
				url:"http://120.76.237.100:8082/mall-buzhubms-api/goodstype/list",
				dataType:'JSON',
				async:false,
				method:'post',
				data:goodstype_config
			}).done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.loginTips(function () {
							public_tool.clear();
							public_tool.clearCacheData();
						});
					}
					console.log(resp.message);
					return false;
				}



				var result=resp.result;

				if(result){
					var list=result.list;
					if(!list){
						return false;
					}
				}else{
					return false;
				}

				var len=list.length,
					i= 0,
					str='';

				if(len!==0){
					for(i;i<len;i++){
						var item=list[i];
						if(i===0){
							str+='<option value="" selected >请选择'+typemap[type]+'分类</option><option  data-hasSub="'+item["hasSub"]+'" value="'+item["id"]+'" >'+item["name"]+'</option>';
						}else{
							str+='<option data-hasSub="'+item["hasSub"]+'" value="'+item["id"]+'" >'+item["name"]+'</option>';
						}
					}
					if(type==='one'){
						$(str).appendTo($search_gtione.html(''));
						if(flag){
							$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
							$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
						}
					}else if(type==='two'){
						$(str).appendTo($search_gtitwo.html(''));
					}else if(type==='three'){
						$(str).appendTo($search_gtithree.html(''));
					}
				}else{
					console.log(resp.message||'error');
					if(type==='one'){
						$search_gtione.html('<option value="" selected >请选择一级分类</option>');
						$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
						$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
					}else if(type==='two'){
						$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
						$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
					}else if(type==='three'){
						$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
					}
				}
			}).fail(function(resp){
				console.log(resp.message||'error');
				if(type==='one'){
					$search_gtione.html('<option value="" selected >请选择一级分类</option>');
					$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
					$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
				}else if(type==='two'){
					$search_gtitwo.html('<option value="" selected >请选择二级分类</option>');
					$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
				}else if(type==='three'){
					$search_gtithree.html('<option value="" selected >请选择三级分类</option>');
				}
			});
		}






	});


})(jQuery);