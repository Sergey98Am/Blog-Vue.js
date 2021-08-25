const state = {
  onePost: false
}

const mutations = {
  SET_onePost (state, payload) {
    state.onePost = payload
  }
}

const actions = {
  onePostIsTrue ({commit}) {
    commit('SET_onePost', true)
  },

  onePostIsFalse ({commit}) {
    commit('SET_onePost', false)
  }
}

const getters = {
  get_one_post (state) {
    return state.onePost
  }
}

export {
  state,
  mutations,
  actions,
  getters
}
