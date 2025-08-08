<!-- src/views/AddLog.vue -->
<template>
  <div class="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-semibold mb-6">Add New Log Entry</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block font-medium mb-1">Date</label>
        <input type="date" v-model="form.date" class="input" />
      </div>

      <div>
        <label class="block font-medium mb-1">Activities Done</label>
        <textarea v-model="form.activities" class="textarea" rows="4" required></textarea>
      </div>

      <div>
        <label class="block font-medium mb-1">Hours Worked</label>
        <input type="number" v-model="form.hours" class="input" required min="0" />
      </div>

      <div>
        <label class="block font-medium mb-1">Challenges Faced (optional)</label>
        <textarea v-model="form.challenges" class="textarea" rows="3"></textarea>
      </div>

      <div class="flex justify-between items-center pt-4">
        <RouterLink to="/" class="text-blue-600 underline">Back to Dashboard</RouterLink>
        <button type="submit" class="btn-primary">Submit Log</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useLogbookStore } from '@/store/logbookStore'

const router = useRouter()
const logbookStore = useLogbookStore()

const form = reactive({
  date: new Date().toISOString().slice(0, 10),
  activities: '',
  hours: '',
  challenges: '',
})

const handleSubmit = () => {
  logbookStore.addLog({
    ...form,
    id: Date.now(),
    status: 'Pending',
    supervisorNote: '',
  })
  router.push('/')
}
</script>

<!-- <style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-3 py-2;
}
.textarea {
  @apply w-full border border-gray-300 rounded px-3 py-2;
}
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
</style> -->