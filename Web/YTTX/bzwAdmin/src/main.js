/*主函数入口*/
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

new Vue({
  el: '#app_main'/*挂载点*/,
  router/*路由*/,
  components: {App}/*引入的组件*/,
  template: '<App/>'/*模板*/
})
