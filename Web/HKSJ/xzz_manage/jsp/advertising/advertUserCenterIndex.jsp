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
    
    <title>菜单</title>
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
	<script type="text/javascript" src="js/behind/advertising/advertUserCenter.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
  </head>
  
  
   <body>
		<div class="main_r">
			<h3 class="right_nav">广告管理> 个人中心广告</h3>

			<div class="table_bg">
				<ul class="inquire">
					<div class="clearfix">
						<li>
						<label class="v">广告名称：</label>
						<input id="name" name="name" type="text" class="input v">
						</li>
						<li>
						<label class="v">位置：</label>
						<select id="position" name="position" class="input v">
							<option value="">请选择</option>
							<option value="0">广告位1</option>
							<option value="1">广告位2</option>
						</select>
						</li>
						<li>
						<label class="v">上/下架：</label>
						<select id="status" name="status" class="input v">
							<option value="">请选择</option>
							<option value="0">上架</option>
							<option value="1">下架</option>
						</select>
						</li>
						<li>
							<button type="button" class="btn_cx" onclick="query()">查询</button>
						</li>
						<li>
							<button type="button" class="btn_cx" onclick="toAdd()">添加</button>
						</li>
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
