import permissionsModal from '@/components/admin/user-management/permissions-modal/PermissionsModal.vue'
import * as permissionService from '@/services/admin/user-management/permission.service'
import authAxios from '../../../../../config/authAxios'

export default {
  data () {
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      pageSize: 4,
      permissions: {}
    }
  },
  components: {
    'modal': permissionsModal
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
    },
    getResults (page = 1) {
      authAxios.get('/admin/permissions?page=' + page)
        .then(response => {
          this.permissions = response.data.permissions
        })
    }
  }
}
