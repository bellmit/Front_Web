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
		'checkbox':{
				deps:['jquery']
		},
		'gridaction':{
				deps:['jquery','dialog']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','common','date97','dialog','pagination','querydata','sort','checkbox','gridaction'], function($,$strap,undefined,undefined,undefined,undefined,undefined,Sort,CheckBox,GridAction) {
	$(function() {
		/*页面元素引用*/
		var $shop_griddata=$('#shop_griddata'),
				$shop_page=$('#shop_page'),
				$agentNo=$('#agentNo'),
				$createrCode=$('#createrCode'),
				$createrName=$('#createrName'),
				$grid_querybtn=$('#grid_querybtn'),
				$shop_sort=$('#shop_sort'),
				$chkId_selector=$('#chkId_selector'),
				$deleteshop=$('#deleteshop'),
				$applyshop=$('#applyshop'),
				$applyworkroom=$('#applyworkroom');
				
				
				
				
				
		//html模板
		var htmlcontent='<tr><td><input value="$chkId" data-state="1" type="checkbox" name="chkId"></td><td><span data-action="$actiontype" data-value="$actionvalue">$actiontext</span></td><td><p>$Code</p></td><td><p>$createrCode</p></td><td>$createrName</td><td>$createrdt</td><td>$creatertype</td><td>$applystate</td><td><p>$goodsno</p></td><td><p>$shopno</p></td><td><em>$shopaddress</em></td><td><a href="$url">指导1</a></td><td>$phone</td></tr>';
		
		
		//初始化
		(function(){
			//通过hash判断是否是添加成功
			var hashstr=window.location.hash.slice(1),
			dia;
			if(hashstr=='apply_shop'){
				dia=dialog({
					content:'<span class="g-c-cyan1 g-btips-succ">开店申请成功</span>',
				}).showModal();
				setTimeout(function(){
					dia.close().remove();
				},3000);
			}else if(hashstr=='apply_workroom'){
				dia=dialog({
					content:'<span class="g-c-cyan1 g-btips-succ">工作室申请成功</span>',
				}).showModal();
				setTimeout(function(){
					dia.close().remove();
				},3000);
			}
			
		}());
		
		
		
		//申请开店，申请工作室
		$applyshop.on('click',function(){
				var dia=dialog({
					content:'<span class="g-c-red2 g-btips-warn">您的级别没达到销售经理以上，不允许开店，请加油！</span>',
				}).showModal();
				setTimeout(function(){
					dia.close().remove();
				},3000);
				
				return false; 
				//window.location.href=$(this).attr('data-href');
		});
		$applyworkroom.on('click',function(){
				window.location.href=$(this).attr('data-href');
		});
		
		

		//查询搜索
		$grid_querybtn.queryListData([$agentNo,$createrCode,$createrName],2000,function(sparam){
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
												.replace('$Code',data[index]['Code'])
												.replace('$createrCode',data[index]['createrCode'])
												.replace('$createrName',data[index]['createrName'])
												.replace('$createrdt',data[index]['createrdt'])
												.replace('$creatertype',data[index]['creatertype'])
												.replace('$applystate',data[index]['applystate'])
												.replace('$goodsno',data[index]['goodsno'])
												.replace('$shopno',data[index]['shopno'])
												.replace('$shopaddress',data[index]['shopaddress'])
												.replace('$shopguide',data[index]['shopguide'])
												.replace('$phone',data[index]['phone']));
										});
										$shop_griddata.html(temphtml.join(''));
								}else{
									$shop_griddata.html('<tr><td colspan="13">暂无数据</td></tr>');
								}
						},
						error: function(){
								$shop_griddata.html('<tr><td colspan="13">暂无数据</td></tr>');
						}
				});
		});
		
		
		
		//绑定操作按钮
		$shop_griddata.delegate('td>span', 'click', function () {
				var datas=CheckBox.getCheckBox();
				GridAction.gridAciton($(this),datas,function(objs){
						if(objs.dialog){
								objs.dialog.close().remove();
						}
						//to do
						console.log(objs);
				});
    });
		
		
		
		//全选与取消全选
		//初始化
		CheckBox.init($shop_griddata,$chkId_selector);
		//绑定全选与取消全选
		$chkId_selector.click(function(){
			CheckBox.toggleCheckAll($chkId_selector, $shop_griddata);
			//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()方法
		});
		//绑定单个选中与取消
		$shop_griddata.delegate('td>input:checkbox', 'click', function () {
				CheckBox.inputCheck($(this),$chkId_selector);
    });
		//绑定取消操作
		$deleteshop.on('click',function(){
				var shopid=CheckBox.getCheckBox(),
						len=shopid.length,
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
							/*
							var issucc=false;
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
															.replace('$url',data[index]['url'])
															.replace('$code',data[index]['code'])
															.replace('$apply',data[index]['apply'])
															.replace('$server',data[index]['server'])
															.replace('$realmoney',data[index]['realmoney'])
															.replace('$currency',data[index]['currency'])
															.replace('$needmoney',data[index]['needmoney'])
															.replace('$rate',data[index]['rate'])
															.replace('$applydt',data[index]['applydt'])
															.replace('$status',data[index]['status'])
															.replace('$verifydt',data[index]['verifydt']));
													});
													$shop_griddata.html(htmlhead+temphtml.join(''));
													CheckBox.init($shop_griddata,$chkId_selector);
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
										content:'<span class="g-c-cyan1">取消成功！</span>'
									}).showModal();
							}else{
									dia=dialog({
										width:200,
										content:'<span class="g-c-red2">删除失败！</span>'
									}).showModal();
							}
							setTimeout(function(){
								dia.close().remove();
							},3000);
							
							*/
						}
		});
		
		
		//分页 easy-ui pagination
		$shop_page.pagination({
			pageSize:20,
			onSelectPage:function(pageNumber,pageSize){
					console.log('当前页：'+pageNumber);
					console.log('每页记录数：'+pageSize);
					//to do 
					//分页处理
			}
		});
		
	


		
		
		//绑定排序切换
		$shop_sort.delegate('th.issort', 'click', function () {
				Sort.toggleSort($(this));
				//获取排序参数
				console.log(Sort.getSortValue());
				//to do
				//排序操作
    });
		
		
		
		
		
	});
});
