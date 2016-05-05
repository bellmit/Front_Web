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
    
    <title>自传币发放</title>
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
	<script type="text/javascript" src="js/behind/zzb/zzb_udpate.js"></script>
  </head>
  
  <body>
  		<form id="zzbUpdateForm" method="post" enctype="multipart/form-data">
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr><td >金额：</td><td>
  		<input name="userId" type="hidden" value="${user.id }">
  		<input name="userName" type="hidden" value="${user.name }">
  		<input name="integral" type="hidden" value="${user.amount }">
		<input id="amount" name="amount" type="text" /><span style="color: red">*</span><br />
		<span style="color: red">正数-代表补发   负数-代表扣除</span>
		</td></tr>
	  	<tr><td >备注：</td><td>
		<textarea id="remark" name="remark" rows="5" cols="3"></textarea><span style="color: red">*</span>
		</td></tr>
		<tr><td colspan="2" style="text-align: center">
		<input type="button" class="btn_an" value="保存" onclick="add()" id="baocunid">
		<input type="button" class="btn_qx" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
  </body>
</html>
