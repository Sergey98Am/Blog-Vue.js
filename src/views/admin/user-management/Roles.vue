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
            <div class="create">
              <button type="button" @click="newModal">
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
                    <button type="button" class="edit" @click="editModal(role)">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'edit']"/>
                  </span>
                      Edit
                    </button>
                    <button class="delete" @click="deleteRole($event.target, role.id)">
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

    <!-- Modal -->
    <transition name="fade">
      <div class="modal" style="display: block" v-show="modal" @click.self="closeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="editMode" class="modal-title">Edit Role</h5>
              <h5 v-else class="modal-title">Create Role</h5>
              <button type="button" class="close" @click="closeModal">
                <span>&times;</span>
              </button>
            </div>
            <div class="form">
              <div class="modal-body">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" class="form-control"
                         id="title"
                         name="title"
                         v-model="title"
                         v-validate="roleValidation().title"
                         :class="{ 'is-invalid':errors.has('title') }">
                  <div class="invalid-feedback">
                    <span v-if="errors.has('title')">{{ errors.first('title') }}</span>
                  </div>
                </div>
                <div>
                  <multiselect placeholder="Select Permission(s)" :multiple="true"
                               :options="permissions.map(permission => permission.id)"
                               :custom-label="opt => permissions.find(permission => permission.id === opt).title"
                               v-model="selectedPermissions"></multiselect>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="close-button btn btn-secondary" @click="closeModal">Close</button>
                <button v-if="editMode" class="update-button btn btn-dark" @click="updateRole($event.target)">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'pen-alt']"/>
                  </span>
                  <div class="spinner-border text-light edit-loader" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  Update
                </button>
                <button v-else class="create-button btn btn-dark" @click="createRole($event.target)">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'plus']"/>
                  </span>
                  <div class="spinner-border text-light create-loader" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- End Modal -->
  </div>
</template>

<script>
import * as roleService from '../../../services/admin/roleService'
import * as Pagination from '../../../pagination'

export default {
  data () {
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      pageSize: 4,
      modal: false,
      editMode: false,
      selectedPermissions: [],
      permissions: [],
      roles: [],
      id: '',
      title: ''
    }
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
    // Modal Settings
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

    // Validation
    roleValidation () {
      return roleService.validation()
    },

    // CRUD
    getRoles () {
      roleService.get(this)
    },
    createRole (target) {
      roleService.create(target, this)
    },
    updateRole (target) {
      roleService.update(target, this)
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
