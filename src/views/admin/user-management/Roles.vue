<template>
  <div class="roles">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="isLoading" class="loading">
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
            <h1 class="title"><i><b>Roles</b></i></h1>
            <div v-if="$can('role_create')" class="create">
              <button type="button" @click="openModal">
                Create New Role
              </button>
            </div>
            <div class="role-table">
              <table class="table">
                <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Permissions</th>
                  <th scope="col" class="actions">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="role in displayedRoles" :key="role.id">
                  <td>{{ role.title }}</td>
                  <td class="permissions">
                <span v-for="permission in role.permissions" :key="permission.id">
                  {{ permission.title }}
                </span>
                  </td>
                  <td class="actions">
                    <button v-if="$can('role_edit')" type="button" class="edit" @click="editModal(role)">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'edit']"/>
                  </span>
                      Edit
                    </button>
                    <button v-if="$can('role_delete')" class="delete" @click="deleteRole($event.target, role.id)">
                      <div class="spinner-border text-light delete-loader" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                      <span class="icon">
                    <font-awesome-icon :icon="['fas', 'trash']"/>
                  </span>
                      Delete
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-12">
          <paginate v-model="page" :page-count="pageCount" :page-range="3"
                    :margin-pages="1" :prev-text="'Prev'" :next-text="'Next'"
                    :container-class="'pagination'" :page-class="'page-item'"
                    :hide-prev-next="true"></paginate>
        </div>
      </div>
    </div>
    <modal :roles="roles" :permissions="permissions" ref="roles-modal"></modal>
  </div>
</template>

<script>
import rolesModal from '@/components/admin/user-management/RolesModal.vue'
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
</script>

<style scoped>
.loading {
  min-height: 70vh;
}

.role-table {
  overflow-x: auto;
}

.permissions span {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 3px;
  background: #3b3b40;
  color: #ffffff;
  font-size: 13px;
}
</style>
