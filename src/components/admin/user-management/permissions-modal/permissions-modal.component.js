import * as permissionService from '@/services/admin/user-management/permission.service'

export default {
  props: [
    'permissions'
  ],
  data () {
    return {
      isLoading: false,
      modal: false,
      editMode: false,
      id: '',
      title: ''
    }
  },
  methods: {
    // Modal Settings
    newModal () {
      this.editMode = false
      this.modal = true
    },
    editModal (permission) {
      this.editMode = true
      this.id = permission.id
      this.title = permission.title
      this.modal = true
    },
    closeModal () {
      this.modal = false
      this.$validator.reset()
      this.id = ''
      this.title = ''
    },
    // Validation
    permissionValidation () {
      return permissionService.validation()
    },
    createPermission (target) {
      permissionService.create(target, this)
    },
    updatePermission (target) {
      permissionService.update(target, this)
    }
  }
}
