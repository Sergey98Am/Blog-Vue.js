<template>
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
          <div class="card">
            <img v-if="postOrPosts.image" :src="'http://blog.loc/images/' + postOrPosts.image" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ postOrPosts.title }}</h5>
              <p class="card-text">{{ postOrPosts.description }}</p>
              <div class="actions">
                <button @click="editModal(postOrPosts)" class="btn btn-primary">
                  <font-awesome-icon :icon="['fas', 'edit']"/>
                </button>
                <button @click="showModal(postOrPosts)" class="btn btn-success">
                  <font-awesome-icon :icon="['fas', 'eye']"/>
                </button>
                <button @click="deletePost($event.target, postOrPosts.id)" class="btn btn-danger">
                  <div class="spinner-border text-light delete-loader" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <span class="icon">
                        <font-awesome-icon :icon="['fas', 'trash']"/>
                      </span>
                </button>
              </div>
              <p v-if="postOrPosts.checked" class="check">
                <span>
                  <font-awesome-icon :icon="['fas', 'check']"/>
                </span>
                Checked
              </p>
              <p v-else class="check">
                <span>
                  <font-awesome-icon :icon="['fas', 'times']"/>
                </span>
                Not checked
              </p>
              <span v-if="postOrPosts.edited" class="edited"><b>Edited: {{ post.updated_at }}</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <create-edit-modal :postOrPosts="postOrPosts" ref="modal-posts"></create-edit-modal>
    <show-modal ref="show-posts"></show-modal>
  </div>
</template>

<script>
import CreateEditModal from '@/components/user/posts/create-edit-modal/CreateEditModal.vue'
import ShowModal from '@/components/user/posts/show-modal/ShowModal.vue'
import * as PostService from '@/services/post.service'

export default {
  data () {
    return {
      postOrPosts: {
        id: '',
        image: '',
        title: '',
        description: '',
        checked: ''
      }
    }
  },
  components: {
    'create-edit-modal': CreateEditModal,
    'show-modal': ShowModal
  },
  watch: {
    '$route' () {
      this.onePost()
    }
  },
  mounted () {
    this.onePost()
  },
  methods: {
    onePost () {
      PostService.post(this)
    },
    editModal (post) {
      this.$refs['modal-posts'].editModal(post)
    },
    showModal (post) {
      this.$refs['show-posts'].newModal(post)
    },
    deletePost (target, id) {
      PostService.destroy(target, id, this)
    }
  }
}
</script>

<style scoped>
.card img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>
