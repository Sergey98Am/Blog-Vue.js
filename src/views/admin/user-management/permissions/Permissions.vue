<template>
  <div class="permissions">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="isLoading" class="loading">
            <div class="spinner-grow text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
            <h1 class="title"><i><b>Permissions</b></i></h1>
            <div v-if="$can('permission_create')" class="create">
              <button type="button" @click="openModal">
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
                <tr v-for="permission in permissions.data" :key="permission.id">
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
          <pagination :limit="2" :data="permissions" @pagination-change-page="getResults"></pagination>
        </div>
      </div>
    </div>
    <modal :permissions="permissions" :getResults="getResults" ref="permissions-modal"></modal>
  </div>
</template>

<script src="./permissions.view.js"></script>

<style scoped>
.loading {
  min-height: 70vh;
}

.permission-table {
  overflow-x: auto;
}
</style>
