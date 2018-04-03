function add()
{
	if($("#title").val().replace(/(^\s*)|(\s*$)/g,"")=="")
	{
		$.messager.alert("提示","标题不能为空","info",function(){document.getElementById("title").focus();});
		return;
	}
	if($("#editor_id").val().replace(/(^\s*)|(\s*$)/g,"")=="")
	{
		$.messager.alert("提示","内容不能为空","info",function(){document.getElementById("editor_id").focus();});
		return;
	}
	 
	var imgUrl = $("#imgurl").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("imgurl").focus();});
	      return;
	    }
	}
	
	document.getElementById("baocunid").disabled="disabled";
	$.ajaxSetup({ 
	    async : false 
	}); 
	
	//同步内容，把富文本里面的img 上传到图片服务器，然后返回图片服务器的地址更新到富文本内容，，，也就是替换内容里的图片路径，目前不要修改富文本内容里的图片
	$.post('advertLong/imgUpload.do',{content:$("#editor_id").val()},function(result){
		$("#editor_id").val(result);
	}) 
	
	$("#editForm").ajaxSubmit({
        type:'post',
        url:'longArticle/update.do',
        success:function(result){
        	if(result == "true") //修改成功
    		{
    			$.messager.alert("提示","保存成功","info");
    			window.parent.tb.load();
    			parent.$('#windowDiv').window('close');
    		}
    		else
    		{
    			$.messager.alert("提示","保存失败","info");
    			document.getElementById("baocunid").disabled="";
    		}
        }
    });
}