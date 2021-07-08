import * as authService from '../../../../services/auth.service'

export default {
  data () {
    return {
      isLoading: false,
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember_me: false
      }
    }
  },
  methods: {
    registerValidation () {
      return authService.registerValidation()
    },
    registerRequest () {
      authService.register(this)
    }
  }
}
