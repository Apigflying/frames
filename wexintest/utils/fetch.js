/*
 * @param {String} api
 * @parma {String} path
*/
const url = 'http://localhost:3000';

module.exports = {
  request: (path, params) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${url}/${path}`,
        data: Object.assign({}, params),
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: resolve,
        error: reject
      })
    })
  }
}