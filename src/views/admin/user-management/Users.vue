<template>
  <div class="users">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="isLoading" class="loading">
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
            <h1 class="title"><i><b>Users</b></i></h1>
            <div v-if="$can('user_create')" class="create">
              <button type="button" @click="newModal">
                Create New User
              </button>
            </div>
            <div class="user-table">
              <table class="table">
                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Email Verified</th>
                  <th scope="col">Role</th>
                  <th scope="col" class="actions">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in displayedUsers" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.email_verified_at ? 'Yes' : 'No' }}</td>
                  <td>{{ user.role.title }}</td>
                  <td class="actions">
                    <button v-if="$can('user_edit')" type="button" class="edit" @click="editModal(user)">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'edit']"/>
                  </span>
                      Edit
                    </button>
                    <button v-if="$can('user_delete')" class="delete" @click="deleteUser($event.target, user.id)">
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
              <h5 v-if="editMode" class="modal-title">Edit User</h5>
              <h5 v-else class="modal-title">Create User</h5>
              <button type="button" class="close" @click="closeModal">
                <span>&times;</span>
              </button>
            </div>
            <div class="form">
              <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control"
                         id="name"
                         name="name"
                         v-model="form.name"
                         v-validate="userValidation().name"
                         :class="{ 'is-invalid':errors.has('name') }">
                  <div class="invalid-feedback">
                    <span v-if="errors.has('name')">{{ errors.first('name') }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control"
                         id="email"
                         name="email"
                         v-model="form.email"
                         ref="email"
                         v-validate="userValidation().email"
                         :class="{ 'is-invalid':errors.has('email') }">
                  <div class="invalid-feedback">
                    <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
                  </div>
                </div>
                <div v-if="!editMode" class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control"
                         id="password"
                         name="password"
                         v-model="form.password"
                         v-validate="userValidation().password"
                         :class="{ 'is-invalid':errors.has('password') }">
                  <div class="invalid-feedback">
                    <span v-if="errors.has('password')">{{ errors.first('password') }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="role_id">Role</label>
                  <select class="form-control"
                          id="role_id"
                          name="role_id"
                          v-model="form.role_id"
                          v-validate="userValidation().role_id"
                          :class="{ 'is-invalid':errors.has('role_id') }"
                          ref="role">
                    <option value="">Select Role</option>
                    <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.title }}</option>
                  </select>
                  <div class="invalid-feedback">
                    <span v-if="errors.has('role_id')">{{ errors.first('role_id') }}</span>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="close-button btn btn-secondary" @click="closeModal">Close</button>
                <button v-if="editMode" class="update-button btn btn-dark" @click="updateUser($event.target)">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'pen-alt']"/>
                  </span>
                  <div class="spinner-border text-light edit-loader" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  Update
                </button>
                <button v-else class="create-button btn btn-dark" @click="createUser($event.target)">
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
import * as userService from '../../../services/admin/userService'
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
      roles: [],
      users: [],
      form: {
        id: '',
        name: '',
        email: '',
        password: '',
        role_id: ''
      }
    }
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
    // Modal Settings
    newModal () {
      this.editMode = false
      this.modal = true
    },
    editModal (user) {
      this.editMode = true
      let form = this.$data.form
      Object.keys(form).forEach(function (item) {
        form[item] = user[item]
      })
      this.$refs.email.setAttribute('readonly', 'readonly')
      this.modal = true
    },
    closeModal () {
      this.modal = false
      this.$validator.reset()
      let form = this.$data.form
      Object.keys(form).forEach(function (item) {
        form[item] = ''
      })
      this.$refs.email.removeAttribute('readonly')
    },

    // Validation
    userValidation () {
      return userService.validation()
    },

    // CRUD
    getUsers () {
      userService.get(this)
    },
    createUser (target) {
      userService.create(target, this)
    },
    updateUser (target) {
      userService.update(target, this)
    },
    deleteUser (target, id) {
      userService.destroy(target, id, this)
    }
  }
}
</script>

<style>
.loading {
  min-height: 70vh;
}

.user-table {
  overflow-x: auto;
}
</style>
