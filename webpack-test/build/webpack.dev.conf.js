const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf.js');
const devEnv = require('./config/dev.env');

function resolve(relatedPath) {
  return path.join(__dirname, '../', relatedPath);
}

const PORT = 8080;

// https://juejin.im/post/5c1de44ff265da61715e523b
module.exports = merge(baseWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: PORT,
    // 对外提供的访问内容的路径 建议使用绝对路径，不要使用相对路径 与 publicPath 类似
    contentBase: resolve('dist'),
    // 对所有请求启用gzip压缩
    compress: true,
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: true,
    // 启用 webpack 的 模块热替换 功能
    hot: true,
    // 不启用https,因为在本地
    https: false,
    // 告诉 dev-server 隐藏 webpack bundle 信息之类的消息
    noInfo: true,
    // 告诉 dev-server 在 server 启动后打开浏览器
    open: true,
    // 在浏览器显示错误和警告
    overlay: {
      warnings: true,
      errors: true,
    },
    // 去除掉每次修改时，控制台的日志
    clientLogLevel: 'none',
    // 代理
    proxy: {
      '^/api': {
        target: 'http://localhost:3000', // 提供接口的域名 本地为 localhost:port
        changeOrigin: true, // 开启代理服务
        // 代理websocket连接
        // ws: true,
        // 重写规则
        // pathRewrite: {
        //   '^/api': '',
        // },
      },
    },
  },
  // 指定当前模式是开发环境
  mode: 'development',
  // 生成的文件会放入到内存中
  output: {
    filename: 'js/[name].[hash:16].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': devEnv
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      inject: 'body',
      // 使用html压缩
      minify: {
        // 根据HTML5规范解析输入
        html5: true,
      },
      // 是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${PORT}`],
      },
    }),
  ],
});
