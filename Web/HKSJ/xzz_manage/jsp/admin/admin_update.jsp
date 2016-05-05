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
	<link href="css/public.css"  rel="stylesheet" type="text/css" />
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/behind/admin/admin_update.js"></script>
	<script type="text/javascript">
		$(function(){
			//初始用户等级
			var roleid="${admin.roleId}";
			$.post('queryRoleByAdmin.do',function(data){
				var selObj = $("#ROLE_ID"); 
				selObj.append("<option value='-1'>请选择</option>");
				for ( var d in data) {
					if(data[d].ROLE_ID==roleid)
						selObj.append("<option value='"+data[d].ROLE_ID+"' selected='selected' >"+data[d].ROLE_NAME+"</option>");
					else
						selObj.append("<option value='"+data[d].ROLE_ID+"'>"+data[d].ROLE_NAME+"</option>");
				}
			})
		})
		
	</script>
  </head>
  
  <body>
  	<form id="insertorupdForm" method="post" >
  		<input type="hidden" name="ID" value="${admin.id}"/>
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr><td >账号：</td><td>
		<input type="hidden" name="ADMIN_NAME_OLD" value="${admin.adminName}">
		<input id="ADMIN_NAME" maxlength="20" name="ADMIN_NAME" value="${admin.adminName}" > 
		<span style="color: red">*</span>
		 </td></tr>
		<tr><td >密码：</td><td>
		<input type="hidden" type="password" name="PASSWORD_OLD" value="${admin.password}">
		<input type="password" id="PASSWORD" name="PASSWORD" value="${admin.password}"> 
		<span style="color: red">*</span>
		</td></tr>
		<tr><td >昵称：</td><td>
		<input type="hidden" maxlength="50" name="NICKNAME_OLD" value="${admin.nickname}">
		<input id="NICKNAME" name="NICKNAME" value="${admin.nickname}">
		<span style="color: red">*</span>
		  </td></tr>
		<tr><td >性别：</td><td>
		<input type="radio" style="width:10px" name="SEX" value="1"  <c:if test="${admin.sex=='1'}">checked="checked"</c:if> />男
		<input type="radio"  style="width:10px" name="SEX" value="2" <c:if test="${admin.sex=='2'}">checked="checked"</c:if>/>女 
		<span style="color: red">*</span>
		   </td></tr>
		   <tr><td >邮箱：</td><td>
		<input id="EMAIL" maxlength="32" name="EMAIL" value="${admin.email}"> 
		<span style="color: red">*</span>
		 </td></tr>
		<tr><td >角色：</td><td>
		<select id="ROLE_ID" name="ROLE_ID"></select>  
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
