<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE>
<html>
<head>
<base href="<%=basePath%>">

<title>添加首页推荐</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->	
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
	<script type="text/javascript" src="js/js_common.js"></script>
	<script type="text/javascript" src="js/behind/commentt/help_update.js"></script>
		<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
</head>
<body>
	
	<form id="insertorupdForm" method="post">
	<input id="ID" name="ID" type="hidden" />
		<div style="margin-left:10px;">
			<table class="mainTable">
			
				<tr>
					<td>帮助问题：</td>
					<td colspan="2">
					<textarea id="HELP_MATTER" name="HELP_MATTER" style="height:100px"></textarea> 
						
				</tr>
				<tr>
					<td>帮助答案：</td>
					<td colspan="2">
						<textarea id="HELP_ANSWER" name="HELP_ANSWER" style="height:100px" cols="20" rows="2" class="ckeditor"></textarea> 
				</tr>
			
				<tr>
					<td>序列号：</td>
					<td colspan="2">
							<textarea id="HELP_ORDERNUM" name="HELP_ORDERNUM" style="height:100px" onkeyup="value=this.value.replace(/\D+/g,'')"></textarea> 	
				</tr>
			
				<tr>
					<td colspan="3" style="text-align: right">
						<input type="button" class="btn_an" value="保存" id="baocunid" onclick="add()">
						<input  class="btn_qx" type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">	
					</td>
				</tr>
			</table>
		</div>
	</form>
</body>
</html>
