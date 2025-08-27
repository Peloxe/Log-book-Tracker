<template>
  <div class="flex flex-col items-center justify-center min-h-screen space-y-4">
    <p class="text-gray-600 text-lg">No school available</p>

    <!-- Trigger Button -->
    <button 
      @click="showModal = true" 
      class="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Register School
    </button>

    <!-- Modal -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 class="text-xl font-semibold mb-4">Register School</h2>

        <form @submit.prevent="registerSchool" class="space-y-3">
          <input 
            v-model="form.name" 
            placeholder="School Name"
            class="w-full border rounded px-3 py-2"
          />
          <input 
            v-model="form.address" 
            placeholder="Address"
            class="w-full border rounded px-3 py-2"
          />
          <input 
            v-model="form.email" 
            type="email"
            placeholder="Email"
            class="w-full border rounded px-3 py-2"
          />
          <input 
            v-model="form.website" 
            placeholder="Website"
            class="w-full border rounded px-3 py-2"
          />

          <div class="flex justify-end gap-2">
            <button 
              type="button" 
              @click="showModal = false" 
              class="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/utils/axios'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const showModal = ref(false)

const form = ref({
  name: '',
  address: '',
  email: '',
  website: ''
})

const registerSchool = async () => {
  try {
    await api.post('/api/v1/school/register-school/', form.value)
    await auth.fetchUser() // refresh user profile after school assignment
    showModal.value = false // close modal
    form.value = { name: '', address: '', email: '', website: '' } // reset form
  } catch (err) {
    console.error(err)
  }
}
</script>
