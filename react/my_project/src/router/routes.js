//引入组件
import Home from 'view/home';
import Web from 'view/web';
import Node from 'view/node';
import User from 'view/user';
// import Details from 'view/details';

const routes = [
  {
    path: '/home',
    name: '主页',
    icon: 'icon-zhuye',
    component:Home
  }, {
    path: '/web',
    name: 'web开发',
    icon: 'icon-chrome',
    component:Web
  }, {
    path: '/node',
    name: 'Nodejs',
    icon: 'icon-nodejs',
    component:Node
  },
  {
    path: '/user',
    name: '用户',
    icon: 'icon-geren',
    component:User
  }
]
export default routes;