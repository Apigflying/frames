import fetch from 'utils/fetch'
const methods = 'GET'
const proxy = '/test'


export function getData(){
  return fetch({
    methods,
    url:`${proxy}/getData`
  })
}
export function getScatterData(){
  return fetch({
    methods,
    url:`${proxy}/getScatterData`
  })
}
export function getLineData(){
  return fetch({
    methods,
    url:`${proxy}/getLineData`
  })
}

export function downloadfile(){
  return fetch({
    methods,
    url:`${proxy}/download`,
    responseType: 'blob'
  })
}
