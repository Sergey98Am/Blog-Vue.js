import ShowModal from '@/components/user/posts/show-modal/ShowModal'
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
    'show-modal': ShowModal
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
    showModal (post) {
      this.$refs['show-posts'].newModal(post)
    },
    getAllPosts () {
      postService.allPosts(this)
    },
    saveLike (target, post) {
      postService.saveLike(target, post, this)
    }
  }
}
