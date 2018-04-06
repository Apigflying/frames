# create-react-app搭建项目

标签（空格分隔）： react

---
[TOC]
## 1.入口文件
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import moment from 'moment'

React.Component.prototype.$moment = moment;
ReactDOM.render(
  <BrowserRouter><App/></BrowserRouter>, document.getElementById('root')
);
```
>react-dom 用于将子节点以组件的方式渲染到父节点上

>HashRouter 利用hash值的改变，进行路由的切换
 BrowserRouter 使用history的路由匹配模式

>React.Component.prototype 将插件挂载到全局的Componet，在任何组件内，都能通过this直接访问插件暴露的东西

>react-dom与react-router-dom配合，将根组件(App)通过路由(BrowserRouter)的方式放入到根节点内


## 2.根组件(App)
```javascript
import React, {Component} from 'react';
//配置页面路由，即：路径 - 视图组件的对应关系
/*
    将页面组件(a.js,b.js等页面之间的切换)放到根组件中(App中渲染不同的组件视图)
*/
import RouterIndex from './router/index';
import MainHeader from './view/main-header';
import MainFooter from './view/main-footer';
import 'antd/dist/antd.css';
import './style/cssreset.scss';
import './view/index.scss';
class App extends Component {
  render() {
    return (
      <div className="pageWrap">
        <MainHeader />
        <MainFooter />
      </div>
    );
    // (<RouterIndex/>);
  }
}
export default App;
```

## 引用scss或者less
`cnpm i sass-loader node-sass -D`
在webpack.dev.js && webpack.prod.js中修改配置
```javascript
extensions: [
  '.web.js',
  '.mjs',
  '.js',
  '.json',
  '.web.jsx',
  '.jsx',
  '.scss'//为解析以.scss为后缀的文件
],
{
    test: /\.(css|scss|sass)$/,//匹配后缀名
    use: [
      require.resolve('style-loader'), 
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1
        }
      }, 
      'sass-loader'//使用sass-loader
    ]
}

//less同理
```
报以下错误是因为重复引用loader
[解决地址][1]
```
   Invalid CSS after "...load the styles": expected 1 selector or at-rule, was "var content = requi"
```

## react-router-dom
```javascript
import {
    Link,//在点击时，进行路由(组件视图)之间的跳转
    Switch,//包裹Route标签，渲染第一个匹配的路由组件，当有动态路由的时候，可以匹配第一个匹配到的路由
    Route, //
    StaticRouter,//
    Redirect,//
    BrowserRouter,
    NavLink,//与link相似
    HashRouter,// 利用hash值的改变，进行路由的切换
} from 'react-router-dom'
```
![路由切换的原理][2]

### 1.BrowserRouter
>使用history模式，利用h5的pushState,replaceState,popState事件 ，用url于Router组件对应的方式，当有子路由child嵌套的时候，需要服务器配合

原理：

- [x] 利用h5的`window.history`,对浏览器的历史记录读取，使用pushState()方法，replaceState()方法，来动态在history中添加记录，可以用history.go()方法，快速回退到页面

属性：

- [ ] basename:string
    - 所有位置的基本URL，如果应用程序是从服务器上的子目录提供的，则需要将其设置为子目录
- [ ] getUserConfuirmation:function
    - 一个用来确认导航功能，默认使用window.confirm
- [ ] forceRefresh:bool/false
    - 如果为true,则路由在页面导航的时候，使用全页刷新进行跳转
- [x] children:node/子元素节点
    - 要呈现的单个子元素节点

### 2.HashRouter
- [x] 原理:在地址栏中加入#hash以欺骗浏览器，地址的改变是由于正在进行页内导航

### 3.Link
- [ ] to:string|object
    - 跳转链接名或位置 | 链接位置
- [ ] replace:bool
    - 替换路由栈

### 4.Redirect
- [ ] to:string
    - 重定向的链接
```javascript
import {Route,Redirect} from 'react-router-dom';
class RouteIndex extends Component {
    render(){
        <Switch>
            // 主页重定向到/index页面
            <Route path="/" exact render={<Redirect to="/index">}/>
        </Switch>
    }
}
```
- [ ] push：bool / false
     - 当push为true时，重定向时会将定向页推入到历史记录栈，而不是替换当前记录已有的历史记录

- [ ] from 
    - 要重定向的路径名，可以用于在`<Switch>`内部渲染`<Redirect>`时匹配位置

### 5.Route
>render methods

- [x] render
- [x] component
- [x] children
**制定render 方式，一个Route标签只能有他们中的一个，作为当路由匹配成功之后，渲染的组件或者页面，大部分情况下使用component来制定渲染的组件**

- [x] component
> 匹配到路由home的时候，渲染Home组件
```javascript
<Route path="/home" component={Home}>
```

- [x] render
> 传给render的是一个函数，用于指明渲染的组件
```javascript
<Route path="/home" render={()=>
    <h1>home</h1>
}/>
----------------------------------------
<Route path="/" exact render={
    () => (
        < Redirect to = "/index" />
    )
}/>
```

>props
- [x] match
- [x] location
- [x] history
所有的render methods 都将被传入这些props

- [x] path:string 
 - url的路径

- [x] exact:bool / false
 - 如果为true，path为：'/one'的路由将不能匹配'/one/two',反之亦然

- [x] strict:bool / false
 - 对路径末尾斜杠的匹配，如果为true。path为'/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'

**如果要确保路由没有末尾斜杠，那么strict和exact都必须同时为true**


  [1]: https://segmentfault.com/a/1190000013196997
  [2保路由没有末尾斜杠，那么strict和exact都必须同时为true**


  [1]: http://osjykr1v3.bkt.clouddn.com/FuiGIO3bpI5wx5QV09CmEggxNBL4