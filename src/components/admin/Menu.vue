<template>
  <div class="menu">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <router-link to="/admin" class="navbar-brand">
        <b><i>Admin Panel</i></b>
      </router-link>
      <button @click="toggle" class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav ml-auto navbar-menu flex-row">
        <li class="nav-item text-nowrap">
          <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item text-nowrap">
          <a @click="LogoutRequest" class="nav-link">Logout</a>
        </li>
      </ul>
    </nav>
    <div class="sidebar" :class="{ toggled: isToggled }">
      <div class="sidebar-menu">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link to="/admin" class="nav-link active" href="#">
              <font-awesome-icon :icon="['fas', 'tachometer-alt']"/>
              Dashboard
            </router-link>
          </li>
          <li v-if="$can('user_management_access')" class="nav-item sidebar-dropdown dropdown-show">
            <a @click="toggleOn" class="nav-link">
              <span>
                <font-awesome-icon :icon="['fas', 'users']"/>
                User Management
              </span>
              <font-awesome-icon :icon="['fas', 'chevron-down']"/>
            </a>
            <div class="sidebar-dropdown-menu" :class="{ 'toggled-on': toggleOnOff }">
              <router-link v-if="$can('permission_access')" @click.native="toggleDropdownItem" to="/admin/permissions"
                           class="d-block">
                <font-awesome-icon :icon="['fas', 'unlock-alt']"/>
                Permissions
              </router-link>
              <router-link v-if="$can('role_access')" to="/admin/roles" @click.native="toggleDropdownItem" class="d-block">
                <font-awesome-icon :icon="['fas', 'suitcase']"/>
                Roles
              </router-link>
              <router-link v-if="$can('user_access')" to="/admin/users" @click.native="toggleDropdownItem" class="d-block">
                <font-awesome-icon :icon="['fas', 'user']"/>
                Users
              </router-link>
            </div>
          </li>
          <li class="nav-link">
            <router-link v-if="$can('permission_access')" @click.native="toggleDropdownItem" to="/admin/posts"
                         class="d-block">
              Posts
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as authService from '../../services/authService'

export default {
  name: 'Menu',
  data () {
    return {
      isToggled: false,
      toggleOnOff: false
    }
  },
  methods: {
    toggle () {
      this.isToggled = !this.isToggled
    },
    toggleDropdownItem () {
      this.isToggled = false
      this.toggleOnOff = false
    },
    toggleOn () {
      this.toggleOnOff = !this.toggleOnOff
    },
    LogoutRequest () {
      authService.logout(this)
    }
  }
}
</script>

<style scoped>
.nav-item:first-child {
  margin-right: 10px;
}

/* Menu */
.menu a {
  color: #ffffff !important;
  cursor: pointer;
}

.navbar {
  z-index: 9999;
  padding: 5px 15px;
  border-bottom: 1px solid white;
  margin-bottom: 0;
  background: #242424;
}

.navbar-toggler {
  background: #ffffff;
}

.toggled {
  left: 0 !important;
}

.sidebar {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  padding: 60px 0 0;
  background: #242424;
  transition: 0.5s;
}

.sidebar-menu {
  overflow: auto;
  height: calc(100vh - 48px);
  text-align: start;
}

.sidebar-dropdown-menu {
  overflow: hidden;
  max-height: 0;
  transition: max-height .3s;
}

.sidebar-dropdown a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.sidebar-dropdown-menu a {
  padding: 5px 5px 5px 25px;
  text-decoration: none;
}

.toggled-on {
  max-height: 10em;
}

@media (max-width: 991px) {
  .navbar {
    padding: 10px !important;
  }

  .navbar-menu {
    flex-basis: 100%;
  }

  .navbar-brand {
    width: 200px;
  }

  .sidebar {
    width: 100%;
    left: -100%;
    padding: 100px 0 0;
  }
}
</style>
