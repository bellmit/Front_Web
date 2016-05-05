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
    
    <title>自传币流水记录</title>
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
	<script type="text/javascript" src="js/behind/zzb/zzbStatement.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
  </head>
  
  
   <body>
		<div class="main_r">
			<h3 class="right_nav">自传币管理>自传币流水记录</h3>

			<div class="table_bg">
				<ul class="inquire">
					<div class="clearfix">
						<li>
						<label class="v">用户名称：</label>
						<input id="userName" name="userName" type="text" class="input v">
						</li>
						<li>
						<label class="v">流水名称：</label>
						<select id="type" name="type">
							<option value="">请选择</option>
							<option value="-1">扣除</option>
							<option value="1">补发</option>
							<option value="10">转让</option>
							<option value="11">打赏</option>
							<option value="12">购买礼物</option>
							<option value="13">礼物兑换</option>
							<option value="20">注册</option>
							<option value="21">签到</option>
							<option value="30">稿费</option>
							<option value="31">分享/转发</option>
							<option value="32">发长文</option>
							<option value="33">发随记</option>
							<option value="40">阅读</option>
							<option value="41">参与话题</option>
							<option value="42">长文评论</option>
							<option value="43">随记评论</option>
							<option value="44">话题评论</option>
							<option value="45">长文转发</option>
							<option value="46">随记转发</option>
							<option value="47">置顶</option>
							<option value="48">举报下架</option>
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
