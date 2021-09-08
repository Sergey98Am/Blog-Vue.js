function openModal (self, postId) {
  self.modal = true
  self.postId = postId
  self.getComments()
}

function openUpdateTypingMode (self, comment) {
  self.updateCommentId = comment.id
  self.commentUpdate = comment.comment
}

function closeComment (self, comment) {
  self.updateCommentId = ''
  comment.comment = self.commentUpdate
  self.commentUpdate = ''
}

function closeModal (self) {
  self.modal = false
  self.postId = ''
  self.postComments = ''
  self.comment = ''
}

function replyTypingMode (self, comment) {
  self.comment_reply = ''
  self.commentId = comment.id
  if (comment.parent_id) {
    self.comment_reply = '@' + comment.user.name + ' '
  }
}

function closeReply (self) {
  self.commentId = ''
  self.comment_reply = ''
}

export {
  openModal,
  openUpdateTypingMode,
  closeComment,
  closeModal,
  replyTypingMode,
  closeReply
}
