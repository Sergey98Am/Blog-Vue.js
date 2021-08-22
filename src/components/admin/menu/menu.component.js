import * as authService from '@/services/auth.service'
import notifications from '@/components/admin/menu/notifications/Notifications.vue'

export default {
  name: 'Menu',
  data () {
    return {
      isToggled: false,
      toggleOnOff: false
    }
  },
  components: {
    'admin-notifications': notifications
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
    toggleDropdownItem () {
      this.isToggled = false
      this.toggleOnOff = false
    },
    toggleOn () {
      this.toggleOnOff = !this.toggleOnOff
    },
    LogoutRequest () {
      this.isToggled = false
      authService.logout(this)
    }
  }
}
