import Vue from "vue";
import Router from "vue-router";
// 引入组件的方式

import * as _ from "./hook"; //全局的钩子函数

Vue.use(Router);
import Patha from "views/pathA"; //正常加载
const Pathb = () => import("views/pathB"); //懒加载（按需加载）
const testScroll = () => import("views/testScroll");
const bScroll = () => import("views/testScroll/better-scroll");
const Login = () => import("views/login");
const Authredirect = () => import("views/authredirect");
const Home =()=> import("views/home")
const routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "/home",
    name:'home',
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/authredirect",
    name: "authredirect",
    component: Authredirect
  },
  {
    path: "/patha",
    name: "patha",
    component: Patha
  },
  {
    path: "/pathb",
    name: "pathb",
    component: Pathb
  },
  {
    path: "/testScroll",
    name: "testScroll",
    component: testScroll
  },
  {
    path: "/bScroll",
    name: "bScroll",
    component: bScroll
  }
];
export default new Router({
  mode: "history",
  routes,
  scrollBehavior: () => ({ y: 0 })
});
