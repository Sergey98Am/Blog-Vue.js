<template>
  <nav class="navbar fixed-top navbar-dark navbar-expand-lg">
    <router-link class="navbar-brand" to="/">Blog</router-link>
    <div class="d-flex flex-row order-2 order-lg-3">
      <ul class="navbar-nav flex-row">
        <user-notifications v-if="loggedIn && $store.getters.get_renderNotifications"></user-notifications>
        <li class="nav-item dropdown">
          <a class="nav-link px-2 dropdown-toggle removed-dropdown-toggle" id="navbarDropdown" role="button"
             data-toggle="dropdown" aria-haspopup="true" :aria-expanded="false">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'caret-square-down']"/>
            </span>
          </a>
          <div v-if="loggedIn" class="dropdown-menu dropdown-list dropdown-menu-right">
            <router-link @click.native="isToggled = false" tag="button" class="dropdown-item" to="/profile">Profile</router-link>
            <button @click="LogoutRequest" class="dropdown-item">Logout</button>
          </div>
          <div v-else class="dropdown-menu dropdown-list dropdown-menu-right">
            <router-link @click.native="isToggled = false" tag="button" class="dropdown-item" to="/login">Login</router-link>
            <router-link @click.native="isToggled = false" tag="button" class="dropdown-item" to="/register">Register</router-link>
          </div>
        </li>
      </ul>
      <button @click="toggle" class="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div :class="{ toggled: isToggled }" class="collapse navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link @click.native="isToggled = false" class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link @click.native="isToggled = false" class="nav-link" to="/all-posts">Posts</router-link>
        </li>
        <li v-if="loggedIn" class="nav-item">
          <router-link @click.native="isToggled = false" class="nav-link" to="/posts">My Posts</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script src="./menu.component.js"></script>
<style src="./menu.css"></style>
