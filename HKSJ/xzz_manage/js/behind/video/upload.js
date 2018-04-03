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

			    	{ 	dataindex:'VIDEO_NAME', // 显示数据在行中的属性
					 	headtext:'视频名称'
					}
					,{ 	dataindex:'TYPEONE_NAME', // 显示数据在行中的属性
					 	headtext:'一级类型'
					}
					,{ 	dataindex:'TYPETWO_NAME', // 显示数据在行中的属性
					 	headtext:'二级类型'
					}
					,{ 	dataindex:'UPDATE_SERIES', // 显示数据在行中的属性
					 	headtext:'更新集数'
					}
					,{ 	dataindex:'COUNT_SERIES', // 显示数据在行中的属性
					 	headtext:'总集数'
					}
					,{
					 	dataindex:'askLeaveId',
					 	headtext:'操作',render:function(i,j,c,r){
					 		if(r.VIDEOTYPE_ONE=="201508131310570453")
					 		{
					 			return "无";
					 		}
					 		else
					 		{
						 		 return [
						 		       $.jsonToControl(
										 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'添加剧集/预告/花絮'},events:{click:function(){
										 		select = r;
												window.frames["windowIf"].document.body.innerHTML = "";
												document.getElementById("windowIf").style.display="";
												$("#windowIf").attr("src",'toAddVideoSon.do');
												$("#windowDiv").window({title : '添加剧集:'+r.VIDEO_NAME,width:530,height:300,top:($(window).height()-300)*0.5,left:($(window).width()-530)*0.5}).window('open');
											 return false;}}})
								] ;
					 		}
						}
					},{
						dataindex:'TYPEONE_NAME',
					 	headtext:'查看剧集',render:function(i,j,c,r){
					 		if(c=="微视频")
					 		{
					 		return;
					 		}else{
					 			 return [
							 		       $.jsonToControl(
											 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'查看剧集'},events:{click:function(){
												 videoSonDetail(r.VIDEO_NAME,r.VIDEO_ID);	
												 return false;}}})
									] ;
					 		}
						}
					}
			]
			,
			url:'queryVideos.do' ,
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
                                             {tag:'select',child:[{tag:'option',value:'10',child:'10'},
                                                                  {tag:'option',value:'20',child:'20'},
                                                                  {tag:'option',value:'30',child:'30'},
                                                                  {tag:'option',value:'40',child:'40'}],
                                              events:{change:function(e){
                                           	  tb.load({start:0,limit:$(e.target).val()});
                                              }}},'条']}
								]}
		});
	});
	
	//跳往添加视频
	function toAdd()
	{
		window.frames["windowIf"].document.body.innerHTML = "";
		document.getElementById("windowIf").style.display="";
		$("#windowIf").attr("src","toAddVideo.do");
		$("#windowDiv").dialog({title : '添加视频',width:530,height:750, top:($(window).height()-750)*0.5,left:($(window).width()-530)*0.5}).window('open');
	}
	//查询
	function query()
	{	 
		tb.load({start:0,videoName:$('#videoName').val()});
	}

	

	//弹出层选择视频
	function videoSonDetail(name,videoid)
	{
		var win = $('#windowDiv2').window(
				{
					iconCls : 'icon-tcc',
					title : name+':详细',
					width:450,height:450, top:($(window).height()-450)*0.5,left:($(window).width()-450)*0.5,
					href : 'tovideck.do',
					onLoad : function() {
						$("#VIDEO_ID").val(videoid);
						searchCX();
					}
				}); 
		win.window('open');
	}



	//弹出层查询条件
	function getQueryParms() {
		var parms = { 
				VIDEO_ID:$("#VIDEO_ID").val(),
				IS_EPISODE:$("#jjType").val()
		}; 
		return parms;
	}

	//弹出层查询
	function searchCX() {
		$('#videoTable').datagrid({url:'htVideocks.do',
			queryParams: getQueryParms()});
	}
	



	function formatxuhao(val,index)
	{
		var jjyg="";
		if(val==null || val==-1)
			jjyg="剧集";
		else if(val==1)
			jjyg="剧集";
		else if(val==2)
			jjyg="预告片 ";
		else if(val==3)
			jjyg="花絮";
		else
			jjyg="";
		return jjyg;
	}
	
	function formatType(val,index)
	{
		var jjyg="";
		if(val==null || val==-1)
			jjyg="";
		else if(val==0)
			jjyg="转码中";
		else if(val==1)
			jjyg="转码成功（待审批）";
		else if(val==2)
			jjyg="转码失败";
		else if(val==3)
			jjyg="审批通过（上架）";
		else
			jjyg="";
		return jjyg;
	}
