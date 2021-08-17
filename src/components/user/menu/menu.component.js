import * as authService from '@/services/auth.service'
import notifications from '@/components/user/menu/notifications/Notifications.vue'

export default {
  data () {
    return {
      isToggled: false,
      toggleOnOff: false
    }
  },
  components: {
    'user-notifications': notifications
  },
  computed: {
    loggedIn () {
      return this.$store.getters.get_loggedIn
    },
    onToggle () {
      return {
        'toggle-on': this.toggleOnOff
      }
    },
    subMenu () {
      return this.toggleOnOff ? 'toggled-on' : false
    },
    ariaExpanded () {
      return !this.toggleOnOff ? 'false' : 'true'
    }
  },
  mounted () {
    this.dropdownSettings()
  },
  methods: {
    toggle () {
      this.isToggled = !this.isToggled
    },
    toggleOn (e) {
      this.toggleOnOff = !this.toggleOnOff
    },
    dropdownSettings () {

    },
    LogoutRequest () {
      this.isToggled = false
      authService.logout(this)
    }
  }
}
