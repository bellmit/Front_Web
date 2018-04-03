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
	var sycount = $("#syCount").val();
	var lbcount = $("#lbCount").val();
	var type = $("#type").val();
	var id = $("#id").val();
	if(id==null || id==0){
		if(sycount>0 && type==1){
			alert("首页图片广告最多1张");
			return;
		}
		if(lbcount>4 && type==0){
			alert("轮播图片广告最多5张");
			return;
		}
	}
	if($("#url").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","链接地址不能为空","info",function(){document.getElementById("url").focus();});
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
	$("#picReturnForm").ajaxSubmit({
        type:'post',
        url:'picReturn/picReturnSave.do',
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