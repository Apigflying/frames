import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store"; //加载vuex
import "src/style/index.scss"; //引入样式，字体
// import 'src/config/rem' //rem布局
import plugin from "src/plugins/index.js"; //引用插件，filter，指定和饿了么按需引入

// 路由鉴权
// import "./permission";


// 来关闭生产模式下给出的提示
Vue.config.productionTip = false;

new Vue({
  ...plugin, // 如：$router,$store,$i18n 会将所有的key以$的形式添加到全局
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
});
