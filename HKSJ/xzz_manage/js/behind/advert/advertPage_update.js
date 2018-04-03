//选择的行数据
var r = window.parent.select;

$(function(){
	var key2=(new Date().getTime());
	//海报上传
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
	
	$("#ID").val(r.ID);
	$("#PAGE_ID").val(r.PAGE_ID);
	$("#PAGE_NAME").val(r.PAGE_NAME);
	$("#JUMP_URL").val(r.JUMP_URL);
	$("#PIC_INDEX").val(r.PIC_INDEX);
	$("#PIC_INDEX1").val(r.PIC_INDEX);
	//初始化一级类型
	$.ajax({
		type : "post",
		dataType : "json",
		contentType : "application/json;charset=utf-8",
		url : "getTypeOneList.do",
		success : function(result) {	
			var listHtml = "<option value=''>请选择</option><option value='0'>首页</option><option value='1'>专辑</option>";
			$.each(result, function(i, n) {
				if(n.TYPEONE_ID!="201508131311344768") //注释动漫
				{
					listHtml += "<option value="+n.TYPEONE_ID+">"+n.TYPEONE_NAME+"</option>";
				}
			});
			$("#TYPEONE_ID").html(listHtml);
			$("#TYPEONE_ID").val(r.TYPEONE_ID);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.messager.alert("提示",errorThrown,"info");
		}
	});
})
	


//保存
function add()
{
	if($("#PAGE_NAME").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","名称不能为空","info",function(){document.getElementById("PAGE_NAME").focus();});
		return;
	}
	if($("#TYPEONE_ID").val()==undefined || $("#TYPEONE_ID").val()==null || $("#TYPEONE_ID").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","一级类型不能为空","info",function(){document.getElementById("TYPEONE_ID").focus();});
		return;
	}
	if($("#JUMP_URL").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","跳转URL不能为空","info",function(){document.getElementById("JUMP_URL").focus();});
		return;
	}
//	if(!IsURL($("#JUMP_URL").val()))
//	{
//		$.messager.alert("提示","URL格式不正确,必须以http://或https://开头！","info",function(){document.getElementById("JUMP_URL").focus();});
//		return;
//	}
	if($("#PIC_INDEX").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","排序号不能为空","info",function(){document.getElementById("PIC_INDEX").focus();});
		return;
	}
	
	document.getElementById("baocunid").disabled="disabled";
	$.post('updateAdvertPage.do',$("#insertorupdForm").serialize(),function(result){
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

function IsURL(str_url){
	var str=str_url;
	//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
	//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
	//下面的代码中应用了转义字符"\"输出一个字符"/"
	var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
	return true;
	}else{
	return false;
	}
} 
