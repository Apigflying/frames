import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store"; //加载vuex
// import 'src/config/rem' //rem布局
import "src/style/cssreset"; //cssreset
import "src/plugins/element.used"; //element按需加载
import "src/style/element.theme"; //设置element的全局样式
import 'font-awesome/css/font-awesome.css'// 字体
/* 自定义封装的组件 */
import Scroll from "components/better-scroll";
import NProgress from "nprogress"; // progress bar
// 路由鉴权
import "./permission";
// 模拟数据
import "./mock";
// 国际化
import i18n from "./lang";
import VConsole from 'vconsole/dist/vconsole.min.js'

const vconsole = new VConsole();

Vue.component("scroll", Scroll);

Vue.config.productionTip = false;

Vue.prototype.$nprogress = NProgress

// 会将所有的key以$的形式添加到全局
// 如：$router,$store,$i18n
new Vue({
  el: "#app",
  router,
  i18n, // 通过改变this.$i18n.locale 的值来切换中英文的展示
  store,
  template: "<App/>",
  components: {
    App
  }
});
