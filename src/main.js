import Vue from 'vue'
import App from './App.vue'
import router from './router'
import typeNav from '@/pages/home/typeNav'
import store from '@/store'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

import ElementUI from 'element-ui'
Vue.use(ElementUI)
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
Vue.use(nprogress)
//引入mockServe文件,让咱们模拟接口跑起来
import "@/mock/mockServe.js";
import 'swiper/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.component(typeNav.name,typeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
