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
