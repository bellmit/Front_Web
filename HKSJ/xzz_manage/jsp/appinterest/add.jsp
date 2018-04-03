<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Integer parentId = (Integer)request.getAttribute("parentId");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>分类标签</title>
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
	<script type="text/javascript" src="js/behind/appinterest/appinterest_add.js"></script>
  </head>
  
  <body>
  		<form id="appinterestForm" method="post" >
  		<div style="margin-left:10px;">
  		<br/>
  		<table class="mainTable">
  		<tr><td >名称：</td><td>
		<input id="name" name="name"  maxlength="20"><span style="color: red">*</span> 
		<input type="hidden" name="parentId" id="parentId" class="input v" value="${parentId}"/>
		</td></tr>
		<tr><td >状态：</td><td>
			<select id="statics" name="statics">
				<option value="0" selected="selected">启用</option>
				<option value="1">停用</option>
			</select>
		</td></tr>
		<tr>
			<td >序列号：</td>
			<td>
				<input id="sort" name="sort"  maxlength="20"><span style="color: red">*</span> 
			</td>
		</tr>
		<tr><td >备注：</td><td>
		<textarea id="comments" name="comments" ></textarea> 
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
