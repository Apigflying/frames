import Vue from 'vue';
import NProgress from "nprogress"; // progress bar
// 移动端调试
// import VConsole from 'vconsole/dist/vconsole.min.js'
// const vconsole = new VConsole();

// 国际化
// import i18n from "./npm/lang";

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  error:'../static/image/error.png',
  loading:'../static/image/loading.svg'
});
Vue.prototype.$nprogress = NProgress

export default {
  test:123,
  // i18n, // 通过改变this.$i18n.locale 的值来切换中英文的展示
}
