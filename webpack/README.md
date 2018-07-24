# webpack 详解

标签（空格分隔）： webpack

[TOC]

---
## 1.简单的webpack配置
```js
const path = require('path');
module.exports = {
  entry: "./app/entry", // string | object | array
  // Webpack打包的入口
  output: {  // 定义webpack如何输出的选项
    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    filename: "[chunkhash].js", // string
    // 「入口(entry chunk)」文件命名模版
    publicPath: "/assets/", // string
    // 构建文件的输出目录
    /* 其它高级配置 */
  },
  module: {  // 模块相关配置
    rules: [ // 配置模块loaders，解析规则
      {
        test: /\.jsx?$/,  // RegExp | string
        include: [ // 必须匹配选项,打包的文件 | 文件夹下所有文件，依据test的规则进行打包
          path.resolve(__dirname, "app")
        ],
        exclude: [ // 不使用上述test的规则，对该文件夹下的所有文件 | 文件进行打包
          path.resolve(__dirname, "app/demo-files")
        ],
        loader: "babel-loader", // 模块上下文解析
        options: { // loader的可选项 仅仅针对loader的选项
          presets: ["es2015"]
        },
      },
  },
  resolve: { //  解析模块的可选项
    modules: [ // 模块的查找目录
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    extensions: [".js", ".json", ".jsx", ".css"], // 用到的文件的扩展
    alias: { // 模块别名列表
      "views": path.resolve(__dirname, '../src/views'),
      },
  },
  devtool: "source-map", // enum
  // 为浏览器开发者工具添加元数据增强调试
  plugins: [ // 附加插件列表
    // ...
  ],
}
```
>- Entry：指定webpack开始构建的入口模块，从该模块开始构建并计算出直接或间接依赖的模块或者库
- Output：告诉webpack如何命名输出的文件以及输出的目录
- Loaders：由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件
- Plugins：Loaders将各类型的文件处理成webpack能够处理的模块，plugins有着很强的能力。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。但也是最复杂的一个。比如对js文件进行压缩优化的UglifyJsPlugin插件
- Chunk：coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用CommonsChunkPlugin将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中CommonsChunkPlugin被废弃，使用SplitChunksPlugin；


