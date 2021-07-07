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
.is-invalid {
  border-color: #dc3545 !important;
}

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

.user {
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('../assets/images/background.jpg');
  background-size: cover;
  background-attachment: fixed;
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

input, textarea {
  border: none !important;
  border-bottom: 3px solid #000000 !important;
  background: none !important;
}

input:focus {
  background: none;
  box-shadow: none !important;
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
</style>
