<template>
  <div class="menu">
    <nav class="navbar fixed-top navbar-dark navbar-expand-lg">
      <router-link to="/admin" class="navbar-brand">
        <b><i>Admin Panel</i></b>
      </router-link>
      <div class="d-flex flex-row order-2 order-lg-3">
        <ul class="navbar-nav flex-row">
          <admin-notifications v-if="loggedIn && $store.getters.get_renderNotifications"></admin-notifications>
          <li class="nav-item dropdown">
            <a class="nav-link px-2 dropdown-toggle removed-dropdown-toggle" id="navbarDropdown" role="button"
               data-toggle="dropdown" aria-haspopup="true" :aria-expanded="false">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'caret-square-down']"/>
            </span>
            </a>
            <div v-if="loggedIn" class="dropdown-menu dropdown-list dropdown-menu-right">
              <router-link @click.native="isToggled = false" tag="button" class="dropdown-item" to="/profile">Profile
              </router-link>
              <button @click="LogoutRequest" class="dropdown-item">Logout</button>
            </div>
            <div v-else class="dropdown-menu dropdown-list dropdown-menu-right">
              <router-link @click.native="isToggled = false" tag="button" class="dropdown-item" to="/login">Login
              </router-link>
              <router-link @click.native="isToggled = false" tag="button" class="dropdown-item" to="/register">
                Register
              </router-link>
            </div>
          </li>
        </ul>
        <button @click="toggle" class="navbar-toggler" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div :class="{ toggled: isToggled }" class="collapse navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
      </div>
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
              <router-link v-if="$can('role_access')" to="/admin/roles" @click.native="toggleDropdownItem"
                           class="d-block">
                <font-awesome-icon :icon="['fas', 'suitcase']"/>
                Roles
              </router-link>
              <router-link v-if="$can('user_access')" to="/admin/users" @click.native="toggleDropdownItem"
                           class="d-block">
                <font-awesome-icon :icon="['fas', 'user']"/>
                Users
              </router-link>
            </div>
          </li>
          <li class="nav-link">
            <router-link v-if="$can('post_access')" @click.native="isToggled = false" to="/admin/posts"
                         class="d-block">
              Posts
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./menu.component.js"></script>
<style src="./menu.css"></style>
