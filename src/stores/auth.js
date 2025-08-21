// src/stores/auth.js
import router from '@/router'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    pendingEmail: localStorage.getItem('pendingEmail') || null,
  }),

  actions: {
    async signup(payload) {
      const res = await axios.post('http://192.168.1.220:8000/api/v1/users/register/', payload)
      this.pendingEmail = payload.email
      localStorage.setItem('pendingEmail', payload.email)
      return res.data
    },

    async verifyAccount(code) {
      const payload = { email: this.pendingEmail, code }
      console.log("📤 Verify payload:", payload)

      const res = await axios.post('http://192.168.1.220:8000/api/v1/users/verify-code/', payload)

      console.log("🔑 Verify response:", res.data)

      this.accessToken = res.data.access
      this.refreshToken = res.data.refresh

      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)

      this.pendingEmail = null
      localStorage.removeItem('pendingEmail')

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`

      console.log("📥 Fetching user with token:", this.accessToken)
      await this.fetchUser(true) // 🔥 trigger redirect after verify
    },

    async login(credentials) {
      const res = await axios.post('http://192.168.1.220:8000/api/login/', credentials)

      console.log("🔑 Login response:", res.data)

      this.accessToken = res.data.access
      this.refreshToken = res.data.refresh

      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`

      console.log("📥 Fetching user with token:", this.accessToken)
      await this.fetchUser(true) // 🔥 trigger redirect after login
    },

    async fetchUser(redirect = false) {
      if (!this.accessToken) {
        console.warn("⚠️ No access token, skipping fetchUser")
        return
      }
      try {
        console.log("➡️ Calling /users/detail with token:", this.accessToken)
        const res = await axios.get('http://192.168.1.220:8000/api/v1/users/detail/')
        this.user = res.data
        console.log("✅ User fetched:", res.data)

        if (redirect) {
          if (this.user.profile) {
            console.log("🚀 Profile exists → redirecting to Dashboard")
            // 🎯 Role-specific dashboard
            switch (this.user.role) {
              case 'student':
                router.push('/student/dashboard')
                break
              case 'supervisor':
                router.push('/supervisor/dashboard')
                break
              case 'admin':
                router.push('/admin/dashboard')
                break
              default:
                console.error("❌ Unknown role, staying put")
            }
          } else {
            console.log("⚠️ No profile found, checking role:", this.user.role)
            // 🎯 Role-specific profile setup
            switch (this.user.role) {
              case 'student':
                router.push('/student/profile-setup')
                break
              case 'supervisor':
                router.push('/supervisor/profile-setup')
                break
              case 'admin':
                router.push('/admin/profile-setup')
                break
              default:
                console.error("❌ Unknown role, staying put")
            }
          }
        }

      } catch (err) {
        console.error("❌ Failed to fetch user:", err.response?.data || err)
      }
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      this.pendingEmail = null

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('pendingEmail')

      delete axios.defaults.headers.common['Authorization']
    },

    init() {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      if (accessToken && refreshToken) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        this.fetchUser()
      }

      this.pendingEmail = localStorage.getItem('pendingEmail') || null
    }
  }
})
