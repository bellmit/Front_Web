function set()
{
	var parentNodes = $('#tt').tree('getChecked','indeterminate');  //选中节点的父节点
	var nodes = $('#tt').tree('getChecked');  //选中的节点 
	var s = '';  
    for(var i=0; i<parentNodes.length; i++){  
        if (s != '') s += ',';  
        s += parentNodes[i].id;  
    } 
    for(var i=0; i<nodes.length; i++){  
        if (s != '') s += ',';  
        s += nodes[i].id;  
    }
	$.post('saveMenuForRole.do',{roleid:$("#roleid").val(),menuids:s},function(result){
		if(result==1) //修改成功
		{
			parent.$('#windowDiv').window('close');
		}
		else
		{
			$.messager.alert("提示","保存失败","info");
		}
	})
}