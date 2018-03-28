import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import tools from 'src/utils/tools'
import { Message } from 'element-ui';
Vue.use(vueAxios, axios)

/*

  build后，发送的请求路径为：
  http://localhost:9050

  说明封装的请求，在dev或者build后，都以这里的url作为基础

*/
const baseURL = process.env.BASE_URL
console.log(baseURL)
const service = axios.create({
  baseURL,
  retry: 4, //重新请求次数
  retryDelay: 1000, //重新请求的间隔
  timeout: 3000, // 请求超时时间
  withCredentials: true, //是否跨站点访问控制请求
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
    /*
      这个函数不写，默认就是返回response
      这里如果不return response。那么所有的请求返回的都是undefined
    */
    return response
  }, err => {
    //响应失败，进入这个函数
    var config = err.config //错误信息
      //如果在响应中，丢失了config.retry。那么请求失败
    if (!config || !config.retry) return Promise.reject(err);

    console.log(config.__retryCount)
      //为config添加计数器 默认是 0
    config.__retryCount = config.__retryCount || 0;

    //如果当前请求的次数超过配置的次数。就报失败
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
    }

    // 计数器 +1
    config.__retryCount += 1;

    // 重新请求
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
        //config.retryDelay设置请求间隔时间
      }, config.retryDelay || 200);
    });

    //读取设定的延迟时间后，执行这里的函数
    return backoff.then(function() {
      //重新请求 注：此时的config中保存的依旧是上次的rul
      return service(config);
    });
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service