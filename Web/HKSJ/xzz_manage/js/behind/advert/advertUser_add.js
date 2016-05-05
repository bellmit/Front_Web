//保存
function add()
{
	if($("#ADVERT_COMPANY").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","公司名称不能为空","info",function(){document.getElementById("ADVERT_COMPANY").focus();});
		return;
	}
	if($("#ADVERT_CONTACTS").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","联系人不能为空","info",function(){document.getElementById("ADVERT_CONTACTS").focus();});
		return;
	}
	if($("#ADVERT_PHONE").val().replace(/[ ]/g,"")==""||!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($("#ADVERT_PHONE").val()) ||
			(/^([0-9]{3,4}-)?[0-9]{7,8}$/.test($("#ADVERT_PHONE").val()))
		))
	{
		$.messager.alert("提示","联系电话为空或者格式不对","info",function(){document.getElementById("ADVERT_PHONE").focus();});
		return;
	}
	if($("#ADVERT_ACCOUNT").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","广告商账户不能为空","info",function(){document.getElementById("ADVERT_ACCOUNT").focus();});
		return;
	}
	if($("#ADVERT_PASSWORD").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","广告商密码不能为空","info",function(){document.getElementById("ADVERT_PASSWORD").focus();});
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('validateAdvertUser.do',$("#addAdvertUserForm").serialize(),function(result){
		if(result>=1){
			$.messager.alert("提示","广告商账户名重复","info",function(){document.getElementById("ADVERT_ACCOUNT").focus();});
			document.getElementById("baocunid").disabled="";
		}else{
			$.post('saveAdvertUser.do',$("#addAdvertUserForm").serialize(),function(result){
				if(result==1) //修改成功
				{
					window.parent.tb.load({start:0});
					parent.$('#windowDiv').window('close');
				}
				if(result==-1) //序号已存在
				{
					$.messager.alert("提示","排列号已存在","info",function(){document.getElementById("TYPE").focus();});
					document.getElementById("baocunid").disabled="";
				}
				else
				{
					$.messager.alert("提示","保存失败","info");
					document.getElementById("baocunid").disabled="";
				}
			})
		}
	});
}
