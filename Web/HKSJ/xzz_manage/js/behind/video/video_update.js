//选择的行数据
var r = window.parent.select;
var isyghx; //该视频是否有多个剧集
$(function(){
	var key2=(new Date().getTime()+"b");
	var key3=(new Date().getTime()+"c");
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
	    console.log('hello man,a file is uploaded');
	    
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
	    console.log('hello man,a file is uploaded');
	    
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
	
	//初始化文本框
	$('#ID').val(r.ID);
	$('#VIDEO_NAME').val(r.VIDEO_NAME);
	$('#VIDEO_ID').val(r.VIDEO_ID);
	$('#VIDEOTYPE_TWO_SPAN').val(r.VIDEOTYPE_TWO_SPAN);
	$('#VIDEO_AUTHOR').val(r.VIDEO_AUTHOR);
	$('#VIDEO_CONTENT').val(r.VIDEO_CONTENT);
	$('#VIDEO_YEAR').val(r.VIDEO_YEAR);
	$('#VIDEO_REGION').val(r.VIDEO_REGION);
	$('#LANGUAGE').val(r.LANGUAGE);
	$('#VIDEO_WEIGHT').val(r.VIDEO_WEIGHT);
	$('#COUNT_SERIES').val(r.COUNT_SERIES);
	$("#VIDEO_AUTHOR").val(r.VIDEO_AUTHOR);
	$("#VIDEO_ACTOR").val(r.VIDEO_ACTOR);
	$("#VIDEO_PROFILE").val(r.VIDEO_PROFILE);
	$("#ADMIN_OR_USER").val(r.ADMIN_OR_USER);
	$("#VIDEOTYPE_ONE1").val(r.VIDEOTYPE_ONE);
	
	
	document.getElementById("baocunid").style.display="none";
	$.post('checkMoreSon.do',{UNIQUE_ID:r.VIDEO_ID},function(data){
		var jsonDate=$.parseJSON(data);
		document.getElementById("baocunid").style.display="";
		isyghx=jsonDate.isyghx;
		if(jsonDate.isyghx==1)
		{
			$("#spjt").val(jsonDate.spjt);
		}	
	})
	
	//初始化一级级联动
	$.post("getTypeOneList.do",function(data){
		var selObj = $("#VIDEOTYPE_ONE"); 
		for ( var d in data) {
			selObj.append("<option value='"+data[d].TYPEONE_ID+"'>"+data[d].TYPEONE_NAME+"</option>");
		}
		$("#VIDEOTYPE_ONE").val(r.VIDEOTYPE_ONE);
		//初始化二级类型
		var selObj1 = $("#VIDEOTYPE_TWO"); 
		$.post("getTypeTwoList.do",{TYPEONE_ID:r.VIDEOTYPE_ONE},function(data1){
			for ( var d in data1) {
				if(r.TYPETWO_ID!=null &&  r.TYPETWO_ID.indexOf(data1[d].TYPETWO_ID) > -1 )
					selObj1.append("<option value='"+data1[d].TYPETWO_ID+"'  selected='selected'>"+data1[d].TYPETWO_NAME+"</option>");
				else
					selObj1.append("<option value='"+data1[d].TYPETWO_ID+"'>"+data1[d].TYPETWO_NAME+"</option>");
			}
		});
		//初始化马甲
		var selObj2 = $("#VEST");
		$("#VEST").html("");
		selObj2.append("<option value=''>请选择</option>");
		$.post("queryVest.do",{TYPEONE_ID:r.VIDEOTYPE_ONE},function(data2){
			for ( var d in data2) {
				if(data2[d].USER_ID==r.VEST)
					selObj2.append("<option value='"+data2[d].USER_ID+"' selected='selected'>"+data2[d].NICK+"</option>");
				else
					selObj2.append("<option value='"+data2[d].USER_ID+"'>"+data2[d].NICK+"</option>");
			}
		});
		//初始化总集数 片头 片尾
		if(r.VIDEOTYPE_ONE=="201508131310570453") 
		{
			$("#COUNT_SERIES").val("1");
			document.getElementById("COUNT_SERIES").readOnly="readOnly";
			document.getElementById("onlyJj4").style.display="none";//片头
			document.getElementById("onlyJj5").style.display="none";//片尾
			$("#TITLES").val("");
			$("#TRAILER").val("");
			document.getElementById("spdy").style.display="none"; //视频导演
			document.getElementById("spzy").style.display="none"; //视频主演
			document.getElementById("spjj").style.display="none"; //视频简介
			document.getElementById("spnd").style.display="none"; //视频年代
		}
		else
		{
			if(parseInt(r.COUNT_SERIES)>1)
			{
				document.getElementById("onlyJj4").style.display="";
				document.getElementById("onlyJj5").style.display="";
				$("#TITLES").val(r.TITLES); 
				$("#TRAILER").val(r.TRAILER);
			}
		}
	});
	
	//前台用户上传，隐藏
	if(r.ADMIN_OR_USER==2)
	{
		$("#isMj").hide();
		$("#isYj").hide();
	}
	
	if(r.VIDEOTYPE_ONE=="201508131310570453") //微视频不让修改总集数
	{
		document.getElementById("COUNT_SERIES").readOnly="readOnly";
	}
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
				if(r.TYPETWO_ID!=null &&  r.TYPETWO_ID.indexOf(data[d].TYPETWO_ID) > -1 )
					selObj.append("<option value='"+data[d].TYPETWO_ID+"'  selected='selected'>"+data[d].TYPETWO_NAME+"</option>");
				else
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
				if(data[d].USER_ID==r.VEST)
					selObj1.append("<option value='"+data[d].USER_ID+"' selected='selected'>"+data[d].NICK+"</option>");
				else
					selObj1.append("<option value='"+data[d].USER_ID+"'>"+data[d].NICK+"</option>");
			}
		});
	}
	
	//选择微视频
	if(typeoneid=="201508131310570453") 
	{
		$("#COUNT_SERIES").val("1");
		document.getElementById("COUNT_SERIES").readOnly="readOnly";
		document.getElementById("onlyJj4").style.display="none"; //片头
		document.getElementById("onlyJj5").style.display="none";//片尾
		$("#TITLES").val("");
		$("#TRAILER").val("");
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
		document.getElementById("COUNT_SERIES").readOnly="";
		document.getElementById("spdy").style.display=""; //视频导演
		document.getElementById("spzy").style.display=""; //视频主演
		document.getElementById("spjj").style.display=""; //视频简介
		document.getElementById("spnd").style.display=""; //视频年代
		if(parseInt($("#COUNT_SERIES").val())>1)
		{
			document.getElementById("onlyJj4").style.display=""; //片头
			document.getElementById("onlyJj5").style.display=""; //片尾
		}
		
	}
	
}


