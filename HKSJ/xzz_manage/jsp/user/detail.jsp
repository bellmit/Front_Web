<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@include file="/WEB-INF/common/common.jsp"%>
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
			 
	   </script>
  </head> 
<body>
	<!--right-->
	<h3 class="right_nav">会员管理> 账号管理  </h3> 
		<div class="bg_fff">
        	<h2 class="tit_yi">查看账户信息</h2>
            <ul class="list_li4 clearfix">
                 <li><label>头像：</label><img style="cursor: pointer;" src="${img_path}${user.headUrl }" width="80" height="80" alt="头像"></li>
           
                <li><label>用户类型：</label> 
                			<c:if test="${user.userType == 0}">
        	   				 	惠粉
        	   				  </c:if>
        	   				  <c:if test="${user.userType  == 1}">
        	   				 	运营账户
        	   				  </c:if> 
                 </li>
                 <li><label>账号：</label><c:out value="${user.account}"></c:out></li>
                 <li><label>昵称：</label><c:out value="${user.nickname}"></c:out></li> 
                 <li><label>手机：</label><c:out value="${user.mobile}" /></li> 
                 <li><label>性别：</label>
               				  <c:if test="${user.sex == 0}">
        	   				 	男
        	   				  </c:if>
        	   				  <c:if test="${user.sex  == 1}">
        	   				 	女
        	   				  </c:if> 
                </li> 
                <li><label>状态：</label> 
               					<c:if test="${user.status == 0}">
        	   				 	正常
        	   				  </c:if>
        	   				  <c:if test="${user.status  == 1}">
        	   				 	冻结
        	   				  </c:if> 
                </li>  
                <li><label>是否展示个人资料：</label> 
               					<c:if test="${user.isPublic == 0}">
        	   				 	不展示
        	   				  </c:if>
        	   				  <c:if test="${user.isPublic  == 1}">
        	   				 	展示
        	   				  </c:if>  
                </li>
                <li><label>是否开启评论：</label> 
                		<c:if test="${user.openComment == 0}">
        	   				 	不开启
        	   				  </c:if>
        	   				  <c:if test="${user.openComment  == 1}">
        	   				 	开启
        	   				  </c:if> 
                </li>
                <li><label>是否开启长文：</label> 
                			<c:if test="${user.openLongarticle == 0}">
        	   				 	不开启
        	   				  </c:if>
        	   				  <c:if test="${user.openLongarticle  == 1}">
        	   				 	开启
        	   				  </c:if>  
                </li>
                <li><label>Email：</label><c:out value="${user.email}" /></li> 
                <li><label>自传币：</label><c:out value="${user.integral}" /></li> 
                <li><label>注册时间：</label><fmt:formatDate value='${user.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/></li> 
                <li><label>最近登录时间：</label><fmt:formatDate value='${user.lastLoginTime}' pattern='yyyy-MM-dd HH:mm:ss'/> 
                 <li style=" width:96%; margin-right:0;">
               		<label style="vertical-align:top;">个性签名：</label>
				 <div style="margin-left:100px;width:580px;height:60px;padding: 20px 0.25em 2ex 20px;overflow:auto;  border-style:solid; border-width:1px; border-color:#D7D8DF">
					${user.sign}
				 </div> 
                <li style=" margin-top:12px;">
                <a href="javascript:void(0);" class="btn4" style=" margin:0 12px 0 160px;"  onclick="go_back()">返 回</a></li>
            </ul> 
        </div>  
</body>
</html>
