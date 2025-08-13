<template>
  <div>
    <table class="w-full table-auto border">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border">Date</th>
          <th class="p-2 border hidden lg:block">Activity</th>
          <th class="p-2 border">Hours</th>
          <th class="p-2 border">Status</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="store.entries.length === 0">
          <td colspan="5" class="p-4 text-center text-slate-500">No entries yet.</td>
        </tr>
        <tr v-for="entry in store.entries" :key="entry.id" class="hover:bg-gray-50">
          <td class="p-2 border">{{ entry.date }}</td>
          <td class="p-2 border hidden lg:block">{{ entry.activities }}</td>
          <td class="p-2 border text-center">{{ entry.hours }}</td>
          <td class="p-2 border text-center">
            <span :class="statusClass(entry.status)">{{ entry.status }}</span>
          </td>
          <td class="p-2 border text-right space-x-2">
            <button v-if="entry.status !== 'approved'" @click="edit(entry)" class="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
            <button @click="del(entry.id)" class="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useLogbookStore } from '../store/logbookStore'
import { useRouter } from 'vue-router'

const store = useLogbookStore()
const router = useRouter()

function edit(entry) {
  // route to AddLog with editId query param
  router.push({ path: '/add-log', query: { editId: entry.id } })
}

function del(id) {
  if (confirm('Delete this entry?')) store.deleteEntry(id)
}

function approve(id) {
  store.setStatus(id, 'approved')
}

function reject(id) {
  const reason = prompt('Optional rejection note:')
  // store rejection reason field if you want; here just set status
  store.setStatus(id, 'rejected')
}

function statusClass(s) {
  return s === 'approved' ? 'text-green-700 font-semibold' : s === 'rejected' ? 'text-red-700 font-semibold' : 'text-yellow-700 font-semibold'
}
</script>
