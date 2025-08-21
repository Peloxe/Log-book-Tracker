// src/stores/profileStore.js
import { defineStore } from 'pinia'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://your-api.example.com'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    loading: false,
    error: null,
  }),
  getters: {
    fullName: (s) => s.profile ? `${s.profile.first_name ?? ''} ${s.profile.last_name ?? ''}`.trim() : '',
    email:    (s) => s.profile?.email || s.profile?.gmail || '',
    matricNo: (s) => s.profile?.matric_number || s.profile?.matricNo || '',
    avatarUrl:(s) => s.profile?.avatar || s.profile?.photo_url || s.profile?.profile_image || '',
  },
  actions: {
    async fetchProfile(userId, token = null) {
      this.loading = true
      this.error = null
      try {
        const url = `${API_BASE}/students/${encodeURIComponent(userId)}/profile/`
        const res = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          }
        })
        if (!res.ok) {
          const msg = await res.text().catch(() => '')
          throw new Error(`Failed to load profile (${res.status}): ${msg}`)
        }
        this.profile = await res.json()
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        this.profile = null
      } finally {
        this.loading = false
      }
    },
    clear() {
      this.profile = null
      this.error = null
      this.loading = false
    }
  }
})
