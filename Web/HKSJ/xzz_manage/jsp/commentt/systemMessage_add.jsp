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
	<script type="text/javascript" src="js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="js/behind/commentt/systemMessage_add.js"></script>
  </head>
  
  <body>
  	<form id="insertorupdForm" method="post" >
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr>
			<td>用户：</td>
			<td>
				<input type="text" id="USER_BY1" name="USER_BY1" maxlength="50" readonly="readonly" onclick="selectUser()" />
				<input type="hidden" id="USER_BY" name="USER_BY" maxlength="50"/>
				<input type="button" value="清除" style="width:50px" onclick="clearUser()">
			 	<!-- 
			 	&nbsp;<input type="button" style="width:40px" onclick="clearUser()" value="清空"/>
			 	 -->
			 	</td>
		</tr>
		<tr><td >内容：</td><td>
		<textarea id="MESSAGE_DESC" name="MESSAGE_DESC" style="height:100px"></textarea> 
		</td></tr>
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
