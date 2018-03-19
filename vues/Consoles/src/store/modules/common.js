import tools from 'utils/tools'

const common = {
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      tools.setStorage('token', token)
    },
  },
  actions: {

  }
}

export default common