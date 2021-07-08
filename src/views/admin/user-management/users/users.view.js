import usersModal from '@/components/admin/user-management/users-modal/UsersModal.vue'
import * as userService from '@/services/admin/user-management/user.service'
import * as Pagination from '@/pagination'

export default {
  data () {
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      pageSize: 4,
      users: [],
      roles: []
    }
  },
  components: {
    'modal': usersModal
  },
  computed: {
    displayedUsers () {
      return Pagination.paginate(this, this.users)
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    openModal () {
      this.$refs['users-modal'].newModal()
    },
    editModal (user) {
      this.$refs['users-modal'].editModal(user)
    },
    getUsers () {
      userService.get(this)
    },
    deleteUser (target, id) {
      userService.destroy(target, id, this)
    }
  }
}
