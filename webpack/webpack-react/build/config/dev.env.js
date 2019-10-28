'use strict'
// const ip = require('ip').address();
const serverPort = 3000 // 开启项目的端口
const baseUrl = JSON.stringify(`http://localhost:${serverPort}`) //本地的ip+端口
console.log(baseUrl)
module.exports = {
  NODE_ENV: '"development"',
  BASE_URL: baseUrl
}
