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
	<script type="text/javascript" src="js/js_common.js"></script>
	<script type="text/javascript" src="js/behind/video/uploadDetail_check.js"></script>
  </head>
  
  <body>
  	<input type="hidden" id="userAccount" value="${sessionScope.adminInfo.adminName}" />
  	<input type="hidden" id="contextPath" value="<%=path %>" /> 
  	
  	<form id="insertorupdateForm" method="post" >
  		<input type="hidden" id="ID" name="ID"/>  <!-- 视频子表主键ID -->
  		<input type="hidden" id="VIDEO_SON_ID" name="VIDEO_SON_ID"/>  <!-- 视频子表主键ID -->
  		<input type="hidden" id="UNIQUE_ID" name="UNIQUE_ID"/>  <!-- 视频主表业务id -->
  		<input type="hidden" id="APPROVE_STATUS" name="APPROVE_STATUS"/>  <!-- 审核通过是3，不通过4 -->
  		<input type="hidden" id="ADMIN_OR_USER" name="ADMIN_OR_USER"/>  <!-- 前台上传还是后台上传 -->
  		<input type="hidden" id="IS_EPISODE" name="IS_EPISODE"/>  <!-- 剧集、预告、花絮 -->
  		<input type="hidden" id="VIDEO_BB" name="VIDEO_BB"/>  <!-- 该视频获得的播币数  防止反复通过、不通过、通过 -->
  		<input type="hidden" id="CREATE_TIME" name="CREATE_TIME"/>  <!-- 该视频创建时间 -->
  		<input type="hidden" id="CREATE_USER" name="CREATE_USER"/>  <!-- 视频创建人 -->
  		<input type="hidden" id="CELLPHONE" name="CELLPHONE"/>  <!-- 视频创建人手机号 -->
  		<input type="hidden" id="HFTYPE" name="HFTYPE"/>  <!-- 是否是惠粉的标志  1-是 0-否 -->
  		<input type="hidden" id="VERSION" name="VERSION"/>  <!-- 版本号，乐观锁 -->
  		<div style="margin-left:10px;">
  		<span id="hfbz" style="color: red"></span>
  		<table class="mainTable">
  		<tr id="shtr">
			<td>
				审核内容：
			</td>
			<td>
				<select style="height: 30px;line-height: 30px;" class="status_btn" id="APPROVE_CONTENT" name="APPROVE_CONTENT"   >
							<option value="">请选择</option>
							<option value="1">涉嫌违法</option>
							<option value="2">侵害他人权利</option>
							<option value="3">含垃圾信息</option>
							<option value="4">违反社会公德</option>
							<option value="5">有logo或境外台标</option>
							<option value="6">描述不准确</option>
							<option value="7">时长小于1分钟</option>
							<option value="8">视频重复</option>
							<option value="9">画质太模糊</option>
						</select>
			</td>
		</tr>
		<tr id="bbtr" style="display: none"><td >播币数：</td><td>
		<input id="BOBI" maxlength="9" name="BOBI" oninput="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'')">  
		<br>
		<span id="bbjx" style="color:red"></span>
		</td></tr>
		<tr><td colspan="2" style="text-align: right">
		<input class="btn_an" type="button" value="审核通过" onclick="pass(3)" id="PASSID">
		<input  class="btn_qx" type="button" value="审核不通过" onclick="pass(4)" id="UNPASSID">
		</td></tr>
		</table>
		</div>
	</form>
  </body>
</html>
