import axios from 'axios'

export function GetPicDatas1() {
  return axios({
    method: 'POST',
    url: 'http://easy-mock.com/mock/59361b1591470c0ac102318f/duoduoweixin/getimg',

  })
}

export function GetPicDatas2() {
  return fetch({
    method: 'POST',
    url: 'http://easy-mock.com/mock/59361b1591470c0ac102318f/duoduoweixin/secondImgs',
  })
}
