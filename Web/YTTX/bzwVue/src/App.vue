<template>
  <div id="app_container">
    <cc-header></cc-header>
    <router-view></router-view>
  </div>
</template>

<script>
  /*导入组件*/
  import cc_header from './components/header.vue'
  /*导出主应用*/
export default {
  name: 'App',
  components:{
    'cc-header':cc_header
  }
}
</script>
