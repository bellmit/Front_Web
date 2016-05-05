var isLoad="1"; //上传状态 1-上传中 2-上传完成 3-上传失败
//选择的行数据
var r = window.parent.select;
$(function() {
	$("#UNIQUE_ID").val(r.VIDEO_ID); //视频主表业务id
	var key1=(new Date().getTime());
	//视频上传
	var uploader1 = Qiniu.uploader({
	    runtimes: 'html5,flash,html4',
	    browse_button: 'pickfiles1',
	    container: 'container1',
	    drop_element: 'container1',
	    max_file_size: '10GB',
	    flash_swf_url: 'js/plupload/Moxie.swf',
	    dragdrop: true,
	    chunk_size: '4mb',
	    multi_selection:false, //多选文件
	    filters:[
	    	{ title : "Video files", extensions : "asx,asf,mpg,wmv,3gp,mp4,mov,avi,flv,mkv" }
		],
	    uptoken_url: 'callUploadVideo.do?key='+key1,
	    domain: 'http://7xl2av.com2.z0.glb.qiniucdn.com/',
	    auto_start: true,
	    init: {
	        'FilesAdded': function(up, files) {
	        	KeepSessionAlive(); //上传大视频，保持session不断
	        },
	        'BeforeUpload': function(up, file) {
	        	
	        },
	        'UploadProgress': function(up, file) {
	        	var fileName=file.name;
	    		if(fileName.length > 14){
	    			fileName = fileName.substring(0,10)+"***"+fileName.substring(fileName.lastIndexOf("."));
	    		}
	        	$("#msg1").html("<span title=\""+file.name+"\">"+fileName+"</span>&nbsp;:&nbsp;"+file.percent+"%");
	        },
	        'UploadComplete': function() {
	        },
	        'FileUploaded': function(up, file, info) {
	        	isLoad="2"; //上传完成
	        	var fileName=file.name;
	    		if(fileName.length > 14){
	    			fileName = fileName.substring(0,10)+"***"+fileName.substring(fileName.lastIndexOf("."));
	    		}
	        	$("#msg1").html("<span title=\""+file.name+"\">"+fileName+"</span>&nbsp;:&nbsp;<span style=\"color:green\">完成</span>");
	        	var infoJson=$.parseJSON(info);
	        	$("#SERIES_URL").val(infoJson.key);
	        	$("#DURATION").val(infoJson.duration); //时长
	        	$("#SIZE").val(file.size); //视频大小
	        	$("#width").val(infoJson.width); //视频宽
	        	$("#height").val(infoJson.height); //视频高
	        	$("#bit_rate").val(infoJson.bit_rate); //视频码率
	        	$("#f_bit_rate").val(infoJson.f_bit_rate); //全局视频码率
	        },
	        'Error': function(up, err, errTip) {
	        	isLoad="3"; //上传失败
	        	var fileName=err.file.name;
	    		if(fileName.length > 14){
	    			fileName = fileName.substring(0,10)+"***"+fileName.substring(fileName.lastIndexOf("."));
	    		}
	        	$("#msg1").html("<span title=\""+err.file.name+"\">"+fileName+"</span>&nbsp;:&nbsp;<span style=\"color:red\">失败</span>");
	        },
	         'Key': function(up, file) {
	             return  key1;
	         }
	    }
	});
	
	uploader1.bind('FileUploaded', function() {
	    console.log('hello man,a file is uploaded');
	    
	});
	$('#container1').on(
	    'dragenter',
	    function(e) {
	        e.preventDefault();
	        $('#container1').addClass('draging');
	        e.stopPropagation();
	    }
	).on('drop', function(e) {
	    e.preventDefault();
	    $('#container1').removeClass('draging');
	    e.stopPropagation();
	}).on('dragleave', function(e) {
	    e.preventDefault();
	    $('#container1').removeClass('draging');
	    e.stopPropagation();
	}).on('dragover', function(e) {
	    e.preventDefault();
	    $('#container1').addClass('draging');
	    e.stopPropagation();
	});
});

//上传大文件保持session不断
function KeepSessionAlive() {
	if(isLoad=="1"){
        $.get("keepSessionAlive.do");
        var s = setTimeout(KeepSessionAlive, 1140000);
	}
}

//保存
function add()
{
	var isEpisode=$("#IS_EPISODE").val(); //剧集、花絮、预告
	if($("#SERIES_URL").val()=="")
	{
		$.messager.alert("提示","上传视频不能为空","info");
		return;
	}
	if($("#SERIES_NAME").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","一句话介绍不能为空","info",function(){document.getElementById("SERIES_NAME").focus();});
		return;
	}
	if($("#SERIES_NUM").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","序号不能为空","info",function(){document.getElementById("SERIES_NUM").focus();});
		return;
	}
	if(parseInt($("#SERIES_NUM").val().replace(/[ ]/g,""))<=0)
	{
		$.messager.alert("提示","序号必须大于0","info",function(){document.getElementById("SERIES_NUM").focus();});
		return;
	}
	if( isEpisode=="1") //总集数为1， 剧集：剧集序号不能大于总集数
	{
		if(parseInt($("#SERIES_NUM").val()) > parseInt(r.COUNT_SERIES))
		{
			$.messager.alert("提示","序号不能大于总集数","info",function(){document.getElementById("SERIES_NUM").focus();});
			return;
		}
	}
	if($("#SERIES_CONTENT").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","看点不能为空","info",function(){document.getElementById("SERIES_CONTENT").focus();});
		return;
	}
	if($("#SERIES_CONTENT").val().length>100)
	{
		$.messager.alert("提示","介绍过长,最大长度为100","info",function(){document.getElementById("SERIES_CONTENT").focus();});
		return;
	}
	if($("#SERIES_URL").val()=="" || $("#DURATION").val()=="" || $("#width").val()=="" 
		|| $("#height").val()=="" || $("#bit_rate").val()==""  || $("#f_bit_rate").val()=="" )
	{
		$.messager.alert("提示","上传视频异常【返回参数】","info");
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('saveVideoSon.do',$("#insertorupdateForm").serialize(),function(result){
		if(result==1) //修改成功
		{
			window.parent.tb.load();
			parent.$('#windowDiv').window('close');
		}
		if(result==2) //序号已存在
		{
			$.messager.alert("提示","序号已存在","info");
			document.getElementById("baocunid").disabled="";
		}
		else
		{
			$.messager.alert("提示","保存失败","info");
			document.getElementById("baocunid").disabled="";
		}
	})
}