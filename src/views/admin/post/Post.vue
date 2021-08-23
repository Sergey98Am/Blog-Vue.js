<template>
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
          <div class="card">
            <img v-if="postOrPosts.image" :src="'http://blog.loc/images/' + postOrPosts.image" class="card-img-top"
                 alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ postOrPosts.title }}</h5>
              <p class="card-text">{{ postOrPosts.description }}</p>
              <h6><b>from</b> {{ postOrPosts.user.name }}</h6>
              <div class="actions">
                <button v-if="$can('post_edit')" @click="editModal(postOrPosts)" class="btn btn-secondary">
                  <font-awesome-icon :icon="['fas', 'edit']"/>
                </button>
                <button v-if="$can('post_show')" @click="showModal(postOrPosts)" class="btn btn-secondary">
                  <font-awesome-icon :icon="['fas', 'eye']"/>
                </button>
                <button v-if="$can('post_delete')" @click="deletePost($event.target, postOrPosts.id)"
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
                <input v-model="postOrPosts.checked" @change="checkPost($event.target, postOrPosts)"
                       class="checked-input" type="checkbox" :id="'checked-id-' + postOrPosts.id">
                <label class="checked-label" :for="'checked-id-' + postOrPosts.id">Checked</label>
                <span class="checked"><font-awesome-icon :icon="['fas', 'check']"/></span>
              </div>
              <span v-if="$can('post_check') && postOrPosts.edited"
                    class="edited"><b>Edited: {{ postOrPosts.updated_at }}</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <create-edit-modal :postOrPosts="postOrPosts" ref="modal-posts"></create-edit-modal>
    <show-modal ref="show-posts"></show-modal>
  </div>
</template>

<script src="./post.component.js"></script>
<style scoped>
.card img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.card .form-check {
  display: inline-block;
  padding-left: 0;
  margin-top: 10px;
}

.checked {
  display: none;
}
</style>
