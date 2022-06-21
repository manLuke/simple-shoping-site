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

<style lang="scss">
.mainPage-products {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
</style>
