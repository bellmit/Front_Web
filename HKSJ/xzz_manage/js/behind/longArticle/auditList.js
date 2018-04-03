$(function(){ 
	var type = 0;
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
			 
			
			 if(tb.total == 0){
				 $("#getTaskBut").removeAttr("disabled");//将按钮可用 
				 $("#getTaskBut").css("background","#45b6af");
			 }else{//禁用按钮 
				 $("#getTaskBut").attr({"disabled":"disabled"});
				 $("#getTaskBut").css("background","");
			 }
			  
		    if(tb.total == 0 && isGetTaskClick){
		    	 $.messager.alert("提示","目前暂无【待审核】的长文！","info",function(){
					  return false;
					});
		    } 
			isGetTaskClick = false;
			
		}},
		rm:{evenclass:'rowEven',oddclass:'rowOdd',headclass:'cssth'}, //evenclass指定奇数行样式,oddclass指定偶数行样式,headclass指定表格头样式
		cm:[
 
					
					{ 	dataindex:'longHeadUrl', 	// 显示数据在行中的属性
					 	headtext:'导图',
					 	render:function(i,j,c,r){ 
					 		if(c!=null){
					 			return "<img src="+imgPath+c+" style='width: 50px; height: 50px'/>";
					 		}else{
					 			return "";
					 		}
					 		
						 }
					},
					{ 	dataindex:'userName', // 显示数据在行中的属性
					 	headtext:'作者' 
					},
					{ 	dataindex:'title', // 显示数据在行中的属性
					 	headtext:'标题',
				 	    render:function(i,j,c,r){ 
				 	    	if(c.length > 30){
								c = c.substring(0,30)+"...";
							} 
				 	    	return [$.jsonToControl(
									 {tag:'a',
										  style:'cursor: pointer,width:500px',
										  child:{tag:'span',child:c},
										  events:{click:function(){
											  //window.location.href="/xzzBehind/longArticle/getDetail.do?id="+r.id;
											  window.open("/xzzBehind/longArticle/getDetail.do?id="+r.id, "_blank"); 
											  return false;
											 }
										  }
									}) ]
					    }
					} 
					,{ 	dataindex:'tagName', // 显示数据在行中的属性
					 	headtext:'文章类型'
					}
					,{ 	dataindex:'praisesSum', // 显示数据在行中的属性
					 	headtext:'点赞总数'
					} 
					,{ 	dataindex:'commentSum', // 显示数据在行中的属性
					 	headtext:'评论总数'
					} /* 
					,{ 	dataindex:'isAccusation', // 显示数据在行中的属性
					 	headtext:'文章是否被举报',
					 	render:function(i,j,c,r){
					 		 return '0' == c ? '正常':'<font style="color: red">已被举报</ront>';
						 }
					}  */
					,{ 	dataindex:'createTime', // 显示数据在行中的属性
					 	headtext:'创建时间',
					 	render : function(i, j, c, r) {
							return getFormatDate(c);
						}
					} 
					,{
					 	dataindex:'status',
					 	headtext:'操作',render:function(i,j,c,r){ 
					 		 return [ 
									$.jsonToControl(
									 {tag:'a', style:'cursor: pointer',child:{tag:'span',child:"审核"},events:{click:function(){
										 window.location.href="/xzzBehind/longArticle/toAudit.do?id="+r.id;  
										  return false;}}}) 
							] ;
						}
					}
			]
			,
			url:'longArticle/getTask.do' ,
			autoload:true,
			total:'totalCount',
			root:'items'
			/*,
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
								]}*/
		});
	});
	  
	//查询
	function getTask()
	{	  
		tb.load({ 
			start :0 ,
			taskType : "getTask"
		});  
		isGetTaskClick = true;
	}