import rolesModal from '@/components/admin/user-management/roles-modal/RolesModal.vue'
import * as roleService from '@/services/admin/roleService'
import * as Pagination from '@/pagination'

export default {
  data () {
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      pageSize: 4,
      roles: [],
      permissions: []
    }
  },
  components: {
    'modal': rolesModal
  },
  computed: {
    displayedRoles () {
      return Pagination.paginate(this, this.roles)
    }
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
    }
  }
}
