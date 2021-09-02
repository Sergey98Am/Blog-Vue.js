import authAxios from '../../config/authAxios'

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

function get (self) {
  self.isLoading = true
  authAxios.get('/posts').then(response => {
    self.isLoading = false
    self.posts = response.data.posts
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
      formData.append('image', self.image)
      formData.append('title', self.title)
      formData.append('description', self.description)
      authAxios.post('/posts', formData).then(() => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        // let newPost = response.data.createdPost
        // posts.unshift(newPost)
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
      if (self.$refs['hidden-button'].files[0]) {
        formData.append('image', self.image)
      }
      formData.append('title', self.title)
      formData.append('description', self.description)
      authAxios.post('/posts/' + self.id, formData).then(response => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        let onePost = self.$store.getters.get_one_post
        let post
        if (onePost) {
          post = self.postOrPosts
        } else {
          post = self.postOrPosts.data.find(post => post.id === response.data.updatedPost.id)
        }
        if (self.$refs['hidden-button'].files[0]) {
          post.image = response.data.updatedPost.image
        }
        post.title = response.data.updatedPost.title
        post.description = response.data.updatedPost.description
        post.checked = response.data.updatedPost.checked
        post.edited = response.data.updatedPost.edited
        post.updated_at = response.data.updatedPost.updated_at
        self.closeModal()
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

function destroy (target, postId, self) {
  // Loader
  target.querySelector('.delete-loader').style.display = 'inline-block'
  target.querySelector('.icon').style.display = 'none'
  // End Loader
  authAxios.delete('/posts/' + postId).then(response => {
    self.$store.dispatch('notificationsLastId')
    self.$store.dispatch('getUnreadNotificationsCount')
    self.$store.dispatch('postNotifications', {postId: postId})
    let onePost = self.$store.getters.get_one_post
    if (onePost) {
      self.$router.push('/')
    } else {
      let posts = self.posts
      let postsData = self.posts.data
      let post
      for (post in postsData) {
        if (postsData[post].id === response.data.deletedPost.id) {
          postsData.splice(post, 1)
        }
      }
      if (postsData.length === 0) {
        let page = posts.current_page - 1
        self.getResults(page)
      }
    }
  }).catch(error => error)
}

function allPosts (self) {
  self.isLoading = true
  authAxios.get('http://blog.loc/api/all-posts').then(response => {
    self.isLoading = false
    self.posts = response.data.posts
  }).catch(() => {
    self.isLoading = false
  })
}

function saveLike (target, post) {
  authAxios.post('/save-like/post/' + post.id).then(response => {
    if (response.data.deleted) {
      let like
      for (like in post.likes) {
        if (post.likes[like].id === response.data.like.id) {
          post.likes.splice(like, 1)
        }
      }
      target.style.color = 'red'
    } else {
      post.likes.push(response.data.like)
      target.style.color = 'green'
    }
  }).catch(error => error)
}

function post (self) {
  let postId = self.$route.params.postId
  authAxios.get('/post/' + postId).then(response => {
    let post = self.post
    let result = response.data
    post.id = result.id
    post.image = result.image
    post.title = result.title
    post.description = result.description
    post.checked = result.checked
    post.user = result.user
  }).catch(error => error)
}

export {
  validation,
  get,
  create,
  update,
  destroy,
  allPosts,
  saveLike,
  post
}
