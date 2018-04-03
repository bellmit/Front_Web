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
    
    <title>角色</title>
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
			 
			 function getInfo(id){
				 alert(id);
				 window.open("longArticle/getDetail.do?id="+id, "_blank");
			 }
	   </script>
  </head> 
  
   <style type="text/css">
		td{
			font-size: 15px;
			line-height: 30px;
		}
		#td{
			color: #22AC38 ;
		}
		
	</style>
<body>
	<!--right-->
	<h3 class="right_nav">图文管理> 长文管理   </h3> 
		<div class="bg_fff">
        	<h2 class="tit_yi">查看长文信息</h2>
        	<div id="content_div" style="margin-left: 70px">
        	 <table>
        	   		<tr>
        	   			<td style="width: 90px">导图：</td>
        	   			<td style="width: 140px" id='td'> 
        	   				 <img style="cursor: pointer;" src="${img_path}${longArticle.longHeadUrl}" width="80" height="80" alt="导图">
        	   			</td> 
        	   			<td style="width: 90px">长文标题:</td>
        	   			<td style="width: 160px" id='td'>
        	   				${longArticle.title}
        	   			</td>  
        	   			<td>点赞总数： </td>
        	   			<td id='td'>
        	   				<c:if test="${empty longArticle.praisesSum}">
        	   					0
        	   				</c:if>
        	   				<c:if test="${not empty longArticle.praisesSum}">
        	   					${longArticle.praisesSum}
        	   				</c:if>
        	   			</td> 
        	   		</tr> 
        	   		
        	   		<tr> 
        	   			<td>评论总数： </td>
        	   			<td id='td'>
	        	   			  <c:if test="${empty longArticle.commentSum}">
        	   					0
        	   				</c:if>
        	   				<c:if test="${not empty longArticle.commentSum}">
        	   					${longArticle.commentSum}
        	   				</c:if> 
        	   			</td> 
        	   			<td>分享总数： </td>
        	   			<td id='td'>
	        	   			  <c:if test="${empty longArticle.shareSum}">
        	   					0
        	   				</c:if>
        	   				<c:if test="${not empty longArticle.shareSum}">
        	   					${longArticle.shareSum}
        	   				</c:if>  
        	   			</td> 
        	   			<td>转发总数： </td>
        	   			<td id='td'>
	        	   			<c:if test="${empty longArticle.forwardingSum}">
        	   					0
        	   				</c:if>
        	   				<c:if test="${not empty longArticle.forwardingSum}">
        	   					${longArticle.forwardingSum}
        	   				</c:if> 
        	   			</td> 
        	   		</tr>   
        	   		<tr> 
        	   			<td>审核状态：</td>
        	   			<td id='td'>
	        	   			 <c:if test="${longArticle.isPass == 1}">
        	   				 	未审核
        	   				  </c:if>
        	   				  <c:if test="${longArticle.isPass == 2}">
        	   				 	审核通过
        	   				  </c:if>  
        	   				  <c:if test="${longArticle.isPass == 3}">
        	   				 	审核不通过
        	   				  </c:if> 
        	   			</td> 
        	   			<td>
        	   				<c:if test="${longArticle.isLock == 0}">
        	   				 	审核人：
        	   				  </c:if>
        	   				  <c:if test="${longArticle.isLock == 1}">
        	   				 	锁定人：
        	   				  </c:if>  
        	   			 </td>
        	   			<td id='td'>
	        	   			${longArticle.auditName}
        	   			</td> 
        	   			<td>
        	   			 	 <c:if test="${longArticle.isLock == 0}">
        	   				 	审核时间：
        	   				  </c:if>
        	   				  <c:if test="${longArticle.isLock == 1}">
        	   				 	锁定时间：
        	   				  </c:if>   
        	   			 </td>
        	   			<td id='td'>
	        	   			<fmt:formatDate value='${longArticle.checkTime}' pattern='yyyy-MM-dd HH:mm:ss'/>
        	   			</td> 
        	   		</tr> 
        	   		<tr> 
        	   			<td>锁定状态：</td>
        	   			<td id='td'>
	        	   			 <c:if test="${longArticle.isLock == 0}">
        	   				 	未锁定
        	   				  </c:if>
        	   				  <c:if test="${longArticle.isLock == 1}">
        	   				 	已锁定
        	   				  </c:if>  
        	   			</td>   
        	   			<td>上架状态： </td>
        	   			<td id='td'>
	        	   			<c:if test="${longArticle.status == 0}">
        	   				 	已上架
        	   				  </c:if>
        	   				  <c:if test="${longArticle.status == 1}">
        	   				 	已下架
        	   				  </c:if>  
        	   			</td> 
        	   		</tr> 
        	   		
        	   		<tr> 
        	   			<td>审核说明：</td>
        	   			<td id='td' colspan="5">
	        	   			  ${longArticle.auditMark}
        	   			</td> 
        	   		</tr> 
        	   		
        	   		<tr> 
        	   			<td>是否置顶：</td>
        	   			<td id='td'>
	        	   			 <c:if test="${longArticle.longPlace == 0}">
        	   				 	正常
        	   				  </c:if>
        	   				  <c:if test="${longArticle.longPlace == 1}">
        	   				 	已置顶
        	   				  </c:if>  
        	   			</td> 
        	   				<td>作者：</td>
        	   			<td id='td'>
	        	   			 ${longArticle.userName}
        	   			</td> 
        	   				<td>创建时间：</td>
        	   			<td id='td'>
	        	   			 <fmt:formatDate value='${longArticle.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/> 
        	   			</td> 
        	   		</tr> 
        	   		<tr>
        	   			<td>内容:</td>
        	   			<td colspan="5"><a href="longArticle/getDetail.do?id=${longArticle.id}" target="_Blank" style="color: blue;">查看原文</a></td>
        	   		</tr>
        	   		<tr> 
        	   			<td colspan="6">
        	   			 <button type="button" class="btn4" style="margin:0 20px 0 290px;width: 100px;height: 31px;text-align:center;"  onclick="go_back()">返 回</button>
        	   			</td>
        	   		</tr>
        	</table>    
                 
        	</div>
             <br/><br/><br/>
        </div>  
       
</body>
</html>
