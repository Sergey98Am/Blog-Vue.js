// Register
function registerValidation () {
  return {
    name: {
      required: true,
      regex: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/
    },
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      min: 8
    },
    password_confirmation: {
      required: true,
      confirmed: 'password'
    }
  }
}

function registerServerSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.name) {
      self.$validator.errors.add({field: 'name', msg: data.error.name[0]})
    }
    if (data.error.email) {
      self.$validator.errors.add({field: 'email', msg: data.error.email[0]})
    }
    if (data.error.password) {
      self.$validator.errors.add({field: 'password', msg: data.error.password[0]})
    }
    if (data.error.password_confirmation) {
      self.$validator.errors.add({
        field: 'password_confirmation',
        msg: data.error.password_confirmation[0]
      })
    }
  }
}

function register (self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      self.$store.dispatch('registerAction', {
        name: self.user.name,
        email: self.user.email,
        password: self.user.password,
        password_confirmation: self.user.password_confirmation,
        remember_me: self.user.remember_me
      }).then(() => {
        window.Echo.connect()
        let auth = window.Echo.connector.pusher.config.auth
        let getters = self.$store.getters
        auth.headers['Authorization'] = getters.get_token
        self.$store.dispatch('renderNotifications')
        self.$router.push('/')
      }).catch(error => {
        registerServerSideValidation(self, error)
      })
    }
  })
}

function loginValidation () {
  return {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    }
  }
}

function loginServerSideValidation (login, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.email) {
      login.$validator.errors.add({field: 'email', msg: data.error[0]})
    }
    if (data.error.password) {
      login.$validator.errors.add({field: 'password', msg: data.error.password[0]})
    }
  }
  if (data.message) {
    login.$validator.errors.add({field: 'password', msg: data.message})
  }
}

function login (self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      self.isLoading = true
      self.$store.dispatch('loginAction', {
        email: self.email,
        password: self.password,
        remember_me: self.remember_me
      }).then(response => {
        window.Echo.connect()
        let auth = window.Echo.connector.pusher.config.auth
        let getters = self.$store.getters
        auth.headers['Authorization'] = getters.get_token
        self.$store.dispatch('renderNotifications')
        if (response.data.user.role_id !== 1) {
          return self.$router.push('/admin')
        }
        self.$router.push('/')
      }).catch(error => {
        loginServerSideValidation(self, error)
      })
    }
  })
}

function logout (self) {
  self.$store.dispatch('logoutAction').then(() => {
    window.Echo.disconnect()
    window.Echo.connector.pusher.config.auth.headers['Authorization'] = null
    self.$store.dispatch('removeNotifications')
    if (self.$route.path !== '/') {
      self.$router.push('/')
    }
  }).catch(error => error)
}

export {
  registerValidation,
  registerServerSideValidation,
  register,
  loginValidation,
  loginServerSideValidation,
  login,
  logout
}
