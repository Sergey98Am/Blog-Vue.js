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
<style src="./menu.css" scoped></style>
