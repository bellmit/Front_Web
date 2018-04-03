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
	<title>七牛云存储 - JavaScript SDK</title>
	<link href="favicon.ico" rel="shortcut icon">
	<link rel="stylesheet" href="js/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" href="js/upload/highlight/highlight.css">
	<link href="css/public.css"  rel="stylesheet" type="text/css" />
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/plupload/plupload.full.min.js"></script>
	<script type="text/javascript" src="js/plupload/i18n/zh_CN.js"></script>
	<script type="text/javascript" src="js/upload/ui.js"></script>
	<script type="text/javascript" src="js/upload/qiniu.js"></script>
	<script type="text/javascript" src="js/upload/highlight/highlight.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/js_common.js"></script>
	<script type="text/javascript" src="js/behind/video/uploadDetail_update.js"></script>
</head>
<body>
	<form id="insertorupdateForm" method="post" >
		 <input type="hidden" id="ID" name="ID"/>  <!-- 视频子表主键ID -->
		  <input type="hidden" id="VIDEO_SON_ID" name="VIDEO_SON_ID"/>  <!-- 视频子表业务id -->
		 <input type="hidden" id="UNIQUE_ID" name="UNIQUE_ID"/>  <!-- 视频主表业务id -->
		 <input type="hidden" id="SERIES_URL" name="SERIES_URL"/> <!-- 视频url -->
		 <input type="hidden" id="SIZE" name="SIZE"/> <!-- 视频大小 -->
		 <input type="hidden" id="DURATION" name="DURATION"/> <!-- 视频时长 -->
		 <input type="hidden" id="width" name="width"/> <!-- 视频宽 -->
		 <input type="hidden" id="height" name="height"/> <!-- 视频高 -->
		 <input type="hidden" id="bit_rate" name="bit_rate"/> <!-- 视频码率 -->
		 <input type="hidden" id="f_bit_rate" name="f_bit_rate"/> <!-- 全局视频码率 -->
		 <input type="hidden" id="PIC_URL1" name="PIC_URL1"/> <!-- 视频切图 -->
		 <input type="hidden" id="COUNT_SERIES" name="COUNT_SERIES" /> <!-- 总集数 -->
		 <input type="hidden" id="SERIES_NUM1" name="SERIES_NUM1" /> <!-- 序号 -->
		 <input type="hidden" id="IS_EPISODE1" name="IS_EPISODE1" /> <!-- 类型 -->
		 <input type="hidden" id="STATUS" name="STATUS" /> <!-- 状态 -->
		 <!-- 单剧集情况下，选择类型为剧集 -->
		 <input type="hidden" id="VIDEO_CONTENT" name="VIDEO_CONTENT" /> <!-- 视频内容 -->
		 <input type="hidden" id="VIDEO_NAME" name="VIDEO_NAME" /> <!-- 视频名称 -->
         <div style="margin-left:10px;">
  			<table class="mainTable">
  				<tr>
  					<td style="width:20%">上传视频：</td>
  					<td>
						<div id="container1" >
			                <a class="btn btn-default btn-lg" id="pickfiles1" href="#" >
			                    <i class="glyphicon glyphicon-plus"></i>
			                    <span>选择文件</span>
			                </a>
			            </div>
					</td>
					<td id="msg1">
					
					</td>
				</tr>
				<tr id="splx" >
				<td>视频类型：</td>
		  		<td  colspan="2">
					<select id="IS_EPISODE" name="IS_EPISODE" onchange="selectType(this.value)">
					<option value="">请选择</option>
					<option value="1">剧集</option>
					<option value="2">预告</option>
					<option value="3">花絮</option>
					</select> <span style="color: red">*</span> 
				</td></tr>
				<tr id="onlyJj1">
				<td>看点：</td>
		  		<td  colspan="2">
					<input id="SERIES_NAME" name="SERIES_NAME" maxlength="15"> <span style="color: red">*(15字之内)</span> 
				</td></tr>
				<tr id="onlyJj2" >
				<td>序号：</td>
		  		<td  colspan="2">
					<input id="SERIES_NUM" name="SERIES_NUM" maxlength="9" oninput="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'')"> <span style="color: red">*</span> 
				</td></tr>
				<tr id="onlyJj3">
				<td>介绍：</td>
		  		<td  colspan="2">
					<textarea id="SERIES_CONTENT" name="SERIES_CONTENT" ></textarea><span style="color: red">*(100字之内)</span> 
				</td></tr>
				<tr>
					<td colspan="3" style="text-align: right">
						<input class="btn_an" type="button" value="保存" onclick="add()" id="baocunid">
						<input  class="btn_qx" type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
					</td>
				</tr>
  			</table>
  		</div>
            
            
     </form>
</body>
</html>
