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
	<link href="css/public.css"  rel="stylesheet" type="text/css" />
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/behind/user/userVest_insert.js"></script>
  </head>
  <body>
  	<form id="insertorupdForm" method="post" >
  		<!-- <input type="hidden" name="ID" /> -->
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  			<tr>
  				<td >账号：</td>
  				<td> 
					<input id="account" maxlength="20"  type="text" name="account"  > 
					<span style="color: red">*</span>
				 </td>
			 </tr>
			<tr>
				<td >密码：</td>
				<td> 
					<input type="password" id="password" maxlength="20" name="password"> 
					<span style="color: red">*</span>
				</td>
			</tr>
			<tr>
				 <td >昵称：</td>
				 <td> 
					<input id="nickname" type="text" name="nickname">
						<span style="color: red">*</span>
				  </td>
		    </tr> 
		 <%--    <tr>
				 <td >所属运营用户：</td>
				 <td> 
				 	<select name="attributeAdmin" id = "attributeAdmin" >
				 		<option value="">--请选择--</option>
					 	<c:forEach items="${adminInfo}" var = "a">
					 		<option value="${a.adminId}">${a.nickname}</option>
					 	</c:forEach> 
				 	</select> 
						<span style="color: red">*</span>
				  </td>
		    </tr>  --%>
		    <tr>
				 <td >运营说明：</td>
				 <td> 
				 	<textarea rows="10" cols="20" name="attributeExplain"></textarea>  
				  </td>
		    </tr> 
			<tr>
				<td colspan="2" style="text-align: right">
					<input type="button" class="btn_an" value="保存" onclick="add()" id="baocunid" >
					<input type="button" class="btn_qx" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
				</td>
			</tr>
		</table>
		</div>
	</form>
  </body>
</html>
