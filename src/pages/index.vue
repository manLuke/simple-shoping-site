<template>
<div class="index">
    <h2>Vyberte si z našeho zboží.</h2>
    <div class="mainPage">
      <div class="mainPage-products">
        <singleProduct v-for="item in getAllProducts" :key="item.id" :product="item"/>
      </div>
    </div>
</div>
</template>

<script>
import singleProduct from '../components/singleProduct.vue'

export default {
  name: 'index',
  components: {
    singleProduct
  },
  computed: {
    getAllProducts () {
      return this.$store.getters.getAllProducts
    }
  }
}
</script>

<style></style>
