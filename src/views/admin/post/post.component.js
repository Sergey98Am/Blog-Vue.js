import CreateEditModal from '@/components/admin/posts/create-edit-modal/CreateEditModal.vue'
import ShowModal from '@/components/admin/posts/show-modal/ShowModal.vue'
import * as adminPostService from '@/services/admin/post.service'
import * as PostService from '@/services/post.service'

export default {
  data () {
    return {
      postOrPosts: {
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
    'show-modal': ShowModal
  },
  watch: {
    '$route' () {
      this.onePost()
    }
  },
  mounted () {
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
      PostService.destroy(target, id, this)
    },
    checkPost (target, post) {
      adminPostService.check(target, post)
    }
  }
}
