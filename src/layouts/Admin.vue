<template>
  <div class="admin">
    <div v-if="$can('view_admin_dashboard')" class="a d-flex flex-column">
      <v-menu></v-menu>
      <div class="main">
        <router-view></router-view>
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
import authAxios from '../../config/authAxios'

export default {
  components: {
    'v-menu': Menu
  },
  data () {
    return {
      isLoading: false
    }
  },
  watch: {
    $route: {
      handler () {
        this.isLoading = true
        authAxios.get('/abilities').then(response => {
          this.isLoading = false
          let abilities = response.data.permissions
          if (abilities.includes('view_admin_dashboard')) {
            this.$ability.update([
              {subject: 'all', action: response.data.permissions}
            ])
          } else {
            this.$router.push('/')
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style>
.is-invalid {
  border-color: #dc3545 !important;
}

.admin {
  /*background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/images/adminBackground.jpg');*/
  /*background-size: cover;*/
  /*background-attachment: fixed;*/
  min-height: 100vh;
}

/* Loader */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh
}

.spinner-border {
  width: 15px;
  height: 15px;
  display: none;
}

.icon {
  pointer-events: none;
}

.main {
  overflow: auto;
  height: calc(100vh - 41px);
  padding-top: 25px;
  margin-top: 41px;
  margin-left: 250px;
}

.title {
  color: #000000;
}

.create {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.create button {
  padding: 10px;
  border: 2px solid #ffffff;
  border-radius: 7px;
  margin-bottom: 10px;
  background: #3b3b40;
  color: #ffffff;
  font-weight: bold;
}

input {
  border: none !important;
  border-bottom: 3px solid #000000 !important;
  background: none !important;
}

input:focus {
  background: none;
  box-shadow: none !important;
}

input:read-only {
  background-color: lightgrey;
  color: #060240;
}

.modal {
  z-index: 9999;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
}

.close {
  color: #ffffff !important;
}

.modal-title {
  color: #000000;
}

label {
  color: #000000;
}

.modal button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}

.create-button {
  background: #3b3b40;
  color: #ffffff;
}

.update-button {
  background: #3b3b40;
  color: #ffffff;
}

.multiselect__tags {
  background: #000000;
}

.multiselect__placeholder {
  color: #ffffff;
}

.multiselect__content-wrapper {
  background: #000000;
  color: #ffffff;
}

.multiselect__option--selected {
  background: #000000;
  color: #ffffff;
}

.multiselect__option--highlight {
  background: #313030;
  color: #ffffff;
}

.multiselect__option--highlight::after {
  background: #313030;
}

.multiselect__tag {
  background: #ffffff;
  color: #000000;
}

.multiselect__tag-icon:hover {
  background: #000000;
}

.table {
  text-align: center;
}

thead {
  background: #3b3b40;
  color: #ffffff;
}

tbody {
  background: #eae7e2;
  color: #3b3b40;
  font-weight: 600;
}

.table button {
  width: 100px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin: 2px;
}

.edit {
  background: #3b3b40;
  color: #ffffff;
}

.delete {
  background: red;
  color: #ffffff;
}

.actions {
  text-align: right;
}

.pagination > .active > a {
  background: #08162d;
  color: #ffffff !important;
}

.pagination > li > a {
  display: block;
  padding: 6px 12px;
  background: #2e415e;
  color: #ffffff !important;
  text-decoration: none;
  outline: none;
}

.pagination > .active > a:hover {
  font-weight: bold;
}

@media (max-width: 991px) {
  .main {
    margin-left: 0;
    margin-top: 100px;
  }
}
</style>
