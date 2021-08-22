import ModalPosts from '@/components/admin/posts/create-edit-modal/CreateEditModal.vue'
import ShowPosts from '@/components/admin/posts/show-modal/ShowModal.vue'
import * as adminPostService from '@/services/admin/post.service'
import * as postService from '@/services/post.service'
import * as Pagination from '@/pagination'

export default {
  data () {
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      pageSize: 4,
      postOrPosts: []
    }
  },
  components: {
    'modal-posts': ModalPosts,
    'show-posts': ShowPosts
  },
  computed: {
    displayedPosts () {
      return Pagination.paginate(this, this.postOrPosts)
    }
  },
  mounted () {
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
      adminPostService.allPosts(this)
    },
    deletePost (target, postId) {
      postService.destroy(target, postId, this)
    },
    checkPost (target, post) {
      adminPostService.check(target, post)
    }
  }
}
