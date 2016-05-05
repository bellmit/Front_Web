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
		'checkbox':'js/widgets/checkbox',
		'gridaction':'js/widgets/gridaction',
		'rule':'js/widgets/rules',
		'commonfn':'js/widgets/commonfn'
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
		'checkbox':{
				deps:['jquery']
		},
		'gridaction':{
				deps:['jquery','dialog']
		},
		'commonfn':{
				deps:['jquery','rule']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle','pagination','sort','checkbox','gridaction','rule','commonfn'],function($,$strap,undefined,undefined,undefined,Common,undefined,undefined,undefined,Sort,CheckBox,GridAction,Rule,CommonFn) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
					$theme_title=$('#theme_title'),
					$orderinfo_griddata=$('#orderinfo_griddata'),
					$orderinfo_page=$('#orderinfo_page'),
					$orderno=$('#orderno'),
					$recphone=$('#recphone'),
					$recname=$('#recname'),
					$recaddress=$('#recaddress'),
					$grid_querybtn=$('#grid_querybtn'),
					$orderinfo_money=$('#orderinfo_money'),
					$orderinfo_sure=$('#orderinfo_sure'),
					$orderinfo_sort=$('#orderinfo_sort'),
					$chkId_selector=$('#chkId_selector');
			
			//主题标题点击
			$theme_title.ThemeTitle(undefined,false);	
			
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			
			//提示信息
			var tipdia=dialog();
			
			//html模板
			var htmlcontent='<tr><td><input value="$chkId" data-state="1" type="checkbox" name="chkId"></td><td><div class="order-thumbnail"><a href="$url"><img src="$img" ></a><a href="$url">$orderName</a></div></td><td><p>$orderNo</p></td><td>$orderAddress</td><td>$recName</td><td>$recPhone</td><td><p>$orderPay</p></td><td><p>$recEmail</p></td><td><span data-action="$actiontype" data-value="$actionvalue">删除</span></td></tr>';
			
	
	
			//查询搜索
			$grid_querybtn.queryListData([$orderno,$recphone,$recname,$recaddress],2000,function(sparam){
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
													.replace(/$url/g,data[index]['url'])
													.replace('$img',data[index]['img'])
													.replace('$orderName',data[index]['orderName'])
													.replace('$orderNo',data[index]['orderNo'])
													.replace('$orderAddress',data[index]['orderAddress'])
													.replace('$recName',data[index]['recName'])
													.replace('$recPhone',data[index]['recPhone'])
													.replace('$orderPay',data[index]['orderPay'])
													.replace('$recEmail',data[index]['recEmail'])
													.replace('$actiontype',data[index]['actiontype'])
													.replace('$actionvalue',data[index]['actionvalue']));
											});
											$orderinfo_griddata.html(temphtml.join(''));
									}else{
										$orderinfo_griddata.html('<tr><td colspan="9">暂无数据</td></tr>');
									}
							},
							error: function(){
									$orderinfo_griddata.html('<tr><td colspan="9">暂无数据</td></tr>');
							}
					});
					
					//数据一致性
					CheckBox.init($orderinfo_griddata,$chkId_selector);
					$orderinfo_money.text('');
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
													temphtml.push(tempstr.replace('$chkId',data[index]['chkId'])
													.replace('$url1',data[index]['url1'])
													.replace('$img',data[index]['img'])
													.replace('$url2',data[index]['url2'])
													.replace('$orderName',data[index]['orderName'])
													.replace('$orderNo',data[index]['orderNo'])
													.replace('$orderAddress',data[index]['orderAddress'])
													.replace('$recName',data[index]['recName'])
													.replace('$recPhone',data[index]['recPhone'])
													.replace('$orderPay',data[index]['orderPay'])
													.replace('$recEmail',data[index]['recEmail'])
													.replace('$actiontype',data[index]['actiontype'])
													.replace('$actionvalue',data[index]['actionvalue']));
											});
											$orderinfo_griddata.html(temphtml.join(''));
									}else{
											$orderinfo_griddata.html('<tr><td colspan="9">暂无数据</td></tr>');
									}
							},
							error: function(){
									$orderinfo_griddata.html('<tr><td colspan="9">暂无数据</td></tr>');
							}
					});
					
					//数据一致性
					CheckBox.init($orderinfo_griddata,$chkId_selector);
					$orderinfo_money.text('');
			});
			
			
			
			
			//全选与取消全选
			//初始化
			CheckBox.init($orderinfo_griddata,$chkId_selector);
			
			//绑定全选与取消全选
			$chkId_selector.click(function(){
				CheckBox.toggleCheckAll($chkId_selector, $orderinfo_griddata);
				//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()或CheckBox.getCheckBoxItem()方法
				
				
				//计算金额
				var data=CheckBox.getCheckBox();
				if(data.length==0){
					$orderinfo_money.text('');
				}else{
					var items=CheckBox.getCheckBoxItem(),
					result=CommonFn.moneyCorrect($orderinfo_money.text())[1];
					
					$.each(items,function(index,value){
							var $tr=this.closest('tr'),
									txt=$tr.children().eq(6).text();
									result=CommonFn.moneyAdd(result,CommonFn.moneyCorrect(txt)[1]);
					});
					$orderinfo_money.text(CommonFn.moneyCorrect(result)[1]);
				}
				
				//to do other
				
			});
			
			//绑定单个选中与取消
			$orderinfo_griddata.delegate('td>input:checkbox', 'click', function () {
					CheckBox.inputCheck($(this),$chkId_selector);
					//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()或CheckBox.getCheckBoxItem()方法
					
					
					//计算金额
					var data=CheckBox.getCheckBox();
					if(data.length==0){
						$orderinfo_money.text('');
					}else{
						var items=CheckBox.getCheckBoxItem(),
						result='0.00';
						
						$.each(items,function(index,value){
								var $tr=this.closest('tr'),
										txt=$tr.children().eq(6).text();
										result=CommonFn.moneyAdd(result,CommonFn.moneyCorrect(txt)[1]);
						});
						$orderinfo_money.text(CommonFn.moneyCorrect(result)[1]);
					}
					
					//to do other
					
			});	
			
			
			
			
			
			
			
			//绑定确认付款操作
			$orderinfo_sure.on('click',function(){
					var tobepaid_data=CheckBox.getCheckBox(),
							len=tobepaid_data.length;
							
							if(len==0){
									tipdia.content('<span class="g-c-red4 g-btips-warn">请先选中相关数据！</span>').show();
							}else{
								//to do ajax
								//开发时开启下部代码
								console.log(tobepaid_data);
								
								var issucc=false;
								$.ajax({
										url:'请求地址',
										type:'post',
										dataType:"json",
										data:'相关请求参数(此处可以用到 tobepaid_data 数据)',
										success: function(data){
												if(data){
														CheckBox.init($orderinfo_griddata,$chkId_selector);
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
										tipdia.content('<span class="g-c-cyan1">确定付款成功！</span>').show();
								}else{
										tipdia.content('<span class="g-c-red4">确定付款失败！</span>').show();
								}
							}
							
							setTimeout(function(){
								tipdia.close();
							},3000);

			});
			
			
			
			//绑定操作按钮（此处为‘删除’事件行为）
			$orderinfo_griddata.delegate('td>span', 'click', function () {
					var datas=CheckBox.getCheckBox();
					GridAction.gridAciton($(this),datas,function(objs){
							//进入需要确认是否执行操作的流程
							if(objs.dialog){
									objs.dialog.close().remove();
									
									//to do
									//这里做相关操作按钮事 send ajax
									//下面一行测试代码，开发阶段请填充真正的业务逻辑
									this.closest('tr').remove();
									
									
									
									//注：下面方法
									//如果成功操作需要调用下面方法，（此方法一般放在成功的回调函数中），注：开发阶段此方法不能删除
									CheckBox.init($orderinfo_griddata,$chkId_selector);
									
									
									//其他数据一致性
									$orderinfo_money.text('');
							}else{
									//进入非需要确认是否执行操作的流程
									tipdia.content('<span class="g-c-cyan1 g-btips-succ">相关操作成功</span>').show();
									setTimeout(function(){
										tipdia.close();
									},2000);
							}
					});
			});
		
		
		
			
			
	});
});
