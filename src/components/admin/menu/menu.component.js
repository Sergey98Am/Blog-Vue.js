import * as authService from '@/services/auth.service'

export default {
  name: 'Menu',
  data () {
    return {
      isToggled: false,
      toggleOnOff: false
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
      this.isToggled = false;
      authService.logout(this)
    }
  }
}
