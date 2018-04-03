/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'dialog':'js/lib/artDialog/dialog',
		'checkbox':'js/widgets/checkbox',
		'querydata':'js/widgets/querydata',
		'sort':'js/widgets/sort'
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
		'checkbox':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'sort':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','common','dialog','querydata','sort','checkbox'], function($,$strap,undefined,undefined,undefined,Sort,CheckBox) {
	$(function() {
		/*页面元素引用*/
		var $beingadd_griddata=$('#beingadd_griddata'),
				$orderNo=$('#orderNo'),
				$grid_querybtn=$('#grid_querybtn'),
				$beingadd_sort=$('#beingadd_sort'),
				$chkId_selector=$('#chkId_selector'),
				$returnbeing=$('#returnbeing'),
				$changebeing=$('#changebeing');
				
				
				
				
				
		//html模板
		var htmlcontent='<tr><td><input value="$chkId" data-state="1" type="checkbox" name="chkId"></td><td><p>$orderNo</p></td><td>$recLibrary</td><td><p>$goodsNo</p></td><td>$goodsName</td><td><p>$backNumber</p></td><td><p>$returnNumber</p></td></tr>';
		
		

		//查询搜索
		$grid_querybtn.queryListData([$orderNo],2000,function(sparam){
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
												.replace('$orderNo',data[index]['orderNo'])
												.replace('$recLibrary',data[index]['recLibrary'])
												.replace('$goodsNo',data[index]['goodsNo'])
												.replace('$goodsName',data[index]['goodsName'])
												.replace('$backNumber',data[index]['backNumber'])
												.replace('$returnNumber',data[index]['returnNumber']));
										});
										$beingadd_griddata.html(htmlhead+temphtml.join(''));
								}else{
									$beingadd_griddata.html('<tr><td colspan="7">暂无数据</td></tr>');
								}
						},
						error: function(){
								$beingadd_griddata.html('<tr><td colspan="7">暂无数据</td></tr>');
						}
				});
		});
		
		

		//绑定排序切换
		$beingadd_sort.delegate('th.issort', 'click', function () {
				Sort.toggleSort($(this));
				//获取排序参数
				console.log(Sort.getSortValue());
				//to do
				//排序操作
    });
		
		
		
		
		//全选与取消全选
		//初始化
		CheckBox.init($beingadd_griddata,$chkId_selector);
		//绑定全选与取消全选
		$chkId_selector.click(function(){
			CheckBox.toggleCheckAll($chkId_selector, $beingadd_griddata);
			//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()方法
		});
		//绑定单个选中与取消
		$beingadd_griddata.delegate('td>input:checkbox', 'click', function () {
				CheckBox.inputCheck($(this),$chkId_selector);
    });
		
		
		
		
		//绑定退待发货、换待发货操作事件
		$.each([$returnbeing,$changebeing],function(i,v){
				var $this=this,
				selector=$this.selector.slice(1),
				dia=dialog(),
				txt='';
				this.on('click',function(){
						var beingid=CheckBox.getCheckBox();
						if(beingid.length==0){
								txt='<span class="g-c-red2 g-btips-warn">请先选择需要操作的数据</span>'
								dia.content(txt).show();
								setTimeout(function(){
									dia.close();
								},3000);
								return false;
						}
						var params=$this.attr('data-href');
						if(selector=='returnbeing'){
								//to do
								//退待发货业务逻辑
								console.log('退已发货:'+params);
						}else if(selector=='changebeing'){
								//to do
								//换待发货业务逻辑
								console.log('换已发货:'+params);
						}
				})
		});
		
		
		
	});
});
