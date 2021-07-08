<template>
  <div class="posts">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="isLoading" class="loading">
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else class="row">
            <div class="col-12">
              <h1 class="title"><i><b>Posts</b></i></h1>
            </div>
            <div v-for="post in displayedPosts" :key="post.id" class="col-3">
              <div class="card">
                <img :src="'http://blog.loc/images/' + post.image" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text">{{ post.description }}</p>
                  <h6><b>from</b> {{ post.user.name }}</h6>
                  <button v-if="$can('post_edit')" @click="editModal(post)" class="btn btn-secondary">
                    <font-awesome-icon :icon="['fas', 'edit']"/>
                  </button>
                  <button v-if="$can('post_show')" @click="showModal(post)" class="btn btn-secondary">
                    <font-awesome-icon :icon="['fas', 'eye']"/>
                  </button>
                  <button v-if="$can('post_delete')" @click="deletePost($event.target, post.id)"
                          class="btn btn-secondary">
                    <div class="spinner-border text-light delete-loader" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                    <span class="icon">
                      <font-awesome-icon :icon="['fas', 'trash']"/>
                    </span>
                  </button>
                  <div class="form-check">
                    <input v-model="post.checked" @change="checkPost(post)" class="checked-input" type="checkbox" :id="'checked-id-' + post.id">
                    <label class="checked-label" :for="'checked-id-' + post.id">Checked</label>
                  </div>
                </div>
              </div>
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
import ModalPosts from '@/components/admin/posts/CreateEditModal.vue'
import ShowPosts from '@/components/admin/posts/ShowModal'
import * as postService from '@/services/postService'
import * as Pagination from '../../pagination'

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
      postService.adminAllPosts(this)
    },
    deletePost (target, id) {
      postService.destroy(target, id, this)
    },
    checkPost (post) {
      postService.check(post, this)
    }
  }
}
</script>

<style scoped>
.card {
  transition: box-shadow .3s;
  background-color: rgba(255, 255, 255, 0.9) !important;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 10px;
}

.card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, .4);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card .form-check {
  padding-left: 0;
  margin-top: 10px;
}
</style>
