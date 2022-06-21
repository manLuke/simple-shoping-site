<template>
  <div class="product">
        <div class="product-img">
          <img :src="imgSrc" :alt="product.title" type="image/webp">
        </div>
        <h2>{{ product.title }}</h2>
        <div class="product-price product-select">
            <div class="product-price">{{ product.price }}</div>
        </div>
        <div class="product-count">
          <div class="products-button-not-select">

          </div>
          <div class="products-button-select">

          </div>
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
      return `assets/img/${this.product.title}.webp`
    },
    productSelect () {
      return this.$store.getters.getSelectedProducts
    }
  }
}
</script>

<style lang="scss">
.product {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  max-width: 300px;
  text-align: center;
  background-color: #fff;
  border-radius: 7px;
  padding: 2em 1em;
}

.product-img img{
  max-width: 90%;
  max-height: 70%;
}

</style>
