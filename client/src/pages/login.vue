<template>
<div class="login">
  <div class="login-container">
    <h2>Pekárna.cz</h2>
    <p class="errMsg" v-if="errMsg !== ''">{{ errMsg }}</p>
    <div class="login-form">
      <form @submit.prevent="login">
        <label for="username">Uživatelské jméno</label>
        <input type="text" v-model="user.username" required>
        <label for="password">Heslo</label>
        <input type="password" v-model="user.password" required>
        <button type="submit">Přihlasit se</button>
      </form>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const url = process.env.VUE_APP_URL;

const router = useRouter();

const errMsg = ref<string>("");
const user = reactive({
  username: "",
  password: ""
});


const login = async() => {
  try {
    const response = await axios.post(`${url}/users/login`, {
      username: user.username,
      password: user.password
    })
    // console.log(token);
    localStorage.setItem("token", response.data.token);
    router.push("/admin");
    errMsg.value = "";
  } catch (error:any) {
    errMsg.value = error.response.data;
  }
}

</script>

<style scoped lang="scss">
.login {
  display: grid;
  place-items: center;
  padding: 0 !important;
  height: 95vh;
}

.login-container {
  width: 350px;
  max-width: 90%;
  padding: 1em 1.5em;
  background-color: #fff;
  border-radius: 5px;
  display: grid;
  place-items: center;
  h2 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1b1b1b;
    margin-bottom:.5rem;
  }
  .errMsg {
    text-align: center;
    color: #ff3b05;
    font-size: .75rem;
  }
}

.login-form {
  width: 95%;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    label {
      width: 100%;
      font-size: .8em;
      margin: .10rem 0 .25rem 0
    }
    input {
      width: 100%;
      height: 30px;
      padding: 0 .25rem;
    };
  }
  button {
    text-align: center;
    font-weight: 600;
    display: flex;
    justify-content: center;
    width: 120px;
    margin: 2rem auto .5rem;
    padding: .5em 1em;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px hsla(259, 62%, 9%, 0.29);
    background-color: #fff;
    color: #1b1b1b;
    transition: all .3s ease-in-out;
    &:hover {
      background-color: #1b1b1b;
      color: #fff;
      }
  } 
}

</style>