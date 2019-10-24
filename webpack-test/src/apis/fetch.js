import axios from 'axios';

const baseURL = process.env.BASE_URL;

console.log(baseURL);

// 创建axios实例
const service = axios.create({
  baseURL, // api的base_url
  timeout: 30000, // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    // console.error(error)
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(err) {
    //响应失败，进入这个函数
    var config = err.config; //错误信息
    //如果在响应中，丢失了config.retry。那么请求失败
    if (!config || !config.retry) return Promise.reject(err);
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
  }
);
export default service;
