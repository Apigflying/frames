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

    // 用于设置引入模块的时候，如果没有写模块后缀名，webpack 会自动添加后缀去查找，extensions 就是用于设置自动添加后缀的顺序
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
        // 不转换 node_modules 目录下的文件,以减少编译所用的时间
        exclude: /node_modules/,
        // 指定该目录下的文件检查
        include: APP_PATH,
        use: {
          loader: 'babel-loader'// options 在 .babelrc 定义
        },
      },
      {
        // npm install css-loader style-loader autoprefixer
        // css-loader 处理css文件中 @import，url之类的语句
        // style-loader 将css文件内容放在style标签内并插入head中
        // postcss-loader 自动加前缀
        // autoprefixer 自动加前缀
        // 待处理 : 不同页面引用不同的css的问题(多页的css)
        test: /\.(css|less)$/,
        use: [
          // ExtractTextPlugin.extract('style', 'css!less'),
          {
            loader: 'style-loader', //在html中插入<style>标签
          },
          {
            loader: 'css-loader', //获取引用资源，如@import,url() 将css转换成js
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  overrideBrowserslist: ['iOS >= 7', 'Android >= 4.0'],
                }),
              ],
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
        use: 'url-loader?limit=8129',
        //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // outputPath:'../',//输出**文件夹
              // 静态资源的问题: 由于css文件分离出来的原因，会导致在css文件夹下找images文件夹下的图片
              // '/' 表示以绝对路径的方式寻找资源
              publicPath: '/',
              name: 'images/[name].[ext]',
              limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 打包后的文件名字
    new ExtractTextPlugin('css/[name].[chunkhash:16].css'),
  ],
};
