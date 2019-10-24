const path = require('path');
// 合并webpack配置信息
const merge = require('webpack-merge');
// 替换html内容,输出到指定的目录下
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 生成的js带有Hash值,不会删除掉旧的,所以用这个插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 打包后,在浏览器中展示当前打包后的情况
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseWebpackConfig = require('./webpack.base.conf');

function resolve(relatedPath) {
  return path.join(__dirname, '../', relatedPath);
}

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      // 使用的原html模板
      template: resolve('index.html'),
      // 所有的javascript资源都将放置在body元素的底部。 'head'将把脚本放置在head元素中
      inject: 'body',
      // 缩小生成的HTML (将所有代码压缩成一行)
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 0,
      // 定义了需要被抽离的模块 由于框架指定之后,不会经常性改动,所以做了此处理 打包时间可降低70%
      cacheGroups: {
        framework: {
          // 名字与 entry 中的名字一直,会生成 frames.[hash].js的文件,与app同级
          test: 'frames',
          name: 'frames',
          enforce: true,
        },
      },
    },
  },
});
