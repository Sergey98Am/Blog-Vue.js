import * as userService from '../../../services/user.service'

export default {
  data () {
    return {
      isLoading: false,
      message: '',
      user: {
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    userDetails () {
      return this.$store.getters.get_user
    }
  },
  methods: {
    userValidation () {
      return userService.userValidation()
    },
    changeUserDetails (user) {
      userService.changeDetails(this, user)
    }
  }
}
