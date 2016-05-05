<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE>
<html>
<body>
	账号：<input id="USER_NAME" type="text" class="input v">
	手机号：<input id="CELLPHONE" type="text" class="input v">
	<button type="button"  onclick="searchCX()">查询</button>
						
    <table id="userTable" title="" style=" width:auto;height:90%;"
            data-options="
            onClickRow : selectRow,
            rownumbers:true,
            collapsible:false,
            pagination:true,
            method:'post'">
             <thead data-options="frozen:true">
	          <tr>
	          	<th data-options="field:'USER_ID',align:'center',width:150">业务ID</th>
	            <th data-options="field:'USER_NAME',align:'center',halign:'center',width:100">账号</th>
			  </tr>
			</thead>
            <thead >
	          <tr>
	            <th data-options="field:'NICK',align:'center',width:100">昵称</th>
				<th data-options="field:'CELLPHONE',align:'center',width:100">手机号</th>
				<th data-options="field:'USER_ACCOUNT',align:'center',width:100">播币</th>
			  </tr>
			</thead>
    </table>
</body>
</html>
