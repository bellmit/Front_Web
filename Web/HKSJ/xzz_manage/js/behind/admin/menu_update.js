var r = window.parent.select; //选中行数据
$(function(){
	$("#ID").val(r.id);
	$("#MENU_ID").val(r.menuId);
	$("#MENU_NAME").val(r.menuName);
	$("#URL").val(r.url);
	$("#LEAF").val(r.leaf);
	$("#LEAF_OLD").val(r.leaf);
	$("#NORTNO").val(r.nortno);
	$("#DESCC").val(r.descc);
	$("#ICON").val(r.icon);
	//一级目录
	$.post('queryOneMenu.do',function(data){
		var parHtml="<option value=\"\">请选择</option>"
		for (var i = 0; i < data.length; i++) {
			if(r.menuId != data[i].MENU_ID) //去除本身
				parHtml+="<option value=\""+data[i].MENU_ID+"\">"+data[i].MENU_NAME+"</option>";
		}
		$("#PARENT_MENU").html(parHtml);
		if(r.leaf=="0") //二级目录
		{
			$("#PARENT_MENU").val(r.parentMenu);
		}
		else if(r.leaf=="1") //一级目录
		{
			$("#PARENT_MENU").attr("disabled","disabled");
		}
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
			$.post('updateMenu.do',$("#menuForm").serialize(),function(result){
				if(result==1) //修改成功
				{
					window.parent.tb.load();
					parent.$('#windowDiv').window('close');
				}
				else if(result==-2) //一级菜单改为二级菜单
				{
					$.messager.alert("提示","该菜单下有子菜单,不能从一级菜单改为二级菜单","info");
					document.getElementById("baocunid").disabled="";
				}
				else
				{
					$.messager.alert("提示","保存失败","info");
					document.getElementById("baocunid").disabled="";
				}
			})
		}