<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String nikeName = (String)request.getAttribute("nikeName");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>分类标签</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link href="css/public.css"  rel="stylesheet" type="text/css" />
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/behind/apptopic/add.js"></script>
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script>
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
  		<form id="appTopicForm" method="post" >
  		<div style="margin-left:10px;">
  		<br/>
  		<table class="mainTable">
  		<tr><td  width="15%">标题：</td><td>
		<textarea id="title" name="title"   style="height: 50px;width: 95%"></textarea>  <span style="color: red">*</span> 
		
		</td></tr>
		<tr>
			<td>导图</td>
			<td>
			<br/>
				<input id="picUrl1" name="picUrl1" type="file"><br /><br/>
			</td>
		</tr>
		<tr><td>话题发起人 ：</td>
			<td>
				<input id="nikeName" name="nikeName" value="${nikeName }"  maxlength="20" disabled="true"> <span style="color: red">*</span>	
			</td>
		</tr>
		<tr><td >简单描述：</td><td><br/>
		<textarea id="remark" name="remark"   style="height: 50px;width: 95%"></textarea> <span style="color: red">*</span>	<br/>
		</td></tr>
		<tr><td >状态：</td>
			<td>
				<select id="status" name="status">
					<option value="0" selected>正常</option>
					<option value="1">关闭</option>
					<option value="2">过期</option>
				</select> <span style="color: red">*</span>
			</td>
		</tr>
		<tr><td >置顶状态：</td>
			<td>
				<select id="isTop" name="isTop">
					<option value="0" selected>不置顶</option>
					<option value="1">置顶</option>
				</select> <span style="color: red">*</span>
			</td>
		</tr>
		<tr><td >内容：</td>
			<td><br/>
				<textarea id="editor_id" name="content" style="width:680px;height:600px;" ></textarea> <span style="color: red">*</span>
			</td>
		</tr>
				<!-- <input id="picUrl2" name="picUrl2" type="file"><br />
				<input id="picUrl3" name="picUrl3" type="file"><br />
				<input id="picUrl4" name="picUrl4" type="file"><br />
				<input id="picUrl5" name="picUrl5" type="file"><br />
				<input id="picUrl6" name="picUrl6" type="file"><br />
				<input id="picUrl7" name="picUrl7" type="file"><br />
				<input id="picUrl8" name="picUrl8" type="file"><br />
				<input id="picUrl9" name="picUrl9" type="file"><br /> 
				<span style="color: red">最多可上传9张图片</span>
				-->

		<tr><td colspan="2" style="text-align: right">
		<input type="button" class="btn_an" value="保存" onclick="add()" id="baocunid">
		<input type="button" class="btn_qx" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
		<br/>
	</form>
  </body>
</html>
