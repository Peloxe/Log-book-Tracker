<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Student Dashboard</h1>
      <router-link
        to="/add-log"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Add New Log Entry
      </router-link>
    </div>

    <!-- Summary Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded shadow text-center">
        <div class="text-sm text-gray-500">Total Entries</div>
        <div class="text-xl font-semibold">{{ totalLogs }}</div>
      </div>
      <div class="bg-white p-4 rounded shadow text-center">
        <div class="text-sm text-gray-500">Approved</div>
        <div class="text-xl font-semibold">{{ approvedLogs }}</div>
      </div>
      <div class="bg-white p-4 rounded shadow text-center">
        <div class="text-sm text-gray-500">Pending</div>
        <div class="text-xl font-semibold">{{ pendingLogs }}</div>
      </div>
      <div class="bg-white p-4 rounded shadow text-center">
        <div class="text-sm text-gray-500">Last Entry Date</div>
        <div class="text-md">
          {{ lastLogDate || '—' }}
        </div>
      </div>
    </div>

    <!-- PDF Export -->
    <div class="flex justify-end">
      <PDFExportControls :logs="logs" />
    </div>

    <!-- Logbook Table -->
    <LogbookTable
      :logs="logs"
      @edit="handleEdit"
      @delete="handleDelete"
      @view="handleView"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useLogbookStore } from '@/store/logbookStore'
import { useRouter } from 'vue-router'

import LogbookTable from '@/components/LogbookTable.vue'
import PDFExportControls from '@/components/PDFExportControls.vue'

const router = useRouter()
const logbookStore = useLogbookStore()

onMounted(() => {
  logbookStore.fetchLogs()
})

const logs = computed(() => logbookStore.logs || [])

const totalLogs = computed(() => logs.value.length)
const approvedLogs = computed(() =>
  logs.value.filter((log) => log.status === 'Approved').length
)
const pendingLogs = computed(() =>
  logs.value.filter((log) => log.status === 'Pending').length
)
const lastLogDate = computed(() => {
  if (!logs.value.length) return null
  const sorted = [...logs.value].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  return new Date(sorted[0].date).toLocaleDateString()
})

function handleEdit(log) {
  router.push({ name: 'EditLog', params: { id: log.id } })
}

function handleDelete(id) {
  if (confirm('Are you sure you want to delete this log entry?')) {
    logbookStore.deleteLog(id)
  }
}

function handleView(log) {
  alert(`Full Entry:\n\nDate: ${log.date}\nActivity: ${log.activities}`)
}
</script>