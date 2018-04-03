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
	名称：<input id="videoName" type="text" class="input v">
	一级：<select id="typeone" onchange="selectOne(this.value)"></select>
	二级：<select id="typetwo"></select> 
	<button type="button"  onclick="searchCX()">查询</button>
						
    <table id="videoTable" title="" style=" width:auto;height:90%;"
            data-options="
            onClickRow : selectRow,
            rownumbers:true,
            collapsible:false,
            pagination:true,
            method:'post'">
             <thead data-options="frozen:true">
	          <tr>
	          	<th data-options="field:'VIDEO_NAME',align:'center',width:150,formatter:formatName">名称</th>
	          	<th data-options="field:'IS_EPISODE',align:'center',width:70,formatter:formatType">视频类型</th>
			  </tr>
			</thead>
            <thead >
	          <tr>
				<th data-options="field:'TYPEONE_NAME',align:'center',width:100">一级类型</th>
				<th data-options="field:'TYPETWO_NAME',align:'center',width:100">二级类型</th>
			  </tr>
			</thead>
    </table>
</body>
</html>
