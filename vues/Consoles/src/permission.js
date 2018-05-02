// 全局的钩子函数，负责管理鉴权。路由登录跳转，拦截等
import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "utils/auth"; // getToken from cookie

// 不展示进度条的loading圆
NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/authredirect",'/patha']; //不需要登录就能查看的页面

router.beforeEach((to, from, next) => {
  //开启进度条
  NProgress.start();
  if (getToken()) {//token存在
    if (to.path == "/login") {
      next("/");
    }
    next();
  } else {// token不存在
    if (whiteList.includes(to.path)) {// 在免登陆白名单中(不需要登录就能看的页面)
      next();
      NProgress.done(); //done放在next()之后
    } else {//没有token，但登录才能查看的页面
      store.commit('SET_BEFORE_RUL',to.path);//保存之前的链接，以便在登录之后，跳转回去
      next("/login"); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
