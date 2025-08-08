import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLogbookStore = defineStore('logbook', () => {
  const logs = ref([])

  const addLog = (entry) => {
    logs.value.push(entry)
  }

  const deleteLog = (id) => {
    logs.value = logs.value.filter(log => log.id !== id)
  }

  const approveLog = (id, note = '') => {
    const log = logs.value.find(log => log.id === id)
    if (log) {
      log.status = 'Approved'
      log.supervisorNote = note
    }
  }

  const rejectLog = (id, note = '') => {
    const log = logs.value.find(log => log.id === id)
    if (log) {
      log.status = 'Rejected'
      log.supervisorNote = note
    }
  }

  const pendingLogs = computed(() => logs.value.filter(log => log.status === 'Pending'))
  const approvedLogs = computed(() => logs.value.filter(log => log.status === 'Approved'))
  const rejectedLogs = computed(() => logs.value.filter(log => log.status === 'Rejected'))

  return {
    logs,
    addLog,
    deleteLog,
    approveLog,
    rejectLog,
    pendingLogs,
    approvedLogs,
    rejectedLogs
  }
})