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

					{ 	dataindex:'headUrl', // 显示数据在行中的属性
					 	headtext:'头像', 
					 	render:function(i,j,c,r){
					 		 return "<img src="+imgPath+c+" style='width: 50px; height: 50px'/>";
						 }
					}
		    		,
			    	{ 	dataindex:'account', // 显示数据在行中的属性
					 	headtext:'账号'
					}
					,{ 	dataindex:'nickname', // 显示数据在行中的属性
					 	headtext:'昵称',
				 	    render:function(i,j,c,r){ 
				 	    	if(c == null || c == "")
							{
				 	    		
								return "";
							}
				 	    	
							if(c.length > 30){
								c = c.substring(0,30)+"...";
							}  
				 	    	return [$.jsonToControl(
									 {tag:'a',
										  style:'cursor: pointer,width:500px',
										  child:{tag:'span',child:c},
										  events:{click:function(){
											  window.location.href="/xzzBehind/user/detail.do?id="+r.id; 
											  	return false;
											  }
										  }
									}) ]
					    }
					},{ 	
						dataindex:'mobile', // 显示数据在行中的属性
					 	headtext:'手机号'
					}
					,{ 	dataindex:'integral', // 显示数据在行中的属性
					 	headtext:'自传币'
					}
					,{ 	dataindex:'sex', // 显示数据在行中的属性
					 	headtext:'性别',
					 	 render:function(i,j,c,r){
							 if(c=="0"){ return "男";}
							 else if(c=="1"){ return "女";}
							 else {return "";}
						 }
					}  
					,{ 	dataindex:'sign', // 显示数据在行中的属性
					 	headtext:'个性签名',
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
					,{ 	
						dataindex:'status', // 显示数据在行中的属性
					 	headtext:'状态',
					 	render:function(i,j,c,r){
					 		return c == "0" ? "正常" : "<font style='color: #FF8333 '>已冻结</ront>"; 
					 	}
					},{ 	
						dataindex:'createTime', // 显示数据在行中的属性
					 	headtext:'注册时间', 
					 	render : function(i, j, c, r) {
							return getFormatDate(c);
						}
					},{ 	
						dataindex:'lastLoginTime', // 显示数据在行中的属性
					 	headtext:'最后登录时间', 
					 	render : function(i, j, c, r) {
					 		if(c == "" || c == null){
					 			return "";
					 		}
							return getFormatDate(c);
						}
					}
					,{ 	dataindex:'userType', // 显示数据在行中的属性
					 	headtext:'是否惠粉',
					 	render:function(i,j,c,r){
					 		return c == "0"? "惠粉" : "运营账户"; 
					 	}
					}
					/*,
					{ 	dataindex:'USER_TYPE', // 显示数据在行中的属性
					 	headtext:'来源',
					 	 render:function(i,j,c,r){
							 if(c=="1"){ return "小自播注册";}
							 else if(c=="3"){ return "其他产品";}
							 else {return "";}
						 }
					}
					,{ 	dataindex:'USER_STATUS', // 显示数据在行中的属性
					 	headtext:'状态',
					 	 render:function(i,j,c,r){
							 return '1' == c ? '启用':'禁用';
						 }
					}*/
					,{
					 	dataindex:'status',
					 	headtext:'操作',render:function(i,j,c,r){
					 		 var isDisabled = c == "0"?"冻结":"启用";
					 		 var disabledVal = c =="0"?"1":"0";
					 		 return [
									 $.jsonToControl(
									 {tag:'a', style:'cursor: pointer',child:{tag:'span',child:isDisabled},events:{click:function(){
										 $.messager.confirm("确认","确定要"+isDisabled+"该会员？",function(ha){
											 if(ha){	
											 	$.post('user/updataStatus.do',{status:disabledVal,id:r.id},function(result){
													if(result== "true" ) //修改成功
													{
														tb.load();
														$.messager.alert("提示",disabledVa+"成功","info");
													}  
													else
													{
														$.messager.alert("提示",disabledVa+"失败","info");
													}
												})
											 } 
									 	});
										 return false;}}})
							] ;
						}
					}
			]
			,
			url:'user/listAll.do?userType=0' ,
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
                                              }}},'条'
                                              ]}
								]}
		});
	});
	
	//查询
	function query()
	{	 
		tb.load({
			start:0,
			account:$('#account').val(),
			mobile:$('#mobile').val(),
			nickname:$('#nickname').val()
	})
}