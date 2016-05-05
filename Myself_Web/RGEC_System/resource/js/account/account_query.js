/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'dialog':'js/lib/artDialog/dialog',
		'querydata':'js/widgets/querydata',
		'validform':'js/plugins/validform',
		'common':'js/common/common',
		'submenu':'js/widgets/submenu',
		'themetitle':'js/widgets/themetitle',
		'date97':'js/plugins/My97DatePicker/WdatePicker',
		'pagination':'js/plugins/easyui_page/pagination',
		'checkbox':'js/widgets/checkbox',
		'sort':'js/widgets/sort',
		'datepick':'js/widgets/datepick'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'validform':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery','dialog','querydata','validform']
		},
		'submenu':{
				deps:['jquery','common']
		},
		'themetitle':{
				deps:['jquery','common']
		},
		'pagination':{
				deps:['jquery']
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
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle','date97','pagination','checkbox','sort','datepick'], function($,$strap,undefined,undefined,undefined,Common,undefined,undefined,undefined,undefined,undefined,Sort,undefined) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
					$theme_title=$('#theme_title'),
					$account_griddata=$('#account_griddata'),
					$account_page=$('#account_page'),
					$userCode=$('#userCode'),
					$acType=$('#acType'),
					$startCreateDate=$('#startCreateDate'),
					$endCreateDate=$('#endCreateDate'),
					$grid_querybtn=$('#grid_querybtn'),
					$account_sort=$('#account_sort');
					
			//html模板
			var htmlcontent='<tr><td><a href="$url">查看</a></td><td>$type</td><td><p>$code</p></td><td>$trade</td><td><p>$income</p></td><td><p>$pay</p></td><td><p>$usable</p></td><td><p>$loan</p></td><td><p>$order</p></td><td>$datetime</td><td>$remark</td></tr>';
		
					
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);		
			
			
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			
			//时间日期控件绑定
			$.datePick([$startCreateDate,$endCreateDate]);
				
	
			//查询搜索
			$grid_querybtn.queryListData([$userCode,$acType,$startCreateDate,$endCreateDate],2000,function(sparam){
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
													.replace('$type',data[index]['type'])
													.replace('$code',data[index]['code'])
													.replace('$trade',data[index]['trade'])
													.replace('$income',data[index]['income'])
													.replace('$pay',data[index]['pay'])
													.replace('$usable',data[index]['usable'])
													.replace('$loan',data[index]['loan'])
													.replace('$order',data[index]['order'])
													.replace('$datetime',data[index]['datetime'])
													.replace('$remark',data[index]['remark']));
											});
											$account_griddata.html(temphtml.join(''));
									}else{
										$account_griddata.html('<tr><td colspan="11">暂无数据</td></tr>');
									}
							},
							error: function(){
									$account_griddata.html('<tr><td colspan="11">暂无数据</td></tr>');
							}
					});
			});
			
			
			//分页 easy-ui pagination
			$account_page.pagination({
				pageSize:20,
				onSelectPage:function(pageNumber,pageSize){
						console.log('当前页：'+pageNumber);
						console.log('每页记录数：'+pageSize);
						//to do 
						//分页处理
				}
			});
			
		
	
			
			
			//绑定排序切换
			$account_sort.delegate('th.issort', 'click', function () {
					Sort.toggleSort($(this));
					//获取排序参数
					console.log(Sort.getSortValue());
					//to do
					//排序操作
			});
			
	});
});
