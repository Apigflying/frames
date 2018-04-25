import fetch from 'utils/fetch'
//请求的方式
const method = 'POST';
//请求被代理的路径
// const proxy = process.env.IS_DEV ? '/server' : '';
const env = "/test"


export function loginByUsername(data) {
  return fetch({
    method,
    url: `${env}/login`,
    data
  })
}
