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
function editePic1(){
	$("#urlI1").hide();
	$("#warn1").hide();
	$("#p1").attr("value","");
	$("#urlF1").show();
}
function editePic2(){
	$("#urlI2").hide();
	$("#warn2").hide();
	$("#p2").attr("value","");
	$("#urlF2").show();
}
function editePic3(){
	$("#urlI3").hide();
	$("#warn3").hide();
	$("#p3").attr("value","");
	$("#urlF3").show();
}
function editePic4(){
	$("#urlI4").hide();
	$("#warn4").hide();
	$("#p4").attr("value","");
	$("#urlF4").show();
}
function editePic5(){
	$("#urlI5").hide();
	$("#warn5").hide();
	$("#p5").attr("value","");
	$("#urlF5").show();
}
function editePic6(){
	$("#urlI6").hide();
	$("#warn6").hide();
	$("#p6").attr("value","");
	$("#urlF6").show();
}
function editePic7(){
	$("#urlI7").hide();
	$("#warn7").hide();
	$("#p7").attr("value","");
	$("#urlF7").show();
}
function editePic8(){
	$("#urlI8").hide();
	$("#warn8").hide();
	$("#p8").attr("value","");
	$("#urlF8").show();
}
function editePic9(){
	$("#urlI9").hide();
	$("#warn9").hide();
	$("#p9").attr("value","");
	$("#urlF9").show();
}

function add()
{
	if($("#content").val().replace(/(^\s*)|(\s*$)/g,"")=="")
	{
		$.messager.alert("提示","广告内容不能为空","info",function(){document.getElementById("content").focus();});
		return;
	}
	if($("#advertUrl").val().replace(/(^\s*)|(\s*$)/g,"")=="")
	{
		$.messager.alert("提示","链接不能为空","info",function(){document.getElementById("advertUrl").focus();});
		return;
	}
	var imgUrl = $("#urlF1").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF1").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF2").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF2").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF3").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF3").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF4").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF4").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF5").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF5").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF6").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF6").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF7").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF7").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF8").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF8").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF9").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF9").focus();});
	      return;
	    }
	}
	document.getElementById("baocunid").disabled="disabled";

	$("#advertFollowForm").ajaxSubmit({
        type:'post',
        url:'advertising/advertFollowSave.do',
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