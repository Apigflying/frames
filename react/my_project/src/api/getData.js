import fetch from 'utils/fetch';

const method = 'GET';

export function getData(){
  return fetch({
    method,
    url:'/abc'
  })
}