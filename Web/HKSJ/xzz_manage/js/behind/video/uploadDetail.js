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
					 		var name=c;
					 		if(r.COUNT_SERIES>1 && r.IS_EPISODE==1)
					 			name+="&nbsp;第"+r.SERIES_NUM+"集"
				 			if(name==null)
							{
								return "";
							}
							else
							{
								if(name.length > 10){
									return "<span title='"+name+"'>"+name.substring(0,10)+"...</span>";
								}else{
									return name;
								}
							}
					 	}
					}
					,
					{
						dataindex : 'PIC_URL', // 显示数据在行中的属性
						headtext : '视频截图',
						render:function(i, j, c, r) {	
					 		return c==null?"":"<a title=\"点击查看\" href=\"javascript:void(0)\" onclick=\"showPic(\'"+$("#videoUrl").val()+""+c.replace(/[\\]/g,"/")+"\')\">"+c+"</a>";
					 	}
					}
					,{ 	dataindex:'TYPEONE_NAME', // 显示数据在行中的属性
					 	headtext:'一级类型'
					}
					,{ 	dataindex:'TYPETWO_NAME', // 显示数据在行中的属性
					 	headtext:'二级类型'
					}
					,{ 	dataindex:'DURATION', // 显示数据在行中的属性
					 	headtext:'时长'
					}
					,
					{
						dataindex : 'IS_EPISODE', // 显示数据在行中的属性
						headtext : '类型',
						render : function(i, j, c, r) {
							var x;
							switch (c) {
							case 1:
								x = "剧集";
								break;
							case 2:
								x = "预告";
								break;
							case 3:
								x = "花絮";
								break;
							case -1:
								x = "微视频";
								break;
							default:
								x = "未知";
								break;
							}
							return x;
						}
					}
					,{ 	dataindex:'SERIES_NUM', // 显示数据在行中的属性
					 	headtext:'剧集序号'
					}
					,{ 	dataindex:'COUNT_SERIES', // 显示数据在行中的属性
					 	headtext:'总集数'
					}
					,{ 	dataindex:'ADMIN_OR_USER', // 显示数据在行中的属性
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
							var str="";
					 		str+= "账号:"+r.USER_NAME+"/昵称:"+r.NICK+"/电话："+r.CELLPHONE;
					 		if(str.length > 15){
								return "<span title='"+str+"'>"+str.substring(0,15)+"...</span>";
							}else{
								return str;
							}	
					 	}
					}
					,
					{
						dataindex : 'VIDEO_BB', // 显示数据在行中的属性
						headtext : '给予播币'
					}
					,
					{
						dataindex : 'APPROVE_STATUS', // 显示数据在行中的属性
						headtext : '状态',
						render : function(i, j, c, r) {
							var x;
							switch (c) {
							case 0:
								x = "转码中";
								break;
							case 1:
								x = "转码成功（待审批）";
								break;
							case 2:
								x = "转码失败";
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
											$("#windowDiv").window({title : '查看状态:'+r.VIDEO_NAME,width:530,height:750, top:($(window).height()-750)*0.5,left:($(window).width()-530)*0.5}).window('open');
										 return false;}}})
								] ;
					 		
					 	}
					},
					{
						dataindex : 'TYPEONE_NAME', // 显示数据在行中的属性
						headtext : '审核情况',
						render:function(i,j,c,r){
								 return [
							 		       $.jsonToControl(
											 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'查看'},events:{click:function(){
												 videoSonDetail(r.VIDEO_NAME,r.VIDEO_SON_ID);	
												 return false;}}})
									] ;
						}
					}
					,{
					 	dataindex:'askLeaveId',
					 	headtext:'操作',render:function(i,j,c,r){
					 		if(!iskf($("#userRoleId").val())){
					 		 var array=new Array();
					 		 if(r.APPROVE_STATUS==0 || r.APPROVE_STATUS==2) //转码失败或转码中可以重新发送转码
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
														var seriesUrl=r.SERIES_URL; //视频url
														var duration=r.DURATION; //时长
														if(seriesUrl!=null && seriesUrl!="" && duration!=null && duration!="" 
															&& r.HEIGHT!=null && r.HEIGHT!=""  && r.WIDTH!=null && r.WIDTH!="" && r.BITRATE!=null && r.BITRATE!="" && r.FBITRATE!=null && r.FBITRATE!="")
														{
															$.post("reCode.do",{codeType:1,f_bit_rate:r.FBITRATE,height:r.HEIGHT,width:r.WIDTH,bit_rate:r.BITRATE,callStatus:0,VIDEO_SON_ID:r.VIDEO_SON_ID,SERIES_URL:(seriesUrl.substring(0,seriesUrl.indexOf("."))),DURATION:(parseInt(duration.substring(0,2))*3600+parseInt(duration.substring(3,5))*60+parseInt(duration.substring(6)))},function(data){
																if(data=="1")
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
					 		 if(r.APPROVE_STATUS!=0 && r.APPROVE_STATUS!=2) //转码成功才可以播放视频
					 		 {
					 			 array.push(
					 					$.jsonToControl({
											tag : 'a',style:'cursor: pointer',
											child : {
												tag : 'span',
												child : '播放'
											},
											events : {
												click : function() {
													var str=r.VIDEO_NAME;
													select = r;
													if(r.COUNT_SERIES>1)
														str+=" 第"+r.SERIES_NUM+"集";
													window.open("toPlayVideo.do?playurl="+encodeURIComponent(r.SERIES_URL.replace(/[\\]/g,"/"))+"&name="+encodeURI(encodeURI("播放视频："+str)));
												}
											}
										})
					 			 );
					 		 }
					 		if(r.ADMIN_OR_USER==1) //后台上传才可以编辑
					 		 {
						 		array.push(  $.jsonToControl(
										 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'编辑'},events:{click:function(){
										 		select = r;
										 		var str=r.VIDEO_NAME;
												if(r.COUNT_SERIES>1)
													str+=" 第"+r.SERIES_NUM+"集";
												window.frames["windowIf"].document.body.innerHTML = "";
												document.getElementById("windowIf").style.display="";
												$("#windowIf").attr("src",'toUpdateUploadDetail.do');
												$("#windowDiv").window({title : '编辑:'+str,width:530,height:300,top:($(window).height()-300)*0.5,left:($(window).width()-530)*0.5}).window('open');
											 return false;}}}));
					 		 }
					 		if(r.APPROVE_STATUS==1 || r.APPROVE_STATUS==3 || r.APPROVE_STATUS==4 || r.APPROVE_STATUS==6) //可以审核的状态
					 		 {
						 		array.push(  $.jsonToControl(
										 {tag:'a',style:'cursor: pointer', child:{tag:'span',child:'审核'},events:{click:function(){
										 		select = r;
										 		var str=r.VIDEO_NAME;
												if(r.COUNT_SERIES>1)
													str+=" 第"+r.SERIES_NUM+"集";
												if(r.ADMIN_OR_USER==2)
													str+="   &nbsp;&nbsp;上传者:"+((r.USER_NAME==null || r.USER_NAME=='')?r.NICK:r.USER_NAME);
												window.frames["windowIf"].document.body.innerHTML = "";
												document.getElementById("windowIf").style.display="";
												$("#windowIf").attr("src",'toCheckUploadDetail.do');
												$("#windowDiv").window({title : '审核:'+str,width:530,height:300,top:($(window).height()-300)*0.5,left:($(window).width()-530)*0.5}).window('open');
											 return false;}}}));
					 		 }
					 		return array;
						}
					}
				}
			]
			,
			url:'queryUploadDetail.do' ,
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
		tb.load({start:0,NICK:$("#NICK").val(),CELLPHONE:$("#CELLPHONE").val(),USER_NAME:$("#userName").val(),VIDEO_NAME:$('#videoName').val(),APPROVE_STATUS:$("#selectStatus").val(),TYPEONE_ID:$("#selectTypeOne").val(),TYPETWO_ID:$("#selectTypeTwo").val(),bTime:($('#StartTime').val()==""?"":($('#StartTime').val()+" 00:00:00") ),eTime:($('#endtime').val()==""?"":($('#endtime').val()+" 23:59:59") ),ADMIN_OR_USER:$("#selectQht").val()});
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
					width:650,height:450, top:($(window).height()-450)*0.5,left:($(window).width()-450)*0.5,
					href : 'tovideoshenhei.do',
					onLoad : function() {
						$("#VIDEO_SON_ID").val(videoid);
						searchCX();
					}
				}); 
		win.window('open');
	}
	

	//弹出层查询条件
	function getQueryParms() {
		var parms = { 
				VIDEO_ID:$("#VIDEO_SON_ID").val(),
				IS_EPISODE:$("#jjType").val()
		}; 
		return parms;
	}

	//弹出层查询
	function searchCX() {
		$('#videoTable').datagrid({url:'queryVideohts.do',
			queryParams: getQueryParms()});
	}
	
	
	function formatName(val,index){
		var jjyg="";
		if(val==null || val==-1)
			jjyg="";
		else if(val==1)
			jjyg="涉嫌违法";
		else if(val==2)
			jjyg="侵害他人权利";
		else if(val==3)
			jjyg="含垃圾信息";
		else if(val==4)
			jjyg="违反社会公德";
		else if(val==5)
			jjyg="有logo或境外台标";
		else if(val==6)
			jjyg="描述不准确";
		else if(val==7)
			jjyg="时长小于1分钟";
		else if(val==8)
			jjyg="视频重复";
		else
			jjyg=val;
		return jjyg;
	}
	
	function formatType(val,index)
	{
		var jjyg="";
		if(val==null || val==-1)
			jjyg="";
		else if(val==3)
			jjyg="审核通过";
		else if(val==4)
			jjyg="审核不通过";
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