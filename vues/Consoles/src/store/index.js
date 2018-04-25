import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import login from './modules/login'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    login
  },
  getters
});

export default store
