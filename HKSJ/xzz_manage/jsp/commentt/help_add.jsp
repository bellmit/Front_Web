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
    
    <title>帮助中心</title>
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
	<script type="text/javascript" src="js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="js/behind/commentt/help_add.js"></script>
	<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
  </head>
  
  <body>
  	<form id="insertorupdForm" method="post" >
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr>
			<td>帮助问题：</td>
			<td>
			<textarea id="HELP_MATTER" name="HELP_MATTER" style="height:100px"></textarea> 
		</tr>
		<tr><td >帮助内容：</td><td>
		<textarea id="HELP_ANSWER" name="HELP_ANSWER" style="height:100px" cols="20" rows="2" class="ckeditor"></textarea> 
		</td></tr>
			<tr>
			<td>排序号：</td>
			<td>
			<input id="HELP_ORDERNUM" name="HELP_ORDERNUM" type="text" onkeyup="value=this.value.replace(/\D+/g,'')">
		</tr>
		<tr><td colspan="2" style="text-align: right">
		<input type="button" class="btn_an" value="保存" onclick="add()" id="baocunid">
		<input type="button" class="btn_qx" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
	
	<!--弹出层-->
	<div id="windowDiv2"  style="padding: 0px;" data-options="maximized:true,modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
	</div>
  </body>
</html>
