import fetch from 'utils/fetch'
const method = 'GET'
const proxy = '/test'


export function getData(){
  return fetch({
    method,
    url:`${proxy}/getData`
  })
}
export function postData(data){
  return fetch({
    method:'POST',
    url:`${proxy}/postData`,
    data
  })
}
export function downloadfile(data){
  return fetch({
    method:'POST',
    url:`${proxy}/download`,
    responseType: 'blob',
    data
  })
}
