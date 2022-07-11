<template>
  <div class="index" @click="checkQuantity()">
    <h2 id="index-title">Vyberte si z našeho zboží.</h2>
    <div class="mainPage">
      <div class="mainPage-products">
        <singleProduct v-for="(item, index) in getAllProducts" :key="index" :product="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import singleProduct from '@/components/singleProduct.vue'
import { useProductsStore } from '@/stores/products'
import { computed } from '@vue/runtime-core'

// pinia
const store = useProductsStore()

// computed
const getAllProducts = computed(() => store.getAllProducts)

// methods
const checkQuantity = () => {
  console.log("checkQuantity - store.checkQuantity()")
  store.checkQuantity()
}

</script>

<style lang="scss">
.index {
  text-align: center;

  #index-title {
    font-size: 2em;
    margin: 1rem;
  }
}

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
