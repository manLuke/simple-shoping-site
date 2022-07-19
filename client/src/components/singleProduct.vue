<template>
  <div class="product">
    <div class="product-img">
      <img :src="imgSrc" :alt="product.title" type="image/webp">
    </div>
    <div class="products-info">
      <h2>{{ product.title }}</h2>
      <div class="product-price">
        <p>{{ product.price }} Kč</p>
        <counter :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import counter from '@/components/counter.vue'
import { computed, defineProps } from 'vue';
const url = process.env.VUE_APP_URL;


// props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});

// computed
const imgSrc = computed(() => `${url}/api/images/${props.product.id}`);

</script>

<style lang="scss">
.product {
  min-height: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  max-width: 300px;
  text-align: center;
  background-color: #fff;
  border-radius: 7px;
  padding: 2em 1em;
  box-shadow: 0px 0px 10px hsla(0, 0%, 0%, 0.1);
}

.product-img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;

  img {
    max-width: 90%;
    max-height: 90%;
  }
}

.products-info {
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.25em;
    font-weight: 600;
  }
}
</style>
