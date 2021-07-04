import axios from 'axios'
import store from '../src/store/user'

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

export default axiosInstance
