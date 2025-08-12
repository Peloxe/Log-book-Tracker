import { defineStore } from 'pinia'

const STORAGE_KEY = 'siwes_log_entries'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.warn('Failed to load store', e)
    return []
  }
}

function save(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export const useLogbookStore = defineStore('logbook', {
  state: () => ({
    entries: load()
  }),
  getters: {
    total: (state) => state.entries.length,
    approvedCount: (state) => state.entries.filter(e => e.status === 'approved').length,
    pendingCount: (state) => state.entries.filter(e => e.status === 'pending').length,
    rejectedCount: (state) => state.entries.filter(e => e.status === 'rejected').length,
    lastDate: (state) => state.entries.length ? state.entries[0].date : null
  },
  actions: {
    addEntry(payload) {
      const e = {
        id: Date.now(),
        date: payload.date || new Date().toISOString().slice(0,10),
        activities: payload.activities || '',
        hours: payload.hours || 0,
        challenges: payload.challenges || '',
        status: payload.status || 'pending',
        supervisorNote: payload.supervisorNote || ''
      }
      // newest first
      this.entries.unshift(e)
      save(this.entries)
    },
    updateEntry(id, patch) {
      const i = this.entries.findIndex(x => x.id === id)
      if (i === -1) return
      // only allow updates if not approved
      if (this.entries[i].status === 'approved') {
        // silently ignore or return false
        return false
      }
      this.entries[i] = { ...this.entries[i], ...patch }
      save(this.entries)
      return true
    },
    deleteEntry(id) {
      this.entries = this.entries.filter(x => x.id !== id)
      save(this.entries)
    },
    setStatus(id, status) {
      const e = this.entries.find(x => x.id === id)
      if (!e) return
      e.status = status
      save(this.entries)
    },
    // for dev/testing only: clear
    clearAll() {
      this.entries = []
      save(this.entries)
    }
  }
})
