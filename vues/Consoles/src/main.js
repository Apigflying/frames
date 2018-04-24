import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' //加载vuex
// import 'src/config/rem' //rem布局
import 'src/style/cssreset' //cssreset
import 'src/plugins/element.used' //element按需加载
import 'src/style/element.theme' //设置element的全局样式
/* 自定义封装的组件 */
import Scroll from 'components/better-scroll'
// 路由鉴权
import './permission'
// 模拟数据
import './mock'
// 国际化
import i18n from './lang'

Vue.component('scroll', Scroll)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({el: '#app', router,i18n, store, template: '<App/>', components: {
    App
  }})
