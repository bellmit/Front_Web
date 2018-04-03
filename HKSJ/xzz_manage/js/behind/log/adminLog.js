var select;
	$(function() {
		tb = $('#div_table03').table(
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
						dataindex : 'LOG_CODE', // 显示数据在行中的属性
						headtext : '日志状态',
						render : function(i, j, c, r) {
							if(c == 1){
								return "正常";
							}else{
								return "<span style=\"color:red\">异常</span>";
							}
						}
					}, {
						dataindex : 'ADMIN_NAME', // 显示数据在行中的属性
						headtext : '用户名',
						render : function(i, j, c, r) {
							if(r.ADMIN_ID == -1){
								return "super";
							}else{
								return c;
							}
							
						}
					}, {
						dataindex : 'LOG_TIME', // 显示数据在行中的属性
						headtext : '操作时间',
						render : function(i, j, c, r) {
							return getFormatDate(c);
						}
					}, {
						dataindex : 'LOG_CONTENT', // 显示数据在行中的属性
						headtext : '操作内容'
					}, {
						dataindex : 'DESCC', // 显示数据在行中的属性
						headtext : '描述',
						render : function(i, j, c, r) {
							if(c.length > 30){
								return "<span title='"+c+"'>"+c.substring(0,30)+"...</span>";
							}else{
								return c;
							}
						}
					} ],
					url : 'getAllAdminLog.do',
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
							child : [ {
								tag : 'span',
								child : '第1页/共0页',
								id : 'spanpage'
							}, {
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
							}, {
								tag : 'input',
								type : 'text',
								title : '请输入正确页数',
								'class' : 'itext',
								id : 'pageInput2'
							}, {
								tag : 'span',
								'class' : 'numAll',
								id : 'spanpagecount',
								child : '页'
							}, {
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
										tb.gopage($('#pageInput2').val());
									}
								}
							}, '每页', {
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
											limit : $(e.target).val()
										});
									}
								}
							},'条'
							]
						} ]
					}
				});
	});
	
	function search(){
		
		tb.load({
			start :0,
			dessc : $("#dessc").val(),
			centent : $("#centent").val(),
			selectCode :$("#selectCode").val()
	});
	}