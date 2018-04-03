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
		'checkbox':'js/widgets/checkbox',
		'querydata':'js/widgets/querydata',
		'sort':'js/widgets/sort',
		'datepick':'js/widgets/datepick',
		'gridaction':'js/widgets/gridaction'
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
		},
		'checkbox':{
				deps:['jquery']
		},
		'gridaction':{
				deps:['jquery','dialog']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','common','date97','dialog','pagination','querydata','sort','datepick','checkbox','gridaction'], function($,$strap,undefined,undefined,undefined,undefined,undefined,Sort,undefined,CheckBox,GridAction) {
	$(function() {
		/*页面元素引用*/
		var $transfer_griddata=$('#transfer_griddata'),
				$transfer_page=$('#transfer_page'),
				$outUserCode=$('#outUserCode'),
				$inUserCode=$('#inUserCode'),
				$acType=$('#acType'),
				$fromCreateDate=$('#fromCreateDate'),
				$toCreateDate=$('#toCreateDate'),
				$grid_querybtn=$('#grid_querybtn'),
				$transfer_sort=$('#transfer_sort'),
				$chkId_selector=$('#chkId_selector');
				
				
				
				
				
		//html模板
		var htmlcontent='<tr><td><input value="$chkId" data-state="1" type="checkbox" name="chkId"></td><td><span data-action="$actiontype" data-value="$actionvalue">$actiontext</span></td><td><p>$outUserCode</p></td><td>$acType</td><td><p>$pay</p></td><td><p>$inUserCode</p></td><td>$type</td><td>$createdt</td><td>$status</td><td>$demo</td></tr>';
		
		
		//初始化
		(function(){
			//通过hash判断是否是添加成功
			var hashstr=window.location.hash.slice(1);
			if(hashstr=='apply_transfer'){
				var dia=dialog({
					content:'<span class="g-c-cyan1 g-btips-succ">转账成功</span>',
				}).showModal();
				setTimeout(function(){
					dia.close().remove();
				},3000);
			}
		}());
		
		
		//时间日期控件绑定
		$.datePick([$fromCreateDate,$toCreateDate]);
			
		
		//绑定操作按钮
		$transfer_griddata.delegate('td>span', 'click', function () {
				var datas=CheckBox.getCheckBox();
				GridAction.gridAciton($(this),datas,function(objs){
						if(objs.dialog){
								objs.dialog.close().remove();
						}
						//to do
						console.log(objs);
				});
    });


		//查询搜索
		$grid_querybtn.queryListData([$outUserCode,$inUserCode,$acType,$fromCreateDate,$toCreateDate],2000,function(sparam){
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
												temphtml.push(tempstr.replace('$chkId',data[index]['chkId'])
												.replace('$actiontype',data[index]['actiontype'])
												.replace('$actionvalue',data[index]['actionvalue'])
												.replace('$actiontext',data[index]['actiontext'])
												.replace('$outUserCode',data[index]['outUserCode'])
												.replace('$acType',data[index]['acType'])
												.replace('$pay',data[index]['pay'])
												.replace('$inUserCode',data[index]['inUserCode'])
												.replace('$type',data[index]['type'])
												.replace('$createdt',data[index]['createdt'])
												.replace('$status',data[index]['status'])
												.replace('$demo',data[index]['demo']));
										});
										$transfer_griddata.html(temphtml.join(''));
								}else{
									$transfer_griddata.html('<tr><td colspan="10">暂无数据</td></tr>');
								}
						},
						error: function(){
								$transfer_griddata.html('<tr><td colspan="10">暂无数据</td></tr>');
						}
				});
		});
		
		
		//全选与取消全选
		//初始化
		CheckBox.init($transfer_griddata,$chkId_selector);
		//绑定全选与取消全选
		$chkId_selector.click(function(){
			CheckBox.toggleCheckAll($chkId_selector, $transfer_griddata);
			//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()方法
		});
		//绑定单个选中与取消
		$transfer_griddata.delegate('td>input:checkbox', 'click', function () {
				CheckBox.inputCheck($(this),$chkId_selector);
    });

		
		//分页 easy-ui pagination
		$transfer_page.pagination({
			pageSize:20,
			onSelectPage:function(pageNumber,pageSize){
					console.log('当前页：'+pageNumber);
					console.log('每页记录数：'+pageSize);
					//to do 
					//分页处理
			}
		});
		
	


		
		
		//绑定排序切换
		$transfer_sort.delegate('th.issort', 'click', function () {
				Sort.toggleSort($(this));
				//获取排序参数
				console.log(Sort.getSortValue());
				//to do
				//排序操作
    });
		
		
		
		
		
	});
});
