<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE>
<html>
  <head>
    <base href="<%=basePath%>">    
    <title>广告商用户管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="favicon.ico" rel="shortcut icon">
	<link rel="stylesheet" href="js/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" href="js/upload/highlight/highlight.css">
	<link href="css/public.css"  rel="stylesheet" type="text/css" />
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/plupload/plupload.full.min.js"></script>
	<script type="text/javascript" src="js/plupload/i18n/zh_CN.js"></script>
	<script type="text/javascript" src="js/upload/ui.js"></script>
	<script type="text/javascript" src="js/upload/qiniu.js"></script>
	<script type="text/javascript" src="js/upload/highlight/highlight.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/behind/advert/advertuser_update.js"></script>
  </head>
  
  <body>
  	<input type="hidden" id="contextPath" value="<%=path %>" /> 
  	<form id="advertUserForm" method="post" >
  		<input id="ID" name="ID" type="hidden">
  		<input id="ADVERTUSER_ID" name="ADVERTUSER_ID" type="hidden">
  		<div style="margin-left:10px;">
  		<table class="mainTable">
    	<tr><td >公司名称：</td><td colspan="2">
		<input id="ADVERT_COMPANY" name="ADVERT_COMPANY" maxlength="50"> <span style="color: red">*</span> <br>
		</td></tr>
		<tr><td >联系人：</td><td colspan="2">
		<input id="ADVERT_CONTACTS" name="ADVERT_CONTACTS" maxlength="20"> <span style="color: red">*</span> <br>
		</td></tr>
		<tr><td >联系电话：</td><td colspan="2">
		<input id="ADVERT_PHONE" name="ADVERT_PHONE" maxlength="20"> <span style="color: red">*</span> <br>
		</td></tr>
		<tr><td >广告商账户：</td><td colspan="2">
		<input id="ADVERT_ACCOUNT" name="ADVERT_ACCOUNT" maxlength="10"> <span style="color: red">*</span> <br>
		</td></tr>
		<tr><td >广告商密码：</td><td colspan="2">
		<input type="password" id="ADVERT_PASSWORD"  name="ADVERT_PASSWORD"  maxlength="20">  
		<input type="hidden" id="OLDADVERT_PASSWORD" name="OLDADVERT_PASSWORD">
		<span style="color: red">*</span>
		</td></tr>
		<tr><td colspan="3" style="text-align: center">
		<input class="btn_an" type="button" value="保存" onclick="update()" id="baocunid">
		<input  class="btn_qx" type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
  </body>
</html>
