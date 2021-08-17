<template>
  <button @click="force">fd</button>
</template>

<script>
export default {
  props: [
    'forceUpdate'
  ],
  methods: {
    force () {
      this.forceUpdate()
    }
  }
}
</script>
