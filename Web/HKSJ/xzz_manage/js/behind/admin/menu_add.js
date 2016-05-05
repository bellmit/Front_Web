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
	if($("#MENU_NAME").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","名称不能为空","info",function(){document.getElementById("MENU_NAME").focus();});
		return;
	}
	if($("#NORTNO").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","序列号不能为空","info",function(){document.getElementById("NORTNO").focus();});
		return;
	}
	if($("#DESCC").val().length>64)
	{
		$.messager.alert("提示","描述过长，最大长度为64","info",function(){document.getElementById("DESCC").focus();});
		return;
	}
	if($("#LEAF").val()=="0")//二级菜单，必选父菜单
	{
		if($("#PARENT_MENU").val()=="")
		{
			$.messager.alert("提示","父菜单不能为空","info",function(){document.getElementById("PARENT_MENU").focus();});
			return;
		}
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('saveMenu.do',$("#menuForm").serialize(),function(result){
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