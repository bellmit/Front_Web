//弹出层选择用户
function selectUser()
{
	var win = $('#windowDiv2').window(
			{
				iconCls : 'icon-tcc',
				title : '选择用户',
				href : 'toSelectUser.do',
				onLoad : function() {
					searchCX();
				}
			}); 
	win.window('open');
}

//弹出层查询条件
function getQueryParms() {
	var parms = { 
			USER_NAME:$('#USER_NAME').val(),
			CELLPHONE:$('#CELLPHONE').val()
	}; 
	return parms;
}

//弹出层查询
function searchCX() {
	$('#userTable').datagrid({url:'selectUser.do',
		queryParams: getQueryParms()});
}

//弹出层选中用户
function selectRow(rowIndex,rowData)
{
	$("#USER_ID1").val(rowData.USER_ID);
	$("#USER_ID").val(rowData.USER_ID);
	$("#INTEGRATION_CHANGE_BAK").val(rowData.USER_ACCOUNT);
	$("#msg").html("(播币余额:"+rowData.USER_ACCOUNT+")");
	$("#windowDiv2").window("close");
}

//校验正负小数
function checkNum(val)
{
	var reg = /^[+-]?\d*\.?\d+$/;  
	  return reg.test(val);
}

//新增积分明细
function add()
{
	if($("#USER_ID").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","用户不能为空","info",function(){document.getElementById("USER_ID").focus();});
		return;
	}
	if($("#INTEGRATION_CHANGE").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","明细不能为空","info",function(){document.getElementById("INTEGRATION_CHANGE").focus();});
		return;
	}
	var bbye=($("#INTEGRATION_CHANGE_BAK").val()=="")?0:$("#INTEGRATION_CHANGE_BAK").val(); //选择用户剩余播币
	if(parseFloat($("#INTEGRATION_CHANGE").val())<0 && parseFloat(bbye)<Math.abs(parseFloat($("#INTEGRATION_CHANGE").val())))
	{
		$.messager.alert("提示","超出剩余播币","info",function(){document.getElementById("INTEGRATION_CHANGE").focus();});
		return;
	}
	if(!checkNum($("#INTEGRATION_CHANGE").val()))
	{
		$.messager.alert("提示","格式：+(-)数字","info",function(){document.getElementById("INTEGRATION_CHANGE").focus();});
		return;
	}
	if($("#INTEGRATION_DESC").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","描述不能为空","info",function(){document.getElementById("INTEGRATION_DESC").focus();});
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('saveIntegrationDetail.do',$("#insertorupdForm").serialize(),function(result){
		if(result==1) //修改成功
		{
			window.parent.tb.load({start:0});
			parent.$('#windowDiv').window('close');
		}
		else if(result==0)
		{
			$.messager.alert("提示","登录名、昵称有重复","info");
			document.getElementById("baocunid").disabled="";
		}
		else
		{
			$.messager.alert("提示","保存失败","info");
			document.getElementById("baocunid").disabled="";
		}
	})
}