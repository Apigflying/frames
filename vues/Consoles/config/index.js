'use strict'
// Template version: 1.2.4 see http://vuejs-templates.github.io/webpack for
// documentation.

const path = require('path')
const devEnv = require('./dev.env')
const prodEnv = require('./prod.env')
/*
  proxyHead: 以 /server 开头的请求，会被代理 http://localhost:9000/server/abc  此链接会被代理
  proxyReal: 目标域 实际开发的域名和端口
  pathRewrite: 是否重写请求。重写规则在下方的pathRewrite中
*/
const serverIp = JSON.parse(prodEnv.BASE_URL);
const proxyList = ['/test', '/user']; // 以此开头的都走代理
let proxyTables = [
  {
    proxyHead: '/server',// 域名+端口 后面的请求体部分的开头
    proxyReal: JSON.parse(prodEnv.BASE_URL), // prodEnv是实际生产环境的域名和端口(如果接口已经发布到服务器端)
    pathRewrite: false //是否重写代理。
  }, {
    proxyHead: '/cgi-bin',
    proxyReal: 'https://u.y.qq.com/',
    pathRewrite: false
  }
];
proxyTables = proxyTables.concat(proxyList.map(item => ({
  proxyHead: item, // 域名+端口 后面的请求体部分的开头
  proxyReal: serverIp, // prodEnv是实际生产环境的域名和端口(如果接口已经发布到服务器端)
  pathRewrite: false //是否重写代理。
})))

let proxyTable = {}
proxyTables.forEach(item => {
  proxyTable[item.proxyHead] = item.pathRewrite ? {
    target: item.proxyReal,
    // ws: true, //代理websocket连接
    changeOrigin: true,// 开启代理服务
    pathRewrite: {// 重写规则
      ['^' + item.proxyHead]: ''
    }
  } : {
      target: item.proxyReal,
      changeOrigin: true,
      ws: true //代理websocket连接
    }
})

console.log(proxyTable)

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    host: JSON.parse(devEnv.HOST),
    port: JSON.parse(devEnv.PORT),
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: false,
    autoOpenBrowser: true,
    proxyTable: proxyTable
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as Surge or Netlify
    // already gzip all static assets for you. Before setting to `true`, make sure
    // to: npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: [
      'js', 'css'
    ],

    // Run the build command with an extra argument to View the bundle analyzer
    // report after build finishes: `npm run build --report` Set to `true` or
    // `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
