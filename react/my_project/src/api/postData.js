import fetch from 'utils/fetch';

const method = 'POST';

export function postData(data){
  return fetch({
    method,
    url:'/abcc',
    data
  })
}