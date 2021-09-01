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
  </div>
</template>

<script src="./post.component.js"></script>
<style scoped>
.card {
  padding: 15px;
  transition: box-shadow .3s;
  background: transparent;
  border-top-left-radius: 30px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 30px;
  overflow: hidden;
  margin-bottom: 10px;
  border: 2px solid white;
}

.card:hover {
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.9);
}

.card-body {
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.4);
  margin-top: 10px;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: inherit;
}

.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
