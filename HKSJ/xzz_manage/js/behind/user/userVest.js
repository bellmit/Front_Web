$(function(){
		 tb = $('#div_table03').table({
			'class':'table1',	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		events:{loaded:function(){ // loaded事件,当数据加载成功后触发,这里更新的是分页信息
			$('#spanpage',tb).empty().html('第'+tb.currentpage()+'页/共'+tb.pagecount()+'页  共'+tb.total+"条数据");
			if(tb.currentpage()==1){
				$('#span_first',tb).addClass('First');
				$('#span_prev',tb).addClass('First');
			}else{
				$('#span_first',tb).removeClass('First');
				$('#span_prev',tb).removeClass('First');
			}
			if(tb.currentpage()==tb.pagecount()){
				$('#span_first',tb).addClass('Last');
				$('#span_prev',tb).addClass('First');
			}else{
				$('#span_first',tb).removeClass('Last');
				$('#span_prev',tb).removeClass('First');
			}
			initTableLimit();
		}},
		rm:{evenclass:'rowEven',oddclass:'rowOdd',headclass:'cssth'}, //evenclass指定奇数行样式,oddclass指定偶数行样式,headclass指定表格头样式
		cm:[
					{ 	dataindex:'id', // 显示数据在行中的属性
					 	headtext:'ID'
					},
			    	{ 	dataindex:'account', // 显示数据在行中的属性
					 	headtext:'账号'
					}
					,{ 	dataindex:'nickname', // 显示数据在行中的属性
					 	headtext:'昵称'
					},{ 	
						dataindex:'integral', // 显示数据在行中的属性
					 	headtext:'自传币'
					},{ 	
						dataindex:'lastLoginTime', // 显示数据在行中的属性
					 	headtext:'最后登录时间', 
					 	render : function(i, j, c, r) {  
					 		if(c == "" || c == null){
					 			return "";
					 		}
							return getFormatDate(c);
						}
					},{
						dataindex:'status', // 显示数据在行中的属性
					 	headtext:'状态',
					 	 render:function(i,j,c,r){
							 return '0' == c ? '启用':'<font style="color: red">已禁用</ront>';
						 }
					},{ 	
						dataindex:'sign', // 显示数据在行中的属性
					 	headtext:'个性签名',
					 	render:function(i,j,c,r){   
				 	    	if(c == null){
				 	    		return "";
				 	    	}
							if(c.length > 30){
								c = c.substring(0,30)+"...";
							}  
							return c;
						}
					} ,{ 	
						dataindex:'attributeExplain', // 显示数据在行中的属性
					 	headtext:'运营方向',
					 	render:function(i,j,c,r){   
				 	    	if(c == null){
				 	    		return "";
				 	    	}
							if(c.length > 30){
								c = c.substring(0,30)+"...";
							}  
							return c;
						}
					} 
					,{
					 	dataindex:'status',
					 	headtext:'操作',render:function(i,j,c,r){
					 		 var isDisabled= c =="0"?"禁用":"启用";
					 		 var disabledVal= c =="0"? "1" : "0";
					 		 return [
					 		    $.jsonToControl(
												 {tag:'a', style:'cursor: pointer',child:{tag:'span',child:'编辑'},events:{click:function(){
													 	window.frames["windowIf"].document.body.innerHTML = "";
													 	document.getElementById("windowIf").style.display="";
														$("#windowIf").attr("src",'user/toUpdateUser.do?id='+r.id);
														$("#windowDiv").window({title : '编辑用户:'+r.account,width:500,height:450}).window('open');
													 return false;}}}),
									 $.jsonToControl(
									 {tag:'a', style:'cursor: pointer',child:{tag:'span',child:isDisabled},events:{click:function(){
										 $.messager.confirm("确认","确定"+isDisabled+"该马甲用户？",function(ha){	
											 if(ha){
												 $.post('user/updataStatus.do',{status:disabledVal,id:r.id},function(result){
														if(result== "true") //修改成功
														{
															tb.load();
															$.messager.alert("提示",isDisabled+"成功","info");
														}  
														else
														{
															$.messager.alert("提示",isDisabled+"失败","info");
														}
												 	});
											 }
											  
										 });
										 return false;}}}),
										 $.jsonToControl(
												 {tag:'a', style:'cursor: pointer',child:{tag:'span',child:"重置密码"},events:{click:function(){
													 $.messager.confirm("确认","确定初始化该用户密码？",function(ha){
														 if(ha){
															 $.post('user/resetPassword.do',{id:r.id},function(result){
																	if(result== "false") //修改失败
																	{
																		$.messager.alert("提示","初始化密码失败!","info");
																		
																	}  
																	else
																	{ 
																		$.messager.alert("提示",result,"info");
																		tb.load();
																	}
															     });  
														 }
														 
													 });
												 return false;}}}),  
												 
										 $.jsonToControl(
												 {tag:'a', style:'cursor: pointer',child:{tag:'span',child:"发表长文"},events:{click:function(){ 
													 window.location.href="/xzzBehind/longArticle/toAdd.do?id="+r.id;
													 return false;}}}),
										 $.jsonToControl({
															tag: 'a',
															style: 'cursor: pointer',
															child: {
																tag: 'span',
																child: '发表随记'
															},
															events: {
																click: function() {
																	select = r;
																	window.frames["windowIf"].document.body.innerHTML = "";
																	document.getElementById("windowIf").style.display = "";
																	$("#windowIf").attr("src", 'followRecord/toAdd.do?id=' + r.id);
																	$("#windowDiv").window({
																		title: '发表随记',
																		width: 450,
																		height: 600
																	}).window('open');
																	return false;
																}
															}
														})
										 
							] ;
						}
					}
			]
			,
			url:'user/listVest.do?userType=1' ,   
			autoload:true,
			total:'totalCount',
			root:'items',
			footbar:{
					tag:'div','class':'pageBox pre',child:[//{tag:'a','class':'excelDoload pab',title:'导出Excel',child:'Excel'},
				     {tag:'div','class':'pages',child:[{tag:'span',child:'第1页/共0页',id:'spanpage'},
				             {tag:'span','class':'number',child:[{tag:'span',id:'span_first','class':'First Page',child:' 首页 ',
				            	 			 events:{click:function(){
				                                tb.firstpage();
         										}}},
                                             {tag:'span',id:'span_prev','class':'Prev  Page',child:'上页',events:{click:function(){
                                           	    tb.prevpage();
                                             }}},
                                             {tag:'span',id:'span_next','class':'First Page',child:' 下页 ',events:{click:function(){
                                           	    tb.nextpage();
                                             }}},
                                             {tag:'span',id:'span_last','class':'First Page',child:'尾页 ',events:{click:function(){
                                           	    tb.lastpage();
                                             }}}]},
                                             {tag:'input',type:'text',title:'请输入正确页数','class':'itext',id:'pageInput2'},
                                             {tag:'span','class':'numAll',id:'spanpagecount',child:'页'},
                                             {tag:'a','class':'ibutton',child:'跳转 ',events:{click:function(){
                                           	  var pn = tb.pagecount();
                                           	  if(isNaN($('#pageInput2').val()) || pn < $('#pageInput2').val()){
                                           		   $.messager.alert("提示",'输入错误,最大只能输入'+pn,"info");
                                           		   $('#pageInput2').val("");
                                           		  return;
                                           	  }
                                           	  tb.gopage($('#pageInput2').val()); 
                                             }}},
                                             '每页',
                                             {tag:'select',child:[{tag:'option',value:'10',child:'10'},
                                                                  {tag:'option',value:'20',child:'20'},
                                                                  {tag:'option',value:'30',child:'30'},
                                                                  {tag:'option',value:'40',child:'40'}],
                                              events:{change:function(e){
                                           	  tb.load({start:0,limit:$(e.target).val()});
                                              }}},'条'
                                              ]}
								]}
		});
	});
		function toAdd()
		{	
			window.frames["windowIf"].document.body.innerHTML = "";
			document.getElementById("windowIf").style.display="";
			$("#windowIf").attr("src","user/toAdd.do");
			$("#windowDiv").window({title : '新增马甲账户',width:450,height:550}).window('open');
		}
	//查询
	function query()
	{	
		tb.load({
			start:0,
			account:$('#account').val(),
			nickname:$('#nickname').val(),
			status:$('#status').val()
			
		});
		
	}