import * as postService from '@/services/post.service'

export default {
  props: [
    'postOrPosts',
    'getResults'
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
      noImage: require('@/assets/images/no-image.jpg'),
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
      this.$refs['hidden-button'].value = ''
      let onePost = this.$store.getters.get_one_post
      if (onePost) {
        this.$store.dispatch('onePostIsFalse')
      }
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
