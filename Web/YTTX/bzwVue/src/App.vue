<template>
  <div id="app_container">
    <!--头部导航-->
    <div class="header-wrap" id="header_wrap">
      <div class="header-content">
        <div class="header-logo"></div>
        <div class="header-btn" id="header_btn"></div>
        <ul class="header-menu" id="header_menu">
          <li><a href="#screen_index">首页</a></li>
          <li><a href="#screen_product">功能模块</a></li>
          <li><a href="#screen_news">新闻资讯</a></li>
          <li><a href="#screen_scene">场景展示</a></li>
          <li><a href="#screen_contact">联系我们</a></li>
        </ul>
      </div>
    </div>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

