/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'dialog':'js/lib/artDialog/dialog',
		'pagination':'js/plugins/easyui_page/pagination',
		'querydata':'js/widgets/querydata',
		'gridaction':'js/widgets/gridaction',
		'select_plugin':'js/widgets/select_plugin'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'pagination':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'gridaction':{
				deps:['jquery','dialog']
		},
		'select_plugin':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','common','dialog','pagination','querydata','gridaction','select_plugin'], function($,$strap,undefined,undefined,undefined,undefined,GridAction,undefined) {
	$(function() {
		/*页面元素引用*/
		var $dealer_griddata=$('#dealer_griddata'),
				$dealer_page=$('#dealer_page'),
				$orderNo=$('#orderNo'),
				$memberNo=$('#memberNo'),
				$memberName=$('#memberName'),
				$orderTypes=$('#orderTypes'),
				$grid_select_plugin=$('#grid_select_plugin'),
				$bdPeriodStatus=$('bdPeriodStatus'),
				$periodWeek=$('#periodWeek'),
				$grid_querybtn=$('#grid_querybtn'),
				$chkId_selector=$('#chkId_selector'),
				$applyshop=$('#applyshop'),
				$applyworkroom=$('#applyworkroom');
				
				
				
		//html模板
		var htmlcontent='<tr><td><span data-value="$actionvalue" data-action="$actiontype">$actiontext</span></td><td><p>$orderNo</p></td><td>$orderTypes</td><td>$memberName</td><td><p>$FV</p></td><td><p>$money</p></td><td>$periodWeek</td><td>$bdPeriodStatus</td><td>$state</td><td>$createrdt</td></tr>';
		
		
		//初始化
		(function(){
			//通过hash判断是否是添加成功
			var hashstr=window.location.hash.slice(1),
					dia,
					txt;
			if(hashstr=='AddPoOrder'){
				txt='<span class="g-c-cyan1 g-btips-succ">添加购物单成功</span>';	
			}else if(hashstr=='AddPoOrderWithFV'){
				txt='<span class="g-c-cyan1 g-btips-succ">添加购货报业绩单成功</span>';	
			}else if(hashstr=='BiPurchaseOrder'){
				txt='<span class="g-c-cyan1 g-btips-succ">添加购货单（购物车）成功</span>';	
			}else if(hashstr=='BiPurchaseOrderWithFv'){
				txt='<span class="g-c-cyan1 g-btips-succ">添加购货报业绩单（购物车）成功</span>';	
			}
			if(txt!=''&&txt){
				dia=dialog({content:txt}).showModal();
				setTimeout(function(){
						dia.close().remove();
				},3000);
			}
			//other
			
		}());
		

		
		//绑定操作按钮
		$dealer_griddata.delegate('td>span', 'click', function () {
				GridAction.gridHandler($(this),function(objs){
						if(objs.dialog){
								objs.dialog.close().remove();
						}
						console.log(objs);
						//to do
						//ajax
	
				});
    });
		
		
		
		//绑定自定义下拉框,参数：(需要获取结果的元素，是否多选（默认为单选）)
		$grid_select_plugin.selfSelect($orderTypes,true);
		


		//查询搜索
		$grid_querybtn.queryListData([$orderNo,$memberNo,$memberName,$orderTypes,$bdPeriodStatus,$periodWeek],2000,function(sparam){
				//sparam 为一个带有参与联合查询的字符数组，可用于ajax的参数
				console.log(sparam);
				//to do
				//开发时开启下部代码
				$.ajax({
						url:'请求地址',
						type:'post',
						dataType:"json",
						data:'相关请求参数',
						success: function(data){
								var temphtml=[],
										tempstr=htmlcontent;
								if(data){
										$.each(data,function(index){
												temphtml.push(tempstr.replace('$actiontype',data[index]['actiontype'])
												.replace('$actionvalue',data[index]['actionvalue'])
												.replace('$actiontext',data[index]['actiontext'])
												.replace('$orderNo',data[index]['orderNo'])
												.replace('$orderTypes',data[index]['orderTypes'])
												.replace('$memberName',data[index]['memberName'])
												.replace('$FV',data[index]['FV'])
												.replace('$money',data[index]['money'])
												.replace('$periodWeek',data[index]['periodWeek'])
												.replace('$bdPeriodStatus',data[index]['bdPeriodStatus'])
												.replace('$state',data[index]['state'])
												.replace('$createrdt',data[index]['createrdt']));
										});
										$dealer_griddata.html(temphtml.join(''));
								}else{
									$dealer_griddata.html('<tr><td colspan="10">暂无数据</td></tr>');
								}
						},
						error: function(){
								$dealer_griddata.html('<tr><td colspan="10">暂无数据</td></tr>');
						}
				});
		});
		
		
		//分页 easy-ui pagination
		$dealer_page.pagination({
			pageSize:20,
			onSelectPage:function(pageNumber,pageSize){
					console.log('当前页：'+pageNumber);
					console.log('每页记录数：'+pageSize);
					//to do 
					//分页处理
			}
		});
		
	
		
	});
});
