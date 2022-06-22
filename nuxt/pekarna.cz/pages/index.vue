<template>
<div class="index">
    <h2 id="index-title">Vyberte si z našeho zboží.</h2>
    <div class="mainPage">
      <div class="mainPage-products">
        <singleProduct v-for="item in getAllProducts" :key="item.id" :product="item"/>
      </div>
    </div>
</div>
</template>

<script>

import { mapState } from 'pinia'
import { useStore } from '@/store/main'

export default {
  name: 'index',
  computed: {
    getAllProducts () {
      return {...mapState(useStore, ['getAllProducts'])}
    }
  }
}
</script>

<style lang="scss">
.index {
  text-align: center;
  #index-title {
    font-size: 2em;
    margin: 1rem;
  }
}

.mainPage-products {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
</style>
