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
            <div v-for="post in displayedPosts" :key="post.id" class="col-12 col-sm-6 col-md-12 col-lg-8 offset-lg-2">
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
                      <div v-if="$store.getters.get_loggedIn" class="like-system">
                        <button :style="post.liked_by_auth_user ? 'color: green' : 'color: red'" @click="saveLike($event.target, post)">
                          <span class="icon"><font-awesome-icon :icon="['fas', 'thumbs-up']"/></span>
                        </button>
                        <span>( {{ post.likes.length }} )</span>
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
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-12 col-lg-8 offset-lg-2">
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

<script src="./all-posts.view.js"></script>
<style src="./all-posts.css" scoped></style>
