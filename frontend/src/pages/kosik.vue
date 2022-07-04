<template>
  <div class="kosik-empty-page">
    <div v-if="getQuantity===0" class="kosik-empty">
      <span>Máte prázdný košík, pojďme to <i @click="this.$router.push('/')" id="kosik-empty-change">změnit</i></span>
    </div>
    <div class="kosik" v-if="getQuantity!==0">
      <kosikSingleProduct v-for="(item, index) in getSelectedProducts" :key="index" :product="item" />
    </div>
  </div>
</template>

<script>
import kosikSingleProduct from '../components/kosikSingleProduct.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'kosik',
  components: {
    kosikSingleProduct
  },
  computed: {
    ...mapGetters(['getQuantity', 'getSelectedProducts'])
  }
}
</script>

<style lang="scss">

.kosik {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 1.5rem;
}
.kosik-empty {
  margin: 10vH 0 ;
  font-size: 2.5rem;
  font-weight: 600;
  padding: 10vh;
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
