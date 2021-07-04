// Change Details
function userValidation () {
  return {
    name: {
      required: true,
      regex: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/
    },
    password: {
      min: 8
    },
    password_confirmation: {
      confirmed: 'password'
    }
  }
}

function userServerSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.name) {
      self.$validator.errors.add({field: 'name', msg: data.error.name[0]})
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

function changeDetails (self, user) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      self.isLoading = true
      self.$store.dispatch('changeDetailsAction', {
        name: user.name,
        password: self.user.password,
        password_confirmation: self.user.password_confirmation
      }).then(response => {
        self.isLoading = false
        self.user.password = ''
        self.user.password_confirmation = ''
        self.message = response.data.message
        let message = document.querySelector('.message')
        message.style.display = 'inline-block'
        setTimeout(function () {
          message.style.display = 'none'
        }, 2000)
      }).catch(error => {
        self.isLoading = false
        userServerSideValidation(self, error)
      })
    }
  })
}

export {
  userValidation,
  userServerSideValidation,
  changeDetails
}
