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
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <router-link tag="button" class="profile-button" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item">
          <button class="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  data () {
    return {
      isToggled: false
    }
  },
  methods: {
    toggle () {
      this.isToggled = !this.isToggled
    }
  }
}
</script>

<style scoped>
.navbar {
  background: #393939;
}

a {
  color: #ffffff !important;
}

button {
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
}

.profile-button {
  background: #55555f;
  color: #ffffff;
  margin-right: 5px;
}

.logout {
  background: #ffffff;
  color: #314666;
}

.toggled {
  display: block;
}

@media (max-width: 991px) {
  .navbar-nav {
    align-items: center;
  }

  .navbar-nav li:first-child {
    margin-bottom: 10px;
  }
}
</style>
