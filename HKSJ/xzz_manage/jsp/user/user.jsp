<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE>
<html lang="zh">
  <head>
    <base href="<%=basePath%>">
    
    <title>角色</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="小自传后台管理系统,小自传,后台管理">
<meta http-equiv="description" content="小自传后台管理系统,小自传,后台管理">
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
	<script type="text/javascript" src="js/behind/user/user.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
  </head>
  
  <body>
		<div class="main_r">
			<h3 class="right_nav">用户管理 > 用户信息</h3>

			<div class="table_bg">
				<ul class="inquire">
					<div class="clearfix">
						<li>
						<label class="v">账号：</label>
							<input id="USER_NAME" type="text" class="input v">
						</li>
						<li>
						<label class="v">手机号：</label>
							<input id="CELLPHONE" type="text" class="input v">
						</li>
						<li>
						<label class="v">昵称：</label>
							<input id="NICK" type="text" class="input">
						</li>
						<li>
						<label class="v">播币查询：</label>
						<input maxlength="8" id="Bit" name="Bit" style="width:50px;"
						type="text" 
						onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" oninput="this.value=this.value.replace(/\D/g,'')" />-
						<input maxlength="9" id="Eit" name="Eit" style="width:50px;"
						type="text" 
						onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')" oninput="this.value=this.value.replace(/\D/g,'')" />
						</li>
							<li>
						<label class="v">注册时间：</label> 
						<input class="Wdate" type="text"  size="12" style="width:110px"  id="StartTime" name="StartTime" onFocus="var endtime=$dp.$('endtime');WdatePicker({onpicked:function(){endtime.focus();},maxDate:'#F{$dp.$D(\'endtime\')}'});"	></input>
			     		-
						<input class="Wdate" type="text"   size="12" style="width:110px" id="endtime" name="endtime"  onFocus="WdatePicker({minDate:'#F{$dp.$D(\'StartTime\')}'})"></input>
						</li>
						<li>
							<button type="button" class="btn_cx" onclick="query()">查询</button>
						</li>
						<!-- <li>
							<button type="button" class="btn_cx" onclick="toAdd()">添加</button>
						</li> -->
					</div>

				</ul>
				<div id="div_table03" class="branchTabBox"> 
				  <table class="table1">
				       </table>
				 </div>
			</div>
		</div>
		
		<!--弹出层-->
	<div id="windowDiv"  style="padding: 0px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
		<iframe id="windowIf" name="windowIf" style="width:100%;height:100%;display: none;"  frameborder="0"></iframe>
	</div>
  </body>
</html>
