<template>
  <div class="product">
        <div class="product-img">
          <img :src="imgSrc" :alt="product.title" type="image/webp">
        </div>
        <div class="products-info">
          <h2>{{ product.title }}</h2>
          <div class="product-price"><p>{{ product.price }}0 Kč</p>
            <div v-if="isProductSelected(product.id)===false" @click="addProduct(product.id)" class="product-add product-not-select">
              <p>Přidat</p>
            </div>
            <div v-if="isProductSelected(product.id)" class="product-add product-select">
              <a id="product-button-left" @click="quantityMinus(product.id)" >-</a>
              <p>{{ getQuntity }}</p>
              <a id="product-button-right" @click="quantityPlus(product.id)" >+</a>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'product',
  props: {
    product: Object
  },
  computed: {
    ...mapGetters(['isProductSelected']),
    imgSrc () {
      return `assets/img/${this.product.title}.webp`
    },
    getQuntity () {
      return this.$store.getters.getProductById(this.product.id)
    }
  },
  methods: {
    ...mapMutations(['addProduct', 'quantityPlus', 'quantityMinus'])
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

.product-add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;
  border-radius: 100px;
  cursor: pointer;
}
.product-not-select {
  transition: all 0.3s ease-in-out;
  background-color: #d31818;
  &:hover {
    background-color: #c91c1c;
  }
  p {
  font-size: 1em;
  font-weight: 600;
  color: #fff;
  }
}
.product-select {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid #b3b3b3;
  a {
    font-size: 1.5em;
    font-weight: 600;
    cursor: pointer;
    height: 38px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
  }
  p {
    text-align: center;
    width: 50px;
    font-size: 1em;
    font-weight: 600;
  }
  #product-button-left {
    border-radius: 100px 0  0 100px;
    &:hover {
      background-color: #d31818;
    }
  }
  #product-button-right {
    border-radius: 0 100px 100px 0;
    background-color: #d63333;
    &:hover {
      background-color: #d31818;
    }
  }
}

</style>
