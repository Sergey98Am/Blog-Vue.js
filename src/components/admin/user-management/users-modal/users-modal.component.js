import * as userService from '@/services/admin/user-management/user.service'

export default {
  props: [
    'users',
    'roles',
    'getResults'
  ],
  data () {
    return {
      isLoading: false,
      modal: false,
      editMode: false,
      form: {
        id: '',
        name: '',
        email: '',
        password: '',
        role_id: ''
      }
    }
  },
  methods: {
    newModal () {
      this.editMode = false
      this.modal = true
    },
    editModal (user) {
      this.editMode = true
      let form = this.$data.form
      Object.keys(form).forEach(function (item) {
        form[item] = user[item]
      })
      this.$refs.email.setAttribute('readonly', 'readonly')
      this.modal = true
    },
    closeModal () {
      this.modal = false
      this.$validator.reset()
      let form = this.$data.form
      Object.keys(form).forEach(function (item) {
        form[item] = ''
      })
      this.$refs.email.removeAttribute('readonly')
    },
    createUser (target) {
      userService.create(target, this)
    },
    updateUser (target) {
      userService.update(target, this)
    },
    userValidation () {
      return userService.validation()
    }
  }
}
