// import axios from 'axios';

// const url = 'http://localhost:5000/api/products';

// class ProductService {
//   // Get all products
//   static getProducts = async () => {
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   // Get single product
//   static getProduct = async (id) => {
//     try {
//       const response = await axios.get(`${url}/${id}`);
//       return response.data;
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   // Create a product
//   static setProducts(newProduct) {
//     return axios.post(url, newProduct );
//   }

//   // Update a product

//   static updateProducts(id, updateProduct) {
//     return axios.put(`${url}/${id}`, updateProduct);
//   }

//   // Delete a product
//   static deleteProducts(id) {
//     return axios.delete(`${url}/${id}`);
//   }
// }

// export default ProductService;