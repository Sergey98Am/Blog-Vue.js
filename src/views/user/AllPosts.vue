<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div v-for="post in displayedPosts" :key="post.id" class="col-8 offset-2">
          <div class="card">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img :src="'http://blog.loc/images/' + post.image" class="card-img-top" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text">{{ post.description }}</p>
                  <button @click="showModal(post)" class="btn btn-success show-modal">
                    <font-awesome-icon :icon="['fas', 'eye']"/>
                  </button>
                  <p><b>by</b> {{ post.user.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8 offset-2">
          <paginate v-model="page" :page-count="pageCount" :page-range="3"
                    :margin-pages="1" :prev-text="'Prev'" :next-text="'Next'"
                    :container-class="'pagination'" :page-class="'page-item'"
                    :hide-prev-next="true"></paginate>
        </div>
      </div>
    </div>
    <show-modal ref="show-posts"></show-modal>
  </div>
</template>

<script>
import ShowModal from '@/components/user/posts/ShowModal'
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
</script>

<style scoped>
.posts {
  overflow: auto;
  padding: 50px 0;
  margin-top: 55px;
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
  height: 220px;
  object-fit: cover;
}

.card-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.show-modal {
  margin-bottom: 10px;
}
</style>
