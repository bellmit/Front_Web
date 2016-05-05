var select;
	$(function() {
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
										dataindex : 'typeoneName', // 显示数据在行中的属性
										headtext : '一级类型名称'
									},
									{
										dataindex : 'picUrl', // 显示数据在行中的属性
										headtext : '图标URL',
										render:function(i, j, c, r) {	
											return c==null?"":"<a title=\"查看图片\" href=\"javascript:void(0)\" onclick=\"showPic(\'"+$("#imageUrl").val()+""+c.replace(/[\\]/g,"/")+"\')\">"+c+"</a>";
									 	}
									},
									{
										dataindex : 'orderNum', // 显示数据在行中的属性
										headtext : '排序号'
									},
									{
										dataindex : 'descc', // 显示数据在行中的属性
										headtext : '描述'
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
												/*
												$.jsonToControl({
													tag : 'a',style:'cursor: pointer',
													child : {
														tag : 'span',
														child : '新增马甲'
													},
													events : {
														click : function() {
															select = r;
															window.frames["windowIf"].document.body.innerHTML = "";
															document.getElementById("windowIf").style.display="";
															$("#windowIf").attr("src","toAddTypeOneVest.do");
															$("#windowDiv").window({title : '新增马甲:'+r.typeoneName,width:500,height:200}).window('open');
															return false;
														}
													}
												}), */
													$.jsonToControl({
																tag : 'a',style:'cursor: pointer',
																child : {
																	tag : 'span',
																	child : '新增与二级类型关系'
																},
																events : {
																	click : function() {
																		select = r;
																		window.frames["windowIf"].document.body.innerHTML = "";
																		document.getElementById("windowIf").style.display="";
																		$("#windowIf").attr("src",'toAddTypeOneRelationship.do?id='+ r.id);
																		$("#windowDiv").window({title : '增加二级关系:'+r.typeoneName,width:330,height:300}).window('open');
																		return false;
																	}
																}
															}),
												
													$.jsonToControl({
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
																		$("#windowIf").attr("src",'toUpdateTypeOne.do?id='+ r.id);
																		$("#windowDiv").window({title : '编辑一级类型信息:'+r.typeoneName,width:530,height:300}).window('open');
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
																		$
																				.post(
																						'updateTypeOneStatus.do',
																						{
																							id : r.id,
																							typeOneStatus : disabledVal
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
															
															,$.jsonToControl({
																tag : 'a',
																child : {
																	tag : 'span',
																	child : '删除'
																},
																events : {
																	click : function() {
																		 $.messager.confirm("确认","删除一级类型只会删除与其他没有关联的数据请谨慎操作。确定要删除该记录？?",function(ha){
																			 	if(ha)
																			 	{
																					 $.post('deleteTypeOneId.do',{	TYPEONE_ID : r.typeoneId,
																							typeOneStatus : disabledVal},function(result){
																					 		if(result==1)
																					 		{
																					 			tb.load();
																					 			$.messager.alert("提示","删除成功","info");
																					 		}
																					 		else
																					 			$.messager.alert("提示","删除失败！其他数据已经使用！","info");
																					 	})
																			 	}
																			 });
																			
																		 return false;
																	}
																}
															}) 
															
															
															];
										}
									} ],
							url : 'getAllTypeOne.do',
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
											},'条' ]
								} ]
							}
						});
	});

	function toAdd() {
		window.frames["windowIf"].document.body.innerHTML = "";
		document.getElementById("windowIf").style.display="";
		$("#windowIf").attr("src","toAddTypeOne.do");
		$("#windowDiv").window({title : '新增一级类型',width:530,height:300}).window('open');
	}
	
	//点击图片弹出框放大
	function showPic(wzurl)
	{
		window.frames["windowIf1"].document.body.innerHTML = "";
		document.getElementById("windowIf1").style.display="";
		$("#windowIf1").attr("src",'showPhoto.do?photoUrl='+wzurl);
		$("#windowDiv1").window({title : '展示',maximized:true}).window('open');
	}