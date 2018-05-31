import fetch from 'utils/fetch';

export function getData(){
  return fetch({
    methods:'GET',
    url:'/test/getData'
  })
}
