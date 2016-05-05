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
    
    <title>新增</title>
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
	<script type="text/javascript" src="js/jquery.form.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/behind/followRecord/follow_record_add.js"></script>
  </head>
  
  <body>
  		<form id="followRecordForm" method="post" enctype="multipart/form-data">
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr><td >随记内容：</td><td>
  		<input name="userId" type="hidden" value="${id }">
  		<textarea rows="6" cols="30" id="content" name="content"></textarea> <span style="color: red">*</span>
		</td></tr>
		<tr><td >导图：</td><td>
		<input id="urlF1" name="pic1" type="file"/><br />
		<input id="urlF2" name="pic2" type="file"/><br />
		<input id="urlF3" name="pic3" type="file"/><br />
		<input id="urlF4" name="pic4" type="file"/><br />
		<input id="urlF5" name="pic5" type="file"/><br />
		<input id="urlF6" name="pic6" type="file"/><br />
		<input id="urlF7" name="pic7" type="file"/><br />
		<input id="urlF8" name="pic8" type="file"/><br />
		<input id="urlF9" name="pic9" type="file"/><br />
		<span style="color: red">最多可上传9张图片</span>
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
