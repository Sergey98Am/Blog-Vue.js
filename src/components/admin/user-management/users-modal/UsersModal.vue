<template>
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
</template>

<script src="./users-modal.component.js"></script>
