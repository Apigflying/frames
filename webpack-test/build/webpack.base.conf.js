// webpack.base.conf.js 文件
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(relatedPath) {
  return path.join(__dirname, '..', relatedPath);
}

const APP_PATH = resolve('src');
const DIST_PATH = resolve('dist');

module.exports = {
  entry: {
    // 入口文件地址
    app: './src/main.js',
    // 将框架代码与业务代码拆分
    frames: ['react', 'react-dom'],
  },
  output: {
    // 生成文件夹
    path: DIST_PATH,
    // 生成的文件名添加Hash值，目的是解决缓存问题 (但是会造成每次都生成一个新的文件,要删除旧的文件,需要用到clean-webpack-plugin)
    filename: 'js/[name].[chunkhash:16].js',
  },
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
      '@': APP_PATH,
    },
  },
  module: {
    rules: [
      {
        // 使用 babel-loader 转换以 .js 和 .jsx结尾的文件
        test: /\.(js|jsx)?$/,
        use: 'babel-loader',
        // 不转换 node_modules 目录下的文件,以减少编译所用的时间
        exclude: /node_modules/,
        // 指定该目录下的文件检查
        include: APP_PATH,
      },
      {
        // css-loader 的作用是处理css文件中 @import，url之类的语句
        // style-loader则是将css文件内容放在style标签内并插入head中
        // 需用npm安装 css-loader 和 style-loader
        // 待处理 : 不同页面引用不同的css的问题(多页的css)
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
    ],
  },
  plugins: [
    // 打包后的文件名字 
    new ExtractTextPlugin('css/[name].[chunkhash:16].css')
  ],
};
