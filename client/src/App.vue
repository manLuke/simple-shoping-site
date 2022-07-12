<template>
  <navbar />
  <router-view id="page"/>
</template>

<script setup lang="ts">
import navbar from './components/navbar.vue'
import { useProductsStore } from './stores/products'
import { onBeforeMount } from 'vue'

// pinia
const store = useProductsStore();

onBeforeMount(() => store.getProductsFromAPI());
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {

  background-color: #ebebeb;
  }

#app {
  font-family: "Inter", -apple-system, "BlinkMacSystemFont", "San Francisco", "Segoe UI", "Helvetica Neue", "Liberation Sans", Roboto, sans-serif;
}

#page {
  padding: 15vh 0 5vh 0;
}

</style>