<template>
  <transition name="fade">
    <div class="modal" style="display: block" v-show="modal" @click.self="closeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Show Post</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="post text-center">
              <div class="image-area">
                <div class="image">
                  <img v-if="image" :src="'http://blog.loc/images/' + image">
                </div>
              </div>
              <h2>{{ title }}</h2>
              <p>{{ description }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="close-button btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: [
    'posts'
  ],
  data () {
    return {
      isLoading: false,
      modal: false,
      editMode: false,
      id: '',
      image: '',
      title: '',
      description: ''
    }
  },
  methods: {
    newModal (post) {
      this.editMode = false
      this.modal = true
      this.postImage = post.image
      this.image = post.image
      this.title = post.title
      this.description = post.description
    },
    closeModal () {
      this.modal = false
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  max-width: 650px;
}

.image-area {
  overflow: hidden;
}

.image {
  position: relative;
  margin: 10px;
}

img {
  border: 1px solid black;
  width: 400px;
  height: 150px;
  object-fit: cover;
  padding: 3px;
  margin-bottom: 10px;
  background: #fff;
}

.image .remove-image {
  position: absolute;
  right: 15px;
  top: -5px;
  background: red;
  color: #ffffff;
}

.hidden {
  display: none;
}
</style>
