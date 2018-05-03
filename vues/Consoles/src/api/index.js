import fetch from 'utils/fetch'
//请求的方式
const method = 'POST';
//请求被代理的路径
const proxy = process.env.IS_DEV ? '/server' : '';
import qs from 'qs'

export function loginByUsername(data) {
  let search = qs.stringify(data);
  return fetch({
    method:'GET',
    url: `${proxy}/getData?${search}`,
  })
}
export const getUserInfo = token =>{
  return fetch({
    method,
    url:`${proxy}/getUserInfo`,
    data:{
      token
    }
  })
}
