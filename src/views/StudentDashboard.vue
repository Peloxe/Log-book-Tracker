<template>
  <div v-if="auth.loadingUser" class="flex justify-center items-center min-h-screen text-gray-600 dark:text-gray-300">
      Loading student dashboard…
    </div>

    <div v-else class="space-y-6">
      <!-- Profile header -->
      <div class="bg-white rounded-xl shadow py-2 px-1 lg:p-4 flex gap-2 items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img v-if="user?.profile.photo" :src="baseURL + user.profile.photo" alt="Profile Picture"
              class="w-full h-full object-cover" />
            <img v-else src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="Default Avatar"
              class="w-full h-full object-cover" />
          </div>
          <div>
            <div class="font-semibold text-lg">{{ user.full_name }}</div>
            <div class="text-sm text-slate-500">{{ user.school_name }}</div>
            <div class="text-sm text-slate-500">Matric: {{ user.profile.matric_number }}</div>
          </div>
        </div>

      <div class="flex flex-col lg:flex-row items-center gap-1 lg:gap-3">
        <router-link to="/add-log" class="bg-gradient-to-r from-blue-400 to-blue-600 rounded px-4 py-2 text-sm md:text-base text-white">+ Add <span class="hidden lg:inline">New</span> Log <span class="hidden lg:inline">Entry</span></router-link>
        <button @click="exportPdfAll" class="bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-sm md:text-base rounded text-white">Export PDF</button>
      </div>
    </div>

    <!-- Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
      <!-- Total Entries -->
      <div
        class="bg-gradient-to-r from-blue-400 to-blue-600 rounded shadow p-4 text-white flex items-center gap-4 rounded-lg">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <div>
          <div class="text-2xl font-bold">{{ store.logs.length }}</div>
          <div class="text-sm mt-1">Total Entries</div>
        </div>
      </div>

      <!-- Approved -->
      <div
        class="bg-gradient-to-r from-green-400 to-green-600 rounded shadow p-4 text-white flex items-center gap-4 rounded-lg">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <div class="text-2xl font-bold">{{ approvedCount }}</div>
          <div class="text-sm mt-1">Approved</div>
        </div>
      </div>

      <!-- Pending -->
      <div
        class="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded shadow p-4 text-white flex items-center gap-4 rounded-lg">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3M12 21a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
        <div>
          <div class="text-2xl font-bold">{{ pendingCount }}</div>
          <div class="text-sm mt-1">Logs Pending</div>
        </div>
      </div>

      <!-- Rejected -->
      <div
        class="bg-gradient-to-r from-red-400 to-red-600 rounded shadow p-4 text-white flex items-center gap-4 rounded-lg">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div>
          <div class="text-2xl font-bold">{{ rejectedCount }}</div>
          <div class="text-sm mt-1">Rejected</div>
        </div>
      </div>
    </div>


    <!-- Last entry & table -->
    <div class="bg-white rounded shadow p-4">
      <div class="mb-4 flex justify-between items-center">
        <div>
          <div class="text-sm text-slate-500">Most Recent</div>
          <div class="font-semibold">{{ lastDate || 'N/A' }}</div>
        </div>
      </div>

      <LogbookTable />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import LogbookTable from "@/components/LogbookTable.vue";
import { useLogbookStore } from "@/stores/logbookStore";
import { useAuthStore } from "@/stores/auth";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const store = useLogbookStore();
const auth = useAuthStore();

const user = computed(() => auth.user);
onMounted(() => {
  if (!auth.user) auth.fetchUser(); // ensure user is loaded
});
const initials = computed(() =>
  user.value.full_name ? user.value.full_name.charAt(0) : "S"
);

// Derived metrics from store.logs
const approvedCount = computed(() =>
  store.logs.filter((log) => log.status === "approved").length
);
const pendingCount = computed(() =>
  store.logs.filter((log) => log.status === "pending").length
);
const rejectedCount = computed(() =>
  store.logs.filter((log) => log.status === "rejected").length
);
const lastDate = computed(() => {
  if (!store.logs.length) return null;
  const sorted = [...store.logs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return new Date(sorted[0].date).toLocaleDateString();
});

onMounted(() => {
  // fetch logs once when dashboard mounts
  store.fetchLogs();
});

const exportPdfAll = async () => {
  const el = document.createElement("div");
  el.style.padding = "12px";
  el.innerHTML = `
    <h2>SIWES Logbook</h2>
    <table style="width:100%;border-collapse:collapse;font-size:12px;">
      <thead><tr><th style="border:1px solid #ddd;padding:6px;">Date</th><th style="border:1px solid #ddd;padding:6px;">Activity</th><th style="border:1px solid #ddd;padding:6px;">Hours</th><th style="border:1px solid #ddd;padding:6px;">Status</th></tr></thead>
      <tbody>
        ${store.logs.map(e => `<tr>
          <td style="border:1px solid #ddd;padding:6px;">${e.date}</td>
          <td style="border:1px solid #ddd;padding:6px;">${e.content}</td>
          <td style="border:1px solid #ddd;padding:6px;text-align:center;">${e.hours_worked}</td>
          <td style="border:1px solid #ddd;padding:6px;text-align:center;">${e.status}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  `;
  document.body.appendChild(el);
  const canvas = await html2canvas(el, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("logbook.pdf");
  document.body.removeChild(el);
};
</script>
