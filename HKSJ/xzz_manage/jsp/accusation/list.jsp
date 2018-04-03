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
    
    <title>长文管理</title>
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
	<script type="text/javascript" src="js/DateUtil.js"></script> 
	<script type="text/javascript" src="js/behind/accusation/list.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<style type="text/css">
	
	
	</style>
  </head>
  
  <body>
		<div class="main_r">
			<h3 class="right_nav">图文管理> 举报列表   </h3>
			<div class="table_bg">
				<ul class="inquire">
					<div class="clearfix"> 
						<li>
							<label class="v">举报用户：</label>
							<input id="userName" type="text" class="input v">
						</li> 
						<li> 
						<li>
						<label class="v">类型：</label>
							<select id="type" style="height: 30px;line-height: 30px;">
								<option value="">默认全部</option>
								<option value="1">随记</option>
								<option value="2">长文</option> 
							</select> 
						</li> 
						<li>
							<button type="button" class="btn_cx" onclick="query()">查询</button>
						</li>  
					</div>

				</ul>
				<div id="div_table03" class="branchTabBox"> 
				  <table class="table1">
				       </table>
				 </div>
			</div>
		</div> 
  </body>
</html>
