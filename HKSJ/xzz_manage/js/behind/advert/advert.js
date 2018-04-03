var select; //选择行数据
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
			    	,{ 	dataindex:'ADVERT_COMPANY', // 显示数据在行中的属性
					 	headtext:'公司名称',
					 	render : function(i, j, c, r) {
							if(c==null)
							{
								return "";
							}
							else
							{
								if(c.length > 15){
									return "<span title='"+c+"'>"+c.substring(0,15)+"...</span>";
								}else{
									return c;
								}
							}
						}	
					}
					,{ 	dataindex:'ADVERT_NAME', // 显示数据在行中的属性
					 	headtext:'广告名称'
					}
					,{ 	dataindex:'ADVERT_PAYMONEY', // 显示数据在行中的属性
					 	headtext:'已点播金额'
					}
					,{ 	dataindex:'ADVERT_MONEY', // 显示数据在行中的属性
					 	headtext:'投放金额'
					}
					,{ 	dataindex:'ADVERT_PRICE', // 显示数据在行中的属性
					 	headtext:'单价(元/千次)'
					}
					,{ 	dataindex:'TYPETWO_NAME', // 显示数据在行中的属性
					 	headtext:'所属二级类型',
					 	render : function(i, j, c, r) {
							if(c==null)
							{
								return "";
							}
							else
							{
								if(c.length > 15){
									return "<span title='"+c+"'>"+c.substring(0,15)+"...</span>";
								}else{
									return c;
								}
							}
						}	
					}
					,{ 	dataindex:'ADVERT_URL', // 显示数据在行中的属性
					 	headtext:'广告URL'
					}
					,{ 	dataindex:'ADVERT_DURATION', // 显示数据在行中的属性
					 	headtext:'广告时长'
					}
					,{ 	dataindex:'ADVERT_TIMES', // 显示数据在行中的属性
					 	headtext:'播放次数'
					}
					,{ 	dataindex:'JUMP_URL', // 显示数据在行中的属性
					 	headtext:'跳往URL'
					}
					,{ 	dataindex:'ADVERT_WEIGHT', // 显示数据在行中的属性
					 	headtext:'权重'
					},
					{ 	dataindex:'PID_CONTENT', // 显示数据在行中的属性
					 	headtext:'PID',
					 	render : function(i, j, c, r) {
					 		var pid = c;
					 		if(!c)
					 		{
					 			if(r.ADVANCE_JSONS!=null && r.ADVANCE_JSONS!="")
					 			{
					 				var json=$.parseJSON(r.ADVANCE_JSONS);
					 				pid = json.pid;
					 			}
					 		}
					 		return [
						 		       $.jsonToControl(
										 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'查看状态'},events:{click:function(){
												window.frames["windowIf"].document.body.innerHTML = "";
											document.getElementById("windowIf").style.display="";
											$("#windowIf").attr("src",'tojsonfomat.do?id='+pid);
											$("#windowDiv").window({title : '查看状态:'+r.VIDEO_NAME,width:1000,height:700}).window('open');
										 return false;}}})
								] ;
					 		
					 	}
					}
					,{ 	dataindex:'ADVERT_STATUS', // 显示数据在行中的属性
					 	headtext:'状态',
					 	 render:function(i,j,c,r){
							if(c==0)
								return "禁用";
							else if(c==1)
								return "启用";
							else if(c==2)
								return "转码中";
							else if(c==3)
								return "转码成功";
							else if(c==4)
								return "转码失败";
						 }
					}
					,{
					 	dataindex:'askLeaveId',
					 	headtext:'操作',render:function(i,j,c,r){
					 		 var array=new Array();
					 		if(r.ADVERT_STATUS==2 || r.ADVERT_STATUS==4) //转码失败或转码中可以重新发送转码
					 		 {
					 			 array.push(
						 					$.jsonToControl({
												tag : 'a',style:'cursor: pointer',
												child : {
													tag : 'span',
													child : '转码'
												},
												events : {
													click : function() {
														var advertUrl=r.ADVERT_URL; //视频url
														var duration=r.ADVERT_DURATION; //时长
														if(advertUrl!=null && advertUrl!="" && duration!=null && duration!="")
														{
															$.post("reCode.do",{codeType:2,ADVERT_ID:r.ADVERT_ID,ADVERT_URL:(advertUrl.substring(0,advertUrl.indexOf("_"))),ADVERT_DURATION:(parseInt(duration.substring(0,2))*3600+parseInt(duration.substring(3,5))*60+parseInt(duration.substring(6)))},function(data){
																if((data+"")=="1")
																	$.messager.alert("提示","已重新发送转码请求","info");
																else
																	$.messager.alert("提示","转码失败","info");
																tb.load();
															});
														}
														else
														{
															$.messager.alert("提示","转码信息异常,不能转码","info");
														}
													}
												}
											})
						 			 );
					 		 }
					 		if(r.ADVERT_STATUS!="2" || r.ADVERT_STATUS!="4") //转码中，转码失败不能播放
					 		{
					 			 array.push(
					 					$.jsonToControl(
												 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'播放'},events:{click:function(){
													 var sc=r.ADVERT_DURATION;
													 var sc1=parseInt(sc.substring(0,sc.indexOf(":")))*3600
													 +parseInt(sc.substring(sc.indexOf(":")+1,sc.lastIndexOf(":")))*60
													 +parseInt(sc.substring(sc.lastIndexOf(":")+1));
													 window.open("toPlayVideo.do?playurl="+encodeURIComponent(r.ADVERT_URL.replace(/[\\]/g,"/"))+"&name="+encodeURI(encodeURI("播放广告："+r.ADVERT_NAME))+"&jumpurl="+encodeURIComponent(r.JUMP_URL));
													 }}})
					 				);
					 		}
					 		//修改
					 		array.push(
					 				 $.jsonToControl(
											 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'修改'},events:{click:function(){
													select = r;
												 	window.frames["windowIf"].document.body.innerHTML = "";
													document.getElementById("windowIf").style.display="";
													$("#windowIf").attr("src","toUpdateAdvert.do");
													$("#windowDiv").window({title : '编辑广告信息:'+r.ADVERT_NAME,width:550,height:500}).window('open');
												 return false;}}})
												);
					 		 if(r.ADVERT_STATUS=="0" || r.ADVERT_STATUS=="1") //启用、禁用
					 		 {
					 			 var isDisabled=r.ADVERT_STATUS=="1"?"禁用":"启用";
						 		 var disabledVal=r.ADVERT_STATUS=="1"?"0":"1";
						 		 array.push(
						 				$.jsonToControl(
												 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:isDisabled},events:{click:function(){
														$.post('updateAdvert.do',{ADVERT_STATUS:disabledVal,ID:r.ID},function(result){
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
						 		 );
					 		 }
					 		 array.push( $.jsonToControl(
									 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'删除'},events:{click:function(){
										 $.messager.confirm("确认","确定要删除?",function(ha){
											 	if(ha)
											 	{
													 $.post('deleteAdvert.do',{ID:r.ID,ADVERT_ID:r.ADVERT_ID},function(result){
													 		if(result==1)
													 		{
													 			tb.load();
													 			$.messager.alert("提示","删除成功","info");
													 		}
													 		else
													 			$.messager.alert("提示","删除失败","info");
													 	})
											 	}
											 });
											
										 return false;}}}));
					 		
					 		 return array;
						}
					}
			]
			,
			url:'queryAdvert.do' ,
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
		$("#windowIf").attr("src","toAddAdvert.do");
		$("#windowDiv").window({title : '新增插播广告',width:550,height:500}).window('open');
	}
	
	//跳往广告配置
	function toSet()
	{
		window.frames["windowIf"].document.body.innerHTML = "";
		document.getElementById("windowIf").style.display="";
		$("#windowIf").attr("src","toSetAdvert.do");
		$("#windowDiv").window({title : '修改参数值',width:350,height:300}).window('open');
	}
	
	//查询
	function query()
	{
		tb.load({start:0,advertName:$('#advertName').val(),ADVERT_STATUS:$("#selectStatus").val()});
	}