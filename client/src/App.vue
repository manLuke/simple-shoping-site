<template>
  <navbar />
  <router-view id="page"/>
</template>

<script>
import navbar from './components/navbar.vue'

export default {
  name: 'app',
  components: {
    navbar
  },
  beforeCreate () {
    this.$store.dispatch('getProductsFromAPI')
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {

  background-color: rgb(207, 207, 207);
  }

#app {
  font-family: "Inter", -apple-system, "BlinkMacSystemFont", "San Francisco", "Segoe UI", "Helvetica Neue", "Liberation Sans", Roboto, sans-serif;
}

#page {
  padding: 15vh 0 5vh 0;
}

</style>
