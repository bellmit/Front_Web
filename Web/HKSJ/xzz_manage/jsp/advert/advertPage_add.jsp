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
	<script type="text/javascript" src="js/behind/advert/advertPage_add.js"></script>
</head>
<body>
	<input type="hidden" id="userAccount" value="${sessionScope.adminInfo.adminName}" />
  	<input type="hidden" id="contextPath" value="<%=path %>" /> 
	<form id="insertorupdForm" method="post">
		<input id="PIC_URL" name="PIC_URL" type="hidden" />
		<input id="VIDEO_ID" name="VIDEO_ID" type="hidden" />
		<div style="margin-left:10px;">
			<table class="mainTable">
				<tr>
  					<td style="width:20%">上传图片：</td>
  					<td>
						 <div id="container2" >
				               <a class="btn btn-default btn-lg" id="pickfiles2" href="#" >
				                   <i class="glyphicon glyphicon-plus"></i>
				                   <span>选择文件</span>
				               </a>
				           </div>
					</td>
					<td id="msg2" style="text-align: right">
					
					</td>
				</tr>
				<tr>
					<td>名称：</td>
					<td colspan="2">
						<input type="text" id="PAGE_NAME" name="PAGE_NAME" maxlength="50"/>
					 	<span style="color: red">*</span></td>
				</tr>
				<tr>
					<td>一级类型：</td>
					<td colspan="2">
						<select  id="TYPEONE_ID" name="TYPEONE_ID" ></select>
					 	<span style="color: red">*</span></td>
				</tr>
				<tr>
					<td>跳往URL：</td>
					<td colspan="2">
						<input type="text" id="JUMP_URL" name="JUMP_URL" />
					 	<span style="color: red">*</span></td>
				</tr>
				<tr>
					<td>排列号：</td>
					<td colspan="2"><input maxlength="9" id="PIC_INDEX" name="PIC_INDEX"
						type="text" 
						onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" oninput="this.value=this.value.replace(/\D/g,'')" /><span
						style="color: red">*</span></td>
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
