
function add()
{
	
	if($("#name").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","标签名称不能为空","info",function(){document.getElementById("name").focus();});
		return;
	}
	
	if($("#statics").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","状态不能为空","info",function(){document.getElementById("statics").focus();});
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('/xzzBehind/appInterest/toSave.do',$("#appinterestForm").serialize(),function(result){
		if(result == "OK") //修改成功
		{
			window.parent.tb.load();
			parent.$('#windowDiv').window('close');
			
		} else if(result == "NO") 
		{
			$.messager.alert("提示","保存失败","info");
			document.getElementById("baocunid").disabled="";
		} else {
			$.messager.alert("提示",result,"info");
			document.getElementById("baocunid").disabled="";
		}
	})
}