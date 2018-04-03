//选择的行数据
var r = window.parent.select;
$(function(){
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
	        		$("#msg2").html(file.name+"&nbsp;:&nbsp;"+file.percent+"%");
	        },
	        'UploadComplete': function() {
	        },
	        'FileUploaded': function(up, file, info) {
	        	$("#msg2").html(file.name+"&nbsp;:&nbsp;<span style=\"color:green\">完成</span>");
	        	var infoJson=$.parseJSON(info);
	        	$("#LEVEL_ICON").val(infoJson.key);
	        },
	        'Error': function(up, err, errTip) {
	        	$("#msg2").html(err.file.name+"&nbsp;:&nbsp;<span=\"color:red\">失败</span>");
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
	$("#LEVEL_ID").val(r.LEVEL_ID);
	$("#LEVEL_NAME").val(r.LEVEL_NAME);
	$("#LEVEL_START").val(r.LEVEL_START);
	$("#LEVEL_END").val(r.LEVEL_END);
})

//保存
function add()
{
	if($("#LEVEL_NAME").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","名称不能为空","info",function(){document.getElementById("LEVEL_NAME").focus();});
		return;
	}
	if($("#LEVEL_START").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","起始数值不能为空","info",function(){document.getElementById("LEVEL_START").focus();});
		return;
	}
	if($("#LEVEL_END").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","结束数值不能为空","info",function(){document.getElementById("LEVEL_END").focus();});
		return;
	}
	if(parseInt($("#LEVEL_END").val())<=parseInt($("#LEVEL_START").val()))
	{
		$.messager.alert("提示","结束数值必须大于起始数值","info",function(){document.getElementById("LEVEL_END").focus();});
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('updateLevel.do',$("#insertorupdForm").serialize(),function(result){
		if(result==1) //修改成功
		{
			window.parent.tb.load();
			parent.$('#windowDiv').window('close');
		}
		else
		{
			$.messager.alert("提示","保存失败","info");
			document.getElementById("baocunid").disabled="";
		}
	})
}
