import ShowModal from '@/components/user/posts/show-modal/ShowModal'
import * as postService from '@/services/post.service'
import axios from 'axios'
import Comments from '@/components/user/posts/comments-modal/CommentsModal.vue'

export default {
  data () {
    return {
      isLoading: false,
      posts: {}
    }
  },
  components: {
    'show-modal': ShowModal,
    'comments': Comments
  },
  mounted () {
    this.getAllPosts()
  },
  methods: {
    showModal (post) {
      this.$refs['show-posts'].newModal(post)
    },
    getAllPosts () {
      let url = '/all-posts'
      postService.allPosts(this, url)
    },
    saveLike (target, post) {
      postService.saveLike(target, post, this)
    },
    getResults (page = 1) {
      axios.get('http://blog.loc/api/all-posts?page=' + page)
        .then(response => {
          this.posts = response.data.posts
        })
    },
    // Comments
    goToComments (postId) {
      this.$refs.comments.commentModal(postId)
    }
  }
}
