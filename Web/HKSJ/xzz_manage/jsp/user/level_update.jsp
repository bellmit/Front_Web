<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE>
<html lang="zh">
  <head>
    <base href="<%=basePath%>">
    
    <title>角色</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="小自传后台管理系统,小自传,后台管理">
<meta http-equiv="description" content="小自传后台管理系统,小自传,后台管理">
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
	<script type="text/javascript" src="js/behind/user/level_update.js"></script>
  </head>
  <body>
  	<form id="insertorupdForm" method="post" >
  		<input type="hidden" id="ID" name="ID"/>
  		<input type="hidden" id="LEVEL_ID" name="LEVEL_ID"/>
  		<input type="hidden" id="LEVEL_ICON" name="LEVEL_ICON" />
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
  		<tr><td >等级名称：</td><td colspan="2">
		<input type="text" id="LEVEL_NAME" name="LEVEL_NAME" maxlength="30">
		<span style="color: red">*</span>
		 </td></tr>
		<tr>
			<td>起始数值：</td>
			<td colspan="2"><input maxlength="9" id="LEVEL_START" name="LEVEL_START"
				type="text" value=""
				onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" oninput="this.value=this.value.replace(/\D/g,'')" /><span
				style="color: red">*</span></td>
		</tr>
		<tr>
			<td>结束数值：</td>
			<td colspan="2"><input maxlength="9" id="LEVEL_END" name="LEVEL_END"
				type="text" value=""
				onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" oninput="this.value=this.value.replace(/\D/g,'')" /><span
				style="color: red">*</span></td>
		</tr>
		 
		 	
		<tr><td colspan="3" style="text-align: right">
		<input type="button" class="btn_an" value="保存" onclick="add()" id="baocunid" >
		<input type="button" class="btn_qx" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
  </body>
</html>
