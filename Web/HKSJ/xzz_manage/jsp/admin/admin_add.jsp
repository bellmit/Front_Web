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
  </head>
  
  <body>
  	<form id="insertorupdForm" method="post" >
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr><td >账号：</td><td>
		<input maxlength="20" id="ADMIN_NAME" name="ADMIN_NAME" ><span style="color: red">*</span> 
		</td></tr>
		<tr><td >密码：</td><td>
		<input type="password" id="PASSWORD" name="PASSWORD"><span style="color: red">*</span> 
		</td></tr>
		<tr><td >昵称：</td><td>
		<input id="NICKNAME" maxlength="50" name="NICKNAME"> <span style="color: red">*</span> <br>
		</td></tr>
		<tr><td >性别：</td><td>
		<input type="radio" name="SEX" value="1" style="width:10px"/>男<input style="width:10px" type="radio" name="SEX" value="2"/>女 <span style="color: red">*</span><br>
		</td></tr>
		<tr><td >邮箱：</td><td>
		<input maxlength="32" id="EMAIL" name="EMAIL"> <span style="color: red">*</span> <br>
		</td></tr>
		<tr><td >角色：</td><td>
		<select id="ROLE_ID" name="ROLE_ID"></select>  <br>
		</td></tr>
		<tr><td colspan="2" style="text-align: right">
		<input type="button" class="btn_an" value="保存" onclick="add()" id="baocunid">
		<input type="button" class="btn_qx" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
  </body>
</html>
