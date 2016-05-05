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
    
    <title>广告类型</title>
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
	<script type="text/javascript" src="js/behind/advertising/picReturn_add.js"></script>
  </head>
  
  <body>
  		<form id="picReturnForm" method="post" enctype="multipart/form-data">
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<input id="syCount" value="${syCount }" type="hidden"/>
		<input id="lbCount" value="${lbCount }" type="hidden"/>
		<tr><td >链接地址：</td><td>
		<input id="id" name="id" value="${picreturn.id }" type="hidden" />
		<input id="url" name="url" maxlength="200" value="${picreturn.url }"><span style="color: red">*</span> 
		</td></tr>
		<tr><td >广告图片：</td><td>
			<img id="urlI" src="${picreturn.picUrl }" width="120px" height="120px" <c:if test="${empty picreturn.picUrl }">style="display:none"</c:if> onclick="editePic();">
			<span id="warn" style="color:red <c:if test="${empty picreturn.picUrl }">;display:none</c:if>">*点击输入框更改图片</span>
			<input id="urlF" name="picUrl1" type="file" <c:if test="${not empty picreturn.picUrl }">style="display:none"</c:if> /><br />  
		</td></tr>
		<tr><td >类别：</td><td>
		<c:if test="${not empty picreturn.id }">
			<c:if test="${picreturn.type==1 }">首页</c:if>
			<c:if test="${picreturn.type==0 }">轮播</c:if>
		</c:if>
		<c:if test="${empty picreturn.id }">
			<select name="type" id="type" readonly="true">
				<option value="1" >首页</option>
				<option value="0" >轮播</option>
			</select>
		</c:if>

		</td></tr>
		<tr><td >是否上架：</td><td>
		<select name="status" id="status">
			<option value="0" <c:if test="${picreturn.status==0 }">selected</c:if> >上架</option>
			<option value="1" <c:if test="${picreturn.status==1 }">selected</c:if> >下架</option>
		</select>
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
