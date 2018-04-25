import fetch from 'fetch'
//请求的方式
const method = 'GET';
//请求被代理的路径
const proxy = process.env.IS_DEV ? '/server' : '';
import config from 'src/config'

//通过openId获取数据
export function getDatasByOpenId() {
  if (config.openId) {
    return fetch({
      method,
      url: `${proxy}/getDatasByOpenId?openId=${config.openId}`,
    })
  }
}