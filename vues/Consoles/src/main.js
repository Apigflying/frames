// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'src/config/rem' //rem布局
import 'src/style/cssreset' //cssreset
import 'src/plugins/element.used' //element按需加载
import 'src/style/element.theme' //设置element的全局样式


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})