<template>
  <transition name="fade">
    <div class="modal" style="display: block" v-show="modal" @click.self="closeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="editMode" class="modal-title">Edit Post</h5>
            <h5 v-else class="modal-title">Create Post</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group text-center">
              <div class="image-area">
                <div class="image">
                  <button @click="removeImage" :class="imagePreview ? '' : 'hidden'" class="remove-image">&times;
                  </button>
                  <img v-if="imagePreview" :src="imagePreview">
                  <img v-else :src="editMode ? 'http://blog.loc/images/' + postImage : noImage">
                </div>
                <input @change="changeFile" multiple ref="hidden-button" type="file" name="image"
                       class="hidden-button" hidden="hidden" accept="image/jpeg, image/jpg, image/png"
                       v-validate="editMode ? postValidation().imageUpdate : postValidation().imageCreate"
                       :class="{ 'is-invalid':errors.has('image') }">
                <button @click="upload" type="button" class="upload">Choose image</button>
                <div class="invalid-feedback">
                  <span v-if="errors.has('image')">{{ errors.first('image') }}</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control"
                     id="title"
                     name="title"
                     v-model="title"
                     v-validate="postValidation().title"
                     :class="{ 'is-invalid':errors.has('title') }">
              <div class="invalid-feedback">
                <span v-if="errors.has('title')">{{ errors.first('title') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" rows="3" id="description"
                        name="description"
                        v-model="description"
                        v-validate="postValidation().description"
                        :class="{ 'is-invalid':errors.has('description') }"></textarea>
              <div class="invalid-feedback">
                <span v-if="errors.has('description')">{{ errors.first('description') }}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="close-button btn btn-secondary" @click="closeModal">Close</button>
            <button v-if="editMode" class="update-button" @click="updatePost($event.target)">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'pen-alt']"/>
                  </span>
              <div class="spinner-border text-light edit-loader" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              Update
            </button>
            <button v-else class="create-button" @click="createPost($event.target)">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'plus']"/>
                  </span>
              <div class="spinner-border text-light create-loader" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as postService from '@/services/postService'

export default {
  props: [
    'posts'
  ],
  data () {
    return {
      isLoading: false,
      modal: false,
      editMode: false,
      permissions: [],
      id: '',
      image: '',
      title: '',
      description: '',
      // for image
      imagePreview: false,
      noImage: require('../../assets/images/no-image.jpg'),
      postImage: ''
    }
  },
  methods: {
    // Modal Settings
    newModal () {
      this.editMode = false
      this.modal = true
    },
    editModal (post) {
      this.editMode = true
      this.modal = true
      this.id = post.id
      this.postImage = post.image
      this.image = post.image
      this.title = post.title
      this.description = post.description
    },
    closeModal () {
      this.modal = false
      this.$validator.reset()
      this.id = ''
      this.image = ''
      this.title = ''
      this.description = ''
      this.imagePreview = ''
    },

    // Validation
    postValidation () {
      return postService.validation()
    },
    createPost (target) {
      postService.create(target, this)
    },
    updatePost (target) {
      postService.update(target, this)
    },
    upload () {
      this.$refs['hidden-button'].click()
    },
    changeFile (e) {
      this.image = e.target.files[0]
      if (this.image) {
        let reader = new FileReader()
        reader.readAsDataURL(this.image)
        reader.onload = e => {
          this.imagePreview = e.target.result
        }
      }
    },
    removeImage () {
      this.imagePreview = ''
      this.$refs['hidden-button'].value = ''
      this.image = ''
    }
  }
}
</script>

<style scoped>
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
