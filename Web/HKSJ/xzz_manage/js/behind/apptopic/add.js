
function add()
{
	if($("#title").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","标题不能为空","info",function(){document.getElementById("title").focus();});
		return;
	}
	if($("#status").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","状态不能为空","info",function(){document.getElementById("status").focus();});
		return;
	}
	if($("#remark").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","描述不能为空","info",function(){document.getElementById("remark").focus();});
		return;
	}
	if($("#editor_id").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","内容不能为空","info",function(){document.getElementById("editor_id").focus();});
		return;
	}
	
	var imgUrl = $("#picUrl1").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("picUrl1").focus();});
	      return;
	    }
	}
	
	$.ajaxSetup({ 
	    async : false 
	}); 
	
	$.post('advertLong/imgUpload.do',{content:$("#editor_id").val()},function(result){
		$("#editor_id").val(result);
	});
	
	document.getElementById("baocunid").disabled="disabled";
	$("#appTopicForm").ajaxSubmit({
		 type:'post',
	        url:'appTopic/saveOrUpdate.do',
	        success:function(result){
	        	if(result== "OK") //修改成功
	    		{
	    			$.messager.alert("提示","保存成功","info");
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