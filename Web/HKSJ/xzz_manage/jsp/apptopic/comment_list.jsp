<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String title = (String)request.getAttribute("titile");
Integer topicId = (Integer)request.getAttribute("topicId");

%>

<!DOCTYPE>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>参与话题用户</title>
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
	<script type="text/javascript" src="js/behind/apptopic/comment.js"></script> 
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/DateUtil.js"></script> 
  </head>
  
  
   <body>
		<div class="main_r">
			<h3 class="right_nav">话题管理>话题评论用户</h3>

			<div class="table_bg">
				<ul class="inquire">
					<div class="clearfix">
						<li>
						<label class="v">标题：${title }</label>
								<input type="hidden" name="articleId" id="articleId" value="${topicId }"/>
						</li>
						<br/><br/>
						<li>
							<label class="v">评论内容：</label>
							<input name="commentContent" id="commentContent"  type="text" >
						</li>
						<li>
							<label class="v">创建时间：</label>
							<input name="startTime" id="startTime"  type="text" class="Wdate" readonly="readonly" onclick="WdatePicker();" value=""><span class="line_h v">-</span>
		           	    	<input name="endTime" id="endTime" type="text" class="Wdate" readonly="readonly" onclick="WdatePicker();" value=""/>
						</li>
						</li>
						<li>
							<button type="button" class="btn_cx" onclick="query()">查询</button>
						</li>
						<li>
							<button type="button" class="btn_cx" onclick="go_back()">返回</button>
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
