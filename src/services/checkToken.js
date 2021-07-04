export function checkToken (token) {
  if (token.$store.getters.get_loggedIn) {
    token.$store.dispatch('checkTokenAction').then(response => {
      console.log(response.data.success)
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        token.$router.push('/login')
      }
    })
  }
}
