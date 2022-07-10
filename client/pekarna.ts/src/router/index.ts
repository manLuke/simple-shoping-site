import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Vítejte na Pekarna.cz',
    component: import('../pages/index.vue')
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
