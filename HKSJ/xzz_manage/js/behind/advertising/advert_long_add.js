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
function editePic(){
	$("#urlI").hide();
	$("#warn").hide();
	$("#urlF").show();
}


function add()
{
	if($("#title").val().replace(/(^\s*)|(\s*$)/g,"")=="")
	{
		$.messager.alert("提示","广告标题不能为空","info",function(){document.getElementById("title").focus();});
		return;
	}
	if($("#content").val().replace(/(^\s*)|(\s*$)/g,"")=="")
	{
		$.messager.alert("提示","广告内容不能为空","info",function(){document.getElementById("content").focus();});
		return;
	}
	if($("#advertUrl").val().replace(/(^\s*)|(\s*$)/g,"")=="")
	{
		$.messager.alert("提示","链接地址不能为空","info",function(){document.getElementById("advertUrl").focus();});
		return;
	}
	var imgUrl = $("#urlF").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF").focus();});
	      return;
	    }
	}
	document.getElementById("baocunid").disabled="disabled";
	$.ajaxSetup({ 
	    async : false 
	}); 
	$.post('advertLong/imgUpload.do',{content:$("#content").val()},function(result){
		$("#content").val(result);
	}) 
	$("#advertLongForm").ajaxSubmit({
        type:'post',
        url:'advertLong/advertLongSave.do',
        success:function(result){
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
        }
    });
}