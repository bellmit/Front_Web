var isLoad="1"; //上传状态 1-上传中 2-上传完成 3-上传失败
$(function() {
	var key1=(new Date().getTime()+"a");
	var key2=(new Date().getTime()+"b");
	var key3=(new Date().getTime()+"c");
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
	
	//横版海报上传
	var Q3 = new QiniuJsSDK();
	var uploader3 = Q3.uploader({
	    runtimes: 'html5,flash,html4',
	    browse_button: 'pickfiles3',
	    container: 'container3',
	    drop_element: 'container3',
	    max_file_size: '30MB',
	    flash_swf_url: 'js/plupload/Moxie.swf',
	    dragdrop: true,
	    chunk_size: '4mb',
	    multi_selection:false, //多选文件
	    filters:[
	    	{ title : "Image files", extensions : "jpg,png,gif" }
		],
	    uptoken_url: 'callUploadImage.do?key='+key3,
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
	        	$("#msg3").html("<span title=\""+file.name+"\">"+fileName+"</span>&nbsp;:&nbsp;"+file.percent+"%");
	        },
	        'UploadComplete': function() {
	        },
	        'FileUploaded': function(up, file, info) {
	        	var fileName=file.name;
	    		if(fileName.length > 14){
	    			fileName = fileName.substring(0,10)+"***"+fileName.substring(fileName.lastIndexOf("."));
	    		}
	        	$("#msg3").html("<span title=\""+file.name+"\">"+fileName+"</span>&nbsp;:&nbsp;<span style=\"color:green\">完成</span>");
	        	var infoJson=$.parseJSON(info);
	        	$("#PIC_URL_X").val(infoJson.key);
	        },
	        'Error': function(up, err, errTip) {
	        	var fileName=err.file.name;
	    		if(fileName.length > 14){
	    			fileName = fileName.substring(0,10)+"***"+fileName.substring(fileName.lastIndexOf("."));
	    		}
	        	$("#msg3").html("<span title=\""+err.file.name+"\">"+fileName+"</span>&nbsp;:&nbsp;<span style=\"color:red\">失败</span>");
	        },
	         'Key': function(up, file) {
	             return key3;
	         }
	    }
	});
	
	uploader3.bind('FileUploaded', function() {
	    
	});
	$('#container3').on(
	    'dragenter',
	    function(e) {
	        e.preventDefault();
	        $('#container3').addClass('draging');
	        e.stopPropagation();
	    }
	).on('drop', function(e) {
	    e.preventDefault();
	    $('#container3').removeClass('draging');
	    e.stopPropagation();
	}).on('dragleave', function(e) {
	    e.preventDefault();
	    $('#container3').removeClass('draging');
	    e.stopPropagation();
	}).on('dragover', function(e) {
	    e.preventDefault();
	    $('#container3').addClass('draging');
	    e.stopPropagation();
	});
	
	//初始化大类、小类二级联动
	$.post("getTypeOneList.do",function(data){
		var selObj = $("#VIDEOTYPE_ONE"); 
		for ( var d in data) {
				selObj.append("<option value='"+data[d].TYPEONE_ID+"'>"+data[d].TYPEONE_NAME+"</option>");
		}
	})

});

//根据typeoneid获取typetwo、马甲账号
function initTypeTwo(typeoneid)
{	
	var selObj = $("#VIDEOTYPE_TWO");
	$("#VIDEOTYPE_TWO").html("");
	if(typeoneid!='')
	{
		$.post("getTypeTwoList.do",{TYPEONE_ID:typeoneid},function(data){
			for ( var d in data) {
				selObj.append("<option value='"+data[d].TYPETWO_ID+"'>"+data[d].TYPETWO_NAME+"</option>");
			}
		});
		
	}
	//马甲
	var selObj1 = $("#VEST");
	$("#VEST").html("");
	if(typeoneid!='')
	{
		selObj1.append("<option value=''>请选择</option>");
		$.post("queryVest.do",{TYPEONE_ID:typeoneid},function(data){
			for ( var d in data) {
				selObj1.append("<option value='"+data[d].USER_ID+"'>"+data[d].NICK+"</option>");
			}
		});
		
	}
	//微视频隐藏视频类型，默认为-1
	if(typeoneid=="201508131310570453")
	{
		document.getElementById("splx").style.display="none";
		$("#IS_EPISODE").val("");
		$("#COUNT_SERIES").val("1"); //总集数必须为1
		document.getElementById("COUNT_SERIES").readOnly="readOnly"; //总集数禁用
		checkNum({"value":"1"});
		document.getElementById("spdy").style.display="none"; //视频导演
		document.getElementById("spzy").style.display="none"; //视频主演
		document.getElementById("spjj").style.display="none"; //视频简介
		document.getElementById("spnd").style.display="none"; //视频年代
		$("#VIDEO_AUTHOR").val("");
		$("#VIDEO_ACTOR").val("");
		$("#VIDEO_PROFILE").val("");
		$("#VIDEO_YEAR").val("");
	}
	else
	{
		document.getElementById("splx").style.display="";
		document.getElementById("COUNT_SERIES").readOnly=""; //总集数禁用
		document.getElementById("spdy").style.display=""; //视频导演
		document.getElementById("spzy").style.display=""; //视频主演
		document.getElementById("spjj").style.display=""; //视频简介
		document.getElementById("spnd").style.display=""; //视频年代
	}
	
}

