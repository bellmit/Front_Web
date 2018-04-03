<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%> 
<%@include file="/WEB-INF/common/common.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>手机App版本更新信息管理</title>
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
	<script type="text/javascript" src="js/behind/phoneversion/edit.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script> 
  </head>
  <body>
  	<form id="phoneversionForm" method="post" >
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr>
  			<td>版本号 ：</td>
			<td>
				<input id="verno" name="verno" value="${phoneversion.verno }" maxlength="20"/> <span style="color: red">*</span>	
				<input type="hidden" id="id" name="id" value="${phoneversion.id }"/>
				<input type="hidden" id="os"  name="os" value="${phoneversion.os }"/>
				<input type="hidden" name="url"  value="${phoneversion.url }">
			</td>
		</tr>
		<tr>
			<td>客户端类型 ：</td>
			<td>
			<c:if test="${phoneversion.os == 1}">
						<input type="text"  disabled="disabled" value="安卓"/>
			</c:if>
			<c:if test="${phoneversion.os == 2}">
						<input type="text"  disabled="disabled" value="IOS"/>
			</c:if>
				<%-- <select id="os" name="os" onchange="selectType(this)">
					<option value="" selected="selected" >--请选择</option>
					<option value="1" <c:if test="${phoneversion.os==1 }">selected</c:if> >安卓</option>
					<option value="2" <c:if test="${phoneversion.os==2 }">selected</c:if> >IOS</option>
				</select> <span style="color: red">*</span>	 --%>
			</td>
		</tr> 
		<c:if test="${phoneversion.os == 1}">  
			<tr><td >上传新的apk：</td><td>
				<input id="androidUrl" name="fileUrl" type="file"/> 
				</td>
			</tr>   
		</c:if> 
		<c:if test="${phoneversion.os == 2}">
			<tr id="ios" ><td >下载路径：</td><td>
			<input id="iosUrl" name="iosUrl" value="${phoneversion.url }"/> <span style="color: red">*</span> 
			</td>
		</c:if>
	 
		<tr><td >是否强制更新：</td>
			<td>
				<select id="isForceUpdate" name="isForceUpdate">
					<option value="" selected>--请选择</option>
					<option value="0" <c:if test="${phoneversion.isForceUpdate==0 }">selected</c:if> >不强制更新</option>
					<option value="1" <c:if test="${phoneversion.isForceUpdate==1 }">selected</c:if> >强制更新</option>
				</select> <span style="color: red">*</span>
			</td>
		</tr>
		
 		<tr><td >备注：</td><td>
		<textarea id="remark" name="remark" style="height: 150px">${phoneversion.remark }</textarea> 
		</td></tr>
		
		<tr><td colspan="2" style="text-align: right">
		<br/>
		<input type="button" class="btn_an" value="保存" onclick="add()" id="baocunid">
		<input type="button" class="btn_qx" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
  </body>
</html>
