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
  </head>
  
  <body >
  		<input type="hidden" id="VIDEO_ID" type="text" name="VIDEO_ID">
		名称：<select id="jjType">
			<option value="">请选择</option>
			<option value="1">剧集</option>
			<option value="2">预告</option>
			<option value="3">花絮</option>
		</select>
	<button type="button"  onclick="searchCX()">查询</button>
						
    <table id="videoTable" title="" style=" width:auto;height:90%;"
            data-options="
            rownumbers:true,
            collapsible:false,
            pagination:true,
            method:'post'">
             <thead data-options="frozen:true">
	          <tr>
	          	<th data-options="field:'SERIES_NUM',align:'center',width:70" >序号</th>
	          	<th data-options="field:'IS_EPISODE',align:'center',width:70,formatter:formatxuhao">剧集类型</th>
			  </tr>
			</thead>
            <thead >
	          <tr>
				<th data-options="field:'APPROVE_STATUS',align:'center',width:100,formatter:formatType">状态</th>
			  </tr>
			</thead>
    </table>
		
	</body>

</html>
