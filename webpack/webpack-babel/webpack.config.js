const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  devtool: 'nosources-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' } // options 在 .babelrc 定义
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin()
  ]
}