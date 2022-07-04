<template>
  <div class="admin-couter">

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

enum ChangeType {
    ADD = 'add',
    DELETE = 'delete',
    UPDATE = 'update',
}
//data
const method = ref<ChangeType>()

</script>

<style scoped>

.admin-couter {
  display: grid;

}

</style>
  <!-- <form method="POST" action="/" enctype="multipart/form-data">
    <input type="file" name="file" accept="images/*" required>
    <input type="text" name="title" required>
    <input type="text" placeholder="není povinné" name="description" required>
    <input type="submit" value="Upload">
  </form> -->