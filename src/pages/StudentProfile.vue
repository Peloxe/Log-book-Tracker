<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth';
import SchoolDropdown from '@/components/SchoolDropdown.vue';

const auth = useAuthStore()

const school = ref(null)
const department = ref(null)
const matric = ref('')
const organization = ref('')
const location = ref('')
const startDate = ref('')
const endDate = ref('')

const loading = ref(false)
const msg = ref('')
const ok = ref(false)

const saveProfile = async () => {
  loading.value = true; msg.value = ''; ok.value = false
  try {
    const data = {
      school: school.value,
      department: department.value,
      matric_number: matric.value,
      organisation_name: organization.value,
      internship_location: location.value,
      internship_start: startDate.value,
      internship_end: endDate.value,
    }

    await axios.post('http://localhost:8000/api/v1/users/profile/setup/', data, {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    })

    ok.value = true
    msg.value = 'Profile saved successfully!'
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
    <form @submit.prevent="saveProfile" class="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Student Profile
      </h2>

      <!-- Matric + Organization -->
      <div class="flex gap-4">
        <label class="block text-sm w-1/2">
          <span class="text-gray-700 dark:text-gray-300">Matric Number</span>
          <input v-model.trim="matric" required
                 class="mt-1 w-full px-3 py-2 border rounded-lg bg-transparent" />
        </label>

        <label class="block text-sm w-1/2">
          <span class="text-gray-700 dark:text-gray-300">Organization Name</span>
          <input v-model.trim="organization" required
                 class="mt-1 w-full px-3 py-2 border rounded-lg bg-transparent" />
        </label>
      </div>

      <!-- School & Department -->
      <SchoolDropdown v-model:school="school" v-model:department="department" />

      <!-- Location -->
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-300">Internship Location</span>
        <input v-model.trim="location" required
               class="mt-1 w-full px-3 py-2 border rounded-lg bg-transparent" />
      </label>

      <!-- Start Date -->
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-300">Internship Starts</span>
        <input v-model="startDate" type="date" required
               class="mt-1 w-full px-3 py-2 border rounded-lg bg-transparent" />
      </label>

      <!-- End Date -->
      <label class="block text-sm">
        <span class="text-gray-700 dark:text-gray-300">Internship Ends</span>
        <input v-model="endDate" type="date" required
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
