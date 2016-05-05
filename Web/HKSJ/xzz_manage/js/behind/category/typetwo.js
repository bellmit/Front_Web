var select;
	$(function() {
		//初始化一级类型
		$.ajax({
			type : "post",
			dataType : "json",
			contentType : "application/json;charset=utf-8",
			url : "getTypeOneList.do",
			success : function(result) {	
				var listHtml = "<option value=''>默认全部</option>";
				$.each(result, function(i, n) {
					listHtml += "<option value="+n.TYPEONE_ID+">"+n.TYPEONE_NAME+"</option>";

				});
				$("#selectTypeOne").html(listHtml);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.messager.alert("提示",errorThrown,"info");
			}
		});
		tb = $('#div_table03')
				.table(
						{
							'class' : 'table1',
							////////////////////////////////////////////////////////////////////////////////////////////////////////////////
							events : {
								loaded : function() { // loaded事件,当数据加载成功后触发,这里更新的是分页信息
									$('#spanpage',tb).empty().html('第'+tb.currentpage()+'页/共'+tb.pagecount()+'页  共'+tb.total+"条数据");
									initTableLimit();
								}
							},
							rm : {
								evenclass : 'rowEven',
								oddclass : 'rowOdd',
								headclass : 'cssth'
							}, //evenclass指定奇数行样式,oddclass指定偶数行样式,headclass指定表格头样式
							cm : [
									
									{
										dataindex : 'typetwoName', // 显示数据在行中的属性
										headtext : '二级类型名称'
									},
									{
										dataindex : 'typeoneName', // 显示数据在行中的属性
										headtext : '所属一级类型'
									},
									{
										dataindex : 'descc', // 显示数据在行中的属性
										headtext : '描述'
									},
									{
										dataindex : 'orderNum', // 显示数据在行中的属性
										headtext : '排序号'
									},
									{
										dataindex : 'status', // 显示数据在行中的属性
										headtext : '状态',
										render : function(i, j, c, r) {
											return '1' == c ? '启用' : '禁用';
										}
									},
									{
										dataindex : 'askLeaveId',
										headtext : '操作',
										render : function(i, j, c, r) {
											var isDisabled = r.status == "1" ? "禁用"
													: "启用";
											var disabledVal = r.status == "1" ? "0"
													: "1";
											return [
													$
															.jsonToControl({
																tag : 'a',style:'cursor: pointer',
																child : {
																	tag : 'span',
																	child : '修改'
																},
																events : {
																	click : function() {

																		select = r;
																		window.frames["windowIf"].document.body.innerHTML = "";
																		document.getElementById("windowIf").style.display="";
																		$("#windowIf").attr("src",'toUpdateTypeTwo.do?id='+ r.id);
																		$("#windowDiv").window({title : '编辑二级类型信息:'+r.typetwoName,width:400,height:200}).window('open');
																		return false;
																	}
																}
															}),
													$
															.jsonToControl({
																tag : 'a',style:'cursor: pointer',
																child : {
																	tag : 'span',
																	child : isDisabled
																},
																events : {
																	click : function() {
																		$.post(
																						'updateTypeTwoStatus.do',
																						{
																							id : r.id,
																							typeTwoStatus : disabledVal
																						},
																						function(
																								result) {
																							if (result == 1) //修改成功
																							{
																								$.messager.alert("提示","修改状态成功","info");
																								tb.load();
																							} else {
																								$.messager.alert("提示","修改状态失败","info");
																							}
																						});
																		return false;
																	}
																}
															})
															,  $.jsonToControl(
																	 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'删除'},events:{click:function(){
																		 $.messager.confirm("确认","确定要删除该信息?",function(ha){
																			 	if(ha)
																			 	{
																					 $.post('deletTypeTwo.do',{ID:r.id,TYPETWO_ID:r.typetwoId},function(result){
																							if (result == 0){
																								tb.load();
																								$.messager.alert("提示","删除成功","info");
																							}
																							else if (result == 1) {
																								$.messager.alert("提示","删除失败！有关联的一级类型数据。","info");
																							} else if (result == 2){
																								$.messager.alert("提示","删除失败！有关联的视频数据。","info");
																							} else if (result == 3){
																								$.messager.alert("提示","删除失败！有关联的广告数据。","info");
																							}else{
																								$.messager.alert("提示","删除失败！请联系管理员！","info");
																							}
																							
																						})
																			 	}
																			 });
																			
																		 return false;}}})															
															];
										}
									} ],
							url : 'getAllTypeTwo.do',
							autoload : true,
							total : 'totalCount',
							root : 'items',
							footbar : {
								tag : 'div',
								'class' : 'pageBox pre',
								child : [//{tag:'a','class':'excelDoload pab',title:'导出Excel',child:'Excel'},
								{
									tag : 'div',
									'class' : 'pages',
									child : [
											{
												tag : 'span',
												child : '第1页/共0页',
												id : 'spanpage'
											},
											{
												tag : 'span',
												'class' : 'number',
												child : [ {
													tag : 'span',
													id : 'span_first',
													'class' : 'First Page',
													child : ' 首页 ',
													events : {
														click : function() {
															tb.firstpage();
														}
													}
												}, {
													tag : 'span',
													id : 'span_prev',
													'class' : 'Prev  Page',
													child : '上页',
													events : {
														click : function() {
															tb.prevpage();
														}
													}
												}, {
													tag : 'span',
													id : 'span_next',
													'class' : 'First Page',
													child : ' 下页 ',
													events : {
														click : function() {
															tb.nextpage();
														}
													}
												}, {
													tag : 'span',
													id : 'span_last',
													'class' : 'First Page',
													child : '尾页 ',
													events : {
														click : function() {
															tb.lastpage();
														}
													}
												} ]
											},
											{
												tag : 'input',
												type : 'text',
												title : '请输入正确页数',
												'class' : 'itext',
												id : 'pageInput2'
											},
											{
												tag : 'span',
												'class' : 'numAll',
												id : 'spanpagecount',
												child : '页'
											},
											{
												tag : 'a',
												'class' : 'ibutton',
												child : '跳转 ',
												events : {
													click : function() {
														var pn = tb.pagecount();
														if(isNaN($('#pageInput2').val()) || pn < $('#pageInput2').val()){
															$.messager.alert("提示",'输入错误,最大只能输入'+pn,"info");
				                                     		  $('#pageInput2').val("");
				                                     		  return;
				                                     	  }
														tb.gopage($(
																'#pageInput2')
																.val());
													}
												}
											},
											'每页',
											{
												tag : 'select',
												child : [ {
													tag : 'option',
													value : '10',
													child : '10'
												}, {
													tag : 'option',
													value : '20',
													child : '20'
												}, {
													tag : 'option',
													value : '30',
													child : '30'
												}, {
													tag : 'option',
													value : '40',
													child : '40'
												} ],
												events : {
													change : function(e) {
														tb.load({
															start : 0,
															limit : $(e.target)
																	.val()
														});
													}
												}
											} ,'条']
								} ]
							}
						});
	});

	function toAdd() {
		window.frames["windowIf"].document.body.innerHTML = "";
		document.getElementById("windowIf").style.display="";
		$("#windowIf").attr("src","toAddTypeTwo.do");
		$("#windowDiv").window({title : '新增二级类型',width:400,height:200}).window('open');
	}
	
	//查询
	function query()
	{	
		tb.load({start:0,TYPEONE_ID:$('#selectTypeOne').val()});
	}