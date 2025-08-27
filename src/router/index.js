import { createRouter, createWebHistory } from 'vue-router'

//pages
import AdminDashboard from '@/pages/AdminDashboard.vue'

const routes = [
  
  {
    path: '/',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router