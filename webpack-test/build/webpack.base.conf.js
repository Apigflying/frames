// webpack.base.conf.js 文件
const path = require('path');
const APP_PATH = path.resolve(__dirname, '../src');
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  entry: {
    // 入口文件地址
    app: './src/main.js',
    // 将框架代码与业务代码拆分
    frames: ['react','react-dom'],
  },
  output: {
    // 生成文件夹
    path: DIST_PATH,
    // 生成的文件名添加Hash值，目的是解决缓存问题 (但是会造成每次都生成一个新的文件,要删除旧的文件,需要用到clean-webpack-plugin)
    filename: "js/[name].[chunkhash:16].js",
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
    ],
  },
};
