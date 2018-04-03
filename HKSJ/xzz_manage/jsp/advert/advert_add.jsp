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
	<script type="text/javascript" src="js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="js/behind/advert/advert_add.js"></script>
  </head>
  
  <body>
  	<input type="hidden" id="userAccount" value="${sessionScope.adminInfo.adminName}" />
  	<input type="hidden" id="contextPath" value="<%=path %>" /> 
  	
  	<form id="advertForm" method="post" >
  		<input type="hidden" id="ADVERT_URL" name="ADVERT_URL">
  		<input type="hidden" id="ADVERT_DURATION" name="ADVERT_DURATION">
  		<input type="hidden" id="ADVERT_HEIWEI" name="ADVERT_HEIWEI">
  		<input type="hidden" id="ADVERTUSER_ID" name="ADVERTUSER_ID">
  		<div style="margin-left:10px;">
  		<span style="color: red">视频支持格式：asx,asf,mpg,wmv,3gp,mp4,mov,avi,flv,mkv</span>
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
			<td id="msg1" style="text-align: right">
			
			</td>
		</tr>
		<tr><td >公司：</td><td colspan="2">
		<input id="ADVERTUSER_ID1" name="ADVERTUSER_ID1" maxlength="50" readonly="readonly" onclick="selectAdvertUser()"> <span style="color: red">*</span> <br>
		</td></tr>
    	<tr><td >广告名称：</td><td colspan="2">
		<input id="ADVERT_NAME" name="ADVERT_NAME" maxlength="50"> <span style="color: red">*</span> <br>
		</td></tr>
		<tr><td >投放金额(元)：</td><td colspan="2">
		<input id="ADVERT_MONEY" name="ADVERT_MONEY" maxlength="10"> <span style="color: red">*</span> <br>
		</td></tr>
		<tr><td >单价(元/千次)：</td><td colspan="2">
		<input type="text" id="ADVERT_PRICE"  name="ADVERT_PRICE" maxlength="10">  
		<span style="color: red">*</span>
		</td></tr>
		<tr><td >跳往URL：</td><td colspan="2">
		<input id="JUMP_URL"  name="JUMP_URL" value="http://">  
		<span style="color: red">*</span>
		</td></tr>
		<tr><td >类别：</td><td>
			<select id="typetwoId" name="typetwoId" multiple="multiple" size="2" style="height: 100px">
				
			</select>
			<span style="color: red">*</span>
		</td></tr>
		<tr><td >权重指数：</td><td colspan="2">
		<input id="ADVERT_WEIGHT" maxlength="9" name="ADVERT_WEIGHT" oninput="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'')">  
		<span style="color: red">*</span>
		</td></tr>
		<tr><td colspan="3" style="text-align: right">
		<input class="btn_an" type="button" value="保存" onclick="add()" id="baocunid">
		<input  class="btn_qx" type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
	<!--弹出层-->
	<div id="windowDiv2"  style="padding: 0px;" data-options="maximized:true,modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
	</div>
  </body>
</html>
