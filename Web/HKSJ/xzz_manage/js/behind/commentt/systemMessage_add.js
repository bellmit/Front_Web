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

//确认选中
var room_list=[         
               {
               	text:'确认选中',
               	handler:function(){ 
               			var rows =$('#userTable').datagrid('getSelections');
               			for (var i = 0; i < rows.length; i++) 
               			{
                       		$("#USER_BY").val($("#USER_BY").val()+rows[i].USER_ID+",");
                       		$("#USER_BY1").val($("#USER_BY1").val()+rows[i].USER_ID+",");
                       		
                       		var re = new RegExp(rows[i].USER_ID+",","g");
                       		var len = $("#USER_BY").val().match(re); //看是否有重复
                       		if(len.length>1) 
                       		{
                       			$("#USER_BY").val($("#USER_BY").val().replace(rows[i].USER_ID+",","") ); //如果已存在就删除
                           		$("#USER_BY1").val($("#USER_BY1").val().replace(rows[i].USER_ID+",","") ); //如果已存在就删除
                           		
                       		}
						}
               			$("#windowDiv2").window("close");
               	}
               }
               ];



//弹出层查询
function searchCX() {
	$('#userTable').datagrid({url:'selectUser.do',//singleSelect:false,toolbar:room_list,
		queryParams: getQueryParms()});
}

//弹出层选中用户
function selectRow(rowIndex,rowData)
{
	$("#USER_BY1").val(rowData.USER_ID);
	$("#USER_BY").val(rowData.USER_ID);
	$("#windowDiv2").window("close");
}

//清空选中的用户
function clearUser()
{
	$("#USER_BY1").val("");
	$("#USER_BY").val("");
}

//保存
function add()
{
	if($("#MESSAGE_DESC").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","内容不能为空","info",function(){document.getElementById("PIC_INDEX").focus();});
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	$.post('saveSystemMessage.do',$("#insertorupdForm").serialize(),function(result){
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