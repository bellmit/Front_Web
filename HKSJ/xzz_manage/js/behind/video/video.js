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
					 	headtext:'视频名称',
				 		render : function(i, j, c, r) {
							if(c==null)
							{
								return "";
							}
							else
							{
								if(c.length > 10){
									return "<span title='"+c+"'>"+c.substring(0,10)+"...</span>";
								}else{
									return c;
								}
							}
						}	
					},
					{
						dataindex : 'PIC_URL_X', // 显示数据在行中的属性
						headtext : '横海报',
						render:function(i, j, c, r) {
							if(r.VIDEOTYPE_ONE=="201508131310570453")//微视频
								return c==null?"":"<a title=\"点击查看\" href=\"javascript:void(0)\" onclick=\"showPic(\'"+$("#videoUrl").val()+""+c.replace(/[\\]/g,"/")+"\')\">"+c+"</a>";
							else
								return c==null?"":"<a title=\"点击查看\" href=\"javascript:void(0)\" onclick=\"showPic(\'"+$("#imageUrl").val()+""+c.replace(/[\\]/g,"/")+"\')\">"+c+"</a>";
					 	}
					},
					{
						dataindex : 'PIC_URL', // 显示数据在行中的属性
						headtext : '竖海报',
						render:function(i, j, c, r) {	
							if(r.VIDEOTYPE_ONE=="201508131310570453")//微视频
								return c==null?"":"<a title=\"点击查看\" href=\"javascript:void(0)\" onclick=\"showPic(\'"+$("#videoUrl").val()+""+c.replace(/[\\]/g,"/")+"\')\">"+c+"</a>";
							else
								return c==null?"":"<a title=\"点击查看\" href=\"javascript:void(0)\" onclick=\"showPic(\'"+$("#imageUrl").val()+""+c.replace(/[\\]/g,"/")+"\')\">"+c+"</a>";
					 	}
					}
					,{ 	dataindex:'TYPEONE_NAME', // 显示数据在行中的属性
					 	headtext:'一级类型'
					}
					,{ 	dataindex:'TYPETWO_NAME', // 显示数据在行中的属性
					 	headtext:'二级类型',
				 		render : function(i, j, c, r) {
							if(c==null)
							{
								return "";
							}
							else
							{
								if(c.length > 30){
									return "<span title='"+c+"'>"+c.substring(0,30)+"...</span>";
								}else{
									return c;
								}
							}
						}	
					}
					,{ 	dataindex:'VIDEO_REGION', // 显示数据在行中的属性
					 	headtext:'地区'
					}
					,{ 	dataindex:'VIDEO_WEIGHT', // 显示数据在行中的属性
					 	headtext:'权重'
					}
					,{ 	dataindex:'UPDATE_SERIES', // 显示数据在行中的属性
					 	headtext:'更新集数'
					}
					,{ 	dataindex:'COUNT_SERIES', // 显示数据在行中的属性
					 	headtext:'总集数'
					}
					,
					{ 	dataindex:'ADMIN_OR_USER', // 显示数据在行中的属性
					 	headtext:'前后/台上传',
					 	render : function(i, j, c, r) {
					 		if(c==1)
					 			return "后台";
					 		else
					 			return "前台";
					 	}
					},
					{ 	dataindex:'CREATE_TIME', // 显示数据在行中的属性
					 	headtext:'上传时间',
					 	render:function(i,j,c,r){
					 		if(c==null||c==''){
					 			return '';
					 		}
					 		return new Date(c).format("yyyy-MM-dd hh:mm:ss");
						}
					}
					,{ 	dataindex:'USER_NAME', // 显示数据在行中的属性
					 	headtext:'上传者',
					 	render : function(i, j, c, r) {
					 		if(c==null || c=="")
					 			return r.NICK;
					 		else
					 			return c;
					 	}
					},
					{
						dataindex : 'APPROVE_STATUS', // 显示数据在行中的属性
						headtext : '状态',
						render : function(i, j, c, r) {
							var x;
							switch (c) {
							case 0:
								x = "待审批";
								break;
							case 1:
								x = "待审批";
								break;
							case 2:
								x = "待审批";
								break;
							case 3:
								x = "审批通过（上架）";
								break;
							case 4:
								x = "审批不通过";
								break;
							case 5:
								x = "下架";
								break;
							case 6:
								x = "删除";
								break;	
							default:
								x = "未知";
								break;
							}
							return x;
						}
					}
					,{dataindex:'askLeaveId',
					 	headtext:'操作',render:function(i,j,c,r){
					 		 var array=new Array();
					 		array.push(
								 		       $.jsonToControl(
												 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'修改'},events:{click:function(){
												 		select = r;
														window.frames["windowIf"].document.body.innerHTML = "";
														document.getElementById("windowIf").style.display="";
														$("#windowIf").attr("src",'toUpdateVideo.do');
														$("#windowDiv").window({title : '编辑视频:'+r.VIDEO_NAME,width:530,height:750,top:($(window).height()-750)*0.5,left:($(window).width()-530)*0.5}).window('open');
													 return false;}}})
										);
					 		if(r.TYPEONE_NAME=="微视频"){
					 			return array;	
					 		}else{
					 		array.push(
					 			
					 				 $.jsonToControl(
											 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'查看剧集'},events:{click:function(){
												 videoSonDetail(r.VIDEO_NAME,r.VIDEO_ID);	
												 return false;}}})
					 		);
					 		}
					 		return array;		
					 	
						}
					}
			]
			,
			url:'queryVideoManager.do' ,
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
	//初始化一级类型
	$.ajax({
		type : "post",
		dataType : "json",
		contentType : "application/json;charset=utf-8",
		url : "getTypeOneList.do",
		success : function(result) {	
			var listHtml = "<option value=''>请选择</option>";
			$.each(result, function(i, n) {
				listHtml += "<option value="+n.TYPEONE_ID+">"+n.TYPEONE_NAME+"</option>";

			});
			$("#selectTypeOne").html(listHtml);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.messager.alert("提示",errorThrown,"info");
		}
	});		
});


