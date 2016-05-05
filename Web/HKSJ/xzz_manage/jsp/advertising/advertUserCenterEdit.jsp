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
    
    <title>个人中心广告</title>
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
	<script type="text/javascript" src="js/behind/advertising/advert_usercenter_add.js"></script>
  </head>
  
  <body>
  		<form id="advertUserCenterForm" method="post" enctype="multipart/form-data">
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr><td >广告名称：</td><td>
  		<input name="id" type="hidden" value="${advertusercenter.id }">
		<input id="name" name="name" type="text" value="${advertusercenter.name }"><span style="color: red">*</span> 
		</td></tr>
		<tr><td >广告图片：</td><td>
		<span>
		<img id="urlI"  src="${advertusercenter.picUrl }" width="120px" height="120px" <c:if test="${empty advertusercenter.picUrl }">style="display:none"</c:if> onclick="editePic();"/>
		<br /><span id="warn" style="color: red<c:if test="${empty advertusercenter.picUrl }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF" name="picUrl1" type="file" <c:if test="${not empty advertusercenter.picUrl }">style="display:none"</c:if> /><br />
		</td></tr>
		<tr><td >链接：</td><td>
		<input id="url" name="picUrl" maxlength="200" value="${advertusercenter.url }"><span style="color: red">*</span> 
		</td></tr>
		<tr><td >投放位置：</td><td>
		<select name="position" id="position">
			<option value="1" <c:if test="${advertusercenter.position==1 }">selected</c:if> >广告位1</option>
			<option value="2" <c:if test="${advertusercenter.position==2 }">selected</c:if> >广告位2</option>
		</select><span style="color: red">*</span> 
		</td></tr>
		<tr><td >是否上架：</td><td>
		<select name="status" id="status">
			<option value="0" <c:if test="${advertusercenter.status==0 }">selected</c:if> >上架</option>
			<option value="1" <c:if test="${advertusercenter.status==1 }">selected</c:if> >下架</option>
		</select><span style="color: red">*</span> 
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
