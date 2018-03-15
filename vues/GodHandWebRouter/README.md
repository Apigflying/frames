# Vue-Router

[TOC]

1.全局的钩子函数
---
为了专注业务，将所有的router的文件按照功能进行拆分
> - [x] --router
| ----index.js
| ----router.config.js
| ----router.hook.js

---
> 1 . index.js
```javascript
import Vue from 'vue'
import Router from 'vue-router'
import routes from './router.config'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes
})
```

> 2 .  router.config.js
```javascript
//登录页面
import Login from '../view/Login/index'
//首页
import Home from '../view/Home/index'
//项目信息页
import Foo from '../view/Foo/index'
//首页的导航
import NavHome from '../view/Home/NavHome'
//面包屑导航
import NavCrumbs from '../view/Foo/NavCrumbs'

/*
公用的组件
*/

//详细信息页
import ParticalMes from '../view/public/ParticalMes'
//列表项
import ProList from '../view/public/ProList'

//导航钩子及重定向函数
import * as _ from './router.hook'

const routes = [{
      path: '/', //根路径，首页要展示的内容
      component: Home,
      children: [{
        path: '',
        components: {
          //组合视图，首页
          nav: NavHome,
          prolist: ProList,
        },
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      //foo作为Home的同级，而不是子级，是因为如果作为Home的子级
      //那么foo只能在Home内渲染部分的router-view，而不是替代Home
      path: '/foo/:type',
      //左侧的列表导航被复用了，使用动态路由来决定它要显示的数组
      beforeEnter: _.beforeFooEnter,
      component: Foo,
      children: [{
        //默认渲染详细信息页
        path: '',
        component: ParticalMes
      }, {
        //列表
        path: 'prolist/:childs?',
        component: ProList
      }]
    }
  ]
  //模拟数据
function abc(n, key) {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push({
      "item": `${key+i}`
    })
  }
  return JSON.stringify(arr);
}
export default routes
```
> 3 .router.hook.js
```javascript
//导航钩子函数和重定向函数

export function auth(to) {
  //登录验证重定向
  const { hash, params, query } = to
  // if (query.to === 'foo') {
  //   return { path: '/foo', query: null }
  // }
  // if (hash === '#baz') {
  //   return { name: 'baz', hash: '' }
  // }
  // if (params.id) {
  //   return '/with-params/:id'
  // } else {
  //   return '/bar'
  // }
}
export function beforeFooEnter(to, from, next) {
  next()
}
export function beforeParticalMesEnter(to, from, next) {
  next()
}
export function beforeBuildingEnter(to, from, next) {
  next()
}
```
2.可复用组件内的钩子函数
---
**路由，是与视图对应的，当路径发生变化的时候，视图也发生变化**

###beforeRouteEnter钩子函数
当结构相同，内容不同时，可以使用动态路由，通过不同的动态路由参数，显示不同的视图
而在被复用的组件内，通过beforeRouteEnter函数，对应不同的视图
```javascript
beforeRouteEnter(to,from,next){
    if(to.path.includes('/foo/pj')){
      /* 如果路径是/foo/pj */
      axios.post('请求后台数据的路径').then(res=>{
        next(vm=>{
        //将数据渲染对应的视图
          vm.datas=res.data;
        });
      })
      对应一个视图
    }else if(to.path.includes('/foo/bd')){
        //...
    }
}
/*
    在匹配视图的时候，要注意路由加载的顺序
*/
```
### beforeRouteUpdate钩子函数
在加载同一组件切换不同视图的时候，可以利用beforRouteUpdate函数来更新视图
```javascript
beforeRouteUpdate(to,from,next){
    /*
        注：
            beforeRouteUpdate更适用于在当前组件内更新视图，而非跳转
    */
    if(to.path.includes('/foo/pj')){
      axios.post('请求后台数据的路径').then(res=>{
        this.datas=res.data;
      })
    }else if(to.path.includes('/foo/bd')){
      //...
    }
}
```
