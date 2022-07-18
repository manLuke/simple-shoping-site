import axios from 'axios';
import { defineStore } from 'pinia';
const url = process.env.VUE_APP_URL_PRODUCTS;
import { Product, selectedProduct } from '@/types/index';

type State = {
  products: Product[];
  selectedProducts: selectedProduct[];
  focusedProduct: number;
};

export const useProductsStore = defineStore('products', {
  state: () =>
    ({
      products: [],
      selectedProducts: [],
      focusedProduct: 0,
    } as State),
  getters: {
    getAllProducts(): Product[] {
      return this.products;
    },
    getSelectedProducts() {
      const obj: Product[] = [];
      this.selectedProducts.forEach((item) =>
        obj.push(this.products.find((p) => p.id === item.id) as Product)
      );
      return obj || [];
    },
    getProductById: (state: State) => (id: number) => <Product>
      state.products.find((product) => product.id === id) || {},
    getQuantityById: (state: State) => (id: number) => {
      const product = state.selectedProducts.find((p) => p.id === id);
      return product ? product.quantity : 0;
    },
    getPriceByProductId: (state: State) => (productId: number) => {
      const product = state.products.find((p) => p.id === productId);
      return product ? product.price : 0;
    },
    getPrice(): number {
      let price = 0;
      this.selectedProducts.forEach((item) => {
        price += item.quantity * this.products.find((product) => product.id === item.id)!.price || 0;
      });
      return Math.round((price + Number.EPSILON) * 100) / 100;
    },
    getQuantity(): number {
      return this.selectedProducts.length;
    },
    isProductSelected: (state: State) => (productId: number) => {
      return state.selectedProducts.some((product) => product.id === productId);
    },
  },
  actions: {
    addProduct(productId: number) {
      this.selectedProducts.push({ id: productId, quantity: 1 });
    },
    removeProduct(productId: number) {
      this.selectedProducts = this.selectedProducts.filter(
        (product) => product.id !== productId
      );
    },
    quantityPlus(productId: number) {
      const product = this.selectedProducts.find((p) => p.id === productId);
      if (product) {
        product.quantity++;
      } else {
        // this require typescript
        this.selectedProducts.push({ id: productId, quantity: 1 });
      }
    },
    quantityMinus(productId: number) {
      this.focusedProduct = productId;
      const product = this.selectedProducts.find((p) => p.id === productId);
      if (product) {
        if (product.quantity > 1) {
          product.quantity--;
        } else {
          this.removeProduct(productId);
        }
      }
    },
    setQuantityById(payload: { id: number; quantity: number }) {
      this.focusedProduct = payload.id;
      const product = this.selectedProducts.find((p) => p.id === payload.id);
      if (product) {
        product.quantity = payload.quantity;
      }
    },
    async getProductsFromAPI() {
      try {
        const response = await axios.get(url);
        const products = response.data;
        this.products = products;
      } catch (err: any) {
        console.log(err.message);
      }
    },
    checkQuantity() {
      this.selectedProducts.forEach((item) => {
        if (
          item.quantity === null ||
          item.quantity === 0 ||
          item.quantity === ''
        ) {
          this.removeProduct(item.id);
        } else if (item.quantity > 60) {
          this.setQuantityById({ id: item.id, quantity: 60 });
        }
      });
    },
  },
});
