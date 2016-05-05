<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>话题管理</title>
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
	<script type="text/javascript" src="js/behind/apptopic/edit.js"></script>
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
				minWidth : "700px",
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
  		<input type="hidden" id="id" name="id" value="${appTopic.id }" />
  		<div style="margin-left:10px;">
  		<br/>
  		<table class="mainTable">
  		
  		<tr><td  width="13%">标题：</td><td>
  		<textarea id="title" name="title"   style="height: 50px;width:95%">${appTopic.title }</textarea> <span style="color: red">*</span> 
		</td></tr>
		<tr>
		<td>导图：</td>
			<td>
				<c:if test="${not empty pic.picUrl1 }">
					<input name="picUrl1" id="p1" type="hidden" value="${img.img1}"><br />
					<img id="urlI1" name="picU1" style="margin-left: 30px" width="180px" height="180px" src="${pic.picUrl1 }" <c:if test="${empty pic.picUrl1 }">style="display:none"</c:if> "/>
					<br/><br/>
					<input type="button" value="删除或更改图片" id='delete1'  style="margin-left: 55px;width:130px;color: red<c:if test="${empty pic.picUrl1 }">;display:none</c:if>" onclick="editePic('1') "/>
					<input id="urlF1" name="pic1" type="file" <c:if test="${not empty pic.picUrl1 }">style=" display:none"</c:if> /><br />
					<br/>
				</c:if>
				
				<c:if test="${empty pic.picUrl1 }">
					<input id="urlF1" name="pic1" type="file"/><br />
				</c:if>
			</td>
		</tr>
		<tr><td>话题发起人 ：</td>
			<td>
				<input id="nickName" name="nickName"  value="${appTopic.nickname }" maxlength="20" disabled="true"> <span style="color: red">*</span>	
				<input type="hidden" id="userId" name="userId" value="${appTopic.userId }" />
				<input type="hidden" id="url" name="url" value="${appTopic.url }" />
			</td>
		</tr>
		<tr><td >简单描述：</td><td>
		<textarea id="remark" name="remark"   style="height: 50px;width:95%">${appTopic.remark }</textarea> 
		</td></tr>
		<tr><td >状态：</td>
			<td>
				<select id="status" name="status" >
					<option value="0" <c:if test="${appTopic.status==0 }">selected</c:if> >正常</option>
					<option value="1" <c:if test="${appTopic.status==1 }">selected</c:if> >关闭</option>
					<option value="2" <c:if test="${appTopic.status==2 }">selected</c:if> >过期</option>
				</select> <span style="color: red">*</span>
			</td>
		</tr>
		<tr><td >置顶状态：</td>
			<td>
				<select id="isTop" name="isTop">
					<option value="0" <c:if test="${appTopic.isTop == 0 }">selected</c:if> >不置顶</option>
					<option value="1" <c:if test="${appTopic.isTop == 1 }">selected</c:if> >置顶</option>
				</select> <span style="color: red">*</span>
			</td>
		</tr>
		<tr><td >内容：</td>
			<td><br/>
				<textarea id="editor_id" name="content" style="width:680px;height:600px;" >${appTopic.content }</textarea><span style="color: red">*</span>
			</td>
		</tr>
				<!-- 
				 
				<input id="p2" name="picUrl2" type="hidden" value="${img.img2 }"><br />
				<img id="urlI2" name="picU2" width="80px" height="80px" src="${pic.picUrl2 }" <c:if test="${empty pic.picUrl2 }">style="display:none"</c:if> onclick="editePic('2');"/>
				<span id="delete2" style="color: red<c:if test="${empty pic.picUrl2 }">;display:none</c:if>" onclick="editePic('2')">删除</span>
				<input id="urlF2" name="pic2" type="file" <c:if test="${not empty pic.picUrl2 }">style="display:none"</c:if> /><br />
 				<input id="p3" name="picUrl3" type="hidden" value="${img.img3 }"><br />
				<img id="urlI3" name="picU3" width="80px" height="80px" src="${pic.picUrl3 }" <c:if test="${empty pic.picUrl3 }">style="display:none"</c:if> onclick="editePic('3');"/>
				<span id="delete3" style="color: red<c:if test="${empty pic.picUrl3 }">;display:none</c:if>"onclick="editePic('3')">删除</span>
				<input id="urlF3" name="pic3" type="file" <c:if test="${not empty pic.picUrl3 }">style="display:none"</c:if> /><br />
				
				 <input name="picUrl4" id="p4" type="hidden" value="${img.img4}"><br />
				 <img id="urlI4" name="picU4" width="80px" height="80px" src="${pic.picUrl4 }" <c:if test="${empty pic.picUrl4 }">style="display:none"</c:if> onclick="editePic('4');"/>
				 <span id="delete4" style="color: red<c:if test="${empty pic.picUrl4 }">;display:none</c:if>"onclick="editePic('4')">删除</span>
				 <input id="urlF4" name="pic4" type="file" <c:if test="${not empty pic.picUrl4 }">style="display:none"</c:if> /><br />
				 
				 
				 <input name="picUrl5" id="p5" type="hidden" value="${img.img5}"><br />
				 <img id="urlI5" name="picU5" width="80px" height="80px" src="${pic.picUrl5 }" <c:if test="${empty pic.picUrl5 }">style="display:none"</c:if> onclick="editePic('5');"/>
				 <span id="delete5" style="color: red<c:if test="${empty pic.picUrl5 }">;display:none</c:if>"onclick="editePic('5')">删除</span>
				 <input id="urlF5" name="pic5" type="file" <c:if test="${not empty pic.picUrl5 }">style="display:none"</c:if> /><br />
				 
				 <input name="picUrl6" id="p6" type="hidden" value="${img.img6}"><br />
				 <img id="urlI6" name="picU6" width="80px" height="80px" src="${pic.picUrl6 }" <c:if test="${empty pic.picUrl6 }">style="display:none"</c:if> onclick="editePic('6');"/>
				 <span id="delete6" style="color: red<c:if test="${empty pic.picUrl6 }">;display:none</c:if>"onclick="editePic('6')">删除</span>
				 <input id="urlF6" name="pic6" type="file" <c:if test="${not empty pic.picUrl6 }">style="display:none"</c:if> /><br />
				 
				 <input name="picUrl7" id="p7" type="hidden" value="${img.img7}"><br />
				 <img id="urlI7" name="picU7" width="80px" height="80px" src="${pic.picUrl7 }" <c:if test="${empty pic.picUrl7 }">style="display:none"</c:if> onclick="editePic('7');"/>
				 <span id="delete7" style="color: red<c:if test="${empty pic.picUrl7 }">;display:none</c:if>"onclick="editePic('7')">删除</span>
				 <input id="urlF7" name="pic7" type="file" <c:if test="${not empty pic.picUrl7 }">style="display:none"</c:if> /><br />
				 
				 <input name="picUrl8" id="p8" type="hidden" value="${img.img8}"><br />
				 <img id="urlI8" name="picU8" width="80px" height="80px" src="${pic.picUrl8 }" <c:if test="${empty pic.picUrl8 }">style="display:none"</c:if> onclick="editePic('8');"/>
				 <span id="delete8" style="color: red<c:if test="${empty pic.picUrl8 }">;display:none</c:if>"onclick="editePic('8')">删除</span>
				 <input id="urlF8" name="pic8" type="file" <c:if test="${not empty pic.picUrl8 }">style="display:none"</c:if> /><br />
				 
				 <input name="picUrl9" id="p9" type="hidden" value="${img.img9}"><br />
				 <img id="urlI9" name="picU9" width="80px" height="80px" src="${pic.picUrl9 }" <c:if test="${empty pic.picUrl9 }">style="display:none"</c:if> onclick="editePic('9');"/>
				 <span id="delete9" style="color: red<c:if test="${empty pic.picUrl9 }">;display:none</c:if>"onclick="editePic('9')">删除</span>
				 <input id="urlF9" name="pic9" type="file" <c:if test="${not empty pic.picUrl9 }">style="display:none"</c:if> /><br /> 
				 <br/><span style="color: red">最多可上传9张图片</span>
				 -->
				  
				 
		<tr><td >创建日期：</td>
			<td>
			<fmt:formatDate value='${appTopic.createTime }' pattern='yyyy-MM-dd HH:mm:ss' /> 
			</td>
		</tr>
		<tr><td colspan="2" style="text-align: right">
		<input type="button" style="margin-left: 20px" class="btn_an" value="保存" onclick="add()" id="baocunid">
		<input type="button" class="btn_qx" value="取消" onclick="javasncript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
		<br/>
	</form>
  </body>
</html>
