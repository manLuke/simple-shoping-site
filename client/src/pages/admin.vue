<template>
  <div class="admin">
    <div class="admin-container">
      <div class="admin-setType">
        <button :class="{ requestType: select(requestType.ADD) }" @click="methodType=requestType.ADD">Přidat</button>
        <button :class="{ requestType: select(requestType.UPDATE) }" @click="methodType=requestType.UPDATE">Upravit</button>
        <button :class="{ requestType: select(requestType.DELETE) }" @click="methodType=requestType.DELETE">Smazat</button>
      </div>
      <div class="admin-manage">
        <span class="msg responseMsg">{{ responseMsg }}</span>
        <span class="msg errorMsg">{{ errorMsg }}</span>
        <div v-if="methodType===requestType.ADD" class="admin-manage-add" acceptcharset="UTF-8" enctype="multipart/form-data">
          <form @submit.prevent="addProductFile(); addProduct();">
            <label for="title">Název</label>
            <input type="text" v-model="product.title" required>
            <label for="price">Cena</label>
            <input type="text" v-model="product.price" required>
            <label for="description">Popis</label>
            <textarea v-model="product.description" maxlength="255"></textarea>
            <label for="img">Obrázek produktu</label>
            <div class="input-file">
              <input type="file" name="file" id="file" accept="images/*" required/>
              <input type="text" v-model="product.imgType" placeholder="webp" style="width: 50px" maxlength="5" required>
            </div>
            <button type="submit">Přidat</button>
          </form>
        </div>
        <div v-if="methodType===requestType.UPDATE" class="admin-manage-update">
          <select v-model.number="updateProduct.order">
            <option v-for="(item, index) in store.getAllProducts" :value="index" :key="index">{{ item.title }}</option>
          </select>
          <form>
            <label @submit.prevent=""></label>
            <label for="title">Název</label>
            <input type="text" v-model="product.title" required>
            <label for="price">Cena</label>
            <input type="text" v-model="product.price" required>
            <label for="description">Popis</label>
            <textarea v-model="product.description" maxlength="255"></textarea>
            <button submit=""></button>
          </form>
        </div>
        <div v-if="methodType===requestType.DELETE" class="admin-manage-delete"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
const url = 'http://10.0.1.47:5000';
import { useProductsStore } from '@/stores/products';
import axios from 'axios';

// pinia
const store = useProductsStore();

enum requestType {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
}

// data
const responseMsg = ref('Success');
const errorMsg = ref('');
const methodType = ref(requestType.ADD);
const product = reactive({
  title: '',
  description: '',
  price: 0,
  imgType: ''
});

const updateProduct = reactive({
  order: 0,
  title: '',
  description: '',
  price: 0
})


// methods
const select = (type: requestType) => {
  errorMsg.value = ''
  responseMsg.value = ''
  return methodType.value === type
};

const toUTF8Array = (str: string): number[] => {
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

// Create product

// encode string to binary

// ...

const addProductFile = async() => {
  try {
    const fileName = await toUTF8Array(`${product.title}.${product.imgType}`);
    var formData = new FormData();
    var imagefile: any = document.querySelector('#file');
    formData.append("file", imagefile.files[0], fileName);
    axios.post(`${url}/api/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }}
    )} catch (error:any) {
    errorMsg.value = error.response.data
  }
}

const addProduct = async() => {
  try {
    const response = await axios.post(`${url}/api/products`, {
      title: product.title,
      description: product.description,
      price: product.price
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    responseMsg.value = response.data.title;
    console.log(response);
      
  } catch(err: any) {
    errorMsg.value = err.response.data;
  }
}

// update product

// const getSelectedProducts = computed(() => store.getSelectedProducts);

</script>

<style lang="scss" scoped>

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
  width: 90%;
  padding: 1em 1.5em;
}

// add product
.admin-manage-add {
  width: 90%;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .input-file {
      display: flex;
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
  <!-- <form method="POST" action="/" enctype="multipart/form-data">
    <input type="file" name="file" accept="images/*" required>
    <input type="text" name="title" required>
    <input type="text" placeholder="není povinné" name="description" required>
    <input type="submit" value="Upload">
  </form> -->