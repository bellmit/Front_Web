<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
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
	<script type="text/javascript" src="js/behind/admin/menu_add.js"></script>
  </head>
  
  <body>
  		<form id="menuForm" method="post" >
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr><td >名称：</td><td>
		<input id="MENU_NAME" name="MENU_NAME"  maxlength="20"><span style="color: red">*</span> 
		</td></tr>
		<tr><td >url：</td><td>
		<input id="URL" name="URL" maxlength="50">
		</td></tr>
		<tr><td >图标样式：</td><td>
		<input id="ICON" name="ICON" maxlength="20">
		</td></tr>
		<tr><td >菜单类型：</td><td>
			<select id="LEAF" name="LEAF" onchange="selectMenu(this)">
				<option value="1">一级菜单</option>
				<option value="0" selected="selected">二级菜单</option>
			</select>
		</td></tr>
		<tr><td >父菜单：</td><td>
			<select id="PARENT_MENU" name="PARENT_MENU">
			</select>
		</td></tr>
		<tr><td >序列号：</td><td>
		<input id="NORTNO" maxlength="9" name="NORTNO"  oninput="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'')">  
		<span style="color: red">*</span>
		</td></tr>
		<tr><td >描述：</td><td>
		<textarea id="DESCC" name="DESCC" ></textarea> 
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
