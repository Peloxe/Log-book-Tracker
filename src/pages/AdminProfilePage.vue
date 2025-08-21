<script setup>
import { ref } from 'vue'
import axios from 'axios'
// import { useAuthStore } from '@/store/auth'

// const auth = useAuthStore()

// State
const position = ref('')
const phone = ref('')

const loading = ref(false)
const msg = ref('')
const ok = ref(false)
const editing = ref(true) // default form mode

const saveProfile = async () => {
  loading.value = true; msg.value = ''; ok.value = false
  try {
    const data = { position: position.value, phone: phone.value }
    await axios.post('/api/admin/profile', data, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    ok.value = true; msg.value = 'Profile saved successfully!'
    editing.value = false
  } catch (e) {
    msg.value = 'Error saving profile.'
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Admin Profile
      </h2>

      <!-- Edit Form -->
      <form v-if="editing" @submit.prevent="saveProfile" class="space-y-4">
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

      <!-- Summary View -->
      <div v-else class="space-y-4">
        <div class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
          <p><strong>Position:</strong> {{ position }}</p>
          <p><strong>Phone Number:</strong> {{ phone }}</p>
        </div>

        <button @click="editing = true"
                class="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          Edit Profile
        </button>
      </div>
    </div>
  </main>
</template>
