import { createStore } from 'vuex'
import axios from 'axios'
const url = 'http://192.168.0.115:5000/api/products'

export default createStore({
  state: {
    products: [],
    selectedProducts: [],
    focusedProduct: null,
  },

  getters: {
    getAllProducts (state) {
      return state.products
    },
    getSelectedProducts (state) {
      const obj = []
      state.selectedProducts.forEach(item => {
        obj.push(state.products.find(product => product.id === item.id))
      })
      return obj
    },
    getQuantityById: (state) => (productId) => {
      return state.selectedProducts.find(product => product.id === productId).quantity
    },
    isProductSelected: (state) => (productId) => {
      return state.selectedProducts.some(product => product.id === productId)
    },
    getPrice (state) {
      let price = 0
      state.selectedProducts.forEach(item => {
        price += item.quantity * (state.products.find(product => product.id === item.id).price)
      })
      return Math.round((price + Number.EPSILON) * 100) / 100
    },
    getQuantity (state) {
      return state.selectedProducts.length
    },
    getPriceByProductId: (state) => (productId) => {
      return Math.round(((state.products.find(product => product.id === productId).price * state.selectedProducts.find(product => product.id === productId).quantity) + Number.EPSILON) * 100) / 100
    }
  },

  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    addProduct (state, productId) {
      state.selectedProducts.push({ id: productId, quantity: 1 })
      state.focusedProduct = productId
    },
    removeProduct (state, productId) {
      state.selectedProducts = state.selectedProducts.filter(product => product.id !== productId)
    },
    quantityPlus (state, productId) {
      state.selectedProducts.find(product => product.id === productId).quantity++
      state.focusedProduct = productId
    },
    quantityMinus (state, productId) {
      state.focusedProduct = productId
      if (state.selectedProducts.find(product => product.id === productId).quantity > 1) {
        state.selectedProducts.find(product => product.id === productId).quantity--
      } else {
        state.selectedProducts.splice(state.selectedProducts.findIndex(product => product.id === productId), 1)
      }
    },
    setQuantityById (state, payload) {
      state.focusedProduct = payload.id
      state.selectedProducts.find(product => product.id === payload.id).quantity = payload.quantity
    }
  },
  actions: {
    async getProductsFromAPI({ commit }) {
      try {
        const response = await axios.get(url)
        const products = response.data
        commit('setProducts', products)
      }
      catch (err) {
        console.log(err.message)
      }
    },
    checkQuantity ({ state, commit }) {
      state.selectedProducts.forEach(item => {
        if (item.quantity === "" || item.quantity === 0) {
          commit('removeProduct', item.id)
        }
        else if (item.quantity > 60) {
          commit('setQuantityById', { id: item.id, quantity: 60 })
        }
      })
    }
  },
  modules: {
  }
})
