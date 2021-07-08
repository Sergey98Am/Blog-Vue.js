import * as authService from '../../../../services/auth.service'

export default {
  data () {
    return {
      isLoading: false,
      recaptcha: null,
      recaptchaError: '',
      email: '',
      password: '',
      remember_me: ''
    }
  },
  methods: {
    loginValidation () {
      return authService.loginValidation()
    },
    loginRequest () {
      authService.login(this)
    }
  }
}
