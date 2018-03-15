export default {
  state: {
    pj_id: '',
    bd_id: '',
    fl_id: '',
    sp_id: '',
    sy_id: '',
    dv_id: '',
  },
  actions: {
    SavePjId({ commit }, id) {
      commit('SAVE_PJ_ID', id)
    },
    SaveBdId({ commit }, id) {
      commit('SAVE_BD_ID', id)
    },
    SaveFlId({ commit }, id) {
      commit('SAVE_FL_ID', id)
    },
    SaveSpId({ commit }, id) {
      commit('SAVE_SP_ID', id)
    },
    SaveSyId({ commit }, id) {
      commit('SAVE_SY_ID', id)
    },
    SaveDvId({ commit }, id) {
      commit('SAVE_DV_ID', id)
    },

  },
  mutations: {
    SAVE_PJ_ID(state, id) {
      state.pj_id = id
    },
    SAVE_BD_ID(state, id) {
      state.bd_id = id
    },
    SAVE_FL_ID(state, id) {
      state.fl_id = id
    },
    SAVE_SP_ID(state, id) {
      state.sp_id = id
    },
    SAVE_SY_ID(state, id) {
      state.sy_id = id
    },
    SAVE_DV_ID(state, id) {
      state.dv_id = id
    }
  }
}