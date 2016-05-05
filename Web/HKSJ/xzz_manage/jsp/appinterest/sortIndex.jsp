<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML>
	<HEAD>
		<TITLE>标签排序</TITLE>
		<meta http-equiv="Content-Type"content="text/html; charset=gb2312">
		<META NAME="Description"CONTENT="Power by hill">
		<script type="text/javascript" src="../js/behind/appinterest/appinterest_sort_add.js"></script>
		<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
	</HEAD>
	<BODY>
		<form method="post" name="myform" id="myform">
			<table border="0" width="300">
			<tr>
				<td width="40%">
					<select style="WIDTH:100%"multiple name="list1" size="12" ondblclick="moveOption(document.myform.list1, document.myform.list2)">
					<c:if test="${not empty appInterestList}">
						<c:forEach var="appInterest" items="${appInterestList }">
							<option value="${appInterest.id }">${appInterest.name }</option>
						</c:forEach>
					</c:if>

					</select>
				</td>
				<td width="20%"align="center">
					<input type="button" value="＞＞＞" onclick="moveOption(document.myform.list1, document.myform.list2)"><br/>
					<br/>
					<input type="button" value="＜＜＜" onclick="moveOption(document.myform.list2, document.myform.list1)">
				</td>
				<td width="40%">
					<select style="WIDTH:100%" multiple name="list2" size="12" ondblclick="moveOption(document.myform.list2, document.myform.list1)">
					</select>
				</td>
			</tr>
			<tr><td colspan="3" style="text-align:center;">
				<input type="hidden" name="sort" id="sort"/>
				<input type="button" value="保存" onclick="save()">
				<input type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
			</td></tr>
			</table>
			
		</form>
	</BODY>
</HTML>