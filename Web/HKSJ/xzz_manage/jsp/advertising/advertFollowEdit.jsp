<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>广告类型</title>
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
	<script type="text/javascript" src="js/jquery.form.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/behind/advertising/advert_follow_add.js"></script>
  </head>
  
  <body>
  		<form id="advertFollowForm" method="post" enctype="multipart/form-data">
  		<div style="margin-left:10px;">
  		<table class="mainTable">
  		<tr><td >广告内容：</td><td>
  		<input name="id" type="hidden" value="${followRecord.id }">
		<input id="content" name="content" type="text" value="${followRecord.content }"><span style="color: red">*</span> 
		</td></tr>
		<tr><td >链接：</td><td>
		<input id="advertUrl" name="advertUrl" maxlength="200" value="${followRecord.advertUrl }"><span style="color: red">*</span> 
		</td></tr>
		<tr><td >导图：</td><td>
		<input name="picUrl1" id="p1" type="hidden" value="${img.img1}"><br />
		<img id="urlI1" name="picU1" width="120px" height="120px" src="${pic.picUrl1 }" <c:if test="${empty pic.picUrl1 }">style="display:none"</c:if> onclick="editePic1();"/>
		<span id="warn1" style="color: red<c:if test="${empty pic.picUrl1 }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF1" name="pic1" type="file" <c:if test="${not empty pic.picUrl1 }">style="display:none"</c:if> /><br />
		
		<input id="p2" name="picUrl2" type="hidden" value="${img.img2 }"><br />
		<img id="urlI2" name="picU2" width="120px" height="120px" src="${pic.picUrl2 }" <c:if test="${empty pic.picUrl2 }">style="display:none"</c:if> onclick="editePic2();"/>
		<span id="warn2" style="color: red<c:if test="${empty pic.picUrl2 }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF2" name="pic2" type="file" <c:if test="${not empty pic.picUrl2 }">style="display:none"</c:if> /><br />
		
		<input id="p3" name="picUrl3" type="hidden" value="${img.img3 }"><br />
		<img id="urlI3" name="picU3" width="120px" height="120px" src="${pic.picUrl3 }" <c:if test="${empty pic.picUrl3 }">style="display:none"</c:if> onclick="editePic3();"/>
		<span id="warn3" style="color: red<c:if test="${empty pic.picUrl3 }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF3" name="pic3" type="file" <c:if test="${not empty pic.picUrl3 }">style="display:none"</c:if> /><br />
		
		<input id="p4" name="picUrl4" type="hidden" value="${img.img4 }"><br />
		<img id="urlI4" name="picU4" width="120px" height="120px" src="${pic.picUrl4 }" <c:if test="${empty pic.picUrl4 }">style="display:none"</c:if> onclick="editePic4();"/>
		<span id="warn4" style="color: red<c:if test="${empty pic.picUrl4 }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF4" name="pic4" type="file" <c:if test="${not empty pic.picUrl4 }">style="display:none"</c:if> /><br />
		
		<input id="p5" name="picUrl5" type="hidden" value="${img.img5 }"><br />
		<img id="urlI5" name="picU5" width="120px" height="120px" src="${pic.picUrl5 }" <c:if test="${empty pic.picUrl5 }">style="display:none"</c:if> onclick="editePic5();"/>
		<span id="warn5" style="color: red<c:if test="${empty pic.picUrl5 }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF5" name="pic5" type="file" <c:if test="${not empty pic.picUrl5 }">style="display:none"</c:if> /><br />
		
	    <input id="p6" name="picUrl6" type="hidden" value="${img.img6 }"><br />
		<img id="urlI6" name="picU6" width="120px" height="120px" src="${pic.picUrl6 }" <c:if test="${empty pic.picUrl6 }">style="display:none"</c:if> onclick="editePic6();"/>
		<span id="warn6" style="color: red<c:if test="${empty pic.picUrl6 }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF6" name="pic6" type="file" <c:if test="${not empty pic.picUrl6 }">style="display:none"</c:if> /><br />
		
		<input id="p7" name="picUrl7" type="hidden" value="${img.img7 }"><br />
		<img id="urlI7" name="picU7" width="120px" height="120px" src="${pic.picUrl7 }" <c:if test="${empty pic.picUrl7 }">style="display:none"</c:if> onclick="editePic7();"/>
		<span id="warn7" style="color: red<c:if test="${empty pic.picUrl7 }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF7" name="pic7" type="file" <c:if test="${not empty pic.picUrl7 }">style="display:none"</c:if> /><br />
		
		<input id="p8" name="picUrl8" type="hidden" value="${img.img8 }"><br />
		<img id="urlI8" name="picU8" width="120px" height="120px" src="${pic.picUrl8 }" <c:if test="${empty pic.picUrl8 }">style="display:none"</c:if> onclick="editePic8();"/>
		<span id="warn8" style="color: red<c:if test="${empty pic.picUrl8 }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF8" name="pic8" type="file" <c:if test="${not empty pic.picUrl8 }">style="display:none"</c:if> /><br />
		
		<input id="p9" name="picUrl9" type="hidden" value="${img.img9 }"><br />
		<img id="urlI9" name="picU9" width="120px" height="120px" src="${pic.picUrl9 }" <c:if test="${empty pic.picUrl9 }">style="display:none"</c:if> onclick="editePic9();"/>
		<span id="warn9" style="color: red<c:if test="${empty pic.picUrl9 }">;display:none</c:if>">*点击输入框更改图片</span>
		<input id="urlF9" name="pic9" type="file" <c:if test="${not empty pic.picUrl9 }">style="display:none"</c:if> /><br />
		
		<span style="color: red">最多可上传9张图片</span>
		</td></tr>
		<tr><td >是否上架：</td><td>
		<select name="status" id="status">
			<option value="0" <c:if test="${followRecord.status==0 }">selected</c:if> >上架</option>
			<option value="1" <c:if test="${followRecord.status==1 }">selected</c:if> >下架</option>
		</select><span style="color: red">*</span>
		</td></tr>
		<tr><td colspan="2" style="text-align: center">
		<input type="button" class="btn_an" value="保存" onclick="add()" id="baocunid">
		<input type="button" class="btn_qx" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
		</td></tr>
		</table>
		</div>
	</form>
  </body>
</html>
