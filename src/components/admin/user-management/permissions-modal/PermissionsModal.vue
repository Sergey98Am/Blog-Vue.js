<template>
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
</template>

<script src="./permissions-modal.js"></script>
