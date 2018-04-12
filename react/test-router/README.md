# react-router-dom

标签（空格分隔）： react

[TOC]

---

## 1.BrowserRouter与HashRouter
>BrowserRouter适合于直接导航，HashRouter适合于静态页面展示
通常指定路由切换方式的地方为根节点，即根节点注册的位置
```javascript
//入口文件
import {BrowserRouter} from 'react-router-dom';
import ReactDom from 'react-dom';
import App from './App';
//在根节点指定路由的切换方式
ReactDom.render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    ,document.getElementById('root')
);
```

## 2.导航与视图分离
```javascript
//Header


//Main
```

## 3.Route与路径匹配，展示视图
`<Route>`组件是React Router中主要的结构单元。在任意位置只要匹配了URL的路径名(pathname)你就可以使用`<Route>`元素进行渲染

**思想：路由链接与视图匹配**

### Route属性之path
>path的类型为string

```javascript
<Route path="/home" />
// 当路径名为'/'时, path不匹配
// 当路径名为'/roster'或'/roster/2'时, path匹配

---------------------------------------------------

// 当你只想匹配'/roster'时，你需要使用"exact"参数，意为严格匹配
// 则路由仅匹配'/roster'而不会匹配'/roster/2'
<Route exact path="/home">
```
**注：react-router只关注location的变化，而不会关注search的变化**

```javascript
http://www.cxy.com/path/one?wd=abc
react-router只会响应location中path/one的变化，而不会响应后面search的变化
```




>在根组件(App.jsx)中使用路由
```javascript
//------------------根组件------------------
import React, {Component} from 'react';
import PublicHeader from 'view/PublicHeader';
import PublicFooter from 'view/PublicFooter';
import RouterIndex from 'router/index'
class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [], //初始状态
      rootState:'初始状态',
      value: '传递给子组件'
    }
  render() {
    return (
      <div className="todo-input">
        <PublicHeader/> //共同用头部，包括导航
        <RouterIndex> //路由匹配的规则
        <PublicFooter>
      </div>
    );
  }
}
export default App;

//------------------头部------------------
import {Link} from 'react-router-dom';
class PublicHeader extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <header>
                <nav>
                    <Link to="/">首页</Link>
                    <Link to="/about">关于</Link>
                </nav>
            </header>
        )
    }
}

//------------------路由------------------
import {Route} form 'react-router-dom';
import Home from 'view/Home'
import About form 'view/About'
render(){
    return (
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
    )
}

//------------------视图组件------------------

```

## 官方路由示例
### 1，挂载router到root根实例
路径不同，匹配不同的视图
```javascript
import {Router,Route,broswerHistory} from 'react-router';
import App from './app';// 引入路由对应的视图
render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={App}/>
            <Route path="/repos" component={Repos}/>
            <Route path="/about" component={About}/>
        <Router>
    ),
    document.getElementById('root')
)
```
|路径|视图组件|
|:--:|:--:|
|/|App组件|
|/repos|Repos组件|
|/about|About视图|
### 2.公共的导航栏，匹配不同视图(组件内容)
```javascript
//App.js
import Nav from './nav';
import RouterIndex from './router/index';

render(){
<div>
    <Nav/> //路由切换的链接
    <RouterIndex> //内容(组件)部分的切换
</div>
}
```
```javascript
//nav 常驻页面的导航
import {Link} from 'react-router-dom';
render(){
    <div>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/bar">Bar页面</Link>
    </div>
}
```
```javascript
// router/index.js页面路由切换配置
import Home from 'view/home';
//import...
<Switch>
    {/*默认的重定向*/}
    <Route path="/" exact render={() => (<Redirect to= "/home" />)}/> 
    <Route path="/home" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/bar" component={Bar}/>
</Switch>
```
### 3.二级路由


