import Vue from "vue";
import axios from "axios";
import vueAxios from "vue-axios";
import tools from "src/utils/tools";
import { Message } from "element-ui";
Vue.use(vueAxios, axios);

/*

  build后，发送的请求路径为：
  http://localhost:9050

  说明封装的请求，在dev或者build后，都以这里的url作为基础

*/
const baseURL = process.env.BASE_URL;
const service = axios.create({
  baseURL,
  retry: 4, //重新请求次数
  retryDelay: 1000, //重新请求的间隔
  timeout: 3000, // 请求超时时间
  withCredentials: true //是否跨站点访问控制请求
});

// request拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /*
      这个函数不写，默认就是返回response
      这里如果不return response。那么所有的请求返回的都是undefined
    */
    return response;
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
