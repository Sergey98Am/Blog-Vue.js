<template>
  <div class="admin">
    <div v-if="$can('view_admin_dashboard')" class="a d-flex flex-column">
      <v-menu></v-menu>
      <div class="main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-else>
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../components/AdminMenu'

export default {
  components: {
    'v-menu': Menu
  }
}
</script>
