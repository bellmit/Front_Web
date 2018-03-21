<template>
  <div class="header-wrap" id="header_wrap">
    <div class="header-content">
      <div class="header-logo"></div>
      <div class="header-btn" id="header_btn"></div>
      <ul class="header-menu" id="header_menu">
        <router-link tag="li" v-for="hitem in headeritem" v-bind:to="hitem.href" replace active-class="menu-active">
          <a>{{hitem.text}}</a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cc_header',
    data() {
      return {
        headeritem: [{
          text: '首页',
          href: '/index',
        }, {
          text: '功能模块',
          href: '/product',
        }, {
          text: '新闻资讯',
          href: '/news',
        }, {
          text: '场景展示',
          href: '/scene',
        }, {
          text: '联系我们',
          href: '/contact',
        }]
      }
    }
  }
</script>
