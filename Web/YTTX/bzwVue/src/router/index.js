import Vue from 'vue'
import Router from 'vue-router'

import cc_index from '@/components/index.vue'
import cc_product from '@/components/product.vue'
import cc_news from '@/components/news.vue'
import cc_scene from '@/components/scene.vue'
import cc_contact from '@/components/contact.vue'


Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index'
    },{
      path: '/index',
      name: 'index',
      component:cc_index
    },{
      path: '/product',
      name: 'product',
      component:cc_product
    },{
      path: '/news',
      name: 'news',
      component:cc_news
    },{
      path: '/scene',
      name: 'scene',
      component:cc_scene
    },{
      path: '/contact',
      name: 'contact',
      component:cc_contact
    }
  ]
})
