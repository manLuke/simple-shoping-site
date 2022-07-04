import { defineStore } from "pinia"
import products from '@/assets/products.json'

export const useStore = defineStore({id: 'useStore', 
  state: () => {
    return {
      selectedProducts: []
    }
  },
  getters: {
    getAllProducts () {
      return products
    },
    getSelectedProducts (state) {
      const obj = []
      state.selectedProducts.forEach(item => {
        obj.push(products.find(product => product.id === item.id))
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
        price += item.quantity * (products.find(product => product.id === item.id).price)
      })
      return Math.round((price + Number.EPSILON) * 100) / 100
    },
    getQuantity (state) {
      return state.selectedProducts.length
    },
    getPriceByProductId: (state) => (productId) => {
      return Math.round(((products.find(product => product.id === productId).price * state.selectedProducts.find(product => product.id === productId).quantity) + Number.EPSILON) * 100) / 100
    }
  },

  actions: {
    addProduct (state, productId) {
      state.selectedProducts.push({ id: productId, quantity: 1 })
    },
    removeProduct (state, productId) {
      state.selectedProducts = state.selectedProducts.filter(product => product.id !== productId)
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
    },
    setQuantityById (state, payload) {
      state.selectedProducts.find(product => product.id === payload.id).quantity = payload.quantity
    }
  }
});