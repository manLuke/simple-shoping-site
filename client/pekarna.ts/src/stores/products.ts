import { defineStore } from "pinia";

type State = {
  products?: Array<object>,
  selectedProducts?: Array<object>,
  focusedProduct?: number
}

const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    selectedProducts: [],
    focusedProduct: 0
  } as State),

})