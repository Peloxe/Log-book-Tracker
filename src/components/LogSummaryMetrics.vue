<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white p-4 rounded shadow text-center">
      <p class="text-gray-500 text-sm">Total Entries</p>
      <p class="text-2xl font-semibold text-indigo-600">{{ logs.length }}</p>
    </div>

    <div class="bg-white p-4 rounded shadow text-center">
      <p class="text-gray-500 text-sm">Approved</p>
      <p class="text-2xl font-semibold text-green-600">{{ approved }}</p>
    </div>

    <div class="bg-white p-4 rounded shadow text-center">
      <p class="text-gray-500 text-sm">Pending</p>
      <p class="text-2xl font-semibold text-yellow-600">{{ pending }}</p>
    </div>

    <div class="bg-white p-4 rounded shadow text-center">
      <p class="text-gray-500 text-sm">Last Entry</p>
      <p class="text-lg text-gray-800">{{ lastEntryDate || 'N/A' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    logs: {
        type: Array,
        default: () => []
    }
})
const total = computed(() => props.logs.length)
const approved = computed(() => props.logs.filter(log => log.status === 'Approved').length)
const pending = computed(() => props.logs.filter(log => log.status === 'Pending').length)
const lastEntryDate = computed(() => {
  if (!props.logs.length) return null
  const sorted = [...props.logs].sort((a, b) => new Date(b.date) - new Date(a.date))
  return new Date(sorted[0].date).toLocaleDateString()
})
</script>