<template>
  <div class="kosik-product">
    <div class="kosik-product-info">
      <div class="kosik-product-info-img"><img :src="imgSrc" :alt="product.title"></div>
      <p>{{ product.title }}</p>
    </div>
    <div class="kosik-pruduct-info-second">
      <counter class="kosik-product-quantity" :product="product" />
        <div class="kosik-product-price">
          <p>{{ getPriceByProductId }} Kč</p>
        </div>
      <div class="kosik-product-remove" @click="removeProduct()"><svg xmlns="http://www.w3.org/2000/svg" class="icon-tabler-x" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import counter from '../components/counter.vue'
import { useProductsStore } from '@/stores/products';
import { defineProps, computed } from 'vue';

// pinia
const store = useProductsStore();

// props
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

// computed
const getPriceByProductId = computed(() => store.getPriceByProductId(props.product.id));
const imgSrc = computed(() => `assets/img/${props.product.title}.webp`);

// methods
const removeProduct = () => store.removeProduct(props.product.id);

</script>

<style lang="scss">
.kosik-product {
  font-size: 1.1rem;
  padding: 1.25em 1.75em;
  height: 100px;
  width: 90%;
  max-width: 900px;
  border-radius: 3px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kosik-product-info {
  display: flex;
  flex-direction: row;
  gap: 1em;
  p {
    margin-top: .5rem;
    font-size: 1.1rem;
    font-weight: 400;
    color: #1b1b1b;
  }
  .kosik-product-info-img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 80px;
    img {
      max-width: 70px;
      max-height: 60px;
    }
  }
}

.kosik-pruduct-info-second {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.kosik-product-quantity {
  transform: scale(.75);
}

.kosik-product-price {
  text-align: center;
  margin: 0 2rem 0 3.5rem;
  width: 80px;
}

.kosik-product-remove {
  padding: .25rem;
  opacity: .75;
  cursor: pointer;
  .icon-tabler-x {
    stroke: #000000;
    height: 15px;
    width: 15px;
  }
}

@media screen and (max-width: 768px) {
  .kosik-product {
    flex-direction: column;
    height: 180px;
    max-width: 400px;
  }
  .kosik-product-price {
    margin: 0 1rem;
  }
  .kosik-pruduct-info-second {
    width: 100%;
  }
}
</style>
