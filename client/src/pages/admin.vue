<template>
  <div class="admin">
    <div class="admin-container">
      <div class="admin-setType">
        <button :class="{ requestType: select(requestType.ADD) }" @click="methodType=requestType.ADD">Přidat</button>
        <button :class="{ requestType: select(requestType.UPDATE) }" @click="methodType=requestType.UPDATE">Upravit</button>
        <button :class="{ requestType: select(requestType.DELETE) }" @click="methodType=requestType.DELETE">Smazat</button>
      </div>
      <div class="admin-manage">
        <span v-if="responseMsg!==''" class="msg responseMsg">{{ responseMsg }}</span>
        <span v-if="errorMsg!==''" class="msg errorMsg">{{ errorMsg }}</span>
        <div v-if="methodType===requestType.ADD" class="admin-manage-add primary-form" acceptcharset="UTF-8" enctype="multipart/form-data">
          <form @submit.prevent="addProductFile(); confirmAddProduct();">
            <label for="title">Název</label>
            <input type="text" v-model="addProduct.title" required>
            <label for="price">Cena</label>
            <input type="text" v-model="addProduct.price" required>
            <label for="description">Popis</label>
            <textarea v-model="addProduct.description" maxlength="255"></textarea>
            <div class="input-visibility">
              <label for="visibility">Product's visibility for public</label>
              <input type="checkbox" v-model="addProduct.is_visible">
            </div>
            <label for="img">Obrázek produktu</label>
            <div class="input-file">
              <input type="file" name="file" id="file" required/>
              <input type="text" v-model="addProduct.imgType" placeholder="webp" style="width: 50px" maxlength="5" required>
            </div>
            <button type="submit">Přidat</button>
          </form>
        </div>
        <div v-if="methodType===requestType.UPDATE" class="admin-manage-update  primary-form primary-select">
          <select v-model.number="updateProduct.id">
            <option v-for="(item, index) in allProducts" :value="item.id" :key="index">{{ item.title }}</option>
          </select>
          <form @submit.prevent="confirmUpdateProduct(); getAllProductsAsAdmin();">
            <label for="title">Název</label>
            <input type="text" id="readonlyInput" :value="updateProduct.title" readonly disabled title="You can't change that">
            <label for="price">Cena</label>
            <input type="text" v-model="updateProduct.price" required>
            <label for="description">Popis</label>
            <textarea v-model="updateProduct.description" maxlength="255"></textarea>
            <div class="input-visibility">
              <label for="visibility">Product's visibility for public</label>
              <input type="checkbox" v-model="updateProduct.is_visible">
            </div>
            <button type="submit">Potvrdit</button>
          </form>
        </div>
        <div v-if="methodType===requestType.DELETE" class="admin-manage-delete primary-form primary-select">
         <select v-model.number="deleteProduct.id">
            <option v-for="(item, index) in allProducts" :value="item.id" :key="index">{{ item.title }}</option>
          </select>
          <form @submit.prevent="confirmDeleteProduct(); getAllProductsAsAdmin();">
            <label for="title">Název</label>
            <input type="text" id="readonlyInput" :value="deleteProduct.title" disabled title="You can't change that">
            <label for="price">Cena</label>
            <input type="text" :value="deleteProduct.price" disabled>
            <label for="description">Popis</label>
            <textarea :value="deleteProduct.description" maxlength="255" disabled></textarea>
            <div class="input-visibility">
              <label for="visibility">Product's visibility for public</label>
              <input type="checkbox" v-model="deleteProduct.is_visible" disabled>
            </div>
            <button type="submit">Smazet</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref, watch } from 'vue';
import { useProductsStore } from '@/stores/products';
import { AdminProduct, requestType } from '@/types/index';
import axios from 'axios';
const url = process.env.VUE_APP_URL;

// pinia
const store = useProductsStore();

// mounted
onBeforeMount(() => {
  getAllProductsAsAdmin();
})

// data
const allProducts = ref<AdminProduct[]>([]);
const responseMsg = ref<string>('');
const errorMsg = ref<string>('');
const methodType = ref(requestType.ADD);
const addProduct = reactive({
  id: null,
  title: '',
  description: '',
  price: null,
  imgType: '',
  is_visible: false,
});

const updateProduct = reactive({
  title: '',
  description: '',
  price: null,
  id: null,
  is_visible: null,
})

const deleteProduct = reactive({
  title: '',
  description: '',
  price: null,
  id: null,
  is_visible: null,
})

// watch

watch(() => (updateProduct.id), (newId) => {
  updateProduct.title = adminGetProductById(newId).title;
  updateProduct.description = adminGetProductById(newId).description;
  updateProduct.price = adminGetProductById(newId).price;
  updateProduct.is_visible = adminGetProductById(newId).is_visible;
})

watch(() => (deleteProduct.id), (newId) => {
  deleteProduct.title = adminGetProductById(newId).title;
  deleteProduct.description = adminGetProductById(newId).description;
  deleteProduct.price = adminGetProductById(newId).price;
  deleteProduct.is_visible = adminGetProductById(newId).is_visible;
})

// methods

