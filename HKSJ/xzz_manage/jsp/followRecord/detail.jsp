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
    
    <title>随记详情</title>
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
	<script type="text/javascript" src="js/DateUtil.js"></script> 
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	   <script type="text/javascript"> 
			 //返回列表页
			function go_back() { 
				history.back();
			}
	   </script>
	   
	   <style type="text/css">
		td{
			font-size: 15px;
			line-height: 30px;
		}
		#td{
			color: #22AC38 ;
		}
		
	</style>
  </head> 
<body>
	<!--right-->
	<h3 class="right_nav">图文管理> 随记管理   </h3> 
		<div class="bg_fff">
        	<h2 class="tit_yi">查看随记信息</h2>
        	<div class="comtent_div" style="margin: 20px 0px 0px 80px">
        	<table>
        	   		<tr>
        	   			<td style="width: 90px">点赞总数:</td>
        	   			<td style="width: 140px" id='td'> 
        	   				<c:if test="${empty followRecord.praisesSum}">
        	   					0
        	   				</c:if>
        	   				<c:if test="${not empty followRecord.praisesSum}">
        	   					${followRecord.praisesSum}
        	   				</c:if>
        	   			</td> 
        	   			<td style="width: 90px">评论总数:</td>
        	   			<td style="width: 160px" id='td'>
        	   				<c:if test="${empty followRecord.commentSum}">
        	   					0
        	   				</c:if>
        	   				<c:if test="${not empty followRecord.commentSum}">
        	   					${followRecord.commentSum}
        	   				</c:if>
        	   			</td>  
        	   			
        	   		</tr> 
        	   		
        	   		<tr>
        	   			<td>评分享总数:</td>
        	   			<td id='td'>
        	   				<c:if test="${empty followRecord.shareSum}">
        	   					0
        	   				</c:if>
        	   				<c:if test="${not empty followRecord.shareSum}">
        	   					${followRecord.shareSum}
        	   				</c:if>
        	   			</td> 
        	   			<td>转发总数:</td>
        	   			<td id='td'>
	        	   			   <c:if test="${empty followRecord.forwardingSum}">
	        	   					0
	        	   				</c:if>
	        	   				<c:if test="${not empty followRecord.forwardingSum}">
	        	   					${followRecord.forwardingSum}
	        	   				</c:if>
        	   			
        	   			</td> 
        	   		</tr>
        	   		<tr> 
        	   			<td>锁定状态:</td>
        	   			<td id='td'>
        	   				 <c:if test="${followRecord.isLock == 0}">
        	   				 	未锁定
        	   				 </c:if>
        	   				  <c:if test="${followRecord.isLock == 1}">
        	   				 	已锁定
        	   				 </c:if>
        	   			</td>
        	   			<td>
        	   				 <c:if test="${followRecord.isLock == 0}">
        	   				 	审核人：
        	   				  </c:if>
        	   				  <c:if test="${followRecord.isLock == 1}">
        	   				 	锁定人：
        	   				  </c:if>  
        	   			</td>
        	   			<td id='td'>${followRecord.auditName}</td>
       	   			</tr>
       	   			<tr>
        	   			<td>审核状态:</td>
        	   			<td id='td'>
        	   				 <c:if test="${followRecord.isPass == 1}">
        	   				 	未审核
        	   				 </c:if>
        	   				  <c:if test="${followRecord.isPass == 2}">
        	   				 	审核通过
        	   				 </c:if>
        	   				 <c:if test="${followRecord.isPass == 3}">
        	   				 	审核不通过
        	   				 </c:if> 
        	   			</td>   
        	   			
        	   			<td> 
        	   				  <c:if test="${followRecord.isLock == 0}">
        	   				 	审核时间：
        	   				  </c:if>
        	   				  <c:if test="${followRecord.isLock == 1}">
        	   				 	锁定时间：
        	   				  </c:if>  
        	   			 
        	   			</td>
        	   			<td id='td'><fmt:formatDate value='${followRecord.checkTime}' pattern='yyyy-MM-dd HH:mm:ss'/> </td>  
        	   		</tr> 
        	   		<tr> 
        	   			<td>审核备注:</td>
        	   			<td id='td'>${followRecord.auditMark}</td> 
        	   			<td>状态:</td>
        	   			<td id='td'>
        	   				 <c:if test="${followRecord.status == 0}">
        	   				 	已上架
        	   				 </c:if>
        	   				  <c:if test="${followRecord.status == 1}">
        	   				 	已下架
        	   				 </c:if>
        	   			</td>
        	   		</tr>
        	   		<%-- <tr>
        	   			<td>是否是广告:</td>
        	   			<td id='td'>
        	   			  <c:choose>
        	   			  		<c:when test="${followRecord.isAdvert == 1}">是</c:when>
        	   			  		<c:otherwise>不是</c:otherwise>
        	   			  </c:choose>
        	   				 <c:if test="${followRecord.isAdvert == 0}">
        	   				 	不是
        	   				 </c:if>
        	   				  <c:if test="${followRecord.isLock == 1}">
        	   				 	是
        	   				 </c:if>
        	   			</td>
        	   			<td>广告url:</td>
        	   			<td id='td'>${followRecord.advertUrl}</td>
        	   			
        	   		</tr> --%>
        	   		<tr> 
        	   			<td>作者:</td>
        	   			<td id='td'>${followRecord.userName}</td>
        	   			<td>创建时间:</td>
        	   			<td id='td'><fmt:formatDate value='${followRecord.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/></td>
        	   		</tr>
        	   		<tr>
        	   			<td colspan="4">内容：</td>
        	   		</tr>  
        	   		<tr>
        	   			<td colspan="4">
        	   				<div style="margin-left:50px;width:580px;height:200px;padding: 20px 0.25em 2ex 20px;overflow:auto;  border-style:solid; border-width:1px; border-color:#D7D8DF">
								${followRecord.content}
							 </div> 
        	   			</td>
        	   		</tr>
        	   		<tr>
        	   			<td colspan="4">图片：</td>
        	   		</tr>  
        	   		<tr>
        	   			<td colspan="5">
        	   				<div style="margin-left:50px;width:580px;height:450px;padding: 20px 0.25em 2ex 20px;overflow:auto;  border-style:solid; border-width:1px; border-color:#D7D8DF">
								<c:if test="${not empty imgList}">
										<c:forEach items="${imgList}" var="img">
										<a href="${img_path}${img}"  target="_blank"><img alt="img" style="width: 130px;height: 130px;margin-left: 15px;" src="${img_path}${img}"/></a>
										</c:forEach>
								</c:if>
							 </div> 
        	   			</td>
        	   		</tr>
        	   		<tr>
        	   			<td colspan="4">
        	   				<br/>
        	   				 <button type="button" class="btn4" style=" margin:0 12px 0 250px;width: 100px;height: 31px;text-align:center;"  onclick="go_back()">返 回</button>
        	   			</td>
        	   		</tr>
        	</table>
        	<br/><br/>
        	</div>
        </div>  
</body>
</html>
