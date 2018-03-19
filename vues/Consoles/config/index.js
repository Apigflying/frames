'use strict'
// Template version: 1.2.4 see http://vuejs-templates.github.io/webpack for
// documentation.

const path = require('path')
const devEnv = require('./dev.env')
const prodEnv = require('./prod.env')
const proxyTables = [
  {
    proxyHead: '/server',
    proxyReal: JSON.parse(prodEnv.BASE_URL),
    pathRewrite:true
  }, {
    proxyHead: '/cgi-bin',
    proxyReal: 'https://u.y.qq.com/',
    pathRewrite:false
  }
]
let proxyTable = {}
proxyTables.forEach(item => {
  proxyTable[item.proxyHead] =item.pathRewrite ? {
    target: item.proxyReal,
    changeOrigin: true,
    pathRewrite: {
      ['^' + item.proxyHead]: ''
    }
  }:{
    target: item.proxyReal,
    changeOrigin: true,
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