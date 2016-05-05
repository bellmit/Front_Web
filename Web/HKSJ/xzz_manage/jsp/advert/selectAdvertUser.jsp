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
	名称：<input id="advertCompany" type="text" class="input v">
	<button type="button"  onclick="searchCX()">查询</button>
						
    <table id="videoTable" title="" style=" width:auto;height:90%;"
            data-options="
            onClickRow : selectRow,
            rownumbers:true,
            collapsible:false,
            pagination:true,
            method:'post'">
             <thead >
	          <tr>
	          	<th data-options="field:'ADVERT_COMPANY',align:'center',width:150">公司名称</th>
	          	<th data-options="field:'ADVERT_CONTACTS',align:'center',width:100">联系人</th>
	          	<th data-options="field:'ADVERT_PHONE',align:'center',width:100">联系电话</th>
			  </tr>
			</thead>
            
    </table>
</body>
</html>