//选中一级类型
function selectOne(val)
{	
	if(val=="")
	{
		$("#selectTypeTwo").html("<option value=''>请选择</option>");
	}
	else
	{
		//二级类型
		$.ajax({
			type : "post",
			dataType : "json",
			contentType : "application/json;charset=utf-8",
			url : "getTypeTwoList.do?TYPEONE_ID="+val,
			success : function(result) {	
				var listHtml = "<option value=''>请选择</option>";
				$.each(result, function(i, n) {
					listHtml += "<option value="+n.TYPETWO_ID+">"+n.TYPETWO_NAME+"</option>";

				});
				$("#selectTypeTwo").html(listHtml);
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.messager.alert("提示",errorThrown,"info");
			}
		});
	}
}

//查询
function query()
{	 
	tb.load({start:0,APPROVE_STATUS:$("#selectStatus").val(),VIDEO_NAME:$('#videoName').val(),TYPEONE_ID:$("#selectTypeOne").val(),
		TYPETWO_ID:$("#selectTypeTwo").val(),bTime:($("#StartTime").val()==""?"":($("#StartTime").val()+" 00:00:00") ),eTime:($("#endtime").val()==""?"":($("#endtime").val()+" 23:59:59")),ADMIN_OR_USER:$("#selectQht").val()});
}

//点击图片弹出框放大
function showPic(wzurl)
{
	window.frames["windowIf1"].document.body.innerHTML = "";
	document.getElementById("windowIf1").style.display="";
	$("#windowIf1").attr("src",'showPhoto.do?photoUrl='+wzurl);
	$("#windowDiv1").window({title : '展示',maximized:true}).window('open');
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
