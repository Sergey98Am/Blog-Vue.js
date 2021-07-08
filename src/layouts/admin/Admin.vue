<template>
  <div class="admin">
    <div v-if="$can('view_admin_dashboard')" class="a d-flex flex-column">
      <admin-menu></admin-menu>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
    <div class="loading" v-else>
      <div class="spinner-grow text-light" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script src="./admin.layout.js"></script>
<style src="./admin.css"></style>
