<template>
  <div class="space-y-6">
    <!-- Profile header -->
    <div class="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold">
          {{ initials }}
        </div>
        <div>
          <div class="text-sm text-slate-500">Institution</div>
          <div class="font-semibold text-lg">{{ profile.name }}</div>
          <div class="text-sm text-slate-500">Matric: {{ profile.matric }}</div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <router-link to="/add-log" class="bg-blue-500 px-4 py-2 rounded text-white">+ Add New Log Entry</router-link>
        <button @click="exportPdfAll" class="bg-orange-500 px-4 py-2 rounded text-white">Export PDF</button>
      </div>
    </div>

    <!-- Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded shadow p-4 text-center">
        <div class="text-sm text-slate-500">Total Entries</div>
        <div class="text-2xl font-semibold">{{ store.total }}</div>
      </div>
      <div class="bg-white rounded shadow p-4 text-center">
        <div class="text-sm text-slate-500">Approved</div>
        <div class="text-2xl font-semibold text-green-600">{{ store.approvedCount }}</div>
      </div>
      <div class="bg-white rounded shadow p-4 text-center">
        <div class="text-sm text-slate-500">Pending</div>
        <div class="text-2xl font-semibold text-yellow-600">{{ store.pendingCount }}</div>
      </div>
      <div class="bg-white rounded shadow p-4 text-center">
        <div class="text-sm text-slate-500">Rejected</div>
        <div class="text-2xl font-semibold text-red-600">{{ store.rejectedCount }}</div>
      </div>
    </div>

    <!-- Last entry & table -->
    <div class="bg-white rounded shadow p-4">
      <div class="mb-4 flex justify-between items-center">
        <div>
          <div class="text-sm text-slate-500">Most Recent</div>
          <div class="font-semibold">{{ store.lastDate || 'N/A' }}</div>
        </div>
      </div>

      <LogbookTable />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LogbookTable from '../components/LogbookTable.vue'
import { useLogbookStore } from '../store/logbookStore'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const store = useLogbookStore()

// simple profile (simulate fetch)
const profile = ref({
  name: 'Jane Doe',
  matric: 'MAT/2024/001'
})
const initials = computed(() => (profile.value.name ? profile.value.name.charAt(0) : 'S'))

onMounted(() => {
  // If you have a backend call, call it here to populate profile and store.entries.
})

// computed helpers to map store getters to template
const storeProxy = {
  get total() { return store.total },
  get approvedCount() { return store.approvedCount },
  get pendingCount() { return store.pendingCount },
  get rejectedCount() { return store.rejectedCount },
  get lastDate() { return store.lastDate }
}
const storeRef = storeProxy
const exportPdfAll = async () => {
  // create small temporary HTML to render
  const el = document.createElement('div')
  el.style.padding = '12px'
  el.innerHTML = `
    <h2>SIWES Logbook</h2>
    <table style="width:100%;border-collapse:collapse;font-size:12px;">
      <thead><tr><th style="border:1px solid #ddd;padding:6px;">Date</th><th style="border:1px solid #ddd;padding:6px;">Activity</th><th style="border:1px solid #ddd;padding:6px;">Hours</th><th style="border:1px solid #ddd;padding:6px;">Status</th></tr></thead>
      <tbody>
        ${store.entries.map(e => `<tr>
          <td style="border:1px solid #ddd;padding:6px;">${e.date}</td>
          <td style="border:1px solid #ddd;padding:6px;">${e.activities}</td>
          <td style="border:1px solid #ddd;padding:6px;text-align:center;">${e.hours}</td>
          <td style="border:1px solid #ddd;padding:6px;text-align:center;">${e.status}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  `
  document.body.appendChild(el)
  const canvas = await html2canvas(el, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p','mm','a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save('logbook.pdf')
  document.body.removeChild(el)
}
</script>
