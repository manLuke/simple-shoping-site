import { createStore } from 'vuex'
import products from '../assets/json/products.json'

export default createStore({
  state: {
    selectedProducts: [],
    price: 0,
    quantity: 0
  },

  getters: {
    getSelectedProducts (state) {
      return state.selectedProducts
    },
    getAllProducts () {
      return products
    },
    geSingleProduct (productId) {
      return products.find(product => product.id === productId)
    },
    getPrice (state) {
      let price = 0
      state.selectedProducts.forEach(product => {
        price += product.quantity * product.price
      })
      return price
    },
    getQuantity (state) {
      let quantity = 0
      state.selectedProducts.forEach(product => {
        quantity += product.quantity
      })
      return quantity
    }
  },

  mutations: {
    addProduct (state, productId) {
      state.selectedProducts.push({ id: productId, quantity: 1 })
    },
    quantityPlus (state, productId) {
      state.selectedProducts.find(product => product.id === productId).quantity++
    },
    quantityMinus (state, productId) {
      if (state.selectedProducts.find(product => product.id === productId).quantity >= 1) {
        state.selectedProducts.find(product => product.id === productId).quantity--
      } else {
        state.selectedProducts.splice(state.selectedProducts.findIndex(product => product.id === productId), 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
