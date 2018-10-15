'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const ip = require('ip').address();
// const ip = 'localhost'
const serverPort = 9000 // 开启vue项目的端口
const baseUrl = JSON.stringify(`http://${ip}:${serverPort}`) //本地的ip+端口

console.log(baseUrl)

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: baseUrl,
  IS_DEV: 'true',
  HOST: JSON.stringify(ip),
  PORT: JSON.stringify(serverPort)
})
