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

export {
  userValidation,
  userServerSideValidation
}
