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
    
    <title>插播广告</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" href="css/public.css" />
	<link rel="stylesheet" href="css/schcct/css/common.css">
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/js_common.js"></script>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/cct-jquery-plugins.js"></script>
	<script type="text/javascript" src="js/behind/video/upload.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/easyui-lang-zh_CN.js"></script>
  </head>
  
  <body>
		<div class="main_r">
			<h3 class="right_nav">视频管理 > 上传视频及剧集</h3>

			<div class="table_bg">
				<ul class="inquire">

					<li>
						<label class="v">视频名称：</label>
						<input id="videoName" name="videoName" type="text" class="input v">
					</li>
					<li>
						<button type="button" class="btn_cx" onclick="query()">查询</button>
					</li>
					<li>
						<button type="button" class="btn_cx" onclick="toAdd()">添加视频</button>
					</li>
					<!-- 
					<li>
						<button type="button" class="btn_cx" onclick="tongbu()">同步</button>
					</li>
					 -->
				</ul>
				
				<div id="div_table03" class="branchTabBox"> 
				  <table class="table1">
				       </table>
				 </div>
			</div>
		</div>
		
		<!--弹出层-->
		<div id="windowDiv" style="padding: 0px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
			<iframe id="windowIf" name="windowIf" src="" style="width:100%;height:100%;display: none;"  frameborder="0"></iframe>
		</div>
		<!--查看图片弹出层-->
		<div id="windowDiv1"  style="padding: 0px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
			<iframe id="windowIf1" name="windowIf1"  style="width:100%;height:100%;display: none;"  frameborder="0"></iframe>
		</div>
			
		<!--弹出层-->
	<div id="windowDiv2"  style="padding: 0px;width:90px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
	</div>
	</body>
</html>
