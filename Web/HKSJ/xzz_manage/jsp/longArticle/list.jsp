<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@include file="/WEB-INF/common/common.jsp"%>
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
	<script type="text/javascript" src="js/behind/longArticle/list.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript">
		var imgPath = "${img_path}"; //获取配置文件的服务器地址common.jsp 是配置文件
	</script>
  </head>
  
  <body>
		<div class="main_r">
			<h3 class="right_nav">图文管理> 长文管理    </h3>
			<div class="table_bg">
				<ul class="inquire">
					<div class="clearfix">
						<li>
						<label class="v">标题：</label>
							<input id="title" type="text" class="input v">
						</li>
						<li>
						<label class="v">作者：</label>
							<input id="userName" type="text" class="input v">
						</li>
						<li> 
						<label class="v">是否置顶：</label>
								<select   id="longPlace" style="height: 30px;line-height: 30px;">  
									<option value="">默认全部</option>
									<option value="1">置顶</option>
									<option value="0">正常</option> 
								</select> 
						</li>
						<li>
						<label class="v">文章类型：</label>
							<select   id="typeId" style="height: 30px;line-height: 30px;">
							<option value="">--默认全部--</option>
								<c:if test="${not empty typeList}">
									<c:forEach items="${typeList}" var="type">
										<option value="${type.id}">${type.name}</option>
									</c:forEach> 
								</c:if> 
							</select> 
						</li>
						<li>
						<label class="v">审核状态：</label>
							<select   id="isPass" style="height: 30px;line-height: 30px;">
								<option value="">默认全部</option>
								<option value="1">未审核</option>
								<option value="2">审核通过</option>
								<option value="3">审核不通过</option>
							</select> 
						</li>
						<li>
						<label class="v">上架状态：</label>
							<select   id="status" style="height: 30px;line-height: 30px;">
								<option value="">默认全部</option>
								<option value="0">上架</option>
								<option value="1">下架</option>
							</select>
						</li>
						<li>
						<label class="v">锁定状态：</label>
							<select    id="isLock" style="height: 30px;line-height: 30px;">
								<option value="">默认全部</option>
								<option value="0">未锁定</option>
								<option value="1">已锁定</option>
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
		
		<!--弹出层-->
		<div id="windowDiv"  style="padding: 0px;" data-options="modal:true,closed:true,iconCls:'icon-nadd',cache:true,minimizable:false,maximizable:false,collapsible:false">
			<iframe id="windowIf" name="windowIf" style="width:100%;height:100%;display: none;"  frameborder="0"></iframe>
		</div>
  </body>
</html>
