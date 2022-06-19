import { createStore } from 'vuex'
import products from '../assets/json/products.json'

export default createStore({
  state: {
    productsON: [],
    price: 0,
    quantity: 0
  },

  getters: {
    getProducts () {
      return products
    },
    geSingleProduct (productId) {
      return products.find(product => product.id === productId)
    },
    getPrice (state) {
      state.productsON.forEach(product => {
        state.price += product.quantity * product.price
      })
      return state.price
    },
    getQuantity (state) {
      state.productsON.forEach(product => {
        state.quantity += product.quantity
      })
      return state.quantity
    }
  },

  mutations: {
    addProduct (state, productId) {
      state.productsON.push({ id: productId, quantity: 1 })
    },
    quantityPlus (state, productId) {
      state.productsON.find(product => product.id === productId).quantity++
    },
    quantityMinus (state, productId) {
      if (state.productsON.find(product => product.id === productId).quantity >= 1) {
        state.productsON.find(product => product.id === productId).quantity--
      } else {
        state.productsON.splice(state.productsON.findIndex(product => product.id === productId), 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
