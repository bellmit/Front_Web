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
    
    <title>角色</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<title>七牛云存储 - JavaScript SDK</title>
	<link href="favicon.ico" rel="shortcut icon">
	<link rel="stylesheet" href="js/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" href="js/upload/highlight/highlight.css">
	<link href="css/public.css"  rel="stylesheet" type="text/css" />
	<link id="cssFile" rel="stylesheet" href="css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="css/pilelot-ui.css"/>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/plupload/plupload.full.min.js"></script>
	<script type="text/javascript" src="js/plupload/i18n/zh_CN.js"></script>
	<script type="text/javascript" src="js/upload/ui.js"></script>
	<script type="text/javascript" src="js/upload/qiniu.js"></script>
	<script type="text/javascript" src="js/upload/highlight/highlight.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/js_common.js"></script>
	<script type="text/javascript" src="js/behind/video/video_update.js"></script>
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
</head>
<body>
	<form id="insertorupdateForm" method="post" >
		 <input type="hidden" id="ID" name="ID"/> <!-- 主键ID -->
		 <input type="hidden" id="VIDEO_ID" name="VIDEO_ID"/> <!-- 业务ID-->
         <input type="hidden" id="PIC_URL" name="PIC_URL"/> <!-- 海报 -->
         <input type="hidden" id="PIC_URL_X" name="PIC_URL_X"/> <!-- 横向海报 -->
         <input type="hidden" id="ADMIN_OR_USER" name="ADMIN_OR_USER"/> <!-- 前台还是后台上传 -->
         <input type="hidden" id="VIDEOTYPE_ONE1" name="VIDEOTYPE_ONE1"/> <!-- 一级类型，用来判断 电视、电影、动漫改为微视频，微视频改为电视、电影、动漫 -->
         <input type="hidden" id="spjt" name="spjt"/> <!-- 将电影、电视、动漫改为微视频需要视频截图填充横竖海报-->
         
         <div style="margin-left:10px;">
         	<span style="color: red">视频支持格式：asx,asf,mpg,wmv,3gp,mp4,mov,avi,flv,mkv</span>
  			<table class="mainTable">
				<tr>
  					<td style="width:20%">竖版海报(720x984)：</td>
  					<td>
						 <div id="container2" >
				               <a class="btn btn-default btn-lg" id="pickfiles2" href="#" >
				                   <i class="glyphicon glyphicon-plus"></i>
				                   <span>选择文件</span>
				               </a>
				           </div>
					</td>
					<td id="msg2" style="text-align: right">
					
					</td>
				</tr>
				<tr>
  					<td >横版海报(960x480)：</td>
  					<td>
						<div id="container3" >
			               <a class="btn btn-default btn-lg" id="pickfiles3" href="#" >
			                   <i class="glyphicon glyphicon-plus"></i>
			                   <span>选择文件</span>
			               </a>
			           </div>
					</td>
					<td id="msg3" style="text-align: right">
					
					</td>
				</tr>
				<tr>
		  		<td >视频名称：</td>
		  		<td colspan="2">
				<input id="VIDEO_NAME" name="VIDEO_NAME" maxlength="25"><span style="color: red">*</span>  
				</td></tr>
				<tr id="isYj">
		  		<td>一级类型：</td>
		  		<td  colspan="2">
					<select id="VIDEOTYPE_ONE" name="VIDEOTYPE_ONE" onchange="initTypeTwo(this.value)"><option value="">请选择</option></select><span style="color: red">*</span> 
				</td></tr>
				<tr>
				<td valign="middle" style="text-align:middle ">二级类型：</td>
		  		<td  colspan="2">
					<span id="VIDEOTYPE_TWO_SPAN"></span>
						<select id="VIDEOTYPE_TWO" name="VIDEOTYPE_TWO" >
						</select>
						<span style="color: red">*</span> 
				</td></tr>
				<tr id="isMj">
		  		<td>选用马甲：</td>
		  		<td  colspan="2">
					<select id="VEST" name="VEST"><option value="">请选择</option></select> <span style="color: red">*</span> 
				</td></tr>
				<tr id="spdy">
		  		<td>视频导演：</td>
		  		<td  colspan="2">
					<input id="VIDEO_AUTHOR" name="VIDEO_AUTHOR" maxlength="32">  
					 <span style="color: red">*</span>
				</td></tr>
				<tr id="spzy">
		  		<td>视频主演：</td>
		  		<td  colspan="2">
					<input id="VIDEO_ACTOR" name="VIDEO_ACTOR" maxlength="32">  
					 <span style="color: red">*</span>
				</td></tr>
				<tr id="spjj">
				<td>视频看点：</td>
		  		<td  colspan="2">
					<input id="VIDEO_PROFILE" name="VIDEO_PROFILE" maxlength="15">  
					 <span style="color: red">*(15字之内)</span>
				</td></tr>
				<tr>
		  		<td>视频介绍：</td>
		  		<td  colspan="2">
					<textarea id="VIDEO_CONTENT" name="VIDEO_CONTENT"></textarea>
					<span style="color: red">*(1000字之内)</span>
				</td></tr>
				<tr id="spnd">
		  		<td>视频年代：</td>
		  		<td  colspan="2">
					<input   id="VIDEO_YEAR" name="VIDEO_YEAR" type="text"  onClick="WdatePicker({dateFmt:'yyyy'})" /><span style="color: red">*</span> 
				</td></tr>
				<tr>
		  		<td>视频地区：</td>
		  		<td  colspan="2">
					<select id="VIDEO_REGION" name="VIDEO_REGION">
						<option value="内地">内地</option>
						<option value="港台">港台</option>
						<option value="日韩">日韩</option>
						<option value="欧美">欧美</option>
						<option value="其他">其他</option>
					</select><span style="color: red">*</span>
				</td></tr>
				<tr>
		  		<td>视频语言：</td>
		  		<td  colspan="2">
					<input id="LANGUAGE" name="LANGUAGE" maxlength="32">  
				</td></tr>
				<tr>
		  		<td>视频权重：</td>
		  		<td  colspan="2">
					<input id="VIDEO_WEIGHT" class="it_text" maxlength="9" value="0"  name="VIDEO_WEIGHT" oninput="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'')"> <span style="color: red">*</span> 
				</td></tr>
				<tr>
		  		<td>视频总集数：</td>
		  		<td  colspan="2">
					<input id="COUNT_SERIES" class="it_text" maxlength="9" value="1" name="COUNT_SERIES" oninput="checkNum(this)" onkeyup="checkNum(this)"> <span style="color: red">*</span> 
				</td></tr>
				<tr id="onlyJj4" style="display: none">
				<td>片头：</td>
		  		<td  colspan="2">
					<input id="TITLES" name="TITLES" maxlength="9" oninput="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'')"> <span style="color: red">*</span> 
				</td></tr>
				<tr id="onlyJj5" style="display: none">
				<td>片尾：</td>
		  		<td  colspan="2">
					<input id="TRAILER" name="TRAILER" maxlength="9" oninput="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'')"> <span style="color: red">*</span> 
				</td></tr>
				<tr>
					<td colspan="3" style="text-align: right">
						<input class="btn_an" type="button" value="保存" onclick="add()" id="baocunid">
						<input  class="btn_qx" type="button" value="取消" onclick="javascript:parent.$('#windowDiv').window('close');">
					</td>
				</tr>
  			</table>
  		</div>
            
            
     </form>
</body>
</html>
