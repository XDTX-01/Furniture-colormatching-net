import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import VueLazyload from 'vue-lazyload'
import '@/custom-component' // 注册自定义组件

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.scss'

Vue.use(ElementUI, { size: 'small' })

// 选项配置
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载高度，图片在这个配置的高度内的化会自动去加载真实需要的图片地址
  error: require('../public/WEB/404.png'), // 当加载真实图片出错时，显示的替代图片
  loading: require('../public/WEB/300.gif'), // 加载真实图片地址之前的一个替代图片
  attempt: 1 // 尝试加载真实图片的次数  这个可以改
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
