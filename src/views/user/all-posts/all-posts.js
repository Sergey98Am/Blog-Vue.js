import ShowModal from '@/components/user/posts/show-modal/ShowModal'
import * as postService from '@/services/postService'
import * as Pagination from '@/pagination'

export default {
  data () {
    return {
      page: 1,
      pageCount: 0,
      pageSize: 4,
      posts: []
    }
  },
  components: {
    'show-modal': ShowModal
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
    showModal (post) {
      this.$refs['show-posts'].newModal(post)
    },
    getAllPosts () {
      postService.allPosts(this)
    }
  }
}
