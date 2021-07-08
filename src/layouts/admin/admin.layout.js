import Menu from '@/components/admin/menu/Menu.vue'
import authAxios from '../../../config/authAxios'

export default {
  components: {
    'admin-menu': Menu
  },
  data () {
    return {
      isLoading: false
    }
  },
  watch: {
    $route: {
      handler () {
        this.isLoading = true
        authAxios.get('/admin/abilities').then(response => {
          this.isLoading = false
          let abilities = response.data.permissions
          if (abilities.includes('view_admin_dashboard')) {
            this.$ability.update([
              {subject: 'all', action: response.data.permissions}
            ])
          } else {
            this.$router.push('/')
          }
        })
      },
      immediate: true
    }
  }
}
