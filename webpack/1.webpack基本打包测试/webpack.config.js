
var merge=require('webpack-merge');

module.exports = {
  entry: './src/script/main.js', //入口文件
  output: {
    path: __dirname + '/dist/js',
    filename: 'bundle.js'
  }
}