<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>添加一级类型与二级类型的关系</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link href="css/public.css"  rel="stylesheet" type="text/css" />
<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
<link rel="stylesheet" href="css/pilelot-ui.css"/>
<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/behind/category/typeone_two.js"></script>
<style type="text/css"> 
#addcheckbox{border-radius:5px;border:1px solidred;min-height:200px;overflow-y:auto;max-height:200px;height:200px} 
</style> 
</head>
<body>
	<form id="typeOneForm" method="post">
		<div >
		<div id="addcheckbox"></div>
		<table class="mainTable">
			<tr>
					<td  style="text-align: right;cursor:pointer;"><input type="button"
						class="btn_an" value="保存" onclick="add()">
						<input style="cursor:pointer;" class="btn_qx" type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">	
					</td>
				</tr>
		</table>
		</div>
	</form>
</body>
</html>
