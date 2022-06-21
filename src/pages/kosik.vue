<template>
  <div v-if="getQuantity===0" class="kosik">
    <div class="kosik-empty">
      <span>Máte prázdný košík, pojďme to <i @click="this.$router.push('/')" id="kosik-empty-change">změnit</i></span>
    </div>
    <kosikSingleProduct v-for="(item, index) in getSelectedProducts" :key="index" :product="item" />
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
  padding: 15vh 0 5vh 0;
}
.kosik-empty {
  margin: 10vW 0 ;
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
