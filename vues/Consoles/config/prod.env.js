'use strict'
const ip = require('ip').address();
// const ip = 'localhost';
const serverPort = 9001; // 开启vue项目的端口
const BASE_URL = JSON.stringify(`http://${ip}`) //本地的ip+端口
module.exports = {
  NODE_ENV: '"production"',
  IS_DEV: 'false',
  BASE_URL: BASE_URL, //服务器地址
}
