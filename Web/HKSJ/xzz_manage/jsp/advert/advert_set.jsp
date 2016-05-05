<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>角色</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link href="css/public.css"  rel="stylesheet" type="text/css" />
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/behind/admin/admin_add.js"></script>
	<script type="text/javascript">
		function sub()
		{
			if($("#ID1").val()=="" || $("#ID2").val()=="" || $("#ID3").val()=="")
			{
				$.messager.alert("提示","该数据需要初始化","info");
				return;
			}
			if($("#PARAM_START1").val()=="" || $("#PARAM_END1").val()=="" || $("#PARAM_END2").val()==""
			 || $("#PARAM_END2").val()=="" || $("#PARAM_END3").val()=="" || $("#PARAM_END3").val()=="")
			 {
				$.messager.alert("提示","时间段不能为空","info");
				return;
			 }
			 if($("#PARAM_VALUE1").val()=="" || $("#PARAM_VALUE2").val()=="" || $("#PARAM_VALUE3").val()=="")
			{
				 $.messager.alert("提示","广告数量不能为空","info");
				return;
			}
			$.post('updateGlobalAdvertSpace.do',$("#advertForm").serialize(),function(result){
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
	</script>
  </head>
  
  <body>
		<form id="advertForm" method="post" >
		<input type="hidden" id="ID1" name="ID1" value="${list[0].ID}" />
		<input type="hidden" id="ID2" name="ID2" value="${list[1].ID}" />
		<input type="hidden" id="ID3" name="ID3" value="${list[2].ID}" />
		<ul class="pop_list" style="margin-left: 10px">
			<li>
				<label class="wid_lab">时间段：</label>
				<input maxlength="9" type="text" id="PARAM_START1" name="PARAM_START1" value="${list[0].PARAM_START}" onkeyup="this.value=this.value.replace(/\D/g,'')" class="input" style="width:50px"/><span style="color: red">*</span>-
				<input maxlength="9" type="text" id="PARAM_END1" name="PARAM_END1" value="${list[0].PARAM_END}" onkeyup="this.value=this.value.replace(/\D/g,'')" class="input" style="width:50px"/><span style="color: red">*</span>
				<label class="wid_lab">广告数：</label>
				<input maxlength="9" id="PARAM_VALUE1" name="PARAM_VALUE1" value="${list[0].PARAM_VALUE}"  style="width:50px"  type="text" class="input" onkeyup="this.value=this.value.replace(/\D/g,'')"><span style="color: red">*</span>
				<br>
				<label class="wid_lab">描述：</label>
				<input name="PARAM_DESC1" value="${list[0].PARAM_DESC}"  size="30"  type="text" class="input" >
			</li>
			<li>
				<label class="wid_lab">时间段：</label>
				<input maxlength="9" type="text" id="PARAM_START2" name="PARAM_START2" value="${list[1].PARAM_START}" onkeyup="this.value=this.value.replace(/\D/g,'')" class="input" style="width:50px"/><span style="color: red">*</span>-
				<input maxlength="9" type="text" id="PARAM_END2" name="PARAM_END2" value="${list[1].PARAM_END}" onkeyup="this.value=this.value.replace(/\D/g,'')" class="input" style="width:50px"/><span style="color: red">*</span>
				<label class="wid_lab">广告数：</label>
				<input maxlength="9" id="PARAM_VALUE2" name="PARAM_VALUE2" value="${list[1].PARAM_VALUE}"  size="30" style="width:50px" type="text" class="input" onkeyup="this.value=this.value.replace(/\D/g,'')"><span style="color: red">*</span>
				<br>
				<label class="wid_lab">描述：</label>
				<input name="PARAM_DESC2" value="${list[1].PARAM_DESC}"  size="30"  type="text" class="input" >
			</li>
			<li>
				<label class="wid_lab">时间段：</label>
				<input maxlength="9" type="text" id="PARAM_START3" name="PARAM_START3" value="${list[2].PARAM_START}" onkeyup="this.value=this.value.replace(/\D/g,'')" class="input" style="width:50px"/><span style="color: red">*</span>-
				<input maxlength="9" type="text" id="PARAM_END3" name="PARAM_END3" value="${list[2].PARAM_END}" onkeyup="this.value=this.value.replace(/\D/g,'')" class="input" style="width:50px"/><span style="color: red">*</span>
				<label class="wid_lab">广告数：</label>
				<input maxlength="9" id="PARAM_VALUE3" name="PARAM_VALUE3" value="${list[2].PARAM_VALUE}" size="30" style="width:50px"  type="text" class="input" onkeyup="this.value=this.value.replace(/\D/g,'')"><span style="color: red">*</span>
				<br>
				<label class="wid_lab">描述：</label>
				<input name="PARAM_DESC3" value="${list[2].PARAM_DESC}"  size="30"  type="text" class="input" >
			</li>
		</ul>
		
		
		<div style="margin-left:10px;">
  		<table class="mainTable">
  			<tr><td colspan="2" style="text-align: right">
			<input class="btn_an" type="button" style="cursor: pointer" onclick="sub()" value="确定"/>
			<input class="btn_qx" type="button" style="cursor: pointer"  onclick="javascript:parent.$('#windowDiv').window('close');" value="取消"/>
			</td></tr>
		</table>
		</div>
		</form>
  </body>
</html>
