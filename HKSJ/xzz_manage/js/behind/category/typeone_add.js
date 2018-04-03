	window.onload = function() {
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
		        	$("#picUrl").val(infoJson.key);
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
	};

	function add() {
		var typeoneName =  $("#typeoneName").val();
		var orderNum =  $("#orderNum").val();
		
		
		if($("#descc").val().length>32)
		{
			$.messager.alert("提示","描述过长,最大长度为32","info",function(){document.getElementById("descc").focus();});
			return ;
		}
			
		if(typeoneName == ''){
			$.messager.alert("提示","请先填写名称！","info",function(){document.getElementById("typeoneName").focus();});
			return ;
		}
		if(orderNum == ''){
			$.messager.alert("提示","请先填写排序号！","info",function(){document.getElementById("orderNum").focus();});
			return ;
		}
		$.post('addTypeOne.do', $("#typeOneForm").serialize(),
				function(result) {
					if (result == 1) //修改成功
					{
						window.parent.tb.load();
						parent.$('#windowDiv').window('close');
					} else if(result == -1){
						$.messager.alert("提示","保存失败","info");
					}
				});
	}