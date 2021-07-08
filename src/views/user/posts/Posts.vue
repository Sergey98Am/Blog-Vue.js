<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div v-if="isLoading" class="col-12">
          <div class="loading">
            <div class="spinner-grow text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div v-else class="col-12">
          <div class="row">
            <div class="col-12">
              <div class="create-post">
                <button @click="openModal" class="btn btn-light">Create post</button>
              </div>
            </div>
            <div v-for="post in displayedPosts" :key="post.id" class="col-12 col-sm-6 col-xl-3">
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
                  <p v-if="post.checked" class="check">
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
    <create-edit-modal :posts="posts" ref="modal-posts"></create-edit-modal>
    <show-modal ref="show-posts"></show-modal>
  </div>
</template>

<script src="./posts.view.js"></script>
<style src="./posts.css" scoped></style>
