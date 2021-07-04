<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as CheckToken from './services/checkToken'

export default {
  name: 'App',
  mounted () {
    CheckToken.checkToken(this)
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
*, *:before, *:after {
  box-sizing: border-box;
}

input:focus {
  background: none !important;
}

input.form-control:focus, textarea.form-control:focus  {
  outline: 0 !important;
  -webkit-appearance:none !important;
  box-shadow: none !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #E0DEDE;
  position: relative;
}
</style>
