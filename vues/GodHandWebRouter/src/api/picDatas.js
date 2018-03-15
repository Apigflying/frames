import axios from 'axios'

export function GetPicDatas1() {
  return axios({
    method: 'POST',
    url: 'http://easy-mock.com/mock/595363059adc231f356c7e0a/duoduoweixin/getimg',

  })
}

export function GetPicDatas2() {
  return fetch({
    method: 'POST',
    url: 'http://easy-mock.com/mock/595363059adc231f356c7e0a/duoduoweixin/secondImgs',
  })
}