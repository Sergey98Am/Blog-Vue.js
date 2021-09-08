<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div v-if="isLoading" class="col-12">
          <div class="loading">
            <div class="spinner-grow text-white" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div v-else class="col-12">
          <div class="row">
            <div class="col-12">
              <div class="create-post">
                <!--                <force-update :forceUpdate="getPosts"></force-update>-->
                <button @click="openModal" class="btn btn-light">
                  <font-awesome-icon :icon="['fas', 'plus']"/>
                  Create post
                </button>
              </div>
            </div>
            <div v-for="post in posts.data" :key="post.id" class="col-12 col-sm-6 col-xl-4">
              <div class="card">
                <img :src="'http://blog.loc/images/' + post.image" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title line-clamp">{{ post.title }}</h5>
                  <p class="card-text line-clamp">{{ post.description }}</p>
                  <div class="actions">
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
                  <div class="comment">
                    <button @click="goToComments(post.id)" class="btn btn-secondary">
                      <font-awesome-icon :icon="['fas', 'comment-alt']"/>
                    </button>
                  </div>
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
                  <span v-if="post.edited" class="edited"><b>Edited: {{ post.updated_at }}</b></span>
                </div>
              </div>
            </div>
            <div class="col-12">
              <pagination :limit="2" :data="posts" @pagination-change-page="getResults"></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <create-edit-modal :postOrPosts="posts" :getResults="getResults" ref="modal-posts"></create-edit-modal>
    <show-modal ref="show-posts"></show-modal>
    <comments ref="comments"></comments>
  </div>
</template>

<script src="./posts.view.js"></script>
<style src="./posts.css" scoped></style>
