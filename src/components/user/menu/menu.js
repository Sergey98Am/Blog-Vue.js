import * as authService from '@/services/authService'

export default {
  data () {
    return {
      isToggled: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.get_loggedIn
    }
  },
  methods: {
    toggle () {
      this.isToggled = !this.isToggled
    },
    LogoutRequest () {
      authService.logout(this)
    }
  }
}
