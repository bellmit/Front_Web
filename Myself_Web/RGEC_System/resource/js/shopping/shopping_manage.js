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
		'themetitle':'js/widgets/themetitle',
		'rule':'js/widgets/rules',
		'commonfn':'js/widgets/commonfn',
		'gridaction':'js/widgets/gridaction',
		'checkbox':'js/widgets/checkbox'
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
		'themetitle':{
				deps:['jquery','common']
		},
		'commonfn':{
				deps:['jquery','rule']
		},
		'gridaction':{
				deps:['jquery','dialog']
		},
		'checkbox':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','themetitle','rule','commonfn','gridaction','checkbox'], function($,$strap,undefined,undefined,undefined,Common,undefined,Rule,CommonFn,GridAction,CheckBox) {
	
	//html元素私有绑定方法
	(function(w){
			//私有方法
			//滤除非数字字符
			w.clearGoodsChar=function(cur){
					cur.value=cur.value.replace(/[\D*]/g,'');
			}
			//格式化正确数字
			w.clearGoodsEmpty=function(cur){
					var temptxt=cur.value.replace(/(^00{0,}$)/g,'1');
					if(temptxt==''){
						temptxt='1';
					}
					cur.value=temptxt;
					//业务逻辑部分
					var $this=$(cur),
							$tr=$this.closest('tr'),
							$td=$tr.children(),
							price=$td.eq(2).find('p').text(),
							$money=$td.eq(4).find('p'),
							money=CommonFn.moneyMul(price,temptxt);
							
							$money.text(CommonFn.moneyCorrect(money)[1]);
			}
			
			
			
			//扩展开发人员自定义内联函数,形如：w.函数名=function(参数){实现} 等等
			//to do
			
			//原系统所定义的数量增减方法
			w.addBeforeReduce=function(){
					//to do
			}
			w.addBeforeAdd=function(){
					//to do
			}
			
	}(window));
	
	$(function() {
			//页面元素引用
			var $theme_title=$('#theme_title'),
					$chkId_selector=$('#chkId_selector'),
					$shopping_list=$('#shopping_list'),
					$chkId_selector_buy=$('#chkId_selector_buy'),
					$shopping_clear=$('#shopping_clear'),
					$shopping_restore=$('#shopping_restore'),
					$shopping_number=$('#shopping_number'),
					$shopping_money=$('#shopping_money'),
					$shopping_buy=$('#shopping_buy');
			
			//提示对象	
			var tipdia=dialog({cancel:false});		
			
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);	
			
			
			
			//html模板
			var htmlcontent='<tr><td><input value="$chkId" data-state="$chkState" type="checkbox" name="chkId"></td><td><div class="shopping-thumbnail"><a href="$url"><img src="$imgsrc" ></a><em>>$shoppingCode</em><a href="$url">$shoppingName</a></div></td><td><p>$shoppingPrice</p></td><td><div class="shopping-number"><div onclick="addBeforeReduce(this,\'$params\',$isdisabled);" class="shopping_nminus"></div><div><input type="text" value="$shoppingNumber" maxlength="4" onkeyup="clearGoodsChar(this);" onBlur="clearGoodsEmpty(this);" name="shoppingNumber"></div><div onclick="addBeforeAdd(this,\'$params\',$isdisabled);" class="shopping_nadd"></div></div></td><td><p>$shoppingMoney</p></td><td><span data-action="delete" data-value="$chkId">删除</span><span data-action="restore" data-value="$chkId">恢复</span><span data-action="buy" data-value="$chkId">结算</span></td></tr>';
			
			
			
			//全选与取消全选
			//初始化
			CheckBox.init($shopping_list,$chkId_selector);
			$chkId_selector_buy.prop('checked', false);
			
			
			
			//绑定全选与取消全选
			$.each([$chkId_selector,$chkId_selector_buy],function(index,value){
					var self=this,
							selector=this.selector;
				
					this.on('click',function(){
							if(selector=='#chkId_selector'){
									CheckBox.init($shopping_list,$chkId_selector_buy);
							}else if(selector=='#chkId_selector_buy'){
									CheckBox.init($shopping_list,$chkId_selector);
							}
							CheckBox.toggleCheckAll(self,$shopping_list);
							//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()或CheckBox.getCheckBoxItem()方法
			
							
							//计算金额
							var data=CheckBox.getCheckBox();
							if(data.length===0){
								$shopping_money.text('');
								$shopping_number.text('');
							}else{
								var items=CheckBox.getCheckBoxItem(),
								result=0.00,
								buynums=0;
								
								$.each(items,function(index,value){
										var $tr=this.closest('tr'),
												$td=$tr.children(),
												price=$td.eq(2).text(),
												num=$td.eq(3).find('input').val(),
												txt=CommonFn.moneyMul(price,num);
												
												buynums+=parseInt(num);
												result=CommonFn.moneyAdd(result,CommonFn.moneyCorrect(txt)[1]);
								});
								$shopping_money.text(CommonFn.moneyCorrect(result)[1]);
								$shopping_number.text(buynums);
							}
							
							//to do other
				
			
					});
				
			});
			

			//绑定单个选中与取消
			$shopping_list.delegate('td>input:checkbox', 'click', function () {
					CheckBox.inputCheck($(this),$chkId_selector);
					//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()或CheckBox.getCheckBoxItem()方法
					//console.log(CheckBox.getCheckBox());
					//console.log(CheckBox.state);
					
					//计算金额
					var data=CheckBox.getCheckBox();
					if(data.length===0){
						$shopping_money.text('');
						$shopping_number.text('');
					}else{
						var items=CheckBox.getCheckBoxItem(),
						result='0.00',
						buynums=0;
						
						$.each(items,function(index,value){
								var $tr=this.closest('tr'),
										$td=$tr.children(),
										price=$td.eq(2).text(),
										num=$td.eq(3).find('input').val(),
										txt=CommonFn.moneyMul(price,num);
										
										buynums+=parseInt(num);
										result=CommonFn.moneyAdd(result,CommonFn.moneyCorrect(txt)[1]);
						});
						$shopping_money.text(CommonFn.moneyCorrect(result)[1]);
						$shopping_number.text(buynums);
					}
					
					//to do other
					
			});	
			
			
			//绑定操作按钮
			$shopping_list.delegate('td>span', 'click', function () {
					var datas=CheckBox.getCheckBox(),
							issucc=false;
							
					GridAction.gridAciton($(this),datas,function(objs){
							//进入需要确认是否执行操作的流程
							if(objs.dialog){
									objs.dialog.close().remove();
									//to do 发送删除ajax
									
									$.ajax({
											url:'请求地址',
											type:'post',
											dataType:"json",
											data:'相关请求参数(此处可以用到 datas 数据)',
											success: function(data){
													if(data){
															this.closest('tr').remove();
															issucc=true;
															//to do
															//补充其他
													}else{
															issucc=false;
													}
											},
											error: function(){
													issucc=false;
											}
									});
									
									if(issucc){
											tipdia.content('<span class="g-c-cyan1 g-btips-succ">删除成功</span>').show();
									}else{
											tipdia.content('<span class="g-c-red4 g-btips-warn">删除失败！</span>').show();
									}
									
							}else{
									//进入非需要确认是否执行操作的流程
									
									//to do 发送结算ajax请求
									$.ajax({
											url:'请求地址',
											type:'post',
											dataType:"json",
											data:'相关请求参数(此处可以用到 datas 数据)',
											success: function(data){
													if(data){
															issucc=true;
															//to do
															//补充其他
															
													}else{
															issucc=false;
													}
											},
											error: function(){
													issucc=false;
											}
									});
									
									if(issucc){
											CheckBox.init($shopping_list,$chkId_selector);
											$chkId_selector_buy.prop('checked', false);
											$shopping_money.text('');
											$shopping_number.text('');
											tipdia.content('<span class="g-c-cyan1 g-btips-succ">结算成功</span>').show();
									}else{
											tipdia.content('<span class="g-c-red4 g-btips-warn">结算失败！</span>').show();
									}
									
							}
							
							
							setTimeout(function(){
								tipdia.close();
							},2000);
					});
			});
			
			
			
			//绑定确认结算操作
			$shopping_buy.on('click',function(){
					var datas=CheckBox.getCheckBox(),
							len=datas.length;
							
							if(len===0){
									tipdia.content('<span class="g-c-red4 g-btips-warn">请先选中相关数据！</span>').show();
							}else{
								//to do ajax
								//开发时开启下部代码
								console.log(datas);
								
								var issucc=false;
								$.ajax({
										url:'请求地址',
										type:'post',
										dataType:"json",
										data:'相关请求参数(此处可以用到 datas 数据)',
										success: function(data){
												if(data){
														issucc=true;
														//to do
														
												}else{
													issucc=false;
												}
										},
										error: function(){
												issucc=false;
										}
								});
								
								if(issucc){
										CheckBox.init($shopping_list,$chkId_selector);
										$chkId_selector_buy.prop('checked', false);
										$shopping_money.text('');
										$shopping_number.text('');
										tipdia.content('<span class="g-c-cyan1 g-btips-succ">确定结算成功！</span>').showModal();
								}else{
										tipdia.content('<span class="g-c-red4 g-btips-warn">确定结算失败！</span>').showModal();
								}

							}
							
							setTimeout(function(){
								tipdia.close();
							},3000);
			});
			
			
			//绑定清空购物车
			$shopping_clear.on('click',function(){
					//to do ajax
					
					var issucc=false;
					$.ajax({
							url:'请求地址',
							type:'post',
							dataType:"json",
							data:'相关请求参数',
							success: function(data){
									if(data){
											issucc=true;
											//to do
											
									}else{
										issucc=false;
									}
							},
							error: function(){
									issucc=false;
							}
					});

					if(issucc){
							CheckBox.init($shopping_list,$chkId_selector);
							$chkId_selector_buy.prop('checked', false);
							$shopping_money.text('');
							$shopping_number.text('');
							$shopping_list.html('<tr><td colspan="6">暂无数据</td></tr>');
							tipdia.content('<span class="g-c-cyan1 g-btips-succ">清空购物车成功！</span>').showModal();
					}else{
							tipdia.content('<span class="g-c-red4 g-btips-warn">清空购物车失败！</span>').showModal();
					}

					setTimeout(function(){
						tipdia.close();
					},3000);
			});
			
			
			
			
			
			
	});
});
