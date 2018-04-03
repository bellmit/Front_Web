var isLoad="1"; //上传状态 1-上传中 2-上传完成 3-上传失败
//选择的行数据
var r = window.parent.select;
$(function() {
	$("#ID").val(r.ID); 
	$("#VIDEO_SON_ID").val(r.VIDEO_SON_ID); 
	$("#UNIQUE_ID").val(r.UNIQUE_ID);
	$("#COUNT_SERIES").val(r.COUNT_SERIES); //总集数
	$("#SERIES_NUM1").val(r.SERIES_NUM); //序号
	$("#IS_EPISODE1").val(r.IS_EPISODE); //类型
	$("#VIDEO_CONTENT").val(r.VIDEO_CONTENT); //主表名称
	$("#VIDEO_NAME").val(r.VIDEO_NAME); //主表内容
	$("#STATUS").val(r.APPROVE_STATUS); //修改时，判断如果是审核通过状态，需要主表更新集数-1
	if(r.COUNT_SERIES==1) //剧集只有1的时候
	{
		if(r.IS_EPISODE==-1) //微视频
		{
			document.getElementById("splx").style.display="none"; //隐藏类型
			document.getElementById("onlyJj2").style.display="none"; //隐藏序号
			document.getElementById("onlyJj1").style.display="none"; //隐藏一句话介绍
			document.getElementById("onlyJj3").style.display="none"; //隐藏描述
		}
		else if(r.IS_EPISODE==1) //剧集
		{
			document.getElementById("onlyJj2").style.display="none"; //隐藏序号
			document.getElementById("onlyJj1").style.display="none"; //隐藏一句话介绍
			document.getElementById("onlyJj3").style.display="none"; //隐藏描述
			$("#IS_EPISODE").val(r.IS_EPISODE);
		}
		else
		{
			$("#IS_EPISODE").val(r.IS_EPISODE);
			$("#SERIES_NUM").val(r.SERIES_NUM); //序号
			$("#SERIES_NAME").val(r.SERIES_NAME);
			$("#SERIES_CONTENT").val(r.SERIES_CONTENT);
		}
	}
	else
	{
		$("#IS_EPISODE").val(r.IS_EPISODE);
		$("#SERIES_NAME").val(r.SERIES_NAME); 
		$("#SERIES_CONTENT").val(r.SERIES_CONTENT);
		$("#SERIES_NUM").val(r.SERIES_NUM); 
	}
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

//选择类型
function selectType(val)
{
	if(r.COUNT_SERIES==1 && val==1) //总集数为1，且选中剧集
	{
		document.getElementById("onlyJj2").style.display="none"; //隐藏序号
		document.getElementById("onlyJj1").style.display="none"; //隐藏一句话介绍
		document.getElementById("onlyJj3").style.display="none"; //隐藏描述
		$("#SERIES_NAME").val("");
		$("#SERIES_NUM").val("");
		$("#SERIES_CONTENT").val("");
	}
	else if(r.COUNT_SERIES==1 && val!=1)
	{
		document.getElementById("onlyJj2").style.display=""; //隐藏序号
		document.getElementById("onlyJj1").style.display=""; //隐藏一句话介绍
		document.getElementById("onlyJj3").style.display=""; //隐藏描述
	}
}

//保存
function add()
{
	if(r.COUNT_SERIES>1) //剧集大于1
	{
		var isEpisode=$("#IS_EPISODE").val(); //剧集、花絮、预告
		if($("#SERIES_NAME").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","看点不能为空","info",function(){document.getElementById("SERIES_NAME").focus();});
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
		if(r.isEpisode==-1) //微视频不需要类型
		{
			if(isEpisode=="")
			{
				$.messager.alert("提示","类型不能为空","info",function(){document.getElementById("IS_EPISODE").focus();});
				return;
			}
		}
		if(parseInt($("#SERIES_NUM").val()) > parseInt(r.COUNT_SERIES))
		{
			$.messager.alert("提示","序号不能大于总集数","info",function(){document.getElementById("SERIES_NUM").focus();});
			return;
		}
		if($("#SERIES_CONTENT").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","介绍不能为空","info",function(){document.getElementById("SERIES_CONTENT").focus();});
			return;
		}
		if($("#SERIES_CONTENT").val().length>100)
		{
			$.messager.alert("提示","介绍过长,最大长度为100","info",function(){document.getElementById("SERIES_CONTENT").focus();});
			return;
		}
		document.getElementById("baocunid").disabled="disabled";
	}
	else //剧集等于1
	{
		if(r.IS_EPISODE!=-1) //不是微视频
		{
			if($("#IS_EPISODE").val()=="")
			{
				$.messager.alert("提示","类型不能为空","info",function(){document.getElementById("IS_EPISODE").focus();});
				return;
			}
			if($("#IS_EPISODE").val()!=1) //不是剧集
			{
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
			}
		}
	}
	if( $("#SERIES_URL").val()!="" && ($("#DURATION").val()=="" || $("#width").val()=="" 
		|| $("#height").val()=="" || $("#bit_rate").val()==""  || $("#f_bit_rate").val()=="") )
	{
		$.messager.alert("提示","上传视频异常【返回参数】","info");
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('updateVideoSon.do',$("#insertorupdateForm").serialize(),function(result){
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