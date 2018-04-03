<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE>
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
	<script type="text/javascript" src="js/behind/advert/advertStop_update.js"></script>
  </head>
  
  <body>
  	<input type="hidden" id="userAccount" value="${sessionScope.adminInfo.adminName}" />
  	<input type="hidden" id="contextPath" value="<%=path %>" /> 
  	
  	<form id="advertForm" method="post" >
  		<input type="hidden" id="STOP_URL" name="STOP_URL">
  		<input type="hidden" id="STOP_ID" name="STOP_ID">
  		<input type="hidden" id="ID" name="ID">
  		
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
    	<tr><td>名称：</td><td colspan="2">
		<input id="STOP_NAME" name="STOP_NAME" maxlength="50"> <span style="color: red">*</span> <br>
		</td></tr>
		<tr>
		<td valign="middle" style="text-align:middle ">一级类型：</td>
  		<td colspan="2">
			<span id="VIDEOTYPE_TWO_SPAN"></span>
				<select id="typeoneIds" name="typeoneIds" multiple="multiple" size="2" style="height: 80px;">
				</select>
				<span style="color: red">*</span> 
		</td></tr>
		
		<tr><td>权重指数：</td><td  colspan="2">
		<input id="STOP_WEIGHT" maxlength="9" name="STOP_WEIGHT" oninput="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'')">  
		<span style="color: red">*</span>
		</td></tr>
		<tr><td>跳往URL：</td><td  colspan="2">
		<input id="JUMP_URL"  name="JUMP_URL" value="http://">  
		<span style="color: red">*</span>
		</td></tr>
		<tr><td colspan="3" style="text-align: right">
		<input class="btn_an" type="button" value="保存" onclick="add()" id="baocunid">
		<input  class="btn_qx" type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
  </body>
</html>
