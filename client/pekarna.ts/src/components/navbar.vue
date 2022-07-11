<template>
  <nav class="navbar" @click="store.checkQuantity()">
    <a class="navbar-admin" @click="this.$router.push('/admin')">Admin</a>
    <div class="navbar-logo">
      <a @click="$router.push('/')">Pekárna.cz</a>
    </div>
    <div class="navbar-cart" @click="this.$router.push('/kosik')">
      <div class="cart-logo">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="96.000000pt"
          height="96.000000pt"
          viewBox="0 0 96.000000 96.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M54 835 c-13 -32 4 -44 63 -47 l58 -3 36 -198 c25 -136 42 -204 54 -217 17 -19 32 -20 281 -20 278 0 284 1 298 48 13 41 66 294 66 312 0 11 -9 29 -20 40 -20 20 -31 20 -288 18 l-267 -3 0 -25 0 -25 245 -3 c134 -1 248 -6 252 -10 8 -8 -48 -272 -61 -285 -4 -4 -108 -6 -232 -5 l-224 3 -36 198 c-25 136 -42 204 -54 217 -15 16 -31 20 -92 20 -56 0 -75 -4 -79 -15z"
            />
            <path
              d="M304 296 c-48 -48 -48 -104 0 -152 29 -29 41 -34 80 -34 36 0 52 6 78 29 29 26 33 35 33 81 0 46 -4 55 -33 81 -26 23 -42 29 -78 29 -39 0 -51 -5 -80 -34z"
            />
            <path
              d="M644 296 c-28 -28 -34 -42 -34 -76 0 -34 6 -48 34 -76 29 -29 41 -34 80 -34 36 0 52 6 78 29 29 26 33 35 33 81 0 46 -4 55 -33 81 -26 23 -42 29 -78 29 -39 0 -51 -5 -80 -34z"
            />
          </g>
        </svg>
      </div>
      <div class="cart-quantity"><p>{{ getQuantity }}</p></div>
      <div class="price">{{ getPrice }} Kč</div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { computed } from 'vue'

// pinia
const store = useProductsStore();

// computed
const getQuantity = computed(() => store.getQuantity)
const getPrice = computed(() => store.getPrice)

</script>

<style lang="scss">
.navbar {
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  width: 100%;
  height: 80px;
  margin: 0 auto;
  background-color: #fff;
}

.navbar-logo {
  padding: 0 1em;
  font-size: 1.5em;
  width: 100%;
  text-align: center;
  a {
    cursor: pointer;
  }
}

.navbar-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80px;
  height: 80px;
  padding: .5rem;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  svg {
    width: 50px;
    height: 50px;
  }
  .cart-quantity {
    position: absolute;
    top: 5px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fff;
    background-color: #da1c1c;
    width: 20px;
    height: 20px;
    border-radius: 5rem;
  }
  .price {
    font-size: .5em;
    transform: translateX(4px);
  }
}

// admin
.navbar-admin {
  font-size: 1rem;
  position: fixed;
  z-index: 1;
  left: .5rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
