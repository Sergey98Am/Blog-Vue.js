<template>
  <div class="roles">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="isLoading" class="loading">
            <div class="spinner-grow text-light" role="status">
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
                <tr v-for="role in roles.data" :key="role.id">
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
          <pagination :limit="2" :data="roles" @pagination-change-page="getResults"></pagination>
        </div>
      </div>
    </div>
    <modal :roles="roles" :permissions="permissions" :getResults="getResults" ref="roles-modal"></modal>
  </div>
</template>

<script src="./roles.view.js"></script>

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
  background: #6a6fc5;
  color: #ffffff;
  font-size: 13px;
}
</style>
