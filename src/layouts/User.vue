<template>
  <div class="user" style="height: 100%">
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
