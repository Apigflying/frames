export default {
  state: {
    navlist: [{
      name: '项目列表',
      path: '/'
    }]
  },
  actions: {
    SetNavList({ commit }, obj) {
      //点击列表的时候，添加路由信息
      commit('SET_NAV_LIST', obj)
    },
    ToRouter({ commit }, path) {
      //点击面包屑导航的时候，删除该路由后面的路由
      commit('TOROUTER', path)
    }
  },
  mutations: {
    SET_NAV_LIST(state, obj) {
      state.navlist.push(obj)
    },
    TOROUTER(state, path) {
      switch (path) {
        case '/foo/pj':
          state.navlist.splice(2)
          break;
        case '/foo/bd':
          state.navlist.splice(3)
          break;
        case '/foo/sy':
          state.navlist.splice(4)
          break;
      }
    }
  }
}