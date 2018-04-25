import fetch from 'fetch'
//请求的方式
const method = 'GET';
//请求被代理的路径
const proxy = process.env.IS_DEV ? '/server' : '';

//测试重新连接
export function testReConnect() {
  return fetch({
    method,
    url: `${proxy}/testReConnect`,
  })
}

//测试重连异步是否堵塞后面的请求
export function testReConnectAsync() {
  return fetch({
    method,
    url: `${proxy}/testReConnectAsync`,
  })
}

export function getChartDatas() {
  return fetch({
    method,
    url: `${proxy}/getChartDatas`,
  })
}

export function clearChartDatas() {
  return fetch({
    method,
    url: `${proxy}/clearChartDatas`,
  })
}