
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<%
String ctx = request.getContextPath();
String imgPath = "/schoolyard_image";
%><!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>欢迎进入管理系统</title>
<link rel="stylesheet" href="<%=ctx %>/schcct/css/common.css">
<link id="cssFile" rel="stylesheet" href="<%=ctx %>/schcct/skins/cyan.css">
<script src="<%=ctx %>/js-cct/jquery.min.js"></script>
<script type="text/javascript" src="<%=ctx %>/js-cct/lhgdialog/lhgdialog.min.js"></script>
</head>

<body>
<div class="header pre"> <b class="topShadow pab"></b> </div>
<div class="container clr pre">
  <div class="sidebar">
    <div class="logo"><a path="main.html" href="javascript:;">
    <img src="<%=ctx %>/schcct/images/logo.jpg" alt="" width="228" height="76"></a></div>
    <div class="sideBarBox">
      <div class="barBox barDate"> </div>
      <div class="bdDashed"><b></b></div>
      <div class="barBox f14">  </div>
      <p class="welCome f14">欢迎您登陆系统！</p>
      <div class="bdDashed"><b></b></div>
      <a class="loginOut f14" href="#">退出系统</a> </div>
    <div class="bootLine CLR"></div>
    <div class="sideNav">
      <ul class="clr">
        <li class="ico1"><a path="<%=ctx %>/schcct/pages/videoo/Leave.jsp" href="javascript:;"><b></b><strong>管理</strong><span class="hoverAlpha"></span></a></li>
        <li class="ico2"><a path="<%=ctx %>/schcct/pages/videoo/Leave.jsp" href="javascript:;"><b></b><strong>管理</strong><span class="hoverAlpha"></span></a></li>
        <li class="ico3"><a path="<%=ctx %>/schcct/pages/videoo/Leave.jsp" href="javascript:;"><b></b><strong>管理</strong><span class="hoverAlpha"></span></a></li>
    	<li class="ico4"><a path="<%=ctx %>/schcct/pages/videoo/Leave.jsp" href="javascript:;"><b></b><strong>管理</strong><span class="hoverAlpha"></span></a></li>
      </ul>
    </div>
    <b class="leftSiderShadow pab"></b> </div>
  <div class="main"> 
    <div class="mainBox"><p class="txtC"><img src="<%=ctx %>/schcct/images/loading.gif" alt="正在加载中...请稍等！"></p></div>
  </div>
</div>
<script src="<%=ctx %>/js-cct/common.js"></script>
</body>
</html>
