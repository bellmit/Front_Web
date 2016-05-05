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
    
    <title>用户</title>
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
	<script type="text/javascript" src="js/behind/user/user_update.js"></script> 
  </head>
  
  <body>
  	<form id="insertorupdForm" method="post" >
  		<input type="hidden" name="id" value="${user.id}"/>
  		<div style="margin-left:10px;">
  		<table class="mainTable"> 
		<tr><td >昵称：</td><td> 
		<input id="nickname" name="nickname" value="${user.nickname}">
		<span style="color: red">*</span>
		  </td></tr>
		<%--   
		  <tr><td >运营用户：</td>
		  	<td>
				<select name="attributeAdmin" id = "attributeAdmin" > 
					 	<c:forEach items="${adminInfo}" var = "a">
					 		<option value="${a.adminId}"  <c:if test='${a.nickname == user.attributeAdminName}'>selected="selected"</c:if>>${a.nickname}</option>
					 	</c:forEach> 
				 	</select> 
			 </td>
		    </tr> --%>
		 
		  
		<tr><td >性别：</td><td>
			<input type="radio" style="width:10px" name="sex" value="1"  <c:if test="${user.sex=='1'}">checked="checked"</c:if> />男
			<input type="radio"  style="width:10px" name="sex" value="2" <c:if test="${user.sex=='2'}">checked="checked"</c:if>/>女 
			<span style="color: red">*</span>
		</td>
		</tr>
		
		   <tr><td >邮箱：</td><td>
		<input id="email" maxlength="32" name="email" value="${user.email}"> 
		<span style="color: red">*</span>
		 </td></tr>
		   <tr><td >个性签名：</td><td>
		     <textarea rows="5" cols="20" name="sign">${user.sign}</textarea> 
		 </td></tr> 
		 <tr><td >运营说明：</td><td>
		     <textarea rows="5" cols="20" name="attributeExplain">${user.attributeExplain}</textarea> 
		 </td></tr> 
		<tr><td colspan="2" style="text-align: right">
		<input type="button" class="btn_an" value="保存" onclick="add()" id="baocunid" >
		<input type="button" class="btn_qx" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
  </body>
</html>
