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
		var $receive_griddata=$('#receive_griddata'),
				$receive_page=$('#receive_page'),
				$receiptNO=$('#receiptNO'),
				$dateType=$('#dateType'),
				$selDateRange1=$('#selDateRange1'),
				$selDateRange2=$('#selDateRange2'),
				$agentNO=$('#agentNO'),
				$sendStatus=$('#sendStatus'),
				$recStatus=$('#recStatus'),
				$grid_querybtn=$('#grid_querybtn'),
				$receive_sort=$('#receive_sort'),
				$chkId_selector=$('#chkId_selector'),
				$receivesure=$('#receivesure');
				
				
				
				
				
		//html模板
		var htmlcontent='<tr><td><input value="$chkId" data-state="1" type="checkbox" name="chkId"></td><td><span data-action="$actiontype" data-value="$actionvalue">$actiontext</span></td><td><p>$companyNo</p></td><td><p>$libraryNo</p></td><td>$sendName</td><td>$recName</td><td>$orderStatus</td><td><em>$sendStatus</em></td><td><em>$recStatus</em></td><td>$dealer</td><td>$store</td><td><p>$total</p></td><td><p>$FV</p></td></tr>';
		


		//时间日期控件绑定
		$.datePick([$selDateRange1,$selDateRange2]);
		
		
		
		//绑定操作按钮
		$receive_griddata.delegate('td>span', 'click', function () {
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
		$grid_querybtn.queryListData([$receiptNO,$dateType,$selDateRange1,$selDateRange2,$agentNO,$sendStatus,$recStatus],2000,function(sparam){
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
												.replace('$companyNo',data[index]['companyNo'])
												.replace('$libraryNo',data[index]['libraryNo'])
												.replace('$sendName',data[index]['sendName'])
												.replace('$recName',data[index]['recName'])
												.replace('$orderStatus',data[index]['orderStatus'])
												.replace('$sendStatus',data[index]['sendStatus'])
												.replace('$recStatus',data[index]['recStatus'])
												.replace('$dealer',data[index]['dealer'])
												.replace('$store',data[index]['store'])
												.replace('$total',data[index]['total'])
												.replace('$FV',data[index]['FV']));
										});
										$receive_griddata.html(temphtml.join(''));
								}else{
									$receive_griddata.html('<tr><td colspan="13">暂无数据</td></tr>');
								}
						},
						error: function(){
								$receive_griddata.html('<tr><td colspan="13">暂无数据</td></tr>');
						}
				});
		});
		
		
		//全选与取消全选
		//初始化
		CheckBox.init($receive_griddata,$chkId_selector);
		//绑定全选与取消全选
		$chkId_selector.click(function(){
			CheckBox.toggleCheckAll($chkId_selector, $receive_griddata);
			//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()方法
		});
		//绑定单个选中与取消
		$receive_griddata.delegate('td>input:checkbox', 'click', function () {
				CheckBox.inputCheck($(this),$chkId_selector);
    });
		//绑定确认操作
		$receivesure.on('click',function(){
				var receiveid=CheckBox.getCheckBox(),
						len=receiveid.length,
						dia;
						if(len==0){
								dia=dialog({
									width:200,
									content:'<span class="g-c-red2 g-btips-warn">请先选中相关数据！</span>'
								}).showModal();
								setTimeout(function(){
									dia.close().remove();
								},3000);
						}else{
							//to do ajax
							//开发时开启下部代码
							
							var issucc=false;
							$.ajax({
									url:'请求地址',
									type:'post',
									dataType:"json",
									data:'相关请求参数',
									success: function(data){
											if(data){
													CheckBox.init($receive_griddata,$chkId_selector);
													issucc=true;
											}else{
												issucc=false;
											}
									},
									error: function(){
											issucc=false;
									}
							});
							
							if(issucc){
									dia=dialog({
										width:200,
										content:'<span class="g-c-cyan1">确认收货成功！</span>'
									}).showModal();
							}else{
									dia=dialog({
										width:200,
										content:'<span class="g-c-red2">确认收货失败！</span>'
									}).showModal();
							}
							setTimeout(function(){
								dia.close().remove();
							},3000);
							
							
						}
		});
		
		
		//分页 easy-ui pagination
		$receive_page.pagination({
			pageSize:20,
			onSelectPage:function(pageNumber,pageSize){
					console.log('当前页：'+pageNumber);
					console.log('每页记录数：'+pageSize);
					//to do 
					//分页处理
			}
		});
		
	
		
		//绑定排序切换
		$receive_sort.delegate('th.issort', 'click', function () {
				Sort.toggleSort($(this));
				//获取排序参数
				console.log(Sort.getSortValue());
				//to do
				//排序操作
    });
		
		
		
		
		
	});
});
