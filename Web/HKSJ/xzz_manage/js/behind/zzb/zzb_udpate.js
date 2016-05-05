$(function(){
	//一级目录
	$.post('queryOneMenu.do',function(data){
		var parHtml="<option value=\"\">请选择</option>"
		for (var i = 0; i < data.length; i++) {
			parHtml+="<option value=\""+data[i].MENU_ID+"\">"+data[i].MENU_NAME+"</option>";
		}
		$("#PARENT_MENU").html(parHtml);
	});
});

//选择一级菜单，清空父菜单并禁用
function selectMenu(req)
{
	if(req.value=="1")
	{
		$("#PARENT_MENU").val("");
		$("#PARENT_MENU").attr("disabled","disabled");
	}
	else if(req.value=="0")
	{
		$("#PARENT_MENU").removeAttr("disabled");
	}
}



function add()
{
	if($("#amount").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","金额不能为空","info",function(){document.getElementById("amount").focus();});
		return;
	}
	if(!(/^-{0,1}[1-9][0-9]{0,9}$/.test($("#amount").val()))){
		$.messager.alert("提示","金额最多为10位有效数字","info",function(){document.getElementById("amount").focus();});
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('zzb/zzbUpdateSave.do',$("#zzbUpdateForm").serialize(),function(result){
		if(result==true) //修改成功
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
	})
}