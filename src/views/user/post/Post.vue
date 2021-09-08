<template>
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
          <div class="card">
            <img v-if="post.image" :src="'http://blog.loc/images/' + post.image" class="card-img-top" alt="...">
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
      </div>
    </div>
    <create-edit-modal :postOrPosts="post" ref="modal-posts"></create-edit-modal>
    <show-modal ref="show-posts"></show-modal>
    <comments ref="comments"></comments>
  </div>
</template>

<script src="./post.component.js"></script>
<style scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
