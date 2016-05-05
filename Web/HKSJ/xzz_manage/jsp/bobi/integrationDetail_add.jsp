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
<link href="css/public.css"  rel="stylesheet" type="text/css" />
<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
<link rel="stylesheet" href="css/pilelot-ui.css"/>
<link href="css/jquery.autocomplete.css"  rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/js_common.js"></script>
<script type="text/javascript" src="js/behind/bobi/integrationDetail_add.js"></script>
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
					<td>用户：</td>
					<td>
						<input type="text" id="USER_ID1" name="USER_ID1" maxlength="50" readonly="readonly" onclick="selectUser()" />
						<input type="hidden" id="USER_ID" name="USER_ID" maxlength="50"/>
					 	<span style="color: red">*</span>
					 	</td>
				</tr>
				<tr>
					<td>明细：</td>
					<td>
						<input type="hidden" id="INTEGRATION_CHANGE_BAK" />
						<input type="text" id="INTEGRATION_CHANGE" name="INTEGRATION_CHANGE" onblur="checkNum(this)" maxlength="8"/>
					 	<span style="color: red">*</span><span style="color: red" id="msg"></span></td>
				</tr>
				<tr>
					<td>描述：</td>
					<td>
						<input type="text" id="INTEGRATION_DESC" name="INTEGRATION_DESC" />
					 	<span style="color: red">*</span></td>
				</tr>
				<tr>
					<td colspan="2" style="text-align: right">
						<input type="button" class="btn_an" value="保存" id="baocunid" onclick="add()">
						<input  class="btn_qx" type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">	
					</td>
				</tr>
			</table>
		</div>
	</form>
	
	<!--弹出层-->
	<div id="windowDiv2"  style="padding: 0px;" data-options="maximized:true,modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
	</div>
</body>
</html>
