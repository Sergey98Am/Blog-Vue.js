import authAxios from '../../config/authAxios'

export function checkToken (token) {
  if (token.$store.getters.get_loggedIn) {
    authAxios.post('/check-token').then(response => response).catch(error => error)
  }
}
