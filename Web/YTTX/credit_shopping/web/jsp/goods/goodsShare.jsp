<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,maximum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="telephone=no" name="format-detection">
    <meta name="description" content="图文详情">
    <meta name="keywords" content="图文详情">
    <title>图文详情</title>
    <link rel="stylesheet" type="text/css" href="<%=path %>/css/goods_share.css">
  </head>
  <body>


    <!--头部-->
    <header class="app-header">
      <p class="theme">商品详情</p>
    </header>


    <!--分享组件--banner(注:只取一张图)-->
    <section class="share-plugin-bannerwrap">
      <img alt="" src="${imageSrc}">
    </section>


    <!--分享组件--标题，价格组件（注:只要标题，不要价格）-->
    <section class="share-plugin-titlewrap">
      <div>
        <p>${imageTitle}</p>
      </div>
    </section>


    <!--评论（注:<dd>为循环列表）-->
    <section class="share-comment-wrap">
      <h3>商品评论(${commentCount})</h3>
      <dl>
        <dd>
          <h4>相聚离开都有时候</h4>
          <i>2015-09-23 17:32:43</i>
          <span>手心突然长出纠缠的曲线，等到风景都看透,也许你会陪我看细水长流</span>
          <p>旅游</p>
        </dd>
        <dd>
          <h4>没有什么会永垂不朽</h4>
          <i>2015-09-23 17:32:43</i>
          <span>细雨带风湿透黄昏的街道，抹去雨水双眼无故地仰望</span>
          <p>美食</p>
        </dd>
        <dd>
          <h4>望向孤单的晚灯</h4>
          <i>2015-09-23 17:32:43</i>
          <span>是那伤感的记忆，再次泛起心里无数的思念,以往片刻欢笑仍挂在脸上,愿你此刻可会知,是我衷心的说声,喜欢你,那双眼动人,笑声更迷人</span>
          <p>音乐</p>
        </dd>
      </dl>
    </section>



    <!--分享详情-->
    <section class="share-show-wrap">
      <h2 class="share-title-pagr">图文详情</h2>
      <!--详情-->
      <div class="share-show">
          ${imageText}
      </div>
    </section>
  </body>
</html>