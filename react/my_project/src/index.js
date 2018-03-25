//这里是入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//从react-router-dom引入react路由
/*
  HashRouter 利用hash值的改变，进行路由的切换
  BrowserRouter 使用history的路由匹配模式
*/
import {BrowserRouter} from 'react-router-dom';

//将App挂在到根节点
ReactDOM.render(
  <BrowserRouter><App/></BrowserRouter>, document.getElementById('root')
);
registerServiceWorker();
