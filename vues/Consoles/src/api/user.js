import fetch from 'utils/fetch'
const methods = 'POST'
const proxy = '/user'


export function userLogin(){
  return fetch({
    methods,
    url:`${proxy}/login`
  })
}
export function userSingup(){
  return fetch({
    methods,
    url:`${proxy}/singup`
  })
}
