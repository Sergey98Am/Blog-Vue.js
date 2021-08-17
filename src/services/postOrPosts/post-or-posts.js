function PostOrPostsUpdate (postOrPosts, response) {
  if (postOrPosts instanceof Array) {
    return postOrPosts.find(post => post.id === response.data.updatedPost.id)
  } else if (postOrPosts instanceof Object) {
    return postOrPosts
  }
}

function PostOrPostsDelete (self, postOrPosts, response) {
  if (postOrPosts instanceof Array) {
    let post
    for (post in postOrPosts) {
      if (postOrPosts[post].id === response.data.deletedPost.id) {
        postOrPosts.splice(post, 1)
      }
    }
  } else if (postOrPosts instanceof Object) {
    postOrPosts.image = ''
    postOrPosts.title = ''
    postOrPosts.description = ''
    postOrPosts.checked = ''
    self.$router.push('/')
  }
}

export {
  PostOrPostsUpdate,
  PostOrPostsDelete
}
