# webpack中使用babel

---

> 使用webpack开发项目时,想在js中使用一些js的新特性如:箭头函数,类,Promise等.由于浏览器无法正确识别,所以需要用babel转义

### 1. 在webpack.config.js中,指定以`.js`为后缀的文件,用babel解析

> webpack配置如下

```js
// 能够看到转义后的源代码
 devtool: 'source-map',
 module: {
    rules: [
      {
        // 指定以.js结尾的文件用babel-loader转义
        test: /\.js$/,
        // 不解析 node_modules 下的文件
        exclude: /node_modules/,
        // 使用babel转义
        use: { loader: 'babel-loader' } // options 在 .babelrc 定义
      }
    ]
  },
```

> 这里devtool使用`source-map`模式,是为了方便查看打包后的文件内容

- [ ] 在不添加.babelrc的情况下,打包后文件的内容:

```js
const func = () => {
  console.log('hello webpack');
};

func();

class User {
  constructor() {
    console.log('new User');
  }

}
```

- [ ] 箭头函数和类都**没有被转义**

### 2.在根目录下添加.babelrc

> 在使用插件的时候,需要先安装插件`npm i @babel-preset-env -D`
该插件用于解析转义大部分的ES6的语法

- [x] 转换后的代码如下

```js
var func = function func() {
  console.log('hello webpack');
};

func();

var User = function User() {
  _classCallCheck(this, User);

  console.log('new User sss');
};
```

> Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API ，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。
