import ShowModal from '@/components/user/posts/show-modal/ShowModal'
import * as postService from '@/services/post.service'
import axios from 'axios'

export default {
  data () {
    return {
      isLoading: false,
      posts: {}
    }
  },
  components: {
    'show-modal': ShowModal
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
    },
    getResults (page = 1) {
      axios.get('http://blog.loc/api/all-posts?page=' + page)
        .then(response => {
          this.posts = response.data.posts
        })
    }
  }
}
