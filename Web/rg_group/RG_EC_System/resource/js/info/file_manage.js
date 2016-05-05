/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'dialog':'js/lib/artDialog/dialog',
		'pagination':'js/plugins/easyui_page/pagination',
		'checkbox':'js/widgets/checkbox',
		'querydata':'js/widgets/querydata',
		'sort':'js/widgets/sort',
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
		'checkbox':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'sort':{
				deps:['jquery']
		},
		'gridaction':{
				deps:['jquery','dialog']
		}
		
	}
});


/*程序入口*/
require(['jquery','bootstrap','common','dialog','pagination','checkbox','querydata','sort','gridaction'], function($,$strap,undefined,undefined,undefined,CheckBox,undefined,Sort,GridAction) {
	$(function() {
		/*页面元素引用*/
		var $file_griddata=$('#file_griddata'),
				$chkFileId_selector=$('#chkFileId_selector'),
				$file_page=$('#file_page'),
				$fileName=$('#fileName'),
				$grid_querybtn=$('#grid_querybtn'),
				$file_sort=$('#file_sort');
				
				
		//html模板
		var htmlcontent='<tr><td><input value="$fileid>" data-state="1" type="checkbox" name="chkFileId"></td><td><span data-action="$actiontype" data-value="$actionvalue">$actiontext</span></td><td><p>$companyno</p></td><td><p>$filename</p></td><td><em>$filesize$</em></td><td><p>$datetime</p></td><td>$download</td></tr>';
				

		//查询搜索
		$grid_querybtn.queryListData([$fileName],2000,function(sparam){
				//sparam 为一个带有参与联合查询的字符数组，可用于ajax的参数
				
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
												temphtml.push(tempstr.replace('$fileid',data[index]['fileid'])
												.replace('$actiontype',data[index]['actiontype'])
												.replace('$actionvalue',data[index]['actionvalue'])
												.replace('$actiontext',data[index]['actiontext'])
												.replace('$companyno',data[index]['companyno'])
												.replace('$filename',data[index]['filename'])
												.replace('$filesize',data[index]['filesize'])
												.replace('$datetime',data[index]['datetime'])
												.replace('$download',data[index]['download']));
										});
										$file_griddata.html(temphtml.join(''));
								}else{
									$file_griddata.html('<tr><td colspan="7">暂无数据</td></tr>');
								}
						},
						error: function(){
								$file_griddata.html('<tr><td colspan="7">暂无数据</td></tr>');
						}
				});
		});
		
		
		//分页 easy-ui pagination
		$file_page.pagination({
			pageSize:20,
			onSelectPage:function(pageNumber,pageSize){
					console.log('当前页：'+pageNumber);
					console.log('每页记录数：'+pageSize);
					//to do 
					//分页处理
			}
		});
		
		//绑定操作按钮
		$file_griddata.delegate('td>span', 'click', function () {
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
		CheckBox.init($file_griddata,$chkFileId_selector);
		//绑定全选与取消全选
		$chkFileId_selector.click(function(){
			CheckBox.toggleCheckAll($chkFileId_selector, $file_griddata);
			//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()方法
			//to do
			//相关全选操作
		});
		//绑定单个选中与取消
		$file_griddata.delegate('td>input:checkbox', 'click', function () {
				CheckBox.inputCheck($(this),$chkFileId_selector);
				//如果需要获取详细已选择数据值：可调用CheckBox.getCheckBox()方法
				//to do
				//相关单选操作
    });

		
		
		//绑定排序切换
		$file_sort.delegate('th.issort', 'click', function () {
				Sort.toggleSort($(this));
				//获取排序参数
				console.log(Sort.getSortValue());
				//to do
				//排序操作
    });
		
		
		
		
		
	});
});
