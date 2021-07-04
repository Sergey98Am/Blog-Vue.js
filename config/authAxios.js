import axios from 'axios'
import store from '../src/store/user'
import router from '@/router'

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = 'http://blog.loc/api'

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: store.getters.get_token,
    }
    return config
  }
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.data.error && error.response.data.error === 'Token is Expired') {
      store.commit('SET_loggedIn', false)
      store.commit('SET_token', null)
      store.commit('SET_user', null)
      router.push('/login')
    }
  })

export default axiosInstance
