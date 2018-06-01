import Vue from "vue";
import Router from "vue-router";
// 引入组件的方式

import * as _ from "./hook"; //全局的钩子函数
import routes from './routes';
Vue.use(Router);
export default new Router({
  mode: "history",
  routes,
  scrollBehavior: () => ({ y: 0 })
});
