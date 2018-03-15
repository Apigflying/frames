import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import common from './modules/common'
import navcrumb from './modules/navcrumb'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    common,
    navcrumb
  },
  getters
})