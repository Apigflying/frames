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