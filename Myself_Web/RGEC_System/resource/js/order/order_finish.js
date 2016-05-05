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
		'pagination':'js/plugins/easyui_page/pagination',
		'sort':'js/widgets/sort',
		'date97':'js/plugins/My97DatePicker/WdatePicker',
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
				deps:['jquery']
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
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle','pagination','sort','date97','datepick'],function($,$strap,undefined,undefined,undefined,Common,undefined,undefined,undefined,Sort,undefined,undefined) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
					$theme_title=$('#theme_title'),
					$orderinfo_griddata=$('#orderinfo_griddata'),
					$orderinfo_page=$('#orderinfo_page'),
					$orderno=$('#orderno'),
					$recphone=$('#recphone'),
					$recname=$('#recname'),
					$datetype=$('#datetype'),
					$datestart=$('#datestart'),
					$dateend=$('#dateend'),
					$status=$('#status'),
					$type=$('#type'),
					$grid_querybtn=$('#grid_querybtn'),
					$orderinfo_sort=$('#orderinfo_sort');
			
			//主题标题点击
			$theme_title.ThemeTitle(undefined,false);	
			
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			
			
			//html模板
			var htmlcontent='<tr><td><div class="order-thumbnail"><a href="$url"><img src="$img" ></a><a href="$url">$orderName</a></div></td><td><p>$orderNo</p></td><td>$Library</td><td>$Type</td><td>$Status</td><td>$recAddress</td><td>$recName</td><td>$recPhone</td><td><p>$orderPay</p></td><td>$Dealer</td><td>$sendDate</td><td>$recDate</td></tr>';
			
			
			
			//时间日期控件绑定
			$.datePick([$datestart,$dateend]);
	
	
			//查询搜索
			$grid_querybtn.queryListData([$orderno,$recphone,$recname,$datetype,$datestart,$dateend,$status,$type],2000,function(sparam){
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
													temphtml.push(tempstr.replace('$img',data[index]['img'])
													.replace(/$url/g,data[index]['url'])
													.replace('$orderName',data[index]['orderName'])
													.replace('$orderNo',data[index]['orderNo'])
													.replace('$Library',data[index]['Library'])
													.replace('$Type',data[index]['Type'])
													.replace('$Status',data[index]['Status'])
													.replace('$recAddress',data[index]['recAddress'])
													.replace('$recName',data[index]['recName'])
													.replace('$recPhone',data[index]['recPhone'])
													.replace('$orderPay',data[index]['orderPay'])
													.replace('$Dealer',data[index]['Dealer'])
													.replace('$sendDate',data[index]['sendDate'])
													.replace('$recDate',data[index]['recDate']));
											});
											$orderinfo_griddata.html(temphtml.join(''));
									}else{
										$orderinfo_griddata.html('<tr><td colspan="12">暂无数据</td></tr>');
									}
							},
							error: function(){
									$orderinfo_griddata.html('<tr><td colspan="12">暂无数据</td></tr>');
							}
					});
			});
			
			

			//分页 easy-ui pagination
			$orderinfo_page.pagination({
				pageSize:20,
				onSelectPage:function(pageNumber,pageSize){
						console.log('当前页：'+pageNumber);
						console.log('每页记录数：'+pageSize);
						//to do 
						//分页处理
				}
			});
			
		
			
			//绑定排序切换
			$orderinfo_sort.delegate('th.issort', 'click', function () {
					Sort.toggleSort($(this));
					
					//获取排序参数
					console.log(Sort.getSortValue());
					//to do
					//排序操作
					//send ajax  结果集处理可参照查询数据展现方式
					
					//开发时开启下部代码
					$.ajax({
							url:'请求地址',
							type:'post',
							dataType:"json",
							data:'相关请求参数(此处可填写：Sort.getSortValue()获取排序参数)',
							success: function(data){
									var temphtml=[],
											tempstr=htmlcontent;
									if(data){
											$.each(data,function(index){
													temphtml.push(tempstr.replace('$img',data[index]['img'])
													.replace(/$url/g,data[index]['url'])
													.replace('$orderName',data[index]['orderName'])
													.replace('$orderNo',data[index]['orderNo'])
													.replace('$Library',data[index]['Library'])
													.replace('$Type',data[index]['Type'])
													.replace('$Status',data[index]['Status'])
													.replace('$recAddress',data[index]['recAddress'])
													.replace('$recName',data[index]['recName'])
													.replace('$recPhone',data[index]['recPhone'])
													.replace('$orderPay',data[index]['orderPay'])
													.replace('$Dealer',data[index]['Dealer'])
													.replace('$sendDate',data[index]['sendDate'])
													.replace('$recDate',data[index]['recDate']));
											});
											$orderinfo_griddata.html(temphtml.join(''));
									}else{
											$orderinfo_griddata.html('<tr><td colspan="12">暂无数据</td></tr>');
									}
							},
							error: function(){
									$orderinfo_griddata.html('<tr><td colspan="12">暂无数据</td></tr>');
							}
					});
					
					
			});
			

			
	});
});
