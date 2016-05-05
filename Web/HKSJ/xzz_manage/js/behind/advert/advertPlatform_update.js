//选择的行数据
var r = window.parent.select;
window.onload = function () {
	var key2=(new Date().getTime());
	var Q2 = new QiniuJsSDK();
	var uploader2 = Q2.uploader({
	    runtimes: 'html5,flash,html4',
	    browse_button: 'pickfiles2',
	    container: 'container2',
	    drop_element: 'container2',
	    max_file_size: '30MB',
	    flash_swf_url: 'js/plupload/Moxie.swf',
	    dragdrop: true,
	    chunk_size: '4mb',
	    multi_selection:false, //多选文件
	    filters:[
	    	{ title : "Image files", extensions : "jpg,png,gif" }
		],
	    uptoken_url: 'callUploadImage.do?key='+key2,
	    domain: 'http://7xl24j.com2.z0.glb.qiniucdn.com/',
	    auto_start: true,
	    init: {
	        'FilesAdded': function(up, files) {
	           
	        },
	        'BeforeUpload': function(up, file) {
	        	
	        },
	        'UploadProgress': function(up, file) {
	        	var fileName=file.name;
	    		if(fileName.length > 14){
	    			fileName = fileName.substring(0,10)+"***"+fileName.substring(fileName.lastIndexOf("."));
	    		}
	        	$("#msg2").html("<span title=\""+file.name+"\">"+fileName+"</span>&nbsp;:&nbsp;"+file.percent+"%");
	        },
	        'UploadComplete': function() {
	        },
	        'FileUploaded': function(up, file, info) {
	        	var fileName=file.name;
	    		if(fileName.length > 14){
	    			fileName = fileName.substring(0,10)+"***"+fileName.substring(fileName.lastIndexOf("."));
	    		}
	        	$("#msg2").html("<span title=\""+file.name+"\">"+fileName+"</span>&nbsp;:&nbsp;<span style=\"color:green\">完成</span>");
	        	var infoJson=$.parseJSON(info);
	        	$("#PIC_URL").val(infoJson.key);
	        },
	        'Error': function(up, err, errTip) {
	        	var fileName=err.file.name;
	    		if(fileName.length > 14){
	    			fileName = fileName.substring(0,10)+"***"+fileName.substring(fileName.lastIndexOf("."));
	    		}
	        	$("#msg2").html("<span title=\""+err.file.name+"\">"+fileName+"</span>&nbsp;:&nbsp;<span style=\"color:red\">失败</span>");
	        
	        },
	         'Key': function(up, file) {
	             return  key2;
	         }
	    }
	});
	
	uploader2.bind('FileUploaded', function() {
	    
	});
	$('#container2').on(
	    'dragenter',
	    function(e) {
	        e.preventDefault();
	        $('#container2').addClass('draging');
	        e.stopPropagation();
	    }
	).on('drop', function(e) {
	    e.preventDefault();
	    $('#container2').removeClass('draging');
	    e.stopPropagation();
	}).on('dragleave', function(e) {
	    e.preventDefault();
	    $('#container2').removeClass('draging');
	    e.stopPropagation();
	}).on('dragover', function(e) {
	    e.preventDefault();
	    $('#container2').addClass('draging');
	    e.stopPropagation();
	});
	
	$("#VIDEO_ID").val(r.VIDEO_ID);
	$("#VIDEO_ID1").val(r.VIDEO_NAME);
	$("#TYPE").val(r.TYPE);
	$("#TYPE1").val(r.TYPE);
	$("#ID").val(r.ID);
	//初始化一级类型
	$.ajax({
		type : "post",
		dataType : "json",
		contentType : "application/json;charset=utf-8",
		url : "getTypeOneList.do",
		success : function(result) {
			var listHtml = "<option value='0'>首页</option>";
			$.each(result, function(i, n) {
				listHtml += "<option value="+n.TYPEONE_ID+">"+n.TYPEONE_NAME+"</option>";
			});
			$("#TYPEONE_ID").html(listHtml);
			$("#TYPEONE_ID").val(r.TYPEONE_ID);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.messager.alert("提示",errorThrown,"info");
		}
	});
	
	
		
	};

