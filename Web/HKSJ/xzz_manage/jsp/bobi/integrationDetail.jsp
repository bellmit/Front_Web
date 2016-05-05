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
	<link rel="stylesheet" href="css/public.css" />
	<link rel="stylesheet" href="css/schcct/css/common.css">
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/js_common.js"></script>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/cct-jquery-plugins.js"></script>
	<script type="text/javascript" src="js/behind/bobi/integrationDetail.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
  </head>
  
  <body>
		<div class="main_r">
			<h3 class="right_nav">用户管理 > 用户播币明细</h3>

			<div class="table_bg">
				<ul class="inquire">
						<li>
							<label class="v">用户账号/昵称/手机：</label>
							<input id="userIdOrNameOrCard" type="text" class="input v">
						</li>
						<li>
							<label class="v">来源：</label>
							<select style="height: 30px;line-height: 30px;" id="INTEGRATION_TYPE" class="status_btn">
								<option value="">请选择</option>
								<option value="0">系统操作</option>
								<option value="1">上传</option>
								<option value="2">注册</option>
								<option value="3">登录</option>
								<option value="4">点播视频</option>
								<option value="5">被点播</option>
								<option value="6">分享</option>
								<option value="7">转入钱包</option>
							</select>
						</li>
						<li>
							<label class="v">加/减：</label>
							<select style="height: 30px;line-height: 30px;" id="type" class="status_btn">
								<option value="">请选择</option>
								<option value="1">加</option>
								<option value="2">减</option>
							</select>
						</li>
						<li>
						<label class="v">时间：</label> 
						<input class="Wdate" type="text"  size="12" style="width:110px"  id="StartTime" name="StartTime" onFocus="var endtime=$dp.$('endtime');WdatePicker({onpicked:function(){endtime.focus();},maxDate:'#F{$dp.$D(\'endtime\')}'});"	></input>
			     		-
						<input class="Wdate" type="text"   size="12" style="width:110px" id="endtime" name="endtime"  onFocus="WdatePicker({minDate:'#F{$dp.$D(\'StartTime\')}'})"></input>
						</li>
						<li>
							<button class="btn_cx" type="button" onclick="query()">查询</button>
						</li>
						<li>
							<button class="btn_cx" type="button" onclick="toAdd()">新增</button>
						</li>
					</div>

				</ul>
				<div id="div_table03" class="branchTabBox"> 
				  <table class="table1">
				       </table>
				 </div>
		</div>
		<!--/right-->
		<!--弹出层-->
		<div id="windowDiv"  style="padding: 0px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
			<iframe id="windowIf" name="windowIf" style="width:100%;height:100%;display: none;"  frameborder="0"></iframe>
		</div>
		<!--查看图片弹出层-->
		<div id="windowDiv1"  style="padding: 0px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
			<iframe id="windowIf1" name="windowIf1" style="width:100%;height:100%;display: none;"  frameborder="0"></iframe>
		</div>
  </body>
</html>
