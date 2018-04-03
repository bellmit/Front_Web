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
    
    <title>会员</title>
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
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	   <script type="text/javascript"> 
			 //返回列表页
			function go_back() { 
				history.back();
			}
			 
			function save(){
				 var fom = $("#addUser").serialize();
					$.post('user/save.do',fom,function(result){
						if(result== "true" ) //成功
						{ 
							$.messager.alert("提示","添加成功","info");
							go_back();
						}  
						else
						{
							$.messager.alert("提示","添加失败","info");
						}
					}) 
			 }
	   </script>
  </head> 
<body>
	<!--right-->
	<h3 class="right_nav">会员管理> 马甲用户  </h3> 
		<div class="bg_fff">
        	<h2 class="tit_yi">新增马甲用户</h2>
        <form id="addUser">
       		<ul class="list_li4 clearfix">
                <li><label>头像：</label>	<input type="file" name="headUrl"/> </li> 
                <li><label>账号：</label><input type="text" name="account"></li> 
                <li><label>昵称：</label><input type="text" name="nickname"></li>  
                <li><label>密码：</label><input type="text" name="pwd"></li>
                <li><label>确认密码：</label><input type="text" name="pwds"></li>
                <li><label>手机：</label><input type="text" name="mobile"> </li> 
                <li><label>性别：</label>   
              	  <input type="radio" name="sex" value="0" checked="checked">男
               	  <input type="radio" name="sex" value="1">女
                </li>  
                <li><label>省份：</label><input type="text" name="province"> </li>  
                <li><label>市：</label><input type="text" name="city"> </li>  
                <li>是否展示个人资料：</label>
                		<select name="isPublic">
                			<option value="1">是</option>
                			<option value="0">否</option>
                		</select> 
                
                </li>
                <li><label>是否开启评论：</label> 
                		<select name="openComment">
                			<option value="1">是</option>
                			<option value="0">否</option>
                		</select>  
                </li>
                <li><label>是否开启长文：</label>
                		<select name="openLongarticle">
                			<option value="1">是</option>
                			<option value="0">否</option>
                		</select>   
                </li>
                <li><label>Email：</label><input type="text" name="email"></li>    
                <li style=" width:96%; margin-right:0;">
               		<label style="vertical-align:top;">个性签名：</label>
               		<input type="text" name="sign"> 
               	</li>
				 <%-- <div style="margin-left:100px;width:580px;height:400px;padding: 20px 0.25em 2ex 20px;overflow:auto;  border-style:solid; border-width:1px; border-color:#D7D8DF">
					${user.sign}
				 </div>  --%>
                <li style=" margin-top:12px;">
               		 <a href="javascript:void(0);" class="btn2" style=" margin:0 12px 0 160px;"  onclick="save()">提交</a>
               		  <a href="javascript:void(0);" class="btn4" style=" margin:0 12px 0 160px;"  onclick="go_back()">返回</a>
                </li>
            </ul>  
        </form>
            
        </div>  
</body>
</html>
