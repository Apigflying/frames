// 全局的钩子函数，负责管理鉴权。路由登录跳转，拦截等
import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

// 不展示进度条的loading圆
NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/authredirect",'/patha']; //不需要登录就能查看的页面

router.beforeEach((to, from, next) => {
  //开启进度条
  NProgress.start();
  if (store.getters.token) {//token存在    ||store.getters.token
    if (to.path == "/login") {
      next("/");
      NProgress.done();
    }else{
      // token存在，但是用户权限列表不存在，可能关闭了当前页面，用户信息还没有取到
      if(store.getters.userAuthList){//
        store.dispatch('getUserInfoByToken').then(res=>{
          console.log(res);

        })
      }
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
