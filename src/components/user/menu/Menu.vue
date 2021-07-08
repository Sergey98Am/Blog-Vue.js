<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <router-link class="navbar-brand" to="/">Blog</router-link>
    <button @click="toggle" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div :class="{ toggled: isToggled }" class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/all-posts">Posts</router-link>
        </li>
        <li v-if="loggedIn" class="nav-item">
          <router-link class="nav-link" to="/posts">My Posts</router-link>
        </li>
      </ul>
      <ul v-if="loggedIn" class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <router-link tag="button" class="profile-button" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item">
          <button @click="LogoutRequest" class="logout">Logout</button>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script src="./menu.component.js"></script>
<style src="./menu.css" scoped></style>
