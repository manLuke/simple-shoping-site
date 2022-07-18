<template>
<div v-if="getQuantity===0" class="kosik-empty">
  <div class="kosik-empty-page">
    <span>Máte prázdný košík, pojďme to <i @click="router.push('/')" id="kosik-empty-change">změnit</i></span>
  </div>
</div>
<div class="kosik" v-if="getQuantity!==0" @click="store.checkQuantity()">
  <kosikSingleProduct v-for="(item, index) in getSelectedProducts" :key="index" :product="item" />
</div>
</template>

<script setup lang="ts">
import kosikSingleProduct from '../components/kosikSingleProduct.vue';
import { useProductsStore } from '@/stores/products';
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useProductsStore();

// computed
const getQuantity = computed(() => store.getQuantity);
const getSelectedProducts = computed(() => store.getSelectedProducts);

</script>

<style lang="scss" scoped>

.kosik {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 1.5rem;
  padding: 15vh 0 5vh 0;
}
.kosik-empty {
  display: grid;
  align-items: center;
  height: 100vh;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  color: #1b1b1b;
  #kosik-empty-change {
    color: #ff0000;
    font-weight: 400;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}

</style>
