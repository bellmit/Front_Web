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
		'sort':'js/widgets/sort',
		'datepick':'js/widgets/datepick',
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
		'datepick':{
				deps:['jquery']
		},
		'commonfn':{
				deps:['jquery','rule']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle','date97','pagination','sort','datepick','rule','commonfn'], function($,$strap,undefined,undefined,undefined,Common,undefined,undefined,undefined,undefined,Sort,undefined,Rule,CommonFn) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
					$theme_title=$('#theme_title'),
					$orderinfo_griddata=$('#orderinfo_griddata'),
					$orderinfo_page=$('#orderinfo_page'),
					$orderno=$('#orderno'),
					$orderdatestart=$('#orderdatestart'),
					$orderdateend=$('#orderdateend'),
					$paymin=$('#paymin'),
					$paymax=$('#paymax'),
					$orderstatus=$('#orderstatus'),
					$payment=$('#payment'),
					$grid_querybtn=$('#grid_querybtn'),
					$orderinfo_sort=$('#orderinfo_sort');
			
			//主题标题点击
			$theme_title.ThemeTitle(undefined,false);	
			
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			
			
			//绑定金额自动格式化以及大写
			var paymin_txt=CommonFn.moneyCorrect($paymin.val()),
					paymax_txt=CommonFn.moneyCorrect($paymax.val())
					temp_modal=dialog({
						content:'<span class="g-c-red4 g-btips-warn">支付最大金额不能小于最小金额!</span>'
					});
			
			//最小值事件
			$paymin.on('keyup',function(e){
					var val=this.value,
					money=0.00;
					val=CommonFn.moneyCorrect(val);
					money=CommonFn.moneySub(paymax_txt[1],val[1]);
					
					if(money<0){
						temp_modal.show();
						this.value=paymax_txt[0];
						$paymin.removeClass('Validform_error').addClass('Validform_error');
						CommonFn.cursorPos(this,paymax_txt[0],'.');
						setTimeout(function(){
							temp_modal.close();
							$paymin.removeClass('Validform_error');
						},3000);
					}else{
						temp_modal.close();
						$paymin.removeClass('Validform_error');
						this.value=val[0];
						CommonFn.cursorPos(this,val[0],'.');
						paymin_txt=val;
					}
			});
			
			//最大值事件
			$paymax.on('keyup',function(e){
					var val=this.value,
					money=0.00;
					val=CommonFn.moneyCorrect(val);
					money=CommonFn.moneySub(val[1],paymin_txt[1]);
					
					if(money<0){
						temp_modal.show();
						this.value=paymin_txt[0];
						$paymax.removeClass('Validform_error').addClass('Validform_error');
						CommonFn.cursorPos(this,paymin_txt[0],'.');
						setTimeout(function(){
							temp_modal.close();
							$paymax.removeClass('Validform_error');
						},3000);
					}else{
						temp_modal.close();
						this.value=val[0];
						$paymax.removeClass('Validform_error');
						CommonFn.cursorPos(this,val[0],'.');
						paymax_txt=val;
					}
			});
			
			
			
			//html模板
			var htmlcontent='<tr><td><a href="$url">操作</a></td><td><p>$orderNo</p></td><td><p>$orderOuterNo</p></td><td>$recName</td><td>$recPhone</td><td><p>$orderPay</p></td><td><em>$orderStatus</em></td><td><em>$payStatus</em></td><td><p>$orderDate</p></td><td><p>$sendDate</p></td><td>$Source</td></tr>';
			
	
	
			//时间日期控件绑定
			$.datePick([$orderdatestart,$orderdateend]);
			

	
			//查询搜索
			$grid_querybtn.queryListData([$orderno,$orderdatestart,$orderdateend,$paymin,$paymax,$orderstatus,$payment],2000,function(sparam){
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
													.replace('$orderNo',data[index]['orderNo'])
													.replace('$orderOuterNo',data[index]['orderOuterNo'])
													.replace('$recName',data[index]['recName'])
													.replace('$recPhone',data[index]['recPhone'])
													.replace('$orderPay',data[index]['orderPay'])
													.replace('$orderStatus',data[index]['orderStatus'])
													.replace('$payStatus',data[index]['payStatus'])
													.replace('$orderDate',data[index]['orderDate'])
													.replace('$sendDate',data[index]['sendDate'])
													.replace('$Source',data[index]['Source']));
											});
											$orderinfo_griddata.html(temphtml.join(''));
									}else{
										$orderinfo_griddata.html('<tr><td colspan="11">暂无数据</td></tr>');
									}
							},
							error: function(){
									$orderinfo_griddata.html('<tr><td colspan="11">暂无数据</td></tr>');
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
													temphtml.push(tempstr.replace('$url',data[index]['url'])
													.replace('$orderNo',data[index]['orderNo'])
													.replace('$orderOuterNo',data[index]['orderOuterNo'])
													.replace('$recName',data[index]['recName'])
													.replace('$recPhone',data[index]['recPhone'])
													.replace('$orderPay',data[index]['orderPay'])
													.replace('$orderStatus',data[index]['orderStatus'])
													.replace('$payStatus',data[index]['payStatus'])
													.replace('$orderDate',data[index]['orderDate'])
													.replace('$sendDate',data[index]['sendDate'])
													.replace('$Source',data[index]['Source']));
											});
											$orderinfo_griddata.html(temphtml.join(''));
									}else{
											$orderinfo_griddata.html('<tr><td colspan="11">暂无数据</td></tr>');
									}
							},
							error: function(){
									$orderinfo_griddata.html('<tr><td colspan="11">暂无数据</td></tr>');
							}
					});
					
					
			});
			
			
	});
});
