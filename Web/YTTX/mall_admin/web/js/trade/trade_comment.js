(function($){
	'use strict';
	$(function(){

		var tablebuy=null,
			tablesell=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'../../json/menu.json',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});

			/*清除编辑数据*/
			public_tool.removeParams('mall-user-add');


			/*权限调用*/
			var powermap=public_tool.getPower(),
				detail_power=public_tool.getKeyPower('order-detail',powermap);



			/*dom引用和相关变量定义*/
			var $admin_listbuy_wrap=$('#admin_listbuy_wrap'),
				$admin_listsell_wrap=$('#admin_listsell_wrap')/*表格*/,
				module_id='mall-trade-comment'/*模块id，主要用于本地存储传值*/,
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
				$admin_pagebuy_wrap=$('#admin_pagebuy_wrap'),
				$admin_pagesell_wrap=$('#admin_pagesell_wrap'),
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_content=$('#show_detail_content'),/*详情内容*/
				$show_detail_title=$('#show_detail_title'),
				$admin_search_theme=$('#admin_search_theme'),
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj();


			/*查询对象*/
			var $search_name=$('#search_name'),
				$search_time=$('#search_time'),
				$search_money=$('#search_money'),
				$search_payType=$('#search_payType'),
				$search_state=$('#search_state'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');




			/*列表请求配置*/
			var tradebuy_page={
					page:1,
					pageSize:10,
					total:0
				},
				tradebuy_config={
					$admin_listbuy_wrap:$admin_listbuy_wrap,
					$admin_pagebuy_wrap:$admin_pagebuy_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:"../../json/trade/mall_trade_list.json",
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
								tradebuy_page.page=result.page;
								tradebuy_page.pageSize=result.pageSize;
								tradebuy_page.total=result.count;
								/*分页调用*/
								$admin_pagebuy_wrap.pagination({
									pageSize:tradebuy_page.pageSize,
									total:tradebuy_page.total,
									pageNumber:tradebuy_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=tradebuy_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										tradebuy_config.config.ajax.data=param;
										getBuyColumnData(tradebuy_page,tradebuy_config);
									}
								});
								return result?result.list||[]:[];
							},
							data:{
								userId:decodeURIComponent(logininfo.param.roleId),
								adminId:decodeURIComponent(logininfo.param.adminId),
								token:decodeURIComponent(logininfo.param.token),
								page:1,
								pageSize:10
							}
						},
						info:false,
						searching:true,
						order:[[1, "desc" ]],
						columns: [
							{
								"data":"store"
							},
							{
								"data":"createTime"
							},
							{
								"data":"company"
							},
							{
								"data":"total"
							},
							{
								"data":"pay",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"微信支付",
											1:"网银支付",
											2:"支付宝支付"
										};

									return statusmap[stauts];
								}
							},
							{
								"data":"orderState",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"待付款",
											1:"待发货",
											2:"待收货",
											3:"已完成",
											4:"已取消",
											5:"待评价"
										},
										str='';

									if(stauts===1||stauts===2||stauts===5){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}else if(stauts===0){
										str='<div class="g-c-warn">'+statusmap[stauts]+'</div>';
									}else if(stauts===4){
										str='<div class="g-c-red1">'+statusmap[stauts]+'</div>';
									}else if(stauts===3){
										str='<div class="g-c-succ">'+statusmap[stauts]+'</div>';
									}else{
										str='<div class="g-c-gray10">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='';

									if(detail_power){
										btns+='<span data-action="select" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
										<i class="fa-pencil"></i>\
										<span>查看</span>\
										</span>';
									}
									return btns;
								}
							}
						]
					}
				},
				tradesell_page={
					page:1,
					pageSize:10,
					total:0
				},
				tradesell_config={
					$admin_listbuy_wrap:$admin_listbuy_wrap,
					$admin_pagebuy_wrap:$admin_pagebuy_wrap,
					config:{
						processing:true,/*大消耗操作时是否显示处理状态*/
						deferRender:true,/*是否延迟加载数据*/
						autoWidth:true,/*是否*/
						paging:false,
						ajax:{
							url:"../../json/trade/mall_trade_list.json",
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
								tradebuy_page.page=result.page;
								tradebuy_page.pageSize=result.pageSize;
								tradebuy_page.total=result.count;
								/*分页调用*/
								$admin_pagebuy_wrap.pagination({
									pageSize:tradebuy_page.pageSize,
									total:tradebuy_page.total,
									pageNumber:tradebuy_page.page,
									onSelectPage:function(pageNumber,pageSize){
										/*再次查询*/
										var param=tradebuy_config.config.ajax.data;
										param.page=pageNumber;
										param.pageSize=pageSize;
										tradebuy_config.config.ajax.data=param;
										getBuyColumnData(tradebuy_page,tradebuy_config);
									}
								});
								return result?result.list||[]:[];
							},
							data:{
								userId:decodeURIComponent(logininfo.param.roleId),
								adminId:decodeURIComponent(logininfo.param.adminId),
								token:decodeURIComponent(logininfo.param.token),
								page:1,
								pageSize:10
							}
						},
						info:false,
						searching:true,
						order:[[1, "desc" ]],
						columns: [
							{
								"data":"store"
							},
							{
								"data":"createTime"
							},
							{
								"data":"company"
							},
							{
								"data":"total"
							},
							{
								"data":"pay",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"微信支付",
											1:"网银支付",
											2:"支付宝支付"
										};

									return statusmap[stauts];
								}
							},
							{
								"data":"orderState",
								"render":function(data, type, full, meta ){
									var stauts=parseInt(data,10),
										statusmap={
											0:"待付款",
											1:"待发货",
											2:"待收货",
											3:"已完成",
											4:"已取消",
											5:"待评价"
										},
										str='';

									if(stauts===1||stauts===2||stauts===5){
										str='<div class="g-c-gray6">'+statusmap[stauts]+'</div>';
									}else if(stauts===0){
										str='<div class="g-c-warn">'+statusmap[stauts]+'</div>';
									}else if(stauts===4){
										str='<div class="g-c-red1">'+statusmap[stauts]+'</div>';
									}else if(stauts===3){
										str='<div class="g-c-succ">'+statusmap[stauts]+'</div>';
									}else{
										str='<div class="g-c-gray10">'+statusmap[stauts]+'</div>';
									}
									return str;
								}
							},
							{
								"data":"id",
								"render":function(data, type, full, meta ){
									var id=parseInt(data,10),
										btns='';

									if(detail_power){
										btns+='<span data-action="select" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
										<i class="fa-pencil"></i>\
										<span>查看</span>\
										</span>';
									}
									return btns;
								}
							}
						]
					}
				};



			/*绑定条件查询*/
			$admin_search_theme.on('click','button',function(){
				var $this=$(this),
					condition=$this.attr('data-value');

				$this.removeClass('btn-white g-c-gray6').addClass('btn-info').siblings().removeClass('btn-info').addClass('g-c-gray6 btn-white');

				if(condition==='buy'){
					/*$admin_finance_monthwrap.removeClass('g-d-hidei');
					$admin_finance_detailwrap.addClass('g-d-hidei');
					$admin_finance_childwrap.addClass('g-d-hidei');*/
					/*查询销售分润*/
					//getByMonthFinance();
				}else if(condition==='sell'){
					/*$admin_finance_monthwrap.addClass('g-d-hidei');
					$admin_finance_detailwrap.removeClass('g-d-hidei');
					$admin_finance_childwrap.addClass('g-d-hidei');*/
					/*查询明细*/
					//getByDetailFinance();
				}
			});

			

			/*初始化请求*/
			getBuyColumnData(tradebuy_page,tradebuy_config);


			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_name,$search_time,$search_money,$search_payType,$search_state],function(){
					var selector=this.selector;
					if(selector.indexOf('payType')!==-1||selector.indexOf('search_state')!==-1){
						this.find(':selected').prop({
							'selected':false
						});
					}else{
						this.val('');
					}
				});
			});
			$admin_search_clear.trigger('click');


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},tradebuy_config.config.ajax.data);

				$.each([$search_name,$search_time,$search_money,$search_payType,$search_state],function(){
					var text=this.val()||this.find(':selected').val(),
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
				tradebuy_config.config.ajax.data= $.extend(true,{},data);
				getBuyColumnData(tradebuy_page,tradebuy_config);
			});



			/*事件绑定*/
			/*绑定查看，修改操作*/
			var operate_item;
			$admin_listbuy_wrap.delegate('span','click',function(e){
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
				if(action==='select'&&detail_power){
					showTrade(id,$tr);
				}
			});

		}


		/*获取数据*/
		function getBuyColumnData(page,opt){
			if(tablebuy===null){
				tablebuy=opt.$admin_listbuy_wrap.DataTable(opt.config);
			}else{
				tablebuy.ajax.config(opt.config.ajax).load();
			}
		}



		/*查看出库单*/
		function showTrade(id,$tr) {
			if(typeof id==='undefined'){
				return false;
			}

			var detail_map={
				store:'代理商全称',
				provider:"代理商简称",
				company:"负责人姓名",
				address:"负责人手机号码",
				type:"地址",
				sex:"代理商级别",
				sort:"管理的服务站",
				total:"销售情况",
				pay:"本月销售总计",
				createTime:"全部销售总计",
				lastLoginTime:"销售",
				telePhone:"库存",
				logoImage:"返修",
				birthday:"所属代理",
				loginCount:"上级代理",
				userType:"销售情况",
				state:"本月销售总计",
				orderState:"全部销售总计",
				isEnabled:"销售",
				user:"库存",
				password:"返修"
			};

			$.ajax({
					url:"../../json/trade/mall_trade_list.json",
					dataType:'JSON',
					method:'post',
					data:{
						id:id,
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token),
						grade:decodeURIComponent(logininfo.param.grade)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
						return false;
					}
					/*是否是正确的返回数据*/
					var result=resp.result;
					if(!result){
						return false;
					}

					var str='',
						istitle=false;

					/*测试代码*/
					var list=result.list[id - 1];

					if(!$.isEmptyObject(list)){
						/*添加高亮状态*/
						for(var j in list){
							if(typeof detail_map[j]!=='undefined'){
								if(j==='title'||j==='name'){
									istitle=true;
									$show_detail_title.html('查看"<span class="g-c-info">'+list[j]+'</span>"订单详情');
								}else{
									str+='<tr><th>'+detail_map[j]+':</th><td>'+list[j]+'</td></tr>';
								}
							}else{
								str+='<tr><th>'+j+':</th><td>'+list[j]+'</td></tr>';
							}
						}
						if(!istitle){
							$show_detail_title.html('查看订单详情');
						}
						$(str).appendTo($show_detail_content.html(''));
						if(operate_item){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						}
						operate_item=$tr.addClass('item-lighten');
						$show_detail_wrap.modal('show',{backdrop:'static'});
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