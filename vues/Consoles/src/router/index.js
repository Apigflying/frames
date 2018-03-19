import Vue from 'vue'
import Router from 'vue-router'
import * as _ from './hook'

Vue.use(Router)
const Patha = () =>
  import ('views/pathA')
const Pathb = () =>
  import ('views/pathB')
const testScroll = () =>
  import ('views/testScroll')
const routes = [{
    path: '',
    component: Patha
  },
  {
    path: '/patha',
    name: 'patha',
    component: Patha
  },
  {
    path: '/pathb',
    name: 'pathb',
    component: Pathb
  },{
    path: '/testScroll',
    name: 'testScroll',
    component: testScroll
  },
]

const router = new Router({
  mode: 'history',
  routes
})
router.beforeEach(_.global)
  //添加全局的钩子函数

export default router
