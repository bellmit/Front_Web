var isLoad="0"; //-1-服务器故障  0-未上传 1-上传中 2-上传完成
	var r = window.parent.select; //选择的行数据
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
		        	$("#STOP_URL").val(infoJson.key);
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
		$("#STOP_ID").val(r.STOP_ID);
		$("#STOP_NAME").val(r.STOP_NAME);
		$("#STOP_WEIGHT").val(r.STOP_WEIGHT);
		$("#JUMP_URL").val(r.JUMP_URL);
		//初始化一级类型
		$.post("getTypeOneList.do",function(data){
			var selObj = $("#typeoneIds"); 
			for ( var d in data) {
				if((r.TYPEONE_ID).indexOf(data[d].TYPEONE_ID)==-1)
					selObj.append("<option value='"+data[d].TYPEONE_ID+"'>"+data[d].TYPEONE_NAME+"</option>");
				else
					selObj.append("<option value='"+data[d].TYPEONE_ID+"' selected='selected' >"+data[d].TYPEONE_NAME+"</option>");
			}
		})
	})
	
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
		function add()
		{
			if($("#STOP_NAME").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","名称不能为空","info",function(){document.getElementById("STOP_NAME").focus();});
				return;
			}
			if($("#typeoneIds").val()==null || $("#typeoneIds").val()=="")
			{
				$.messager.alert("提示","一级类型不能为空","info");
				return;
			}
			if($("#STOP_WEIGHT").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","权重指数不能为空","info",function(){document.getElementById("STOP_WEIGHT").focus();});
				return;
			}

			if($("#JUMP_URL").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","跳转URL不能为空","info",function(){document.getElementById("JUMP_URL").focus();});
				return;
			}
			if(!IsURL($("#JUMP_URL").val()))
			{
				$.messager.alert("提示","URL格式不正确,必须以http://或https://开头！","info",function(){document.getElementById("JUMP_URL").focus();});
				return;
			}
			document.getElementById("baocunid").disabled="disabled";
			$.post('updateAdvertStop.do',$("#advertForm").serialize(),function(result){
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