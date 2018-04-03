var isLoad="1"; //上传状态 1-上传中 2-上传完成 3-上传失败
$(function(){
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
	        	$("#ADVERT_URL").val(infoJson.key);
	        	$("#ADVERT_DURATION").val(infoJson.duration); //时长
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
	
	//初始化二级类型
	$.ajax({
		type : "post",
		dataType : "json",
		contentType : "application/json;charset=utf-8",
		url : "getTypeTwoList.do",
		success : function(result) {	
			var listHtml = "";
			$.each(result, function(i, n) {
				listHtml += "<option value="+n.TYPETWO_ID+">"+n.TYPETWO_NAME+"</option>";

			});
			$("#typetwoId").html(listHtml);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.messager.alert("提示",errorThrown,"info");
		}
	});
	
});


//弹出层选择视频
function selectAdvertUser()
{
	var win = $('#windowDiv2').window(
			{
				iconCls : 'icon-tcc',
				title : '选择公司',
				href : 'toSelectAdvertUser.do',
				onLoad : function() {
					searchCX();
				}
			}); 
	win.window('open');
}



//弹出层查询条件
function getQueryParms() {
	var parms = { 
			ADVERT_COMPANY:$('#advertCompany').val(),
	}; 
	return parms;
}

//弹出层查询
function searchCX() {
	$('#videoTable').datagrid({url:'selectAdvertUser.do',
		queryParams: getQueryParms()});
}

//弹出层选中用户
function selectRow(rowIndex,rowData)
{
	$("#ADVERTUSER_ID").val(rowData.ADVERTUSER_ID);
	$("#ADVERTUSER_ID1").val(rowData.ADVERT_COMPANY);
	$("#windowDiv2").window("close");
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


//校验小数
function IsNum(val)
{
	var reg = /^\d*\.?\d+$/;  
	  return reg.test(val);
}

		var isLoad="0"; //-1-服务器故障  0-未上传 1-上传中 2-上传完成
		function add()
		{
			if($("#ADVERT_URL").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","上传视频不能为空","info");
				return;
			}
			if($("#ADVERTUSER_ID").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","公司不能为空","info",function(){document.getElementById("ADVERTUSER_ID").focus();});
				return;
			}
			if($("#ADVERT_NAME").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","广告名称不能为空","info",function(){document.getElementById("ADVERT_NAME").focus();});
				return;
			}
			if($("#ADVERT_MONEY").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","投放金额不能为空","info",function(){document.getElementById("ADVERT_MONEY").focus();});
				return;
			}
			if(!IsNum($("#ADVERT_MONEY").val()))
			{
				$.messager.alert("提示","投放金额只能是数值","info",function(){document.getElementById("ADVERT_MONEY").focus();});
				return;
			}
			if($("#ADVERT_PRICE").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","单价不能为空","info",function(){document.getElementById("ADVERT_PRICE").focus();});
				return;
			}
			if(!IsNum($("#ADVERT_PRICE").val()))
			{
				$.messager.alert("提示","单价只能是数值","info",function(){document.getElementById("ADVERT_PRICE").focus();});
				return;
			}
			if((parseFloat($("#ADVERT_PRICE").val())/1000)>parseFloat($("#ADVERT_MONEY").val()) )
			{
				$.messager.alert("提示","单价大于投放金额","info",function(){document.getElementById("ADVERT_PRICE").focus();});
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
			if($("#typetwoId").val()==null || $("#typetwoId").val()=="")
			{
				$.messager.alert("提示","类型不能为空","info");
				return;
			}
			if($("#ADVERT_WEIGHT").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","权重指数不能为空","info",function(){document.getElementById("ADVERT_WEIGHT").focus();});
				return;
			}
			document.getElementById("baocunid").disabled="disabled";
			$.post('saveAdvert.do',$("#advertForm").serialize(),function(result){
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
	
	function KeepSessionAlive() {
		if(isLoad=="1"){
	        $.get("keepSessionAlive.do");
	        var s = setTimeout(KeepSessionAlive, 1140000);
		}
  	}
	
	