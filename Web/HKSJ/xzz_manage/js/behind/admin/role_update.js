function update()
		{
			if($("#roleName").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","名称不能为空","info",function(){document.getElementById("roleName").focus();});
				return;
			}
			if($("#roleDescc").val().length>128)
			{
				$.messager.alert("提示","描述过长，最大长度为128","info",function(){document.getElementById("roleDescc").focus();});
				return;
			}
			document.getElementById("baocunid").disabled="disabled";
			$.post('updateRole.do',$("#roleForm").serialize(),function(result){
				if(result==1) //修改成功
				{
					window.parent.tb.load();
					parent.$('#windowDiv').window('close');
				}
				else
				{
					$.messager.alert("提示","保存失败","info");
				}
			})
		}