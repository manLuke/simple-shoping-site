<template>
  <div class="product">
    {{ product }}
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'product - kosik',
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

<style>

</style>
