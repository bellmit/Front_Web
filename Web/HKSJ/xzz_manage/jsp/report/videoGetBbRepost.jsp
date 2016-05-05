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
	<link rel="stylesheet" href="css/public.css" />
	<link rel="stylesheet" href="css/schcct/css/common.css">
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/highcharts/js/highcharts.js"></script>
    <script type="text/javascript" src="js/highcharts/js/modules/exporting.js"></script>
    <script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/behind/report/videoGetBbRepost.js"></script>
  </head>
  
  <body>
  		<div class="main_r">
			<h3 class="right_nav">报表 > 上传，点击视频获取播币统计</h3>

			<div class="table_bg">
				<ul class="inquire">
						<li>
						<label class="v">时间：</label> 
						<input class="Wdate" type="text"  size="12" style="width:110px"  id="StartTime" name="StartTime" onFocus="var endtime=$dp.$('endtime');WdatePicker({onpicked:function(){endtime.focus();},maxDate:'#F{$dp.$D(\'endtime\')}'});"	></input>
			     		-
						<input class="Wdate" type="text"   size="12" style="width:110px" id="endtime" name="endtime"  onFocus="WdatePicker({minDate:'#F{$dp.$D(\'StartTime\')}'})"></input>
						</li>
						<li>
							<button class="btn_cx" type="button" onclick="query()">查询</button>
						</li>
					</div>

				</ul>
		</div>
  		<div id="container" style="min-width:700px;height:360px"></div>
  </body>
</html>
