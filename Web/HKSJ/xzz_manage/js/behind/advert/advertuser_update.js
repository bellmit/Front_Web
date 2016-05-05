var r = window.parent.select; //选中行数据
function IsURL(str_url){
		var str=str_url;
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

	
function update()
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
	if($("#ADVERT_ACCOUNT").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","广告商密码不能为空","info",function(){document.getElementById("ADVERT_PASSWORD").focus();});
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('validateAdvertUser.do',$("#advertUserForm").serialize(),function(result){
		if(result>=1){
			$.messager.alert("提示","广告商账户名重复","info",function(){document.getElementById("ADVERT_ACCOUNT").focus();});
			document.getElementById("baocunid").disabled="";
		}else{
			$.post('updateAdvertUser.do',$("#advertUserForm").serialize(),function(result){
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
	});
}
		
	
	window.onload = function () {
		$("#ID").val(r.ID);
		$("#ADVERTUSER_ID").val(r.ADVERTUSER_ID);
		$("#ADVERT_COMPANY").val(r.ADVERT_COMPANY);
		$("#ADVERT_CONTACTS").val(r.ADVERT_CONTACTS);
		$("#ADVERT_PHONE").val(r.ADVERT_PHONE);
		$("#ADVERT_ACCOUNT").val(r.ADVERT_ACCOUNT);
		$("#ADVERT_PASSWORD").val(r.ADVERT_PASSWORD);
		$("#OLDADVERT_PASSWORD").val(r.ADVERT_PASSWORD);
		$("#UPDATE_TIME").val(new Date());
	};
	