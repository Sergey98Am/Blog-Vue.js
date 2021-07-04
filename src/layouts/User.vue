<template>
  <div class="user">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/UserNavbar'

export default {
  components: {Navbar}
}
</script>

<style>
.user {
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../assets/images/background.jpg');
  background-size: cover;
  background-attachment: fixed;
}
</style>
