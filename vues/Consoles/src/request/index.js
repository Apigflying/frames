import fetch from 'fetch'
//请求的方式
const method = 'GET';
//请求被代理的路径
const proxy = process.env.IS_DEV ? '/server' : '';

//获取openId
export function getOpenId() {
  return fetch({
    method,
    url: `${proxy}/openId`,
  })
}