<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div v-if="isLoading" class="col-12">
          <div class="loading">
            <div class="spinner-grow text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div v-else class="col-12">
          <div class="row">
            <div v-for="post in posts.data" :key="post.id" class="col-12 col-sm-6 col-xl-4">
              <div class="card">
                <img :src="'http://blog.loc/images/' + post.image" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title line-clamp">{{ post.title }}</h5>
                  <p class="card-text line-clamp">{{ post.description }}</p>
                  <div class="actions">
                    <button @click="showModal(post)" class="btn btn-success">
                      <font-awesome-icon :icon="['fas', 'eye']"/>
                    </button>
                  </div>
                  <div class="comment">
                    <button @click="goToComments(post.id)" class="btn btn-secondary">
                      <font-awesome-icon :icon="['fas', 'comment-alt']"/>
                    </button>
                  </div>
                  <div v-if="$store.getters.get_loggedIn" class="like-system">
                    <button :style="post.liked_by_auth_user ? 'color: green' : 'color: red'" @click="saveLike($event.target, post)">
                      <span class="icon"><font-awesome-icon :icon="['fas', 'thumbs-up']"/></span>
                    </button>
                    <span>({{ post.likes.length }})</span>
                  </div>
                  <div v-else class="like-system">
                    <button style="color: grey; cursor: default">
                      <span class="icon"><font-awesome-icon :icon="['fas', 'thumbs-up']"/></span>
                    </button>
                    <span>( {{ post.likes.length }} )</span>
                  </div>
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
    <show-modal ref="show-posts"></show-modal>
    <comments ref="comments"></comments>
  </div>
</template>

<script src="./all-posts.view.js"></script>
<style src="./all-posts.css" scoped></style>
