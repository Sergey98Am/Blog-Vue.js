import axios from 'axios'
import authAxios from '../../../../config/authAxios'

export default {
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
        commit('SET_loggedIn', true)
        commit('SET_token', 'Bearer ' + response.data.token)
        commit('SET_user', response.data.user)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logoutAction ({commit}) {
    return new Promise((resolve, reject) => {
      authAxios.get('/logout').then(response => {
        commit('SET_loggedIn', false)
        commit('SET_token', null)
        commit('SET_user', null)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  changeDetailsAction ({ commit, payload }) {
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      formData.append('name', payload.name)
      formData.append('password', payload.password)
      formData.append('password_confirmation', payload.password_confirmation)
      authAxios.post('/change-details', formData).then(response => {
        resolve(response)
        commit('SET_user', response.data.user)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
