import ModalPosts from '@/components/admin/posts/create-edit-modal/CreateEditModal.vue'
import ShowPosts from '@/components/admin/posts/show-modal/ShowModal.vue'
import * as adminPostService from '@/services/admin/post.service'
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
    'modal-posts': ModalPosts,
    'show-posts': ShowPosts
  },
  mounted () {
    this.$store.dispatch('onePostIsFalse')
    this.getAllPosts()
  },
  methods: {
    editModal (post) {
      this.$refs['modal-posts'].editModal(post)
    },
    showModal (post) {
      this.$refs['show-posts'].newModal(post)
    },
    getAllPosts () {
      let url = '/admin/posts'
      postService.allPosts(this, url)
    },
    deletePost (target, postId) {
      let url = `/admin/posts/${postId}`
      let redirectUrl = '/admin'
      postService.destroy(target, postId, url, redirectUrl, this)
    },
    checkPost (target, post) {
      adminPostService.check(target, post)
    },
    getResults (page = 1) {
      authAxios.get('/admin/posts?page=' + page)
        .then(response => {
          this.posts = response.data.posts
        })
    }
  }
}
