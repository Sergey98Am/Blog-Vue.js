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
  authAxios.get('/admin/permissions').then(response => {
    self.isLoading = false
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
      authAxios.post('/admin/permissions', formData).then(response => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        // self.page = 1
        // let newPermission = response.data.permission
        // self.permissions.unshift(newPermission)
        self.closeModal()
        self.getResults(1)
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
      authAxios.post('/admin/permissions/' + self.id, formData).then(response => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        self.closeModal()
        let permissions = self.permissions.data
        let permission = permissions.find(permission => permission.id === response.data.permission.id)
        permission.title = response.data.permission.title
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
  authAxios.delete('/admin/permissions/' + id).then(response => {
    let permissions = self.permissions
    let permissionsData = self.permissions.data
    let permission
    for (permission in permissionsData) {
      if (permissionsData[permission].id === response.data.permission.id) {
        permissionsData.splice(permission, 1)
      }
    }
    if (permissionsData.length === 0) {
      let page = permissions.current_page - 1
      self.getResults(page)
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
