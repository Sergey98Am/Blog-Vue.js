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
              <button @click="editModal(post)" class="btn btn-primary">
                <font-awesome-icon :icon="['fas', 'edit']"/>
              </button>
              <button @click="showModal(post)" class="btn btn-success">
                <font-awesome-icon :icon="['fas', 'eye']"/>
              </button>
              <button @click="deletePost($event.target, post.id)" class="btn btn-danger">
                <div class="spinner-border text-light delete-loader" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'trash']"/>
                </span>
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
    <show-posts ref="show-posts"></show-posts>
  </div>
</template>

<script>
import ModalPosts from '@/components/Posts/ModalPosts.vue'
import ShowPosts from '@/components/Posts/ShowPosts.vue'
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
    'modal-posts': ModalPosts,
    'show-posts': ShowPosts
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
    showModal (post) {
      this.$refs['show-posts'].newModal(post)
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
  transition: box-shadow .3s;
  background-color: rgba(255, 255, 255, 0.9) !important;
  border-radius: 35px;
  overflow: hidden;
  margin-bottom: 10px;
}

.card:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.4);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