//选择一级类型
function setOne(val)
{
//	if(val!='0') //首页
//	{
//		$("#VIDEO_ID").val("");
//		$("#VIDEO_ID1").val("");
//	}
}	
	
//弹出层选择视频
function selectVideo()
{
	var win = $('#windowDiv2').window(
			{
				iconCls : 'icon-tcc',
				title : '选择视频',
				href : 'toSelectVideo.do',
				onLoad : function() {
					$('#videoTable').datagrid({data:[]});
					//初始化一级类型
					$.ajax({
						type : "post",
						dataType : "json",
						contentType : "application/json;charset=utf-8",
						url : "getTypeOneList.do",
						success : function(result) {	
							var listHtml = "";
							$("#typetwo").html(listHtml);
							$.each(result, function(i, n) {
								listHtml += "<option value="+n.TYPEONE_ID+">"+n.TYPEONE_NAME+"</option>";

							});
							$("#typeone").html(listHtml);
							var one=$("#TYPEONE_ID").val();
							if(one!="0") //首页
							{
								$("#typeone").val(one);
								//$("#typeone").attr("disabled","disabled");
								selectOne(one);
							}
							searchCX();
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							$.messager.alert("提示",errorThrown,"info");
						}
					});
				}
			}); 
	win.window('open');
}

//弹出层查询条件
function getQueryParms() {
	var parms = { 
			VIDEO_NAME:$('#videoName').val(),
			TYPEONE_ID:$('#typeone').val(),
			TYPETWO_ID:$('#typetwo').val(),
			type:1,  //不需要 “专辑”
			tableType:1 //是首页一级页面头部推荐
	}; 
	return parms;
}

//弹出层查询
function searchCX() {
	$('#videoTable').datagrid({url:'selectVideo.do',
		queryParams: getQueryParms()});
}

//弹出层选中用户
function selectRow(rowIndex,rowData)
{
	$("#VIDEO_ID1").val(rowData.VIDEO_NAME);
	$("#VIDEO_ID").val(rowData.VIDEO_SON_ID);
	$("#windowDiv2").window("close");
}

//选中一级类型
function selectOne(val)
{	
	if(val=="")
	{
		$("#typetwo").html("<option value=''>请选择</option>");
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
				$("#typetwo").html(listHtml);
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.messager.alert("提示",errorThrown,"info");
			}
		});
	}
}

//保存
function update()
{
	if($("#VIDEO_ID").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","视频不能为空","info",function(){document.getElementById("VIDEO_ID").focus();});
		return;
	}
	if($("#TYPEONE_ID").val()==undefined || $("#TYPEONE_ID").val()==null || $("#TYPEONE_ID").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","一级类型不能为空","info",function(){document.getElementById("TYPEONE_ID").focus();});
		return;
	}
	if($("#TYPE").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","排列号不能为空","info",function(){document.getElementById("TYPE").focus();});
		return;
	}
	
	document.getElementById("baocunid").disabled="disabled";
	$.post('updateAdvertPlatform.do',$("#insertorupdForm").serialize(),function(result){
		if(result==1) //修改成功
		{
			window.parent.tb.load({start:0});
			parent.$('#windowDiv').window('close');
		}
		if(result==-1) //序号已存在
		{
			$.messager.alert("提示","排列号已存在","info",function(){document.getElementById("TYPE").focus();});
			document.getElementById("baocunid").disabled="";
		}
		else
		{
			$.messager.alert("提示","保存失败","info");
			document.getElementById("baocunid").disabled="";
		}
	})
}


function formatName(val,index)
{
	var str=val;
	if(index.COUNT_SERIES>1) //电视剧
	{
		if(index.IS_EPISODE=="1" || index.IS_EPISODE=="2" ) //剧集、预告拼接集数
		{
			str+=val+" 第"+index.SERIES_NUM+"集";
		}
	}
	return str;
}


function formatType(val,index)
{
	var jjyg="";
	if(val==null || val==-1)
		jjyg="剧集";
	else if(val==1)
		jjyg="剧集";
	else if(val==2)
		jjyg="预告";
	else if(val==3)
		jjyg="花絮";
	else
		jjyg="";
	return jjyg;
}