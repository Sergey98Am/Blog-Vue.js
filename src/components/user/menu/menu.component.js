import * as authService from '@/services/auth.service'

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
      this.isToggled = false;
      authService.logout(this)
    }
  }
}
