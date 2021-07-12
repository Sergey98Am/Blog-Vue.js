import authAxios from '../../../config/authAxios'

function validation () {
  return {
    imageCreate: {
      required: true,
      ext: ['jpeg', 'jpg', 'png']
    },
    imageUpdate: {
      ext: ['jpeg', 'jpg', 'png']
    },
    title: {
      required: true
    },
    description: {
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

function allPosts (self) {
  self.isLoading = true
  authAxios.get('/admin/posts').then(response => {
    self.isLoading = false
    self.posts = response.data.posts
  }).catch(() => {
    self.isLoading = false
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
      if (self.$refs['hidden-button'].files[0]) {
        formData.append('image', self.image)
      }
      formData.append('title', self.title)
      formData.append('description', self.description)
      authAxios.post('/admin/posts/' + self.id, formData).then(response => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        self.closeModal()
        let post = self.posts.find(post => post.id === response.data.updatedPost.id)
        if (self.$refs['hidden-button'].files[0]) {
          post.image = response.data.updatedPost.image
        }
        post.title = response.data.updatedPost.title
        post.description = response.data.updatedPost.description
        post.edited = response.data.updatedPost.edited
        post.updated_at = response.data.updatedPost.updated_at
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
  authAxios.delete('/posts/' + id).then(response => {
    let post
    for (post in self.posts) {
      if (self.posts[post].id === response.data.deletedPost.id) {
        self.posts.splice(post, 1)
      }
    }
  }).catch(error => {
    console.log(error)
  })
}

function check (target, post) {
  let checked = post.checked ? 1 : 0
  let formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('id', post.id)
  formData.append('checked', checked)
  authAxios.post('/admin/check-post/' + post.id, formData).then(response => {
    post.checked = response.data.post.checked
    let checked = target.closest('.form-check').querySelector('.checked')
    checked.style.display = 'inline-block'
    setTimeout(function () {
      checked.style.display = 'none'
    }, 2000)
  }).catch(error => error)
}

export {
  validation,
  allPosts,
  update,
  destroy,
  check
}
