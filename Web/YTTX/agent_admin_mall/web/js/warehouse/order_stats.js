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
				stats_power=public_tool.getKeyPower('mall-order-stats',powermap);
			


			/*dom引用和相关变量定义*/
			var $order_stats_wrap=$('#order_stats_wrap')/*表格*/,
				module_id='mall-order-stats'/*模块id，主要用于本地存储传值*/,
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
				$order_showall_btn=$('#order_showall_btn'),
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj();




			/*列表请求配置*/
			var order_page={
					page:1,
					pageSize:10,
					total:0
				},
				order_config={
					$order_stats_wrap:$order_stats_wrap,
					$admin_page_wrap:$admin_page_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:"http://120.76.237.100:8082/mall-agentbms-api/goodsorder/list",
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
								order_page.page=result.page;
								order_page.pageSize=result.pageSize;
								order_page.total=result.count;
								/*分页调用*/
								$admin_page_wrap.pagination({
									pageSize:order_page.pageSize,
									total:order_page.total,
									pageNumber:order_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=order_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										order_config.config.ajax.data=param;
										getColumnData(order_page,order_config);
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
								"data":"orderNumber"
							},
							{
								"data":"orderTime"
							},
							{
								"data":"customerName"
							},
							{
								"data":"totalQuantity"
							},
							{
								"data":"orderState",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											6:"已付款",
											9:"已发货"
										},
										str='';

									if(stauts===6){
										str='<div class="g-c-info">'+statusmap[stauts]+'</div>';
									}else if(stauts===9){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='';

									if(stats_power){
										btns+='<span data-action="send" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-file-text-o"></i>\
											<span>发货</span>\
											</span>\
										<span  data-subitem=""  data-action="select" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
										<i class="fa-angle-right"></i>\
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
			getColumnData(order_page,order_config);
			


			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$order_stats_wrap.delegate('span','click',function(e){
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
				if(action==='send'){
					dia.content('<span class="g-c-bs-warning g-btips-warn">暂未开通此功能</span>').show();
					return false;
					/*setSure.sure('发货',function(cf){
						/!*to do*!/
						//sendGoods(cf);
					});*/
				}else if(action==='select'){
					/*查看收货详情*/
					(function () {
						var subclass=$this.children('i').hasClass('fa-angle-down'),
							tabletr=table.row($tr),
							subitem=$this.attr('data-subitem');

						if(subclass){
							/*收缩*/
							$this.children('i').removeClass('fa-angle-down');
							tabletr.child().hide(200);
						}else{
							/*添加高亮状态*/
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
							operate_item=$tr.addClass('item-lighten');
							/*展开*/
							if(subitem===''){
								$.ajax({
										url:"http://120.76.237.100:8082/mall-agentbms-api/goodsorder/details",
										dataType:'JSON',
										method:'post',
										data:{
											id:id,
											adminId:decodeURIComponent(logininfo.param.adminId),
											token:decodeURIComponent(logininfo.param.token),
											grade:decodeURIComponent(logininfo.param.grade)
										}
									})
									.done(function(resp){
										var code=parseInt(resp.code,10),
											isok=false;
										if(code!==0){
											console.log(resp.message);
											isok=false;
										}
										/*是否是正确的返回数据*/
										var result=resp.result;
										if(!result){
											isok=false;
										}

										if(!isok){
											tabletr.child($('<tr><td colspan="6"><table class="table table-bordered table-striped table-hover admin-table" ><tbody class="middle-align"><tr><td class="g-t-c" colspan="5">("暂无数据")</td></tr></tbody></table></td></tr>')).show();
											$this.attr({
												'data-subitem':'true'
											}).children('i').addClass('fa-angle-down');
											return false;
										}

										var list=result.list,
											i= 0,
											newstr='<colgroup>\
												<col class="g-w-percent5">\
												<col class="g-w-percent20">\
												<col class="g-w-percent5">\
												<col class="g-w-percent5">\
												<col class="g-w-percent15">\
											</colgroup>\
											<tr class="goodsinfo">\
											<td colspan="5">'+(function () {
													var panelstr='<ul class="admin-order-subitem2">\
														<li>买家名称:'+result["customerName"]+'</li>\
														<li>联系电话:'+public_tool.phoneFormat(result["customerPhone"])+'</li>\
														<li>所在地址:'+result["customerAddress"]+'</li>\
														<li>收货人姓名:'+result["consigneeName"]+'</li>\
														<li>收货人电话:'+result["consigneePhone"]+'</li>\
														<li>物流费用:￥'+public_tool.moneyCorrect(result["freight"],12,true)[0]+'</li>\
														<li>总计(包含运费):￥'+public_tool.moneyCorrect(result["totalMoney"],12,true)[0]+'</li>\
														<li>买家留言:'+result["remark"]+'</li></ul>';
													return panelstr;
												}())+'</td>\
											</tr>\
											<tr>\
												<th>&nbsp;</th>\
												<th>商品名称</th>\
												<th>批发价</th>\
												<th>购买数量</th>\
												<th>商品属性</th>\
											</tr>',
											res='',
											len=list.length;
										if(len!==0){
											for(i;i<len;i++){
												res+='<tr class="goodslist"><td><input name="goodsId" type="checkbox" value="'+list[i]["goodsId"]+'" </td><td>'+list[i]["goodsName"]+'</td><td>￥'+public_tool.moneyCorrect(list[i]["wholesalePrice"],12,true)[0]+'</td><td>'+list[i]["quantlity"]+'</td><td>'+list[i]["attributeName"]+'</td></tr>';

											}
										}
										res='<tbody class="middle-align">'+res+'</tbody>';
										newstr='<tr><td colspan="6"><table class="table table-bordered table-striped table-hover admin-table" >'+newstr+res+'</table></td></tr>';

										var $newtr=$(newstr);
										tabletr.child($newtr).show();
										$this.attr({
											'data-subitem':'true'
										}).children('i').addClass('fa-angle-down');

									})
									.fail(function(resp){
										console.log(resp.message);
									});
							}else{
								tabletr.child().show();
								$this.children('i').addClass('fa-angle-down');
							}
						}
					}());

				}
			});




			/*全部展开*/
			$order_showall_btn.on('click',function () {
				$order_stats_wrap.find('span[data-action="select"]').trigger('click');
			});
			if(stats_power){
				$order_showall_btn.removeClass('g-d-hidei');
			}else{
				$order_showall_btn.addClass('g-d-hidei');
			}




		}


		/*获取数据*/
		function getColumnData(page,opt){
			if(table===null){
				table=opt.$order_stats_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}


		/*发货*/
		function sendGoods() {
			return false;
			$.ajax({
					url:"http://120.76.237.100:8082/mall-agentbms-api/goodsorder/details",
					dataType:'JSON',
					method:'post',
					data:{
						id:id,
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token),
						grade:decodeURIComponent(logininfo.param.grade)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
					}
					/*是否是正确的返回数据*/

				})
				.fail(function(resp){
					console.log(resp.message);
				});
		}





	});


})(jQuery);