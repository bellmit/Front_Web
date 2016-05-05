var select; //选择行数据	
$(function() {
	tb = $('#div_table03').table({
		'class': 'table1',
		
		//绑定事件
		events: {
				//数据加载时调用
				loaded: function() {
						
						//分页容器
						$('#spanpage', tb).empty().html('第' + tb.currentpage() + '页/共' + tb.pagecount() + '页  共' + tb.total + "条数据");
						
						//如果是第一页
						if (tb.currentpage() == 1) {
								$('#span_first', tb).addClass('First');
								$('#span_prev', tb).addClass('First');
						} else {
								$('#span_first', tb).removeClass('First');
								$('#span_prev', tb).removeClass('First');
						}
						
						//如果是最后一页
						if (tb.currentpage() == tb.pagecount()) {
								$('#span_first', tb).addClass('Last');
								$('#span_prev', tb).addClass('First');
						} else {
								$('#span_first', tb).removeClass('Last');
								$('#span_prev', tb).removeClass('First');
						}
						
						//初始化分页数据
						initTableLimit();
				}
		},
		
		//定义数据行样式类名
		rm: {
				evenclass: 'rowEven',
				oddclass: 'rowOdd',
				headclass: 'cssth'
		},
		
		//定义数据展现具体数据项
		//dataindex:代表数据项对应数据实体名称
		//headtext:数据行显示名称后标题
		cm: [
				{
						dataindex: 'id',
						headtext: '序号'
				}, {
						dataindex: 'title',
						headtext: '标题'
				}, {
						dataindex: 'content',
						headtext: '内容'
				}, {
						dataindex: 'datetime',
						headtext: '日期'
				}, {
						dataindex: 'hot',
						headtext: '热度'
				}, {
						dataindex: 'type',
						headtext: '分类'
				}, {
						dataindex: 'imgIcon',
						headtext: '导图'
				}, {
						dataindex: 'action',
						headtext: '推送',
						render: function(i, j, c, r) {
							return [
							$.jsonToControl({
									tag: 'a',
									style: 'cursor: pointer',
									child: {
										tag: 'span',
										child: '通过'
									},
									events: {
										click: function() {
											select = r;
											window.frames["windowIf"].document.body.innerHTML = "";
											document.getElementById("windowIf").style.display = "";
											$("#windowIf").attr("src", 'jsp/contribute/contribute.html?id=' + r.id);
											
											$("#windowDiv")
											.window({
													title: '编辑菜单:' + r.menuName,
													width: 400,
													height: 400
											})
											.window('open');
											return false;
										}
									}
							})];
						}
				}],
		
		//请求地址
		url: 'json/contribute/contribute.json',
		
		//是否自动加载数据标识
		autoload: true,
		
		//分页总记录数对象
		total: 'totalCount',
		
		//数据集对象
		root: 'items',
		
		//底部状态栏对象
		footbar: {
				tag: 'div',
				'class': 'pageBox pre',
				
				//底部状态栏相关子对象
				child: [
				
				//子对象--导出excel按钮
				
				/*{tag:'a','class':'excelDoload pab',title:'导出Excel',child:'Excel'},*/
				
				//子对象--分页容器
				{
					tag: 'div',
					'class': 'pages',
					child: [{
											//当前页和总页数信息标签
											tag: 'span',
											child: '第1页/共0页',
											id: 'spanpage'
									},{
											//分页按钮数据集
											tag: 'span',
											'class': 'number',
											child: [{
													//第一页按钮
													tag: 'span',
													id: 'span_first',
													'class': 'First Page',
													child: ' 首页 ',
													events: {
														//执行首页操作
														click: function() {
															tb.firstpage();
														}
													}
											}, {
													//上一页按钮
													tag: 'span',
													id: 'span_prev',
													'class': 'Prev  Page',
													child: '上页',
													events: {
														//执行上一页操作
														click: function() {
															tb.prevpage();
														}
													}
											}, {
													//下一页按钮
													tag: 'span',
													id: 'span_next',
													'class': 'First Page',
													child: ' 下页 ',
													events: {
														//执行下一页操作
														click: function() {
															tb.nextpage();
														}
													}
											}, {
													//最后一页按钮
													tag: 'span',
													id: 'span_last',
													'class': 'First Page',
													child: '尾页 ',
													events: {
														//执行最后一页操作
														click: function() {
															tb.lastpage();
														}
													}
											}]
									},{
											//跳转到多少页输入域
											tag: 'input',
											type: 'text',
											title: '请输入正确页数',
											'class': 'itext',
											id: 'pageInput2'
									}, {
											//单位标签
											tag: 'span',
											'class': 'numAll',
											id: 'spanpagecount',
											child: '页'
									}, {
											//跳转到多少页执行按钮
											tag: 'a',
											'class': 'ibutton',
											child: '跳转 ',
											events: {
												click: function() {
													//判断跳转数据是否合法
													var pn = tb.pagecount();
													if (isNaN($('#pageInput2').val()) || pn < $('#pageInput2').val()) {
															$.messager.alert("提示", '输入错误,最大只能输入' + pn, "info");
															$('#pageInput2').val("");
															return;
													}
													//执行跳转操作
													tb.gopage($('#pageInput2').val());
												}
											}
									},
									'每页',{
											//每页显示记录数下拉组件
											tag: 'select',
											//下拉选项数据
											child: [{
																	tag: 'option',
																	value: '10',
																	child: '10'
															}, {
																	tag: 'option',
																	value: '20',
																	child: '20'
															}, {
																	tag: 'option',
																	value: '30',
																	child: '30'
															}, {
																	tag: 'option',
																	value: '40',
																	child: '40'
															}],
											events: {
												//执行选择不同记录数操作
												change: function(e) {
														tb.load({
															start: 0,
															limit: $(e.target).val()
														});
												}
											}
									},
									'条']
				}]
		}
		
		
		
	});
});

//查询

function query() {
	tb.load({
		start: 0,
		menuName: $('#menuName').val(),
		descc: $('#descc').val()
	});
}

//跳往添加

function toAdd() {
	window.frames["windowIf"].document.body.innerHTML = "";
	document.getElementById("windowIf").style.display = "";
	$("#windowIf").attr("src", "toAddMenu.do");
	$("#windowDiv").window({
		title: '新增角色',
		width: 400,
		height: 400
	}).window('open');
}