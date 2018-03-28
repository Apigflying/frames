import Vue from 'vue'
import Router from 'vue-router'
import * as _ from './hook' //全局的钩子函数

Vue.use(Router)
import Patha from 'views/pathA' //正常加载
const Pathb = () => import ('views/pathB') //懒加载（按需加载）
const testScroll = () => import ('views/testScroll')
const bScroll = () => import ('views/testScroll/better-scroll')
const routes = [
  {
    path: '',
    component: Patha
  }, {
    path: '/patha',
    name: 'patha',
    component: Patha
  }, {
    path: '/pathb',
    name: 'pathb',
    component: Pathb
  }, {
    path: '/testScroll',
    name: 'testScroll',
    component: testScroll
  }, {
    path: '/bScroll',
    name: 'bScroll',
    component: bScroll
  }
]

const router = new Router({mode: 'history', routes})
router.beforeEach(_.global)
//添加全局的钩子函数

export default router
