import fetch from '@/apis/fetch';

const proxy = '/api'

export function getTestData(){
  return fetch({
    method:'GET',
    url:`${proxy}/getTestData`
  })
}