//总集数限制只能输入数字
function checkNum(req)
{	
	var val=req.value.replace(/\D/g,'');
	req.value=val;
	if(val.length>0 && parseInt(val)>1) //大于1
	{
		$("#onlyJj1").removeAttr("style");
		$("#onlyJj2").removeAttr("style");
		$("#onlyJj3").removeAttr("style");
		$("#onlyJj4").removeAttr("style");
		$("#onlyJj5").removeAttr("style");
	}
	else
	{
		$("#onlyJj1").attr("style","display:none");
		$("#onlyJj2").attr("style","display:none");
		$("#onlyJj3").attr("style","display:none");
		$("#onlyJj4").attr("style","display:none");
		$("#onlyJj5").attr("style","display:none");
		$("#SERIES_NAME").val("");
		$("#SERIES_NUM").val("");
		$("#SERIES_CONTENT").val("");
		$("#TITLES").val("");
		$("#TRAILER").val("");
	}
}

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
	if($("#SERIES_URL").val()=="")
	{
		$.messager.alert("提示","上传视频不能为空","info");
		return;
	}
	if($("#VIDEOTYPE_ONE").val()!="201508131310570453") //微视频不需要横竖海报
	{
		if($("#PIC_URL").val()=="")
		{
			$.messager.alert("提示","竖版海报不能为空","info");
			return;
		}
		if($("#PIC_URL_X").val()=="")
		{
			$.messager.alert("提示","横版海报不能为空","info");
			return;
		}
	}
	if($("#VIDEO_NAME").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","名称不能为空","info",function(){document.getElementById("VIDEO_NAME").focus();});
		return;
	}
	if($("#VIDEOTYPE_ONE").val()==null || $("#VIDEOTYPE_ONE").val()=="")
	{
		$.messager.alert("提示","一级类型不能为空","info",function(){document.getElementById("VIDEOTYPE_ONE").focus();});
		return;
	}
	if($("#VIDEOTYPE_TWO").val()==null || $("#VIDEOTYPE_TWO").val()=="")
	{
		$.messager.alert("提示","二级类型不能为空","info",function(){document.getElementById("VIDEOTYPE_TWO").focus();});
		return;
	}
	if($("#VEST").val()=="")
	{
		$.messager.alert("提示","马甲账号不能为空","info",function(){document.getElementById("VEST").focus();});
		return;
	}
	if($("#VIDEOTYPE_ONE").val()!="201508131310570453") //微视频：视频类型默认为-1
	{
		if($("#IS_EPISODE").val()=="")
		{
			$.messager.alert("提示","视频类型不能为空","info",function(){document.getElementById("IS_EPISODE").focus();});
			return;
		}
		if($("#VIDEO_AUTHOR").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","视频导演不能为空","info",function(){document.getElementById("VIDEO_AUTHOR").focus();});
			return;
		}
		if($("#VIDEO_ACTOR").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","视频主演不能为空","info",function(){document.getElementById("VIDEO_ACTOR").focus();});
			return;
		}
		if($("#VIDEO_PROFILE").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","视频看点不能为空","info",function(){document.getElementById("VIDEO_PROFILE").focus();});
			return;
		}
		if($("#VIDEO_YEAR").val()=="")
		{
			$.messager.alert("提示","年代不能为空","info",function(){document.getElementById("VIDEO_YEAR").focus();});
			return;
		}
	}
	if($("#VIDEO_CONTENT").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","视频介绍不能为空","info",function(){document.getElementById("VIDEO_CONTENT").focus();});
		return;
	}
	if($("#VIDEO_CONTENT").val().length>1000)
	{
		$.messager.alert("提示","视频介绍过长,最大长度为1000","info",function(){document.getElementById("VIDEO_CONTENT").focus();});
		return;
	}
	if($("#VIDEO_REGION").val()=="")
	{
		$.messager.alert("提示","视频地区不能为空","info",function(){document.getElementById("VIDEO_REGION").focus();});
		return;
	}
	if($("#VIDEO_WEIGHT").val()=="")
	{
		$.messager.alert("提示","视频权重不能为空","info",function(){document.getElementById("VIDEO_REGION").focus();});
		return;
	}
	if($("#COUNT_SERIES").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","总集数不能为空","info",function(){document.getElementById("COUNT_SERIES").focus();});
		return;
	}
	else
	{
		if(parseInt($("#COUNT_SERIES").val())==0)
		{
			$.messager.alert("提示","总集数不能为0","info",function(){document.getElementById("COUNT_SERIES").focus();});
			return;
		}
		if(parseInt($("#COUNT_SERIES").val())>1)
		{
			if($("#TITLES").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","片头不能为空","info",function(){document.getElementById("TITLES").focus();});
				return;
			}
			if($("#TRAILER").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","片尾不能为空","info",function(){document.getElementById("TRAILER").focus();});
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
			if($("#IS_EPISODE").val()=="1") //剧集：剧集序号不能大于总集数
			{
				if(parseInt($("#SERIES_NUM").val()) > parseInt($("#COUNT_SERIES").val()))
				{
					$.messager.alert("提示","序号不能大于总集数","info",function(){document.getElementById("SERIES_NUM").focus();});
					return;
				}
			}
			if($("#SERIES_CONTENT").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","剧集介绍不能为空","info",function(){document.getElementById("SERIES_CONTENT").focus();});
				return;
			}
			if($("#SERIES_CONTENT").val().length>100)
			{
				$.messager.alert("提示","剧集介绍过长,最大长度为100","info",function(){document.getElementById("SERIES_CONTENT").focus();});
				return;
			}
		}
	}
	if($("#SERIES_URL").val()=="" || $("#DURATION").val()=="" || $("#width").val()=="" 
		|| $("#height").val()=="" || $("#bit_rate").val()==""  || $("#f_bit_rate").val()=="" )
	{
		$.messager.alert("提示","上传视频异常【返回参数】","info");
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('saveVideo.do',$("#insertorupdateForm").serialize(),function(result){
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