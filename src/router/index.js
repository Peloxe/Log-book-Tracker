import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import AddLog from '@/views/AddLog.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/add-log',
    name: 'AddLog',
    component: AddLog,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router