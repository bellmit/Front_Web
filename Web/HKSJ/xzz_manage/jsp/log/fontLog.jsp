<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE>
<html>
<head>
<base href="<%=basePath%>">
<title>用户日志管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" href="css/public.css" />
<link rel="stylesheet" href="css/schcct/css/common.css">
<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
<link rel="stylesheet" href="css/pilelot-ui.css"/>
<script type="text/javascript" src="js/js_common.js"></script>
<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/cct-jquery-plugins.js"></script>
<script type="text/javascript" src="js/DateUtil.js"></script>
<script type="text/javascript" src="js/behind/log/fontLog.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>

</head>
<body>
	<div class="main_r">
		<h3 class="right_nav">会员管理 >轨迹列表</h3>
		
		<div class="table_bg">
			<ul class="inquire">
					<div class="clearfix">
					
						<li>
							<label class="v">操作用户：</label> <input type="text" class="input v" name="userName" id="userName">
						</li>
						<li>
							<label class="v">文章类型：</label> 
							<select  id="type" style="height: 30px;line-height: 30px;" >
									<option value="">默认全部</option>
									<option value="1">长文</option>
									<option value="2">随记</option>
									<option value="3">话题</option>
							</select> 
						</li> 
						<li>
							<label class="v">操作内容：</label>
							<select   id="operation" style="height: 30px;line-height: 30px;" >
									<option value="">默认全部</option>
									<option value="1">评论</option>
									<option value="2">分享</option>
									<option value="3">转发</option>
									<option value="4">点赞</option>
									<option value="3">收藏</option>
							</select>  
						</li> 
						<li>
							<button class="btn_cx" type="button" onclick="search()">查询</button>
						</li>
	
					</div>
				</ul>
			<div id="div_table03" class="branchTabBox">
				<table class="table1">
				</table>
			</div>
		</div>
	</div>
	<!--/right-->
</body>
</html>
