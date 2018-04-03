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
			 
			 function sub(){
				  var da = $("#form1").serialize();
				  $.ajax({
		                 type: "POST",
		                 dataType: "json",
		                 url: "longArticle/auditing.do",
		                 data: da,
		                 success: function (result) {
		                    if(result){
		                    	$.messager.alert("提示","审核操作成功！","info",function(){
			                    	 go_back();
		        				});  
		                    }
		                 },
		                 error: function(data) {
		                	 $.messager.alert("提示","审核操作失败！","info",function(){
		                    	 go_back();
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
	<h3 class="right_nav">图文管理> 长文审核   </h3> 
		<div class="bg_fff"> 
		<h2 class="tit_yi">审核长文</h2>
		<div class="comtent_div" style="margin: 20px 0px 0px 80px">
	        	<form id="form1" method="post">
	        	<input type="hidden" name="id" value="${longArticle.id}">
	        	<input type="hidden" name="userId" value="${longArticle.userId}">
		            <ul class="list_li4 clearfix" style="text-align: le">  
		                <li style=" width:96%; margin-right:0;"> 
							 <div style="margin-left:50px;width:45%;height:70%;padding: 5px 0.25em 2ex 10px;overflow:auto;  border-style:solid; border-width:1px; border-color:#D7D8DF">
							 
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
						  <li>
						    <div>
						    	<label>审核：</label> 
						  		<select class="status_btn" id="isPass" name="isPass" style="height: 30px;line-height: 30px;"> 
									<option value="2">审核通过</option>
									<option value="3">审核不通过</option>
								</select> 
						    
						    </div>  
						  </li>
						  <br/>
						   <li><label>审核备注：</label><textarea style=" border-style:solid; border-width:1px; border-color:#D7D8DF;width:605px;height:100px;font-size: 15px"   name="auditMark" id="auditMark"></textarea> 
						  </li> 
						 <br/> 
		                <li style=" margin-top:12px;margin-left: 180px">
		               		 <button   type="button" class="btn_cx" style="background-color: #45b6af"  onclick="sub()">提交</button>  
		                	 <button type="button" class="btn4" style=" margin:0 12px 0 50px;width: 100px;height: 31px;text-align:center;"  onclick="go_back()">返 回</button>
		                </li>
		            </ul> 
	            </form>
            </div> 
            <br/><br/>
        </div>  
</body>
</html>