const getAllProductsAsAdmin = async () => {
  try {
    const response = await axios.get(`${url}/admin/products`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    allProducts.value = response.data
    updateProduct.id = response.data[0].id;
    deleteProduct.id = response.data[0].id;
  } catch (error: any) {
    displayMessage(error.response.data, 'err');
  }
}

const adminGetProductById = (id: number): AdminProduct => {
  return allProducts.value.find((product) => product.id === id) || {}
};

const select = (type: requestType) => {
  return methodType.value === type
};

// display message from Backend

const displayMessage = (message: string, type: "err" | "res") => {
  if (type === "err") {
    errorMsg.value = message
  } else {
    responseMsg.value = message
  }
  setTimeout(() => {
    responseMsg.value = ''
    errorMsg.value = ''
  }, 8000)
}


// Create product

// encode string to binary

const toUTF8Array = (str: string) => {
  let utf8 = [];
  for (var i=0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6), 
                  0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12), 
                  0x80 | ((charcode>>6) & 0x3f), 
                  0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                    | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18), 
                    0x80 | ((charcode>>12) & 0x3f), 
                    0x80 | ((charcode>>6) & 0x3f), 
                    0x80 | (charcode & 0x3f));
      }
  }
  return utf8;
}

const addProductFile = async() => {
  try {
    const fileNameArr = await toUTF8Array(`${addProduct.title}.${addProduct.imgType}`);
    var formData = new FormData();
    var imagefile: any = document.querySelector('#file');
    formData.append("file", imagefile.files[0], fileNameArr);
    axios.post(`${url}/api/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }})
    } catch (error:any) {
    displayMessage(error.response.data, 'err')
  }
}

const confirmAddProduct = async() => {
  try {
    const response = await axios.post(`${url}/api/products`, {
      title: addProduct.title,
      description: addProduct.description,
      price: addProduct.price,
      is_visible: addProduct.is_visible,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    getAllProductsAsAdmin();
    displayMessage(response.data, 'res');
  } catch(err: any) {
    displayMessage(err.response.data, 'err')
  }
}

// update product

const confirmUpdateProduct = async() => {
  try {
    const response = await axios.put(`${url}/api/products/${updateProduct.id}`, {
      description: updateProduct.description,
      price: updateProduct.price,
      is_visible: updateProduct.is_visible,
    },{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
  }})
    displayMessage(response.data, 'res');
    getAllProductsAsAdmin();
  } catch(err: any) {
    displayMessage(err.response.data, 'err');
  }
}

// delete product

const confirmDeleteProduct = async() => {
  try {
    const response = await axios.delete(`${url}/api/products/${deleteProduct.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    displayMessage(response.data, 'res');
    getAllProductsAsAdmin();
  } catch(err: any) {
    displayMessage(err.response.data, 'err');
  }
}

</script>

<style lang="scss" scoped>

.admin {
  padding: 15vh 0 5vh 0;
}

.admin-container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 95%;
  max-width: 1200px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.admin-setType {
  padding: 1em 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10%;
  margin: 1rem 0 0 0;
  button {
    background-color: #fff;
    color: #1b1b1b;
    border: 1px solid #1b1b1b;
    border-radius: 5px;
    padding: 0.5em 1em;
    font-size: 1.2em;
    font-weight: 600;
    transition: all 0.2s ease-out;
    cursor: pointer;
    &:hover {
      background-color: #1b1b1b;
      color: #fff;
    }
    .requestType {
      background-color: #1b1b1b;
      color: #fff;
    }
  }
}

.msg {
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
}

.responseMsg {
  color: #9408ff;
}
.errorMsg {
  color: #ff0000;
}

.admin-manage {
  margin: 0 auto;
  display: grid;
  place-items: center;
  max-width: 560px;
  width: 85%;
  padding: 1em 1.5em;
}

// manage-producta
.primary-form {
  width: 90%;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: .25rem 0;
    .input-file {
      display: flex;
    }
    .input-visibility {
      margin: 0.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      label {
        font-size: 1.1em;
        font-weight: 600;
      }
    }
    label {
      width: 100%;
      font-size: .8em;
      margin: .10rem 0 .25rem 0;
      font-weight: 600;
    }
    textarea {
      min-height: 100px;
      max-height: 250px
    };
    input {
      border: 1px solid#0000006f;
      border-radius: 2px;
      width: 100%;
      height: 30px;
      padding: 0 .25rem;
    };
    input[type="file"] {
      border: none;
    };
    input[type="checkbox"] {
      margin: 0 10px;
      width: 30px;
    }
    button {
      width: 100px;
      text-align: center;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5em 2em;
      margin: 2rem auto .5rem;
      border: 1px solid #1b1b1b;
      border-radius: 5px;
      transition: all 0.3s ease-out;
      background-color: #fff;
      color: #1b1b1b;
      cursor: pointer;
      &:hover {
        background-color: #1b1b1b;
        color: #fff;
      }
    }
  }
}

// update product
.primary-select {
  select {
    width: 100%;
    margin-top: 1rem;
    }
}

@media screen and (max-width: 500px) {
  .admin-setType {
    font-size: 12px;
  }
}

@media screen and (max-width: 350px) {
  .admin-setType {
    font-size: 10px;
  }
}

</style>
