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

			    	{ 	dataindex:'ADVERT_COMPANY', // 显示数据在行中的属性
					 	headtext:'公司名称'
					}
					,{ 	dataindex:'ADVERT_CONTACTS', // 显示数据在行中的属性
					 	headtext:'联系人'
					},{ 	
						dataindex:'ADVERT_PHONE', // 显示数据在行中的属性
					 	headtext:'联系电话'
					},{ 	
						dataindex:'ADVERT_ACCOUNT', // 显示数据在行中的属性
					 	headtext:'广告商账户'
					}
					,{ 	dataindex:'CREATE_TIME', // 显示数据在行中的属性
					 	headtext:'创建时间',
					 	render:function(i,j,c,r){
					 		if(c==null||c==''){
					 			return '';
					 		}
					 		return new Date(c).format("yyyy-MM-dd hh:mm:ss");
						}
					}
					,{
					 	dataindex:'askLeaveId',
					 	headtext:'操作',render:function(i,j,c,r){
					 		 var array=new Array();
					 		//修改
					 		array.push(
					 				 $.jsonToControl(
											 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'修改'},events:{click:function(){
													select = r;
												 	window.frames["windowIf"].document.body.innerHTML = "";
													document.getElementById("windowIf").style.display="";
													$("#windowIf").attr("src","toUpdateAdvertUser.do");
													$("#windowDiv").window({title : '编辑广告商信息:'+r.ADVERT_COMPANY,width:550,height:300}).window('open');
												 return false;}}})
												);
					 		 array.push( $.jsonToControl(
									 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'删除'},events:{click:function(){
										 $.messager.confirm("确认","确定要删除该信息?",function(ha){
											 	if(ha)
											 	{
													 $.post('deleteAdvertUser.do',{ID:r.ID,ADVERTUSER_ID:r.ADVERTUSER_ID},function(result){
													 		if(result==1)
													 		{
													 			tb.load();
													 			$.messager.alert("提示","删除成功","info");
													 		}
													 		else if(result==2)
													 		{
													 			$.messager.alert("提示","广告商名下尚有广告，无法删除","info");
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
			url:'queryAdvertUserMap.do' ,
			autoload:true,
			total:'totalCount',
			root:'items' ,
			footbar:{
					tag:'div','class':'pageBox pre',child:[
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
			$("#windowIf").attr("src","toAddAdvertUser.do");
			$("#windowDiv").window({title : '新增广告商账户',width:400,height:350}).window('open');
		}
		
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
		
	//查询
	function query()
	{	
		tb.load({start:0,ADVERT_COMPANY:$('#ADVERT_COMPANY').val()});
		
	}