import fetch from 'utils/fetch';

const method = 'GET';

export function getData(){
  return fetch({
    method,
    url:'/abc'
  })
}

export function getMarkdown(){
  return fetch({
    method,
    url:'/article/get-markdown'
  })
}