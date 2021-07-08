<template>
  <div class="posts">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="isLoading" class="loading">
            <div class="spinner-grow text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else class="row">
            <div class="col-12">
              <h1 class="title"><i><b>Posts</b></i></h1>
            </div>
            <div v-for="post in displayedPosts" :key="post.id" class="col-12 col-sm-6 col-xl-3">
              <div class="card">
                <img :src="'http://blog.loc/images/' + post.image" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text">{{ post.description }}</p>
                  <h6><b>from</b> {{ post.user.name }}</h6>
                  <div class="actions">
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
                  </div>
                  <div v-if="$can('post_check')" class="form-check">
                    <input v-model="post.checked" @change="checkPost(post)" class="checked-input" type="checkbox" :id="'checked-id-' + post.id">
                    <label class="checked-label" :for="'checked-id-' + post.id">Checked</label>
                    <span class="checked"><font-awesome-icon :icon="['fas', 'check']"/></span>
                  </div>
                  <span v-if="post.edited" class="edited"><b>Edited: {{post.updated_at}}</b></span>
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

<script src="./posts.view.js"></script>
<style src="./posts.css" scoped></style>
