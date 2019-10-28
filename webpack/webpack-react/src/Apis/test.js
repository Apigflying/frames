import fetch from '@/Apis/fetch';

const proxy = '/api';

export function getTestData(){
  return fetch({
    method:'GET',
    url:`${proxy}/getTestData`
  })
}