//总集数限制只能输入数字
function checkNum(req)
{	
	var val=req.value.replace(/\D/g,'');
	req.value=val;
	if(val.length>0 && parseInt(val)>1) //大于1
	{
		$("#onlyJj4").removeAttr("style");
		$("#onlyJj5").removeAttr("style");
	}
	else
	{
		$("#onlyJj4").attr("style","display:none");
		$("#onlyJj5").attr("style","display:none");
		$("#TITLES").val("");
		$("#TRAILER").val("");
	}
}


//保存
function add()
{
	if($("#VIDEO_NAME").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","名称不能为空","info",function(){document.getElementById("VIDEO_NAME").focus();});
		return;
	}
	if(r.ADMIN_OR_USER==1) //前台上传隐藏一级类型
	{
		if($("#VIDEOTYPE_ONE").val()==null || $("#VIDEOTYPE_ONE").val()=="")
		{
			$.messager.alert("提示","一级类型不能为空","info",function(){document.getElementById("VIDEOTYPE_ONE").focus();});
			return;
		}
	}
	if($("#VIDEOTYPE_TWO").val()==null || $("#VIDEOTYPE_TWO").val()=="")
	{
		$.messager.alert("提示","二级类型不能为空","info",function(){document.getElementById("VIDEOTYPE_TWO").focus();});
		return;
	}
	if(r.ADMIN_OR_USER==1) //后台上传的才有马甲账号
	{
		if($("#VEST").val()=="")
		{
			$.messager.alert("提示","马甲账号不能为空","info",function(){document.getElementById("VEST").focus();});
			return;
		}
	}
	if($("#VIDEOTYPE_ONE").val()!="201508131310570453") //微视频不需要导演、主演、简介
	{
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
	if(parseInt($("#COUNT_SERIES").val())==0)
	{
		$.messager.alert("提示","总集数不能为0","info",function(){document.getElementById("COUNT_SERIES").focus();});
		return;
	}
	if(parseInt($("#COUNT_SERIES").val()) < r.UPDATE_SERIES )
	{
		$.messager.alert("提示","总集数不能小于以更新的集数！","info",function(){document.getElementById("COUNT_SERIES").focus();});
		return;
	}
	if(r.ADMIN_OR_USER==1 && isyghx>1 &&  $("#VIDEOTYPE_ONE").val()=="201508131310570453")  //后台上传，且该视频有多个剧集就不能改为微视频
	{
		$.messager.alert("提示","只有一条剧集或预告或花絮才能改为微视频","info",function(){document.getElementById("VIDEOTYPE_ONE").focus();});
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
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('updateVideo.do',$("#insertorupdateForm").serialize(),function(result){
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