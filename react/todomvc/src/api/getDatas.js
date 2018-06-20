import fetch from 'utils/fetch';

export function getData(){
  fetch({
    url:`/getData`,
    methods:'GET'
  })
}
