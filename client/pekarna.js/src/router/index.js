import { createRouter, createWebHistory } from 'vue-router'
import index from '../pages/index.vue'

const routes = [
  {
    path: '/',
    name: 'Vítejte na Pekarna.cz',
    component: index
  },
  {
    path: '/kosik',
    name: 'Košík',
    component: () => import('../pages/kosik.vue')
  },
  {
    path: '/admin',
    name: 'Spravujte produkty',
    component: () => import('../pages/admin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
