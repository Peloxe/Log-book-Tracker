<script setup>
import { ref } from 'vue'
import api from '@/utils/axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter() 
const auth = useAuthStore()

// State
const position = ref('')
const phone = ref('')
const loading = ref(false)
const msg = ref('')
const ok = ref(false)

const saveProfile = async () => {
  loading.value = true; msg.value = ''; ok.value = false
  try {
    const data = { 
      position: position.value, 
      phone_number: phone.value   // ✅ match backend payload
    }

    await api.post('/api/v1/users/profile/setup/', data, {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    })

    ok.value = true
    msg.value = 'Profile saved successfully!'
    router.push('/admin/dashboard')
  } catch (e) {
    console.error(e.response?.data || e)
    msg.value = 'Error saving profile.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <form @submit.prevent="saveProfile" 
          class="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Admin Profile Setup
      </h2>

      <!-- Position -->
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-300">Position</span>
        <input v-model.trim="position" required
               class="mt-1 w-full px-3 py-2 border rounded-lg bg-transparent" />
      </label>

      <!-- Phone Number -->
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-300">Phone Number</span>
        <input v-model.trim="phone" required type="tel"
               class="mt-1 w-full px-3 py-2 border rounded-lg bg-transparent" />
      </label>

      <!-- Save Button -->
      <button type="submit" :disabled="loading"
              class="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60">
        <span v-if="loading">Saving…</span><span v-else>Save Profile</span>
      </button>

      <!-- Feedback -->
      <p v-if="msg" class="text-center text-sm mt-2"
         :class="ok ? 'text-green-600' : 'text-red-600'">
        {{ msg }}
      </p>
    </form>
  </main>
</template>
