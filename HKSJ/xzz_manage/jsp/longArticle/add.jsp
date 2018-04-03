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
    <title>长文</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page"> 
	<link rel="stylesheet" href="css/public.css" />
	<link rel="stylesheet" href="css/schcct/css/common.css">
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<style>
		.checktag-item{
			display:inline-block;
			height:16px;
			padding:0 3px;
			margin:0 0 10px 5px;
			white-space:nowrap;
			cursor:pointer;
		}
		.checktag-item>input{
			display:inline-block;
			width:auto !important;
			vertical-align:middle;
		}
	</style>
	<script type="text/javascript" src="js/js_common.js"></script>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/cct-jquery-plugins.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script> 
	<script type="text/javascript" src="js/DateUtil.js"></script> 
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script> 
	<script type="text/javascript" src="js/behind/longArticle/add.js"></script> 
	<script type="text/javascript"  src="js/kindeditor/kindeditor.js"></script>
	<script type="text/javascript"  src="js/kindeditor/lang/zh_CN.js"></script>  
		
   <script type="text/javascript">  
  
	    //富文本编辑器
	    KindEditor.options.filterMode = false;
		KindEditor.ready(function(K) { 
			 window.editor = K.create("#editor_id", {
				themeType : 'qq',
				allowFileManager : true,
				minWidth : "600px",
				uploadJson :'js/kindeditor/jsp/upload_json.jsp',
	            fileManagerJson :'js/kindeditor/jsp/file_manager_json.jsp',
	            allowFileManager : true,
	            urlType:'domain',
				afterBlur : function() {
					this.sync();
					K.ctrl(document, 13, function() {
						K('form[name=myform]')[0].submit();
					});
					K.ctrl(this.edit.doc, 13, function() {
						K('form[name=myform]')[0].submit();
					});
				} 
			});
			  
		});  
	  </script>
  </head> 
<body> 
<h3 class="right_nav"> 会员管理 &gt; 马甲用户&gt; 发表长文</h3>
          <form id="addLongArticleFrom" method="post" action="longArticle/save.do" >  
	        	<input type="hidden" name="userId" value="${userId}">
	  			<!-- <input type="hidden" name="ID" /> -->
			  		<div style="margin-left:10px;">
			  		<table class="mainTable">
			  			<tr>
			  				<td style="width: 100px" >长文标题：</td>
			  				<td > 
								<input id="title" maxlength="200"  type="text" name="title"  style="width: 667px; height: 43px"> 
								<span style="color: red">*</span>
							 </td>
						 </tr>
						  <tr>
			  				<td style="width: 100px" >分类：</td>
			  				<td > 
				  				<select onchange="getTag(this)"  id="type"  style="height: 30px;line-height: 30px;">
									<option value="">--请选择分类--</option>
									<c:if test="${not empty list}">
										<c:forEach items="${list}" var="type">
											<option value="${type.id}">${type.name}</option>
										</c:forEach> 
									</c:if> 
								</select> 
			  				 <span style="color: red">*</span> 
							 </td>
						 </tr> 
						 <tr>
			  				<td style="width: 100px" >导图：</td>
			  				<td > 
								<input id="fil" type="file" name="Imgurl"  >  
							 </td>
						 </tr>  
						 <tr >
			  				<td ><span style="color: red">*</span>标签：</td>
			  				<td><div style="width:600px;float:left;" id="tag"></div></td>
						 </tr> 
						<tr>
							<td >内容：</td>
							<td> 
								<textarea id="editor_id" name="content" style="width:680px;height:600px;"></textarea>
							</td>
						</tr>  
						
						<tr>
							<td colspan="2" style="text-align: left">
								<input type="button" class="btn_an" value="保存" onclick="add()" >
								<input type="button" class="btn_qx" value="返回" onclick="go_back()">
							</td>
						</tr>
					</table>
				</div>
			</form>  
</body>
</html>
