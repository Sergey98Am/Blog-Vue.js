import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'
// import authAxios from '../../config/authAxios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    token: null,
    user: null
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    SET_loggedIn (state, payload) {
      state.loggedIn = payload
    },
    SET_token (state, payload) {
      state.token = payload
    },
    SET_user (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerAction ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let formData = new FormData()
        formData.append('name', payload.name)
        formData.append('email', payload.email)
        formData.append('password', payload.password)
        formData.append('password_confirmation', payload.password_confirmation)
        formData.append('remember_me', payload.remember_me)
        axios.post('http://blog.loc/api/auth/register', formData).then(response => {
          commit('SET_loggedIn', true)
          commit('SET_token', 'Bearer ' + response.data.token)
          commit('SET_user', response.data.user)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    loginAction ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let formData = new FormData()
        formData.append('email', payload.email)
        formData.append('password', payload.password)
        formData.append('remember_me', payload.remember_me)
        axios.post('http://blog.loc/api/auth/login', formData).then(response => {
          console.log(payload)
          commit('SET_loggedIn', true)
          commit('SET_token', 'Bearer ' + response.data.token)
          commit('SET_user', response.data.user)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    get_loggedIn (state) {
      return state.loggedIn
    },
    get_token (state) {
      return state.token
    },
    get_user (state) {
      return state.user
    }
  }
})
