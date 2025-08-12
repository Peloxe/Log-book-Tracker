<!-- src/components/LogEntryModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
      <h2 class="text-2xl font-bold mb-4">Add New Log Entry</h2>

      <!-- Log Entry Form -->
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block font-semibold">Date</label>
          <input type="date" v-model="form.date" class="w-full border rounded p-2" required />
        </div>

        <div>
          <label class="block font-semibold">Activity Summary</label>
          <textarea v-model="form.activity" class="w-full border rounded p-2" required></textarea>
        </div>

        <div>
          <label class="block font-semibold">Hours Worked</label>
          <input type="number" v-model="form.hours" min="1" class="w-full border rounded p-2" required />
        </div>

        <div class="flex justify-end gap-3">
          <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLogbookStore } from '@/store/logbookStore'

const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['close'])

const store = useLogbookStore()

const form = ref({
  date: '',
  activity: '',
  hours: ''
})

function closeModal() {
  emit('close')
}

function submitForm() {
  if (!form.value.date || !form.value.activity || !form.value.hours) return

  store.addLog({
    date: form.value.date,
    activity: form.value.activity,
    hours: form.value.hours,
    status: 'Pending'
  })

  closeModal()
}
</script>
