<template>
  <div class="admin">
    <div class="admin-container">
      <div class="admin-setType">
        <button @click="methodType='add'">Přidat</button>
        <button @click="methodType='update'">Upravit</button>
        <button @click="methodType='delete'">Smazat</button>
      </div>
      <div class="admin-manage">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

//data
const methodType = ref('add')

</script>

<style lang="scss" scoped>

.admin-container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 95%;
  max-width: 1200px;
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
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      background-color: #1b1b1b;
      color: #fff;
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