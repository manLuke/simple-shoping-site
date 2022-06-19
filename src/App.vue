<template>
  <navbar />
</template>

<script>
import navbar from './components/navbar.vue'

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
