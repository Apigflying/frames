// 全局的钩子函数，负责管理鉴权。路由登录跳转，拦截等
import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "utils/auth"; // getToken from cookie

// 不展示进度条的loading圆
NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/authredirect"]; //白名单

router.beforeEach((to, from, next) => {
  //开启进度条
  NProgress.start();
  if (getToken()) {
    // 如果toke存在
    console.log("token 存在");
  } else {
    // token不存在
    if (whiteList.includes(to.path)) {
      // 在免登录白名单，直接进入
      next();
      console.log("在白名单");
      NProgress.done();
    } else {
      next("/login"); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});
router.afterEach(() => {
  NProgress.done()
})
