import fetch from 'utils/fetch';

export function getData(){
  return fetch({
    url:`/getData`,
    methods:'GET'
  })
}
