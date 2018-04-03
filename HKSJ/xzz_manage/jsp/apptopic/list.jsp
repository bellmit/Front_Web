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
    
    <title>话题管理 </title>
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
	<script type="text/javascript" src="js/behind/apptopic/apptopic.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/DateUtil.js"></script> 
  </head>
  
  
   <body>
		<div class="main_r">
			<h3 class="right_nav">话题管理>话题信息</h3>

			<div class="table_bg">
				<ul class="inquire">
					<div class="clearfix">
						<li>
						<label class="v">标题：</label>
							<input id="title" name="title" type="text" class="input v">&nbsp;&nbsp;&nbsp;
						<label class="v">状态：</label>
							<select id="status" name="status" class="input v">
							    <option value="" selected="selected">--请选择</option>
								<option value="0">正常</option>
								<option value="1">关闭</option>
							</select>&nbsp;&nbsp;&nbsp;
							
						<label class="v">置顶状态：</label>
							<select id="isTop" name="isTop" class="input v">
								<option value="" selected="selected">--请选择</option>
								<option value="0">不置顶</option>
								<option value="1">置顶</option>
							</select>&nbsp;&nbsp;&nbsp;
						<label class="v">创建时间：</label>
						<input name="startTime" id="startTime"  type="text" class="Wdate" readonly="readonly" onclick="WdatePicker();" value=""><span class="line_h v">-</span>
		           	    <input name="endTime" id="endTime" type="text" class="Wdate" readonly="readonly" onclick="WdatePicker();" value=""/>
						</li>
						
						</li>
						<li>
							<button type="button" class="btn_cx" onclick="query()">查询</button>
						</li>
						<li>
							<button type="button" class="btn_cx" onclick="toAdd()">新增话题</button>
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
