var select;
	$(function() {
		//初始化一级类型
		$.ajax({
			type : "post",
			dataType : "json",
			contentType : "application/json;charset=utf-8",
			url : "getTypeOneList.do",
			success : function(result) {
				var listHtml = "<option value=''>默认全部</option><option value='0'>首页</option>";
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
									$('#spanpage',tb).empty().html('第'+tb.currentpage()+'页/共'+tb.pagecount()+'页  共'+tb.total+"条数据 &nbsp;&nbsp;<span style=\"color:red\">汇总:"+tb.sumTotal+"</span>");
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
										dataindex : 'USER_NAME', // 显示数据在行中的属性
										headtext : '账号'
									},
									{
										dataindex : 'NICK', // 显示数据在行中的属性
										headtext : '昵称'
									},
									{
										dataindex : 'CELLPHONE', // 显示数据在行中的属性
										headtext : '手机号'
									},
									{
										dataindex : 'INTEGRATION_CHANGE', // 显示数据在行中的属性
										headtext : '明细'
									},
									{
										dataindex : 'INTEGRATION_TYPE', // 显示数据在行中的属性
										headtext : '来源',
										render:function(i,j,c,r){
											if(c==0)
												return "系统操作";
											else if(c==1)
												return "上传";
											else if(c==2)
												return "注册";
											else if(c==3)
												return "登录";
											else if(c==4)
												return "点播视频";
											else if(c==5)
												return "被点播";
											else if(c==6)
												return "分享";
											else if(c==7)
												return "转入钱包";
											
										}
									},
									{
										dataindex : 'INTEGRATION_DESC', // 显示数据在行中的属性
										headtext : '备注'
									},
									{
										dataindex : 'CREATE_TIME', // 显示数据在行中的属性
										headtext : '时间',
										render:function(i,j,c,r){
									 		if(c==null||c==''){
									 			return '';
									 		}
									 		return new Date(c).format("yyyy-MM-dd hh:mm:ss");
										}
									},
									{
										dataindex : 'ADMIN_NAME', // 显示数据在行中的属性
										headtext : '后台管理员'
									}
									],
							url : 'queryIntegrationDetail.do',
							autoload : true,
							total : 'totalCount',
							root : 'items',
							sumTotal:'sumTotal',
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
	
	//查询
	function query()
	{	
		tb.load({start:0,userIdOrNameOrCard:$('#userIdOrNameOrCard').val(),
			INTEGRATION_TYPE:$("#INTEGRATION_TYPE").val(),
			bTime:$("#StartTime").val()==""?"":($("#StartTime").val()+" 00:00:00"),
			eTime:$("#endtime").val()==""?"":($("#endtime").val()+" 23:59:59"),
			type:$("#type").val()
			});
	}
	
	//新增
	function toAdd()
	{
		window.frames["windowIf"].document.body.innerHTML = "";
		document.getElementById("windowIf").style.display="";
		$("#windowIf").attr("src","toAddIntegrationDetail.do");
		$("#windowDiv").window({title : '新增积分明细',width:530,height:350}).window('open');
	}
	
	//时间转换
	Date.prototype.format =function(format)
	{
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(), //day
	"h+" : this.getHours(), //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter
	"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	(this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,
	RegExp.$1.length==1? o[k] :
	("00"+ o[k]).substr((""+ o[k]).length));
	return format;
	}
