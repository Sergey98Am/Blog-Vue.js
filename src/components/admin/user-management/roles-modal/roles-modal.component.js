import * as roleService from '@/services/admin/user-management/role.service'

export default {
  props: [
    'roles',
    'permissions',
    'getResults'
  ],
  data () {
    return {
      isLoading: false,
      modal: false,
      editMode: false,
      selectedPermissions: [],
      id: '',
      title: ''
    }
  },
  methods: {
    newModal () {
      this.editMode = false
      this.modal = true
    },
    editModal (role) {
      this.editMode = true
      this.id = role.id
      this.title = role.title
      this.selectedPermissions = role.permissions.map(permission => permission.id)
      this.modal = true
    },
    closeModal () {
      this.modal = false
      this.$validator.reset()
      this.id = ''
      this.title = ''
      this.selectedPermissions = []
    },
    roleValidation () {
      return roleService.validation()
    },
    createRole (target) {
      roleService.create(target, this)
    },
    updateRole (target) {
      roleService.update(target, this)
    }
  }
}
