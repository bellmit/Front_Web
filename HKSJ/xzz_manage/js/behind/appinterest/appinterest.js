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
					,{ 	dataindex:'name', // 显示数据在行中的属性
					 	headtext:'分类名称',
					 	render:function(i,j,c,r){
					 		return [$.jsonToControl(
									 {tag:'a',
										  style:'cursor: pointer,width:500px',
										  child:{tag:'span',child:r.name},
										  events:{click:function(){
											  window.location.href="/xzzBehind/appInterest/toChildrenList.do?parentId="+r.id; 
											  		return false;
											  }
										  }
									}) ];
						}
					}
					,{ 	dataindex:'sort', // 显示数据在行中的属性
					 	headtext:'序列号'
					}
					,{ 	dataindex:'statics', // 显示数据在行中的属性
					 	headtext:'状态',
						render : function(i, j, c, r) {
							return '0' == c ? '启用' : '停用';
						}
					 	
					}
					,{ 	dataindex:'comments', // 显示数据在行中的属性
					 	headtext:'备注'
					}
					,{
					 	dataindex:'askLeaveId',
					 	headtext:'操作',render:function(i,j,c,r){
					 		 return [
					 		       $.jsonToControl(
									 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'编辑'},events:{click:function(){
										 	select = r;
										 	window.frames["windowIf"].document.body.innerHTML = "";
											document.getElementById("windowIf").style.display="";
											$("#windowIf").attr("src",'/xzzBehind/appInterest/toDetail.do?id='+r.id);
											$("#windowDiv").window({title : '编辑分类:'+r.name,width:400,height:300}).window('open');
										 return false;}}})
							] ;
						}
					}
			]
			,
			url:'/xzzBehind/appInterest/toQuery.do' ,
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
	
	//查询
	function query()
	{
		tb.load({statics:$('#statics').val(),name:$('#name').val(),comments:$('#comments').val()});
	}
	
	//跳往添加
	function toAdd()
	{
		window.frames["windowIf"].document.body.innerHTML = "";
		document.getElementById("windowIf").style.display="";
		$("#windowIf").attr("src","/xzzBehind/appInterest/toAdd.do");
		$("#windowDiv").window({title : '新增分类',width:400,height:300}).window('open'); 
	}
	//跳往排序
	function toSort()
	{
		window.frames["windowIf"].document.body.innerHTML = "";
		document.getElementById("windowIf").style.display="";
		$("#windowIf").attr("src","appInterest/toSort.do");
		$("#windowDiv").window({title : '列表排序',width:350,height:400}).window('open'); 
	}
