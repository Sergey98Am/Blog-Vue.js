import authAxios from '../../../../config/authAxios'

function validation () {
  return {
    title: {
      required: true
    }
  }
}

function serverSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.title) {
      self.$validator.errors.add({field: 'title', msg: data.error.title[0]})
    }
  }
}

function get (self) {
  self.isLoading = true
  authAxios.get('/admin/roles').then(response => {
    self.isLoading = false
    self.roles = response.data.roles
    self.permissions = response.data.permissions
  }).catch(() => {
    self.isLoading = false
  })
}

function create (target, self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      // Loader
      let loader = target.querySelector('.create-loader')
      let icon = target.querySelector('.icon')
      loader.style.display = 'inline-block'
      icon.style.display = 'none'
      // End Loader
      let formData = new FormData()
      formData.append('title', self.title)
      for (let i = 0; i < self.selectedPermissions.length; i++) {
        formData.append('permissions[]', self.selectedPermissions[i])
      }
      authAxios.post('/admin/roles', formData).then(response => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        self.closeModal()
        self.page = 1
        let newRole = response.data.role
        self.roles.unshift(newRole)
      }).catch(error => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        serverSideValidation(self, error)
      })
    }
  })
}

function update (target, self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      // Loader
      let loader = target.querySelector('.edit-loader')
      let icon = target.querySelector('.icon')
      loader.style.display = 'inline-block'
      icon.style.display = 'none'
      // End Loader
      let formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', self.id)
      formData.append('title', self.title)
      for (let i = 0; i < self.selectedPermissions.length; i++) {
        formData.append('permissions[]', self.selectedPermissions[i])
      }
      authAxios.post('/admin/roles/' + self.id, formData).then(response => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        self.closeModal()
        let role = self.roles.find(role => role.id === response.data.role.id)
        role.title = response.data.role.title
        role.permissions = response.data.role.permissions
      }).catch(error => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        serverSideValidation(self, error)
      })
    }
  })
}

function destroy (target, id, self) {
  // Loader
  target.querySelector('.delete-loader').style.display = 'inline-block'
  target.querySelector('.icon').style.display = 'none'
  // End Loader
  authAxios.delete('/admin/roles/' + id).then(response => {
    let role
    for (role in self.roles) {
      if (self.roles[role].id === response.data.role.id) {
        self.roles.splice(role, 1)
      }
    }
  }).catch(error => error)
}

export {
  validation,
  get,
  create,
  update,
  destroy
}
