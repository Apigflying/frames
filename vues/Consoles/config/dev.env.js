'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const ip = require('ip').address();
const serverPort = 9050
const baseUrl = JSON.stringify(`http://${ip}:${serverPort}`)

console.log(baseUrl)

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: baseUrl,
  IS_DEV: 'true',
  HOST: JSON.stringify(ip),
  PORT: JSON.stringify(serverPort)
})