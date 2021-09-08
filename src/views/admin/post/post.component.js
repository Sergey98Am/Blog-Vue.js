import CreateEditModal from '@/components/admin/posts/create-edit-modal/CreateEditModal.vue'
import ShowModal from '@/components/admin/posts/show-modal/ShowModal.vue'
import * as adminPostService from '@/services/admin/post.service'
import * as PostService from '@/services/post.service'
import Comments from '@/components/admin/posts/comments-modal/CommentsModal.vue'

export default {
  data () {
    return {
      post: {
        id: '',
        image: '',
        title: '',
        description: '',
        checked: '',
        user: {}
      }
    }
  },
  components: {
    'create-edit-modal': CreateEditModal,
    'show-modal': ShowModal,
    'comments': Comments
  },
  watch: {
    '$route' () {
      this.onePost()
    }
  },
  mounted () {
    this.$store.dispatch('onePostIsTrue')
    this.onePost()
  },
  methods: {
    onePost () {
      PostService.post(this)
    },
    editModal (post) {
      this.$refs['modal-posts'].editModal(post)
    },
    showModal (post) {
      this.$refs['show-posts'].newModal(post)
    },
    deletePost (target, id) {
      let url = `/admin/posts/${id}`
      let redirectUrl = '/admin'
      PostService.destroy(target, id, url, redirectUrl, this)
    },
    checkPost (target, post) {
      adminPostService.check(target, post)
    },
    // Comments
    goToComments (postId) {
      this.$refs.comments.commentModal(postId)
    }
  }
}
