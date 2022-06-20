<template>
  <div class="product">
        <div class="product-img">
          <img :src="imgSrc" :alt="product.title">
        </div>
        <h2>{{ product.title }}</h2>
        <div class="product-price product-select">
            <div class="product-price">{{ product.price }}</div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'product',
  props: {
    product: Object
  },
  computed: {
    imgSrc () {
      return `../assets/img/${this.product.title}.wepb`
    }
  }
}
</script>

<style>

</style>
