import * as commentService from '@/services/comment.service'
import * as commentSettings from '@/components/comment-settings'

export default {
  data () {
    return {
      modal: false,
      postId: '',
      postComments: {},
      comment: '',
      commentId: '',
      comment_reply: '',
      updateCommentId: '',
      commentUpdate: '',
      lastCommentId: ''
    }
  },
  methods: {
    // Comment Modal
    commentModal (postId) {
      commentSettings.openModal(this, postId)
    },
    openUpdateCommentTypingMode (comment) {
      commentSettings.openUpdateTypingMode(this, comment)
    },
    closeComment (comment) {
      commentSettings.closeComment(this, comment)
    },
    closeModal () {
      commentSettings.closeModal(this)
    },

    // Reply typing mode
    openReplyTypingMode (comment) {
      commentSettings.replyTypingMode(this, comment)
    },
    closeReply () {
      commentSettings.closeReply(this)
    },

    // CRUD
    getComments () {
      let url = '/admin/posts/' + this.postId + '/comments'
      commentService.get(this, url)
    },
    deleteComment (commentParam) {
      let url = '/admin/posts/' + this.postId + '/comments/' + commentParam.id
      commentService.destroyComment(this, commentParam, url)
    },
    deleteReply (comment, limitedReplies) {
      commentService.destroyReply(this, comment, limitedReplies)
    },
    loadMoreComments () {
      commentService.moreComments(this)
    },
    loadMoreReplies (parentComment) {
      commentService.moreReplies(this, parentComment)
    }
  }
}
