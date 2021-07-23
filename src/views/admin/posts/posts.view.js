import ModalPosts from '@/components/admin/posts/create-edit-modal/CreateEditModal.vue'
import ShowPosts from '@/components/admin/posts/show-modal/ShowModal.vue'
import * as postService from '@/services/admin/post.service'
import * as Pagination from '@/pagination'

export default {
  data () {
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      pageSize: 4,
      posts: []
    }
  },
  components: {
    'modal-posts': ModalPosts,
    'show-posts': ShowPosts
  },
  computed: {
    displayedPosts () {
      return Pagination.paginate(this, this.posts)
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
      postService.allPosts(this)
    },
    deletePost (target, id) {
      postService.destroy(target, id, this)
    },
    checkPost (target, post) {
      postService.check(target, post)
    }
  }
}
