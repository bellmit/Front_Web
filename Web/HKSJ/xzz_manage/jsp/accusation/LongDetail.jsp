<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

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
	<link rel="stylesheet" type="text/css" href="css/article.css">
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
			 
			 function disLong(){
				 $.messager.confirm("确认","确定要下架该文章？",function(ha){
					 if(ha)
					 {  
						 var id = $("#id").val(); 
						$.post('longArticle/disStatus.do',{id:id,status:1},function(result){
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
	   
	<style type="text/css">
		li{ 
			line-height: 30px;
		}
		label{
			font-size: 15px;
		}
	</style>
  </head> 
<body>
	<!--right-->
	<h3 class="right_nav">图文管理> 举报列表   </h3> 
		<div class="bg_fff"> 
		<h2 class="tit_yi">查看详情</h2>
		<div class="comtent_div" style="margin: 20px 0px 0px 80px"> 
	        	<input type="hidden" id="id" name="id" value="${longArticle.id}"> 
	        	<input type="hidden" id="userId" name="userId" value="${longArticle.userId}"> 
		            <ul class="list_li4 clearfix"> 
			             <li style=" margin-top:12px;margin-left: 180px">
			             	<label>文章状态：</label>
			             	 <c:if test="${longArticle.status == 0}">
        	   				 	已上架
        	   				  </c:if>
        	   				  <c:if test="${longArticle.status == 1}">
        	   				 	<label style="color: red">已下架</label>
        	   				  </c:if>  
			             </li> 
		                <li style=" width:96%; margin-right:0;"> 
							 <div style="margin-left:50px;width:90%;height:70%;padding: 20px 0.25em 2ex 20px;overflow:auto;  border-style:solid; border-width:1px; border-color:#D7D8DF">
							 
								  <!--文章详情-->
								    <section class="article-show-wrap">  
								        <!--标题-->
								   		<h1>${longArticle.title}</h1>
								        <span>${longArticle.userName} &nbsp;&nbsp;<fmt:formatDate value='${longArticle.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/></span>
								        <!--详情-->
								        <div class="article-show">
								           ${longArticle.content}
								        </div>
								    </section>  
							 </div> 
						 </li>   
						 <br/> 
		                <li style=" margin-top:12px;margin-left: 180px">
		                 	  <c:if test="${longArticle.status == 0}">
        	   				 	<button type="button" class="btn4" style=" margin:0 12px 0 250px;width: 100px;height: 31px;text-align:center;background-color: #45b6af"  onclick="disLong()">下架该长文</button>
        	   				  </c:if>  		   
        	   				 <button type="button" class="btn4" style=" margin:0 12px 0 250px;width: 100px;height: 31px;text-align:center;"  onclick="go_back()">返 回</button> 
		                </li>
		            </ul>  
            </div> 
            <br/><br/>
        </div>  
</body>
</html>
