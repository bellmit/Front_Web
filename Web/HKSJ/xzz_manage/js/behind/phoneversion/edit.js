 
function add()
{
	if($("#verno").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","版本号 不能为空","info",function(){document.getElementById("verno").focus();});
		return;
	}
/*	if($("#os").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","客户端类型不能为空","info",function(){document.getElementById("os").focus();});
		return;
	}*/
/*	if($("#url").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","下载路径不能为空","info",function(){document.getElementById("url").focus();});
		return;
	}*/
	/*if($("#remark").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","备注不能为空","info",function(){document.getElementById("remark").focus();});
		return;
	}*/
	
	if($("#os").val() == 1){
		var picone = $("#androidUrl").val(); 
		if(picone != ""){ 
			var extStart  = picone.lastIndexOf(".")+1;
			var fileext1 = picone.substring(extStart,picone.length).toUpperCase(); 
			var allowtype =  ["APK"];
			if ($.inArray(fileext1,allowtype) == -1)
			{ 
				$.messager.alert("提示","只能上传apk安装包！","info",function(){document.getElementById("androidUrl").focus();});
				$("#androidUrl").val("");
			    return false;
			}  
		} 
	}else{
		if($("#iosUrl").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","ios下载地址不能为空！","info",function(){document.getElementById("iosUrl").focus();});
			return;
		}
	}
	
	if($("#isForceUpdate").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","是否强制更新不能为空","info",function(){document.getElementById("isForceUpdate").focus();});
		return;
	}
		$("#phoneversionForm").ajaxSubmit({
			 type:'post',
		        url:'phoneversion/saveOrUpdate.do',
		        success:function(result){
		        	if(result== "OK") //修改成功
		    		{
		    			//$.messager.alert("提示","保存成功","info");
		    			window.parent.tb.load();
		    			parent.$('#windowDiv').window('close');
		    		}
		    		else if(result == "NO"){
		    			$.messager.alert("提示","保存失败","info");
		    			document.getElementById("baocunid").disabled="";
		    		} else {
		    			$.messager.alert("提示",result,"info");
		    			document.getElementById("baocunid").disabled="";
		    		}
		        }
			
		});
}