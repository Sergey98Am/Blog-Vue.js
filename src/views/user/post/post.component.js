import CreateEditModal from '@/components/user/posts/create-edit-modal/CreateEditModal.vue'
import ShowModal from '@/components/user/posts/show-modal/ShowModal.vue'
import * as PostService from '@/services/post.service'

export default {
  data () {
    return {
      post: {
        id: '',
        image: '',
        title: '',
        description: '',
        checked: ''
      }
    }
  },
  components: {
    'create-edit-modal': CreateEditModal,
    'show-modal': ShowModal
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
      this.$store.dispatch('onePostIsTrue')
      this.$refs['modal-posts'].editModal(post)
    },
    showModal (post) {
      this.$refs['show-posts'].newModal(post)
    },
    deletePost (target, id) {
      let url = `/posts/${id}`
      let redirectUrl = '/'
      PostService.destroy(target, id, url, redirectUrl, this)
    }
  }
}
