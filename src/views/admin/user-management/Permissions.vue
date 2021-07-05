<template>
  <div class="permissions">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="isLoading" class="loading">
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
            <h1 class="title"><i><b>Permissions</b></i></h1>
            <div v-if="$can('permission_create')" class="create">
              <button type="button" @click="newModal">
                Create New Permission
              </button>
            </div>
            <div class="permission-table">
              <table class="table">
                <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col" class="actions">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="permission in displayedPermissions" :key="permission.id">
                  <td>{{ permission.title }}</td>
                  <td class="actions">
                    <button v-if="$can('permission_edit')" type="button" class="edit" @click="editModal(permission)">
                      <font-awesome-icon :icon="['fas', 'edit']"/>
                      Edit
                    </button>
                    <button v-if="$can('permission_delete')" class="delete"
                            @click="deletePermission($event.target, permission.id)">
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
              <h5 v-if="editMode" class="modal-title">Edit Permission</h5>
              <h5 v-else class="modal-title">Create Permission</h5>
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
                         v-validate="permissionValidation().title"
                         :class="{ 'is-invalid':errors.has('title') }">
                  <div class="invalid-feedback">
                    <span v-if="errors.has('title')">{{ errors.first('title') }}</span>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="close-button btn btn-secondary" @click="closeModal">Close</button>
                <button v-if="editMode" class="update-button" @click="updatePermission($event.target)">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'pen-alt']"/>
                  </span>
                  <div class="spinner-border text-light edit-loader" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  Update
                </button>
                <button v-else class="create-button" @click="createPermission($event.target)">
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
import * as permissionService from '../../../services/admin/permissionService'
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
      permissions: [],
      id: '',
      title: ''
    }
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

    // CRUD
    getPermissions () {
      permissionService.get(this)
    },
    createPermission (target) {
      permissionService.create(target, this)
    },
    updatePermission (target) {
      permissionService.update(target, this)
    },
    deletePermission (target, id) {
      permissionService.destroy(target, id, this)
    }
  }
}
</script>

<style scoped>
.loading {
  min-height: 70vh;
}

.permission-table {
  overflow-x: auto;
}
</style>
