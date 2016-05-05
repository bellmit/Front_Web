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
	<script type="text/javascript" src="js/behind/video/video.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/easyui-lang-zh_CN.js"></script>
  </head>
  
  <body>
  		<input type="hidden" id="videoUrl" value="${videoUrl}"/>
  		<input type="hidden" id="imageUrl" value="${imageUrl}"/>
		<div class="main_r">
			<h3 class="right_nav">视频管理 > 视频信息</h3>

			<div class="table_bg">
				<ul class="inquire">

					<li>
						<label class="v">视频名称：</label>
						<input id="videoName" name="videoName" type="text" class="input v">
					</li>
					<li>
					<label class="v">时间：</label> 
					<input class="Wdate" type="text"  size="12" style="width:110px"  id="StartTime" name="StartTime" 
					onFocus="var endtime=$dp.$('endtime');WdatePicker({onpicked:function(){endtime.focus();},maxDate:'#F{$dp.$D(\'endtime\')}'});"	></input>
		     		-
					<input class="Wdate" type="text"   size="12" style="width:110px" id="endtime" name="endtime"  onFocus="WdatePicker({minDate:'#F{$dp.$D(\'StartTime\')}'})"></input>
					</li>
					<li>
						<label class="v">一级类型：</label> <select onchange="selectOne(this.value)" style="width:100px;height: 30px;line-height: 30px;" class="status_btn"
							id="selectTypeOne" >
						</select>
					</li>
					<li>
						<label class="v">二级类型：</label> <select style="width:100px;height: 30px;line-height: 30px;" class="status_btn"
							id="selectTypeTwo" >
							<option value="">请选择</option>
						</select>
					</li>
					<li>
						<label class="v">状态：</label> 
						<select style="height: 30px;line-height: 30px;" class="status_btn" id="selectStatus" >
							<option value="">请选择</option>
							<option value="1">待审批</option>
							<option value="3">审批通过(上架)</option>
							<option value="4">审批不通过</option>
							<option value="6">删除</option>
						</select>
						</li>
					<li>
						<label class="v">上传来源：</label> 
						<select style="height: 30px;line-height: 30px;" class="status_btn" id="selectQht" >
							<option value="">请选择</option>
							<option value="1">后台</option>
							<option value="2">前台</option>
						</select>
					</li>
					<li>
						<button type="button" class="btn_cx" onclick="query()">查询</button>
					</li>
				</ul>
				
				<div id="div_table03" class="branchTabBox"> 
				  <table class="table1">
				       </table>
				 </div>
			</div>
		</div>
		
		<!--弹出层-->
		<div id="windowDiv" style="padding: 0px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
			<iframe id="windowIf" name="windowIf" style="width:100%;height:100%;display: none;"  frameborder="0"></iframe>
		</div>
		<!--查看图片弹出层-->
		<div id="windowDiv1"  style="padding: 0px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
			<iframe id="windowIf1" name="windowIf1" style="width:100%;height:100%;display: none;"  frameborder="0"></iframe>
		</div>
			<!--弹出层-->
	<div id="windowDiv2"  style="padding: 0px;width:90px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
	</div>
	</body>
</html>
