<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as CheckToken from './services/check-token.service'

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
  position: relative;
}

/* Modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
