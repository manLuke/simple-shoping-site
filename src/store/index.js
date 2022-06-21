import { createStore } from 'vuex'
import products from '../assets/json/products.json'

export default createStore({
  state: {
    selectedProducts: []
  },

  getters: {
    getSelectedProducts (state) {
      const obj = []
      state.selectedProducts.forEach(item => {
        obj.push(products.find(product => product.id === item.id))
      })
      return obj
    },
    getAllProducts () {
      return products
    },
    getProductById: (state) => (id) => {
      return state.selectedProducts.find(product => product.id === id).quantity
    },
    isProductSelected: (state) => (productId) => {
      return state.selectedProducts.some(product => product.id === productId)
    },
    getPrice (state) {
      let price = 0
      state.selectedProducts.forEach(item => {
        price += item.quantity * (products.find(product => product.id === item.id).price)
      })
      return Math.round((price + Number.EPSILON) * 100) / 100
    },
    getQuantity (state) {
      return state.selectedProducts.length
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
      if (state.selectedProducts.find(product => product.id === productId).quantity > 1) {
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
