<template>
  <div class="product">
        <div class="product-img">
          <img :src="imgSrc" :alt="product.title" type="image/webp">
        </div>
        <div class="products-info">
          <h2>{{ product.title }}</h2>
          <div class="product-price"><p>{{ product.price }}0 Kč</p>
            <counter :product="product"/>
          </div>
        </div>
  </div>
</template>

<script>
import counter from '../components/counter.vue'

export default {
  name: 'product',
  props: {
    product: Object
  },
  components: {
    counter
  },
  computed: {
    imgSrc () {
      return `assets/img/${this.product.title}.webp`
    },
    // quntity: {
    //   get () {
    //     return this.$store.getters.getQuantityById(this.product.id)
    //   },
    //   set (value) {
    //     this.$store.commit('setQuantityById', { id: this.product.id, quantity: value })
    //   }
    // }
  }
}
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
