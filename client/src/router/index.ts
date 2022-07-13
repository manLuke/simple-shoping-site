import axios from 'axios'
import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
const url = 'http://10.0.1.47:5000';
// const url = process.env.URL;


async function checkToken() {
  try {
    if (localStorage.getItem('token')) {
      const response: {data: {verification: string}} = await axios.post(`${url}/users/checkToken`, { token: localStorage.getItem('token') })
      if (response.data.verification === 'successful') {
        return true;
      }
    }
    return '/login'
  }
  catch(err:any) {
    console.log(err)
    return '/login';
  }
}
const routes = [
  {
    path: '/',
    name: 'Vítejte na Pekarna.cz',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '/kosik',
    name: 'Košík',
    component: () => import('@/pages/kosik.vue')
  },
  {
    path: '/admin',
    name: 'Spravujte produkty',
    component: () => import('@/pages/admin.vue'),
    beforeEnter: [checkToken]
  },
  {
    path: '/login',
    name: 'Přihlášení',
    component: () => import('@/pages/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
