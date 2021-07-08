<template>
  <div class="users">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="isLoading" class="loading">
            <div class="spinner-grow text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
            <h1 class="title"><i><b>Users</b></i></h1>
            <div v-if="$can('user_create')" class="create">
              <button type="button" @click="openModal">
                Create New User
              </button>
            </div>
            <div class="user-table">
              <table class="table">
                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col" class="actions">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in displayedUsers" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
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
    <modal :users="users" :roles="roles" ref="users-modal"></modal>
  </div>
</template>

<script src="./users.view.js"></script>

<style>
.loading {
  min-height: 70vh;
}

.user-table {
  overflow-x: auto;
}
</style>
