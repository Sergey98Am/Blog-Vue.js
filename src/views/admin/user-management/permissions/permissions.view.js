import permissionsModal from '@/components/admin/user-management/permissions-modal/PermissionsModal.vue'
import * as permissionService from '@/services/admin/user-management/permission.service'
import * as Pagination from '../../../../pagination'

export default {
  data () {
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      pageSize: 4,
      permissions: []
    }
  },
  components: {
    'modal': permissionsModal
  },
  computed: {
    displayedPermissions () {
      return Pagination.paginate(this, this.permissions)
    }
  },
  mounted () {
    this.getPermissions()
  },
  methods: {
    openModal () {
      this.$refs['permissions-modal'].newModal()
    },
    editModal (permission) {
      this.$refs['permissions-modal'].editModal(permission)
    },
    getPermissions () {
      permissionService.get(this)
    },
    deletePermission (target, id) {
      permissionService.destroy(target, id, this)
    }
  }
}
