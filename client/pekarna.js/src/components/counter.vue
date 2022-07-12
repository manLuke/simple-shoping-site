<template>
  <div v-if="isProductSelected(product.id)===false" @click="addProduct(product.id)" class="product-add product-not-select"><p>Přidat</p></div>
  <div v-else-if="isProductSelected(product.id)" class="product-add product-select">
    <a class="product-button-left" @click="quantityMinus(product.id)" ><svg data-test="IconMinus" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="33a6ed2a-d7c8-414b-92a2-f6e3322d8167"><path fill="#1C2529" fill-rule="evenodd" clip-rule="evenodd" d="M13 9H3C2.45 9 2 8.55 2 8C2 7.45 2.45 7 3 7H13C13.55 7 14 7.45 14 8C14 8.55 13.55 9 13 9Z"></path></svg></a>
    <input id="product-v-model" type="number" v-model="quntity" min="0" max="60" pattern="[0-9]*"/>
    <a :class="{ 'product-button-right': !stopAddingQuantity , stopAdding: stopAddingQuantity }" @click="quantityPlus()" ><svg data-test="IconPlus" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16"><path fill="#1C2529" fill-rule="evenodd" clip-rule="evenodd" d="M13 9H9V13C9 13.55 8.55 14 8 14C7.45 14 7 13.55 7 13V9H3C2.45 9 2 8.55 2 8C2 7.45 2.45 7 3 7H7V3C7 2.45 7.45 2 8 2C8.55 2 9 2.45 9 3V7H13C13.55 7 14 7.45 14 8C14 8.55 13.55 9 13 9Z"></path></svg></a>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'product-counter',
  props: {
    product: Object
  },
  data () {
    return {
      stopAddingQuantity: false,
    }
  },
  computed: {
    ...mapGetters(['isProductSelected']),
    quntity: {
      get () {
        return this.$store.getters.getQuantityById(this.product.id)
      },
      set (value) {
        if (value > 60) {
          this.$store.commit('setQuantityById', { id: this.product.id, quantity: 60 })
          this.stopAddingQuantity = true
        } else {
          this.$store.commit('setQuantityById', { id: this.product.id, quantity: value })
          this.stopAddingQuantity = false
        }
      }
    }
  },
  methods: {
    ...mapMutations(['addProduct', 'quantityMinus']),
    quantityPlus () {
      if (this.quntity >= 60) {
          this.stopAddingQuantity = true
          this.$store.commit('setQuantityById', { id: this.product.id, quantity: 60})
        } else if (this.quntity <= 60 || this.quntity >= 0) {
          this.$store.commit('quantityPlus', this.product.id)
        }
    }
  },
  // watch: {
  //   quntity (newValue) {
  //     if (newValue >= 60) {
  //       this.stopAddingQuantity = true
  //     } else if (newValue < 60) {
  //       this.stopAddingQuantity = false
  //     }
  //   }
  // }
}
</script>

<style lang="scss">

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
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid #b3b3b3;
  a {
    font-size: 1.5em;
    font-weight: 600;
    cursor: pointer;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    transform: translateY(-1px);
  }
  .product-button-left {
    border-radius: 100px 0  0 100px;
  }
  .product-button-right {
    border-radius: 0 100px 100px 0;
    background-color: #d63333;
    &:hover {
      background-color: #d31818;
    }
  }
}

.stopAdding {
  border-radius: 0 100px 100px 0;
  cursor: not-allowed;
  background-color: #d77575;
}

#product-v-model {
  width: 48px;
  margin: 0 1.5px;
  height: 36px;
  transform: translateY(-1px);
  // z-index: 2;
  text-align: center;
  font-size: 1em;
  font-weight: 600;
  border: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
  border: none;
}

@media screen and (min-width: 470px) {
    #product-button-left {
    &:hover {
      background-color: #d31818;
    }
  }
}

</style>
