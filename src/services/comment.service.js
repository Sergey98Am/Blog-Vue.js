import authAxios from '../../config/authAxios'

function get (self, url) {
  authAxios.get(url).then(response => {
    self.postComments = response.data.comments
    let postComments = self.postComments.comments
    postComments.forEach(comment => {
      self.$set(comment, 'newReplies', [])
      self.lastCommentId = comment.id
      comment.limitedReplies.forEach(reply => {
        comment.lastReplyId = reply ? reply.id : null
      })
    })
  }).catch(error => error)
}

function addComment (self) {
  if (self.comment) {
    let formData = new FormData()
    formData.append('comment', self.comment)
    authAxios.post('/posts/' + self.postId + '/comments', formData).then(response => {
      self.comment = ''
      let postComments = self.postComments.comments
      let newComment = response.data.comment
      postComments.unshift(newComment)
      let container = document.querySelector('.comment-list')
      container.scrollTop = 0
    }).catch(error => error)
  }
}

function addReply (self, parentComment, newReplies) {
  if (self.comment_reply) {
    let formData = new FormData()
    formData.append('comment', self.comment)
    formData.append('parent_id', parentComment.id)
    formData.append('comment', self.comment_reply)
    authAxios.post('/posts/' + self.postId + '/comments/' + parentComment.id + '/replies', formData).then(response => {
      self.comment_reply = ''
      let newComment = response.data.comment
      newReplies.push(newComment)
      // parentComment.lastReplyId = newComment.id
      self.commentId = ''
    }).catch(error => error)
  }
}

function update (self, comment, url) {
  let formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('comment', comment.comment)
  authAxios.post(url, formData).then(response => {
    if (comment.comment === '') {
      comment.comment = response.data.comment.comment
    }
    self.updateCommentId = ''
  }).catch(error => error)
}

function destroyComment (self, comment, url) {
  authAxios.delete(url).then(response => {
    let postComments = self.postComments.comments
    let comment
    for (comment in postComments) {
      if (postComments[comment].id === response.data.comment.id) {
        postComments.splice(comment, 1)
      }
      self.lastCommentId = postComments[comment].id
    }
  }).catch(error => error)
}

function destroyReply (self, comment, replies) {
  authAxios.delete('/posts/' + self.postId + '/comments/' + comment.id).then(response => {
    let reply
    for (reply in replies) {
      if (replies[reply].id === response.data.comment.id) {
        replies.splice(reply, 1)
      }
      comment.lastReplyId = replies[reply].id
    }
  }).catch(error => error)
}

function destroyReplyInNewReplies (self, replies, reply) {
  authAxios.delete('/posts/' + self.postId + '/comments/' + reply.id).then(response => {
    let reply
    for (reply in replies) {
      if (replies[reply].id === response.data.comment.id) {
        replies.splice(reply, 1)
      }
    }
  }).catch(error => error)
}

function moreComments (self) {
  let postId = self.postId
  let lastCommentId = self.lastCommentId
  let formData = new FormData()
  formData.append('last_id', lastCommentId)
  authAxios.post('/posts/' + postId + '/load-more-comments', formData).then(response => {
    let comments = self.postComments.comments
    let moreComments = response.data.comments
    moreComments.forEach(comment => {
      comments.push(comment)
      self.$set(comment, 'newReplies', [])
      self.lastCommentId = comment.id
      comment.limitedReplies.forEach(reply => {
        comment.lastReplyId = reply ? reply.id : null
      })
    })
  }).catch(error => error)
}

function moreReplies (self, parentComment) {
  let postId = self.postId
  let formData = new FormData()
  formData.append('last_id', parentComment.lastReplyId)
  authAxios.post('/posts/' + postId + '/comments/' + parentComment.id + '/load-more-replies', formData).then(response => {
    let moreReplies = response.data.replies
    moreReplies.forEach(reply => {
      parentComment.limitedReplies.push(reply)
      parentComment.lastReplyId = reply.id
    })
  }).catch(error => error)
}

export {
  get,
  addComment,
  addReply,
  update,
  destroyComment,
  destroyReply,
  destroyReplyInNewReplies,
  moreComments,
  moreReplies
}
