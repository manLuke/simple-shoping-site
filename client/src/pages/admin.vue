<template>
  <div class="admin">
    <div class="admin-container">
      <div class="admin-setType">
        <button :class="{ requestType: select(requestType.ADD) }" @click="methodType=requestType.ADD">Přidat</button>
        <button :class="{ requestType: select(requestType.UPDATE) }" @click="methodType=requestType.UPDATE">Upravit</button>
        <button :class="{ requestType: select(requestType.DELETE) }" @click="methodType=requestType.DELETE">Smazat</button>
      </div>
      <div class="admin-manage">
        <div v-if="methodType===requestType.ADD" class="admin-manage-add" acceptcharset="UTF-8" enctype="multipart/form-data">
          <form @submit.prevent="addProductFile();">
            <label for="title">Název</label>
            <input type="text" v-model="product.title" required>
            <label for="price">Cena</label>
            <input type="text" v-model="product.price" required>
            <label for="description">Popis</label>
            <textarea v-model="product.description" maxlength="255"></textarea>
            <label for="img">Obrázek produktu</label>
            <input type="file" name="file" id="file" accept="images/*" required/>
            <button type="submit">Přidat</button>
          </form>
        </div>
        <div v-if="methodType===requestType.UPDATE" class="admin-manage-update"></div>
        <div v-if="methodType===requestType.DELETE" class="admin-manage-delete"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
const url = 'http://10.0.1.47:5000';
import axios from 'axios';

enum requestType {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
}

// data
const methodType = ref(requestType.ADD);
const product = reactive({
  title: '',
  description: '',
  price: 0,
});

// methods
const select = (type: requestType) => {
  return methodType.value === type;
};

const addProductFile = async() => {
  try {
    var formData = new FormData();
    var imagefile: any = document.querySelector('#file');
    formData.append("file", imagefile.files[0]);
    axios.post(`${url}/api/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }}
    )} catch (error:any) {
    console.log(error);
  }
}

const addProduct = async() => {
  try {
    var formData = new FormData();
    var imagefile: any = document.querySelector('#file');
    formData.append("image", imagefile.files[0]);
    const response = await axios.post(`${url}/api/products`, {
      title: product.title,
      description: product.description,
      price: product.price,
      formData

    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response);
  } catch(err) {
    console.log(err);
  }
}


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
  margin: 1rem 0;
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