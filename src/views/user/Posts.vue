<template>
  <div class="posts">
    <div class="container">
      <div class="create-post">
        <button @click="openModal" class="btn btn-light">Create post</button>
      </div>
      <div class="row">
        <div v-for="post in displayedPosts" :key="post.id" class="col-3">
          <div class="card">
            <img :src="'http://blog.loc/images/' + post.image" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.description }}</p>
              <button @click="editModal(post)" class="btn btn-primary">Edit</button>
              <button @click="deletePost($event.target, post.id)" class="btn btn-danger">
                <div class="spinner-border text-light delete-loader" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'trash']"/>
                </span>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div class="col-12">
          <paginate v-model="page" :page-count="pageCount" :page-range="3"
                    :margin-pages="1" :prev-text="'Prev'" :next-text="'Next'"
                    :container-class="'pagination'" :page-class="'page-item'"
                    :hide-prev-next="true"></paginate>
        </div>
      </div>
    </div>
    <modal-posts :posts="posts" ref="modal-posts"></modal-posts>
  </div>
</template>

<script>
import ModalPosts from '@/components/ModalPosts'
import * as postService from '@/services/postService'
import * as Pagination from '../../pagination'

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
    'modal-posts': ModalPosts
  },
  computed: {
    displayedPosts () {
      return Pagination.paginate(this, this.posts)
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
    getPosts () {
      postService.get(this)
    },
    deletePost (target, id) {
      postService.destroy(target, id, this)
    }
  }
}
</script>

<style scoped>
.posts {
  overflow: auto;
  padding: 50px 0;
  margin-top: 55px;
}

.create-post {
  margin-bottom: 20px;
}

.card {
  margin-bottom: 10px;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
