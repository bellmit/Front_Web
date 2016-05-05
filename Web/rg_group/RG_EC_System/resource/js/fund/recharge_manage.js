/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'date97':'js/plugins/My97DatePicker/WdatePicker',
		'dialog':'js/lib/artDialog/dialog',
		'pagination':'js/plugins/easyui_page/pagination',
		'querydata':'js/widgets/querydata',
		'sort':'js/widgets/sort',
		'datepick':'js/widgets/datepick'
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
		'sort':{
				deps:['jquery']
		},
		'datepick':{
				deps:['jquery']
		}
		
	}
});


/*程序入口*/
require(['jquery','bootstrap','common','date97','dialog','pagination','querydata','sort','datepick'], function($,$strap,undefined,undefined,undefined,undefined,undefined,Sort,undefined) {
	$(function() {
		/*页面元素引用*/
		var $recharge_griddata=$('#recharge_griddata'),
				$recharge_page=$('#recharge_page'),
				$status=$('#status'),
				$startTime=$('#startTime'),
				$endTime=$('#endTime'),
				$grid_querybtn=$('#grid_querybtn'),
				$recharge_sort=$('#recharge_sort');
				
				
		//html模板
		var htmlcontent='<tr><td><a href="$url">查看</a></td><td><p>$code</p></td><td><p>$apply</p></td><td>$currency</td><td><p>$pay</p></td><td><p>$rate</p></td><td>$status</td><td>$datetime</td><td>$enter</td></tr>';
		
		
		//初始化
		(function(){
			//通过hash判断是否是添加成功
			var hashstr=window.location.hash.slice(1);
			if(hashstr=='apply_recharge'){
				var dia=dialog({
					content:'<span class="g-c-cyan1 g-btips-succ">充值成功</span>',
				}).showModal();
				setTimeout(function(){
					dia.close().remove();
				},3000);
			}
		}());
		
		
		//时间日期控件绑定
		$.datePick([$startTime,$endTime]);
			

		//查询搜索
		$grid_querybtn.queryListData([$startTime,$endTime,$status],2000,function(sparam){
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
												temphtml.push(tempstr.replace('$url',data[index]['url'])
												.replace('$code',data[index]['code'])
												.replace('$apply',data[index]['apply'])
												.replace('$currency',data[index]['currency'])
												.replace('$pay',data[index]['pay'])
												.replace('$rate',data[index]['rate'])
												.replace('$status',data[index]['status'])
												.replace('$datetime',data[index]['datetime'])
												.replace('$enter',data[index]['enter']));
										});
										$recharge_griddata.html(temphtml.join(''));
								}else{
									$recharge_griddata.html('<tr><td colspan="9">暂无数据</td></tr>');
								}
						},
						error: function(){
								$recharge_griddata.html('<tr><td colspan="9">暂无数据</td></tr>');
						}
				});
		});
		
		
		//分页 easy-ui pagination
		$recharge_page.pagination({
			pageSize:20,
			onSelectPage:function(pageNumber,pageSize){
					console.log('当前页：'+pageNumber);
					console.log('每页记录数：'+pageSize);
					//to do 
					//分页处理
			}
		});
		
	


		
		
		//绑定排序切换
		$recharge_sort.delegate('th.issort', 'click', function () {
				Sort.toggleSort($(this));
				//获取排序参数
				console.log(Sort.getSortValue());
				//to do
				//排序操作
    });
		
		
		
		
		
	});
});
