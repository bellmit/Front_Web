<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>添加二级类型</title>
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
	<script type="text/javascript" src="js/behind/category/typetwo_add.js"></script>
</head>
<body>
	<form id="typeTwoForm" method="post">
	<div style="margin-left:10px;">
			<table class="mainTable">
				<tr>
					<td>名称：</td>
					<td><input id="typetwoName" name="typetwoName" maxlength="32"> <span style="color: red">*</span></td>
				</tr>
				<tr>
					<td>排序号：</td>
					<td><input maxlength="9" id="orderNum" name="orderNum"
						type="text" value=""
						onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" oninput="this.value=this.value.replace(/\D/g,'')" /><span
						style="color: red">*</span></td>
				</tr>
				<tr>
					<td>描述：</td>
					<td><input id="descc" name="descc" maxlength="32" ></input></td>
				</tr>
				<tr>
					<td colspan="2" style="text-align: right">
						<input type="button" class="btn_an"value="保存" onclick="add()">
						<input  class="btn_qx" type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
					</td>
				</tr>
			</table>
	</div>
	</form>
</body>
</html>
