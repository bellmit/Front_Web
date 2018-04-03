var select;
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

			    	{ 	dataindex:'number', // 显示数据在行中的属性
					 	headtext:'序号'
					}
					,{ 	dataindex:'STOP_NAME', // 显示数据在行中的属性
					 	headtext:'广告名称'
					}
					,{ 	dataindex:'TYPEONE_NAME', // 显示数据在行中的属性
					 	headtext:'所属一级类型'
					}
					,{ 	dataindex:'STOP_URL', // 显示数据在行中的属性
					 	headtext:'广告图片',
					 	render:function(i, j, c, r) {	
					 		return c==null?"":"<a title=\"查看图片\" href=\"javascript:void(0)\" onclick=\"showPic(\'"+$("#imageUrl").val()+""+c.replace(/[\\]/g,"/")+"\')\">"+c+"</a>";
					 	}
					}
					,{ 	dataindex:'STOP_WEIGHT', // 显示数据在行中的属性
					 	headtext:'权重'
					}
					,{ 	dataindex:'JUMP_URL', // 显示数据在行中的属性
					 	headtext:'跳往URL'
					}
					,{ 	dataindex:'STOP_STATUS', // 显示数据在行中的属性
					 	headtext:'状态',
					 	 render:function(i,j,c,r){
							 return '1' == c ? '启用':'禁用';
						 }
					}
					,{
					 	dataindex:'askLeaveId',
					 	headtext:'操作',render:function(i,j,c,r){
					 		 var isDisabled=r.STOP_STATUS=="1"?"禁用":"启用";
					 		 var disabledVal=r.STOP_STATUS=="1"?"0":"1";
					 		 return [
					 		       $.jsonToControl(
									 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'修改'},events:{click:function(){
											select = r;
											window.frames["windowIf"].document.body.innerHTML = "";
											document.getElementById("windowIf").style.display="";
											$("#windowIf").attr("src","toUpdateAdvertStop.do");
											$("#windowDiv").window({title : '修改暂停广告:'+r.STOP_NAME,width:530,height:410}).window('open');
										 return false;}}})
										 ,
									 $.jsonToControl(
									 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:isDisabled},events:{click:function(){
											$.post('changeAdvertStopStatus.do',{STOP_STATUS:disabledVal,ID:r.ID},function(result){
											if(result==1) //修改成功
											{
												tb.load();
												$.messager.alert("提示","修改成功","info");
											}
											else
											{
												$.messager.alert("提示","修改失败","info");
											}
										})
										 return false;}}})
										 ,
										 $.jsonToControl(
									 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'删除'},events:{click:function(){
										 $.messager.confirm("确认","确定要删除?",function(ha){
											 	if(ha)
											 	{
												 $.post('deleteAdvertStop.do',{ID:r.ID,STOP_ID:r.STOP_ID},function(result){
												 		if(result==1)
												 		{
												 			tb.load()
												 			$.messager.alert("提示","删除成功","info");
												 		}
												 		else
												 			$.messager.alert("提示","删除失败","info");
												 	})
											 	}
											 });
											
										 return false;}}})
							] ;
						}
					}
			]
			,
			url:'queryAdvertStop.do' ,
			autoload:true,
			total:'totalCount',
			root:'items'
			,
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
                                             {tag:'select',id:'select_columns',child:[{tag:'option',value:'10',child:'10'},
                                                                  {tag:'option',value:'20',child:'20'},
                                                                  {tag:'option',value:'30',child:'30'},
                                                                  {tag:'option',value:'40',child:'40'}],
                                              events:{change:function(e){
                                           	  tb.load({start:0,limit:$(e.target).val()});
                                              }}},'条']}
								]}
		});
	});
	
	//跳往添加
	function toAdd()
	{
		window.frames["windowIf"].document.body.innerHTML = "";
		document.getElementById("windowIf").style.display="";
		$("#windowIf").attr("src","toAddAdvertStop.do");
		$("#windowDiv").window({title : '新增暂停广告',width:530,height:410}).window('open');
	}
	
	
	//查询
	function query()
	{
		tb.load({start:0,stopName:$('#stopName').val()});
	}
	
	//点击图片弹出框放大
	function showPic(wzurl)
	{
		window.frames["windowIf1"].document.body.innerHTML = "";
		document.getElementById("windowIf1").style.display="";
		$("#windowIf1").attr("src",'showPhoto.do?photoUrl='+wzurl);
		$("#windowDiv1").window({title : '展示',maximized:true}).window('open');
	}