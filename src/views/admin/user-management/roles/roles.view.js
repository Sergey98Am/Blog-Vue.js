import rolesModal from '@/components/admin/user-management/roles-modal/RolesModal.vue'
import * as roleService from '@/services/admin/user-management/role.service'
import authAxios from '../../../../../config/authAxios'

export default {
  data () {
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      pageSize: 4,
      roles: {},
      permissions: []
    }
  },
  components: {
    'modal': rolesModal
  },
  mounted () {
    this.getRoles()
  },
  methods: {
    openModal () {
      this.$refs['roles-modal'].newModal()
    },
    editModal (role) {
      this.$refs['roles-modal'].editModal(role)
    },
    getRoles () {
      roleService.get(this)
    },
    deleteRole (target, id) {
      roleService.destroy(target, id, this)
    },
    getResults (page = 1) {
      authAxios.get('/admin/roles?page=' + page)
        .then(response => {
          this.roles = response.data.roles
        })
    }
  }
}
