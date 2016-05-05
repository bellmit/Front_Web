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
	<script type="text/javascript" src="js/js_common.js"></script>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/cct-jquery-plugins.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script> 
	<script type="text/javascript" src="js/DateUtil.js"></script> 
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script> 
	<script type="text/javascript" src="js/behind/longArticle/edit.js"></script> 
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
      <form id="editForm" method="post" >
  		<input type="hidden" id="id" name="id" value="${longArticle.id }" />
  		<div style="margin-left:10px;">
	  		<br/>
	  		<table class="mainTable">
	  			 <tr>
	  				<td  width="13%">标题：</td>
	  				<td>
	  					<input type="text"  id="title" name="title" value="${longArticle.title }"  maxlength="200"><span style="color: red">*</span> 
					</td>
				</tr>
			<tr>
			<td>导图：</td>
				<td>
					<input id="imgurl" name="imgurl" type="file"/> 
					<c:if test="${not empty longArticle.longHeadUrl}">
						<img  style="margin-left: 10px" width="50px" height="50px" src="${img_path}${longArticle.longHeadUrl }"/> 
					</c:if>
				</td>
			</tr>
			 <tr>
			 	<td>内容：</td>
				 <td> 
				 	<textarea id="editor_id" name="content" style="width:700px;height:430px;">${longArticle.content}</textarea>
				 </td>
			 </tr>
			<tr>
				<td colspan="2" style="text-align: right">
					<input type="button" style="margin-left: 20px" class="btn_an" value="保存" onclick="add()" id="baocunid">
					<input type="button" class="btn_qx" value="取消" onclick="javasncript:parent.$('#windowDiv').window('close');">
				</td>
			</tr>
			</table>
		</div>
		<br/>
	</form>
</body>
</html>
