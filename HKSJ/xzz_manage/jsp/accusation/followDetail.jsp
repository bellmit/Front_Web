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
    
    <title>角色</title>
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
			 
			 function disFollow(){
				 $.messager.confirm("确认","确定要下架该随记？",function(ha){
					 if(ha)
					 {  
						 var id = $("#id").val(); 
						$.post('followRecord/updataStatus.do',{id:id,status:1},function(result){
						 		if(result == 'success')
						 		{ 
						 			$.messager.alert("提示","下架成功","info");
						 			 location.reload();
						 		}else{
						 			$.messager.alert("提示","下架失败","info");
						 		}  
						 });
					 }
				 });
			 }
	   </script>
  </head> 
<body>
	<!--right-->
	<h3 class="right_nav">图文管理> 举报列表   </h3> 
		<div class="bg_fff">
        	<h2 class="tit_yi">查看信息</h2>
        		<input type="hidden" id="id" name="id" value="${followRecord.id}">  
       			<table style="padding: 20px 0.25em 2ex 20px;">
            		 <tr  > 
        	   			<td>作者:</td>
        	   			<td  style="text-align: left;">${followRecord.userName}</td>
        	   			<td>创建时间:</td>
        	   			<td  style="text-align: left;"><fmt:formatDate value='${followRecord.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/></td>
        	   		  	<td>随记状态：</td>
        	   			<td > 
			             	 <c:if test="${followRecord.status == 0}">
        	   				 	已上架
        	   				  </c:if>
        	   				  <c:if test="${followRecord.status == 1}">
        	   				 	<label style="color: red">已下架</label>
        	   				  </c:if>  
        	   			</td>
        	   			
        	   		</tr>
        	   		<tr>
        	   			<td >内容：</td> 
        	   			<td colspan="5">
        	   				 <div style="margin-left:50px;width:580px;height:200px;padding: 20px 0.25em 2ex 20px;overflow:auto;  border-style:solid; border-width:1px; border-color:#D7D8DF">
								${followRecord.content}
							 </div> 
        	   			</td>
        	   		</tr>
        	   		<tr>
        	   			<td  >图片：</td> 
        	   			<td colspan="5">
        	   				<div style="margin-left:50px;width:580px;height:400px;padding: 20px 0.25em 2ex 20px;overflow:auto;  border-style:solid; border-width:1px; border-color:#D7D8DF">
								<c:if test="${not empty imgList}">
										<c:forEach items="${imgList}" var="img">
												<img alt="img" style="width: 100px;height: 100px" src="${img_path}${img}">
										</c:forEach>
								</c:if>
							 </div> 
        	   			</td>
        	   		</tr>
        	   		<tr>
        	   			<td colspan="6">
        	   				<br/>
        	   				 
        	   				   <c:if test="${followRecord.status == 0}">
        	   				 	<button type="button" class="btn4"   style=" margin:0 12px 0 250px;width: 100px;height: 31px;text-align:center;background-color: #45b6af"  onclick="disFollow()">下架该随记</button>
        	   				  </c:if>
        	   				 <button type="button" class="btn4" style=" margin:0 12px 0 250px;width: 100px;height: 31px;text-align:center;"  onclick="go_back()">返 回</button>
        	   			</td>
        	   		</tr>
        	</table>
        </div>  
</body>
</html>
