import CreateEditModal from '@/components/user/posts/create-edit-modal/CreateEditModal.vue'
import ShowModal from '@/components/user/posts/show-modal/ShowModal.vue'
import ForceUpdate from '@/components/forceUpdate.vue'
import * as postService from '@/services/post.service'
import authAxios from '../../../../config/authAxios'

export default {
  data () {
    return {
      isLoading: false,
      posts: {}
    }
  },
  components: {
    'create-edit-modal': CreateEditModal,
    'show-modal': ShowModal,
    'force-update': ForceUpdate
  },
  mounted () {
    this.$store.dispatch('onePostIsFalse')
    this.getPosts()
  },
  methods: {
    openModal () {
      this.$refs['modal-posts'].newModal()
    },
    editModal (post) {
      this.$refs['modal-posts'].editModal(post)
    },
    showModal (post) {
      this.$refs['show-posts'].newModal(post)
    },
    getPosts () {
      postService.get(this)
    },
    deletePost (target, postId) {
      let url = `/posts/${postId}`
      let redirectUrl = '/'
      postService.destroy(target, postId, url, redirectUrl, this)
    },
    getResults (page = 1) {
      authAxios.get('/posts?page=' + page)
        .then(response => {
          this.posts = response.data.posts
        })
    }
  }
}
