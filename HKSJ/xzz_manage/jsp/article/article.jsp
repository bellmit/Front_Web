<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="telephone=no" name="format-detection">
<meta name="description" content="小自传--文章详情">
<meta name="keywords" content="小自传--文章详情"> 
<title>小自传--文章详情</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/article.css">
</head>
<body>


    <!--文章详情-->
    <section class="article-show-wrap">  
        <!--标题-->
   		<h1>${longArticle.title}</h1>
        <span>${longArticle.userName} &nbsp;&nbsp;<fmt:formatDate value='${longArticle.createTime}' pattern='yyyy-MM-dd HH:mm:ss'/></span>
        <!--详情-->
        <div class="article-show" style="text-align: left;">
           ${longArticle.content}
        </div>
    </section> 
    
</body>
</html>
