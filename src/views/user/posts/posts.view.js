import CreateEditModal from '@/components/user/posts/create-edit-modal/CreateEditModal.vue'
import ShowModal from '@/components/user/posts/show-modal/ShowModal.vue'
import ForceUpdate from '@/components/forceUpdate.vue'
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
    'create-edit-modal': CreateEditModal,
    'show-modal': ShowModal,
    'force-update': ForceUpdate
  },
  computed: {
    displayedPosts () {
      return Pagination.paginate(this, this.postOrPosts)
    }
  },
  mounted () {
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
      postService.destroy(target, postId, this)
    }
  }
}
