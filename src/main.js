import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// ⬅️ import your store
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')

// ⬅️ call init AFTER app is created
const auth = useAuthStore()
auth.init